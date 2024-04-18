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
    const response = await fetch(
      "https://desafio-roommates.onrender.com/reset",
      {
        method: "GET",
      },
    );
    if (response.status === 200) {
      console.log("Se reinicio el servidor exitosamente");
      return;
    } else {
      throw new Error("No se pudo reiniciar el servidor");
    }
  } catch (error) {
    console.error("Error al llamar a la ruta:", error);
  }
}, 1800000);

export default router;
