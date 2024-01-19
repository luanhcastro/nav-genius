import pool from "../database/db.js";

function calculateDistance(coordinates1, coordinates2) {
  const deltaX = coordinates2.x - coordinates1.x;
  const deltaY = coordinates2.y - coordinates1.y;

  const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

  return distance;
}

function calculateDistances(users) {
  const distances = [];

  for (let i = 0; i < users.length; i++) {
    distances[i] = [];
    for (let j = 0; j < users.length; j++) {
      distances[i][j] =
        i === j
          ? 0
          : calculateDistance(users[i].coordinates, users[j].coordinates);
    }
  }

  return distances;
}

function calculateRoute(distances) {
  const n = distances.length;
  const route = [0];

  while (route.length < n) {
    let minDistance = Number.POSITIVE_INFINITY;
    let nextIndex = -1;

    for (let i = 0; i < n; i++) {
      if (!route.includes(i)) {
        if (distances[route[route.length - 1]][i] < minDistance) {
          minDistance = distances[route[route.length - 1]][i];
          nextIndex = i;
        }
      }
    }

    route.push(nextIndex);
  }

  return route;
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
    const distances = calculateDistances(users);
    const shortestRoute = calculateRoute(distances);
    return shortestRoute.map((index) => users[index].name);
  }
}

export default UserService;
