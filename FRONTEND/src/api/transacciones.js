// Todas las llamadas al backend, en un solo sitio.
// La funcion "pedir" atrapa los errores: si el backend esta apagado o
// responde un error, lanza un mensaje claro para mostrarlo en pantalla.

const BASE_URL = "http://localhost:5000/api/transacciones";

async function pedir(url, opciones = {}) {
  let respuesta;
  try {
    respuesta = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...opciones,
    });
  } catch {
    throw new Error("No hay conexión con el servidor. Revisa que el backend esté encendido (python3 app.py).");
  }
  const datos = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(datos.error);
  }
  return datos;
}

export function obtenerTransacciones() {
  return pedir(`${BASE_URL}/`);
}

export function crearTransaccion(datos) {
  return pedir(`${BASE_URL}/`, { method: "POST", body: JSON.stringify(datos) });
}

export function actualizarTransaccion(id, datos) {
  return pedir(`${BASE_URL}/${id}`, { method: "PUT", body: JSON.stringify(datos) });
}

export function eliminarTransaccion(id) {
  return pedir(`${BASE_URL}/${id}`, { method: "DELETE" });
}
