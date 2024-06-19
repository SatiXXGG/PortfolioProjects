import { configDotenv } from "dotenv";
import mysql from "mysql2/promise";

configDotenv();

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  // eslint-disable-next-line no-undef
  password: process.env.PASSWORD,
  database: "sodadb",
};

const connection = await mysql.createConnection(process.env.DB_URL);

export class SodaModel {
  static async getAll({ lowerto } = {}) {
    const [Sodas] = await connection.query(
      "select name, price, description, BIN_TO_UUID(id) id from soda"
    );

    if (lowerto) {
      const filteredSodas = Sodas.filter((item) => {
        const itemPrice = item.price;

        if (itemPrice < lowerto) {
          return true;
        }
        return false;
      });
      return filteredSodas;
    }
    return Sodas;
  }

  static async getById({ id }) {
    try {
      const [Sodas] = await connection.query(
        "SELECT name, price, description, BIN_TO_UUID(id) id, price FROM soda WHERE id = UUID_TO_BIN(?)",
        [id]
      );

      return Sodas[0];
    } catch {
      return false;
    }
  }

  static async create({ validation }) {
    const { name, price, description } = validation.data;

    const uuid = crypto.randomUUID();

    try {
      await connection.query(
        "insert into soda (id, name, price, description) VALUES(UUID_TO_BIN(?),?,?,?);",
        [uuid, name, price, description]
      );
    } catch {
      return false;
    }

    return { createdAt: uuid };
  }

  static async delete({ id }) {
    console.log(id);
    try {
      const [result] = await connection.query(
        "DELETE FROM soda WHERE id = UUID_TO_BIN(?)",
        [id]
      );

      if (result.affectedRows > 0) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  static async update({ id, validation }) {
    const [rows] = await connection.query(
      "select name, price, description, BIN_TO_UUID(id) id from soda where id=UUID_TO_BIN(?)",
      [id]
    );

    if (!rows) {
      return false;
    }

    const Soda = rows[0];

    const prototype = {
      ...Soda,
      ...validation.data,
    };

    console.log(prototype);

    const { name, description, price } = prototype;

    try {
      await connection.query(
        "UPDATE soda SET name=?,description=?,price=? WHERE id=UUID_TO_BIN(?)",
        [name, description, price, id]
      );
      return prototype;
    } catch {
      return false;
    }
  }
}
