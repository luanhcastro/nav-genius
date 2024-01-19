import pool from "../database/db.js";

function calculateDistance(coordinates1, coordinates2) {
  const deltaX = coordinates2.x - coordinates1.x;
  const deltaY = coordinates2.y - coordinates1.y;

  const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

  return distance;
}

function findClosestUser(user, remainingUsers) {
  let minDistance = Number.POSITIVE_INFINITY;
  let closestUser = null;

  for (const otherUser of remainingUsers) {
    const distance = calculateDistance(user.coordinates, otherUser.coordinates);
    if (distance < minDistance) {
      minDistance = distance;
      closestUser = otherUser;
    }
  }

  return closestUser;
}

function calculateRoute(users) {
  const n = users.length;
  const visited = Array(n).fill(false);
  const route = [];
  
  // Encontra usuário mais próximo de (0,0)
  let closestToOrigin = findClosestUser({ coordinates: { x: 0, y: 0 } }, users);
  route.push(closestToOrigin);
  visited[users.indexOf(closestToOrigin)] = true;

  // Constrói rota
  while (route.length < n) {
    const lastUser = route[route.length - 1];
    const remainingUsers = users.filter((user, index) => !visited[index]);

    const closestUser = findClosestUser(lastUser, remainingUsers);
    route.push(closestUser);
    visited[users.indexOf(closestUser)] = true;
  }

  return route.map(user => user.name);
}

class UserService {
  static async getAllUsers() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  }

  static async getUserByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }

  static async createUser(name, email, phone, coordinates) {
    const pointString = `(${coordinates.x},${coordinates.y})`;

    const result = await pool.query(
      "INSERT INTO users (name, email, phone, coordinates) VALUES ($1, $2, $3, $4::point) RETURNING *",
      [name, email, phone, pointString]
    );

    return result.rows[0];
  }

  static async updateUser(id, name, email, phone, coordinates) {
    const pointString = `(${coordinates.x},${coordinates.y})`;
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, phone = $3, coordinates = $4 WHERE id = $5 RETURNING *",
      [name, email, phone, pointString, id]
    );
    return result.rows[0];
  }

  static async deleteUser(id) {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  static async calculateShortestRoute(users) {
    const shortestRoute = calculateRoute(users);
    return shortestRoute;
  }
}

export default UserService;
