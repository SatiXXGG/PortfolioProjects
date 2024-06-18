import GetSodas from "../utils/GetSodas.mjs";
const Sodas = GetSodas();

export class SodaModel {
  static async getAll({ lowerto } = {}) {
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

  static async getByName({ name }) {
    const newJson = Sodas.filter((item) => {
      if (item.name.toLowerCase().includes(name.toLowerCase()) === true) {
        return true;
      }
      return false;
    });

    return newJson;
  }

  static async create({ validation }) {
    const newSoda = {
      id: crypto.randomUUID(),
      ...validation.data,
    };

    Sodas.push(newSoda); //this isnt CRUD, ill add a DB later

    return newSoda;
  }

  static async delete({ id }) {
    const movieIndex = Sodas.findIndex((item) => item.id === id);

    if (movieIndex > 0) {
      Sodas.splice(movieIndex, 1);
      return true;
    }
    return false;
  }

  static async update({ id, validation }) {
    const index = Sodas.findIndex((item) => item.id == id);
    if (index > 0) {
      const { data } = validation;
      const soda = Sodas[index];
      const newSoda = {
        ...soda,
        ...data,
      };

      Sodas[index] = newSoda;
      return newSoda;
    }
    return false;
  }
}
