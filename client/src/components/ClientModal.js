import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Row, Col } from "antd";
import { addClient } from "../services/api";
import {
  validateEmail,
  validateName,
  validatePhone,
} from "../validators/formValidators";
import { message } from "antd";

const ClientModal = ({ visible, onCancel, fetchData, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
    }
  }, [visible, form]);

  const onFinish = async (values) => {
    values.coordinates.x = parseFloat(values.coordinates.x);
    values.coordinates.y = parseFloat(values.coordinates.y);

    try {
      await addClient(values);
      message.success("Cliente criado com sucesso!");

      onCancel();
      onSave();
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      message.error("Erro ao realizar a operação.");
    }
  };

  return (
    <Modal
      title="Novo Cliente"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        name="clientForm"
        onFinish={onFinish}
        initialValues={{ coordinates: { x: "", y: "" } }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nome"
              name="name"
              rules={[
                { required: true, message: "Por favor, insira o nome." },
                { validator: validateName },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Telefone"
              name="phone"
              rules={[
                { required: true, message: "Por favor, insira o telefone." },
                { validator: validatePhone },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Por favor, insira o email." },
                { validator: validateEmail },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              label="Coordenadas"
              name={["coordinates", "x"]}
              rules={[
                {
                  required: true,
                  message: "Por favor, insira a coordenada X.",
                },
              ]}
            >
              <Input placeholder="X" type="number" step="any" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label=""
              name={["coordinates", "y"]}
              rules={[
                {
                  required: true,
                  message: "Por favor, insira a coordenada Y.",
                },
              ]}
            >
              <Input placeholder="Y" type="number" step="any" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ClientModal;
