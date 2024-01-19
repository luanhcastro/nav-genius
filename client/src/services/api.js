import API_URL from "./apiConfig";

const getAllClients = async () => {
  const response = await fetch(`${API_URL}/users`);
  const data = await response.json();
  return data;
};

const addClient = async (client) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
const deleteClient = async (clientId) => {
  await fetch(`${API_URL}/users/${clientId}`, {
    method: "DELETE",
  });
};

const getShortestRoute = async () => {
  try {
    const response = await fetch(`${API_URL}/users/shortest-route`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export { getAllClients, addClient, deleteClient, getShortestRoute };
