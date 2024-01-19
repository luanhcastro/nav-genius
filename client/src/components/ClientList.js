import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Card,
  Space,
  Popconfirm,
  message,
  Modal,
  Input,
} from "antd";
import { ArrowRightOutlined, SearchOutlined, CloseOutlined } from "@ant-design/icons";
import ClientModal from "./ClientModal";
import { getAllClients, deleteClient, getShortestRoute } from "../services/api";
import { DeleteOutlined } from "@ant-design/icons";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [clientModalVisible, setClientModalVisible] = useState(false);
  const [shortestRouteModalVisible, setShortestRouteModalVisible] =
    useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [shortestRoute, setShortestRoute] = useState([]);

  const handleVisitClients = async () => {
    try {
      const route = await getShortestRoute();
      setShortestRoute(route);
      setShortestRouteModalVisible(true);
    } catch (error) {
      console.error("Error fetching shortest route:", error);
      message.error("Erro ao buscar a rota mais curta.");
    }
  };


  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Limpar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
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
    setClientModalVisible(false);
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

  const showClientModal = () => {
    setClientModalVisible(true);
    setSelectedClient(null);
  };

  const handleCloseClientModal = () => {
    setClientModalVisible(false);
  };

  const handleCloseShortestRouteModal = () => {
    setShortestRouteModalVisible(false);
    setShortestRoute([]);
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
        title="Clientes"
        extra={
          <>
            <Button
              type="primary"
              onClick={showClientModal}
              style={{ marginRight: 5 }}
            >
              Novo Cliente
            </Button>
            <Button type="primary" onClick={handleVisitClients}>
              Visitar Clientes
            </Button>
          </>
        }
      >
        <Table
          dataSource={clients}
          columns={columns}
          pagination={{ defaultPageSize: 5 }}
        />
      </Card>
      <ClientModal
        visible={clientModalVisible}
        onCancel={handleCloseClientModal}
        fetchData={fetchData}
        selectedClient={selectedClient}
        onSave={handleCreateOrUpdate}
      />

      <Modal
        title="Rota Mais Curta para visitar seus clientes:"
        open={shortestRouteModalVisible}
        onCancel={handleCloseShortestRouteModal}
        footer={null}
      >
        <div>
          {shortestRoute.map((customer, index) => (
            <span key={index}>
              {index === shortestRoute.length - 1 ? (
                customer
              ) : (
                <>
                  {customer} <ArrowRightOutlined />{" "}
                </>
              )}
            </span>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ClientList;
