import { useEffect, useState } from "react";
import {
  actualizarTransaccion,
  crearTransaccion,
  eliminarTransaccion,
  obtenerTransacciones,
} from "../api/transacciones";

// Los cuatro tipos de movimiento. "entra" suma al saldo y "sale" resta.
const TIPOS = [
  { valor: "CONSIGNAR", texto: "Consignar", mueve: "entra" },
  { valor: "AVANCE", texto: "Avance (tarjeta de crédito)", mueve: "entra" },
  { valor: "PAGAR", texto: "Pagar", mueve: "sale" },
  { valor: "TRANSFERIR", texto: "Transferir", mueve: "sale" },
];

const FORMULARIO_VACIO = { codigo: "", tipo: "CONSIGNAR", monto: "" };

// Formato de pesos colombianos: $ 1.250.000
const pesos = (valor) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(valor);

const fecha = (texto) =>
  new Date(texto).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });

const esEntrada = (tipo) => TIPOS.find((t) => t.valor === tipo)?.mueve === "entra";

const CAMPO =
  "mt-1 w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-emerald-950 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

function Transacciones() {
  const [transacciones, setTransacciones] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [sinConexion, setSinConexion] = useState("");

  async function cargarTransacciones() {
    try {
      const datos = await obtenerTransacciones();
      setTransacciones(datos.transacciones);
      setSaldo(datos.saldo);
      setSinConexion("");
    } catch (e) {
      setSinConexion(e.message);
    }
  }

  useEffect(() => {
    cargarTransacciones();
  }, []);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  }

  function editar(transaccion) {
    setEditandoId(transaccion.id);
    setError("");
    setExito("");
    setFormulario({
      codigo: transaccion.codigo,
      tipo: transaccion.tipo,
      monto: transaccion.monto,
    });
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setFormulario(FORMULARIO_VACIO);
    setError("");
  }

  async function eliminar(transaccion) {
    const confirmado = window.confirm(
      `¿Eliminar la transacción ${transaccion.codigo} por ${pesos(transaccion.monto)}?`
    );
    if (!confirmado) return;
    setError("");
    try {
      const respuesta = await eliminarTransaccion(transaccion.id);
      setExito(respuesta.mensaje);
      await cargarTransacciones();
    } catch (e) {
      setError(e.message);
    }
  }

  async function enviarFormulario(evento) {
    evento.preventDefault();
    setError("");
    setExito("");

    const datos = {
      codigo: formulario.codigo,
      tipo: formulario.tipo,
      monto: Number(formulario.monto),
    };

    try {
      if (editandoId) {
        await actualizarTransaccion(editandoId, datos);
        setExito("Transacción actualizada");
      } else {
        await crearTransaccion(datos);
        setExito("Transacción registrada");
      }
      cancelarEdicion();
      await cargarTransacciones();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-white">
      {/* Encabezado del banco */}
      <header className="bg-linear-to-r from-emerald-800 via-emerald-700 to-teal-600 text-white shadow-lg">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6 px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-2xl font-bold ring-1 ring-white/30">
              B
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Banco de Tecnología CEIPA</h1>
              <p className="text-sm text-emerald-100">Tu cuenta, tus movimientos, en tiempo real</p>
            </div>
          </div>
          <div className="rounded-xl bg-white/10 px-6 py-3 text-right ring-1 ring-white/25">
            <p className="text-xs uppercase tracking-widest text-emerald-100">Saldo disponible</p>
            <p className="text-3xl font-semibold tabular-nums">{pesos(saldo)}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        {sinConexion && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-sm font-medium text-red-700">{sinConexion}</p>
            <button
              onClick={cargarTransacciones}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Formulario */}
        <form
          onSubmit={enviarFormulario}
          className={`grid gap-4 rounded-2xl border bg-white p-6 shadow-md shadow-emerald-900/5 sm:grid-cols-3 ${
            editandoId ? "border-amber-300 ring-2 ring-amber-100" : "border-emerald-100"
          }`}
        >
          <h2 className="font-semibold text-emerald-900 sm:col-span-3">
            {editandoId ? "Editar transacción" : "Nueva transacción"}
          </h2>

          <div>
            <label className="text-sm font-medium text-emerald-950">Código</label>
            <input
              name="codigo"
              value={formulario.codigo}
              onChange={manejarCambio}
              placeholder="TX-0009"
              required
              className={`${CAMPO} uppercase`}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-emerald-950">Tipo</label>
            <select name="tipo" value={formulario.tipo} onChange={manejarCambio} className={CAMPO}>
              {TIPOS.map((t) => (
                <option key={t.valor} value={t.valor}>
                  {t.texto} ({t.mueve === "entra" ? "+ entra" : "− sale"})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-emerald-950">Monto (COP)</label>
            <input
              name="monto"
              type="number"
              min="1"
              value={formulario.monto}
              onChange={manejarCambio}
              placeholder="500000"
              required
              className={CAMPO}
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 sm:col-span-3">{error}</p>
          )}
          {exito && (
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 sm:col-span-3">
              ✓ {exito}
            </p>
          )}

          <div className="flex gap-2 sm:col-span-3">
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
            >
              {editandoId ? "Guardar cambios" : "Registrar transacción"}
            </button>
            {editandoId && (
              <button
                type="button"
                onClick={cancelarEdicion}
                className="rounded-lg bg-emerald-50 px-5 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* Movimientos */}
        <h2 className="mt-10 mb-3 font-semibold text-emerald-900">Movimientos</h2>
        <div className="overflow-x-auto rounded-2xl border border-emerald-100 bg-white shadow-md shadow-emerald-900/5">
          <table className="w-full text-sm">
            <thead className="bg-emerald-700 text-left text-white">
              <tr>
                <th className="px-4 py-3 font-medium">Código</th>
                <th className="px-4 py-3 font-medium">Tipo</th>
                <th className="px-4 py-3 text-right font-medium">Monto</th>
                <th className="px-4 py-3 text-right font-medium">Saldo</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {transacciones.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-emerald-900/60">
                    Aún no hay movimientos. Registra una consignación para empezar.
                  </td>
                </tr>
              )}
              {transacciones.map((t) => {
                const entra = esEntrada(t.tipo);
                return (
                  <tr
                    key={t.id}
                    className={`border-t border-emerald-50 text-emerald-950 hover:bg-emerald-50/60 ${
                      editandoId === t.id ? "bg-amber-50" : ""
                    }`}
                  >
                    <td className="px-4 py-2.5 font-medium">{t.codigo}</td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          entra ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {t.tipo}
                      </span>
                    </td>
                    <td className={`px-4 py-2.5 text-right font-medium tabular-nums ${entra ? "text-emerald-700" : "text-rose-600"}`}>
                      {entra ? "+ " : "− "}
                      {pesos(t.monto)}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{pesos(t.saldo)}</td>
                    <td className="px-4 py-2.5 text-xs text-emerald-900/60">{fecha(t.fecha)}</td>
                    <td className="whitespace-nowrap px-4 py-2.5">
                      <button
                        onClick={() => editar(t)}
                        className="mr-3 font-medium text-emerald-700 hover:underline"
                      >
                        Editar
                      </button>
                      <button onClick={() => eliminar(t)} className="font-medium text-rose-600 hover:underline">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-8 text-center text-xs text-emerald-900/50">
          React + Vite + Tailwind · API Flask · MySQL en Docker
        </p>
      </main>
    </div>
  );
}

export default Transacciones;
