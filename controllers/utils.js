export function calcularDebeHaber(gastos, roommates) {
  const gastoTotalporRoommate = {};
  gastos.forEach((gasto) => {
    if (gasto.idRoommate in gastoTotalporRoommate) {
      gastoTotalporRoommate[gasto.idRoommate] =
        Number(gastoTotalporRoommate[gasto.idRoommate]) + gasto.monto;
    } else {
      gastoTotalporRoommate[gasto.idRoommate] = Number(gasto.monto);
    }
  });

  const gastoTotal = Object.values(gastoTotalporRoommate).reduce(
    (total, gasto) => total + gasto,
    0,
  );

  const cantidadRoommates = roommates.length;
  const gastoTotalRepartido = gastoTotal / cantidadRoommates;

  roommates.forEach((roommate) => {
    roommate.debe = -Math.round(
      gastoTotalRepartido -
        (gastoTotalporRoommate[roommate.id] ?? 0) / cantidadRoommates,
    );

    roommate.recibe = Math.round(
      (gastoTotalporRoommate[roommate.id] ?? 0) -
        (gastoTotalporRoommate[roommate.id] ?? 0) / cantidadRoommates,
    );
  });

  return roommates;
}
