import express from "express";

import {
  renderHome,
  getRoommates,
  getGastos,
  notFound,
  postRoommate,
  postGasto,
  deleteGasto,
  deleteRoommate,
  updateGasto,
  resetData,
} from "../controllers/index.js";

import { resetScript } from "../controllers/utils.js";

const router = express.Router();

router.get("/", renderHome);

// get Roommates

router.get("/roommates", getRoommates);

//Post Roommate

router.post("/roommate", postRoommate);

//Delete roommate

router.delete("/roommate", deleteRoommate);

//get Gastos

router.get("/gastos", getGastos);

//post Gasto

router.post("/gasto", postGasto);

//Update Gasto

router.put("/gasto", updateGasto);

//delete Gasto

router.delete("/gasto", deleteGasto);

//Ruta para resetear archivos json

router.get("/reset", resetData);

//No found

router.get("/*", notFound);

setInterval(async () => {
  try {
    const resultado = await resetScript();
    if (resultado === "exito") {
      console.log("Data reseteada");
    } else {
      throw new Error("No se pudo resetear la data");
    }
  } catch (error) {
    console.error("Error al resetear la data", error.message);
  }
}, 1800000);

export default router;
