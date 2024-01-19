import API_URL from './apiConfig';

const getAllClients = async () => {
  const response = await fetch(`${API_URL}/users`);
  const data = await response.json();
  console.log(123213, data);
  return data;
};

const addClient = async (client) => {
  await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
  });
};

const updateClient = async (clientId, client) => {
  await fetch(`${API_URL}/users/${clientId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
  });
};

const deleteClient = async (clientId) => {
  await fetch(`${API_URL}/users/${clientId}`, {
    method: 'DELETE',
  });
};

export { getAllClients, addClient, updateClient, deleteClient };
