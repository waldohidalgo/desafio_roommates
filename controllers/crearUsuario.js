import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { calcularDebeHaber } from "./utils.js";
const crearUsuario = async () => {
  try {
    const id = uuidv4().slice(0, 8);

    const dataAPI = await fetch("https://randomuser.me/api/?results=1");
    const { results: data } = await dataAPI.json();
    const dataUsuario = data[0];
    const nombre = dataUsuario.name.first + " " + dataUsuario.name.last;
    const usuario = {
      id,
      nombre,
      debe: null,
      recibe: null,
    };
    const filePath = path.join(path.resolve(), "data", "roommates.json");
    const dataJSON = await fs.readFile(filePath, "utf-8");

    const dataParse = JSON.parse(dataJSON);
    dataParse.roommates.push(usuario);

    const filePathGastos = path.join(path.resolve(), "data", "gastos.json");
    const dataJSONGastos = await fs.readFile(filePathGastos, "utf-8");
    const dataParseGastos = JSON.parse(dataJSONGastos);
    const gastos = dataParseGastos.gastos;
    const nuevosRoommates = calcularDebeHaber(gastos, dataParse.roommates);
    const nuevoObjetoData = { roommates: nuevosRoommates };
    await fs.writeFile(
      filePath,
      JSON.stringify(nuevoObjetoData, null, 2),
      "utf-8",
    );
    return nuevoObjetoData;
  } catch (error) {
    return error;
  }
};

export default crearUsuario;
