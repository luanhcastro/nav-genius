import React, { useState, useEffect } from "react";
import { Table, Button, Card, Space, Popconfirm, message, Modal } from "antd";
import ClientModal from "./ClientModal";
import { getAllClients, deleteClient } from "../services/api";
import { DeleteOutlined } from "@ant-design/icons";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Coordenadas",
      key: "coordinates",
      render: (text, record) => (
        <span>{`(${record.coordinates.x}, ${record.coordinates.y})`}</span>
      ),
    },
    {
      title: "Ações",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Tem certeza que deseja excluir o cliente?"
            onConfirm={() => handleDelete(record)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleCreateOrUpdate = () => {
    setVisible(false);
  };

  const fetchData = async () => {
    try {
      const data = await getAllClients();
      setClients(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = () => {
    setVisible(true);
    setSelectedClient(null);
  };

  const handleDelete = async (record) => {
    try {
      await deleteClient(record.id);
      fetchData();
      message.success("Cliente excluído com sucesso!");
    } catch (error) {
      console.error("Error deleting client:", error);
      message.error("Erro ao excluir cliente.");
    }
  };

  return (
    <div
      style={{
        margin: "20px",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Card
        title="Nav Genius"
        extra={
          <Button type="primary" onClick={() => showModal()}>
            Novo Cliente
          </Button>
        }
      >
        <Table dataSource={clients} columns={columns} />
      </Card>

      <ClientModal
        visible={visible}
        onCancel={() => setVisible(false)}
        fetchData={fetchData}
        selectedClient={selectedClient}
        onSave={handleCreateOrUpdate}
      />
    </div>
  );
};

export default ClientList;
