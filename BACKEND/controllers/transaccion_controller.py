"""
CAPA 2 - controllers: valida los datos, aplica las reglas del banco y decide
que codigo HTTP responder.

REGLAS DEL BANCO DE TECNOLOGIA CEIPA
------------------------------------
- CONSIGNAR y AVANCE  -> ENTRA dinero  (suman al saldo)
- PAGAR y TRANSFERIR  -> SALE dinero   (restan al saldo)
- La cuenta arranca en $0.
- El saldo nunca puede quedar negativo: no se puede pagar ni transferir
  mas de lo que hay.
"""

from prisma.errors import UniqueViolationError

from models import transaccion_model

# Cada tipo dice si suma (+1) o resta (-1) al saldo.
TIPOS = {
    "CONSIGNAR": +1,
    "AVANCE": +1,
    "PAGAR": -1,
    "TRANSFERIR": -1,
}

NO_EXISTE = {"error": "La transacción no existe"}


# ---------------------------------------------------------------------------
# Funciones de apoyo
# ---------------------------------------------------------------------------
def a_diccionario(transaccion):
    """Convierte el objeto de Prisma en un diccionario para enviarlo en JSON."""
    return {
        "id": transaccion.id,
        "codigo": transaccion.codigo,
        "tipo": transaccion.tipo,
        "monto": transaccion.monto,
        "fecha": transaccion.fecha.isoformat(),
    }


def validar(datos):
    """
    Revisa los datos que llegan del formulario.
    Devuelve (datos_limpios, None) si todo esta bien, o (None, mensaje) si no.
    """
    if not isinstance(datos, dict):
        return None, "Faltan los datos de la transacción"

    codigo = str(datos.get("codigo", "")).strip().upper()
    tipo = str(datos.get("tipo", "")).strip().upper()
    monto = datos.get("monto")

    if codigo == "":
        return None, "El código es obligatorio"
    if tipo not in TIPOS:
        return None, "El tipo debe ser CONSIGNAR, AVANCE, PAGAR o TRANSFERIR"
    try:
        monto = int(monto)
    except (TypeError, ValueError):
        return None, "El monto debe ser un número entero"
    if monto <= 0:
        return None, "El monto debe ser mayor que cero"
    if monto > 2_147_483_647:  # maximo que cabe en una columna INT de MySQL
        return None, "El monto es demasiado grande"

    return {"codigo": codigo, "tipo": tipo, "monto": monto}, None


def calcular_saldos(movimientos):
    """
    Recorre los movimientos del mas antiguo al mas reciente y le pone a cada
    uno el saldo que quedo despues de hacerlo.
    """
    saldo = 0
    resultado = []
    for t in movimientos:
        saldo = saldo + TIPOS[t["tipo"]] * t["monto"]
        resultado.append({**t, "saldo": saldo})
    return resultado


def saldo_queda_negativo(movimientos):
    """True si en algun momento el saldo baja de cero."""
    return any(t["saldo"] < 0 for t in calcular_saldos(movimientos))


def movimientos_actuales():
    return [a_diccionario(t) for t in transaccion_model.obtener_todas()]


# ---------------------------------------------------------------------------
# CRUD
# ---------------------------------------------------------------------------
def listar_transacciones():
    con_saldo = calcular_saldos(movimientos_actuales())
    saldo_actual = con_saldo[-1]["saldo"] if con_saldo else 0
    # Se envian del mas reciente al mas antiguo, que es como se leen en pantalla.
    return {"saldo": saldo_actual, "transacciones": list(reversed(con_saldo))}, 200


def obtener_transaccion(id):
    transaccion = transaccion_model.obtener_por_id(id)
    if transaccion is None:
        return NO_EXISTE, 404
    return a_diccionario(transaccion), 200


def crear_transaccion(datos):
    limpios, error = validar(datos)
    if error:
        return {"error": error}, 400

    # Se prueba como quedaria la cuenta con el nuevo movimiento al final.
    movimientos = movimientos_actuales() + [limpios]
    if saldo_queda_negativo(movimientos):
        return {"error": "Saldo insuficiente para esta transacción"}, 400

    try:
        nueva = transaccion_model.crear(limpios)
    except UniqueViolationError:
        return {"error": f"Ya existe una transacción con el código {limpios['codigo']}"}, 409
    return a_diccionario(nueva), 201


def actualizar_transaccion(id, datos):
    limpios, error = validar(datos)
    if error:
        return {"error": error}, 400

    movimientos = movimientos_actuales()
    if not any(t["id"] == id for t in movimientos):
        return NO_EXISTE, 404

    # Se prueba como quedaria la cuenta con el movimiento cambiado.
    cambiados = [{**t, **limpios} if t["id"] == id else t for t in movimientos]
    if saldo_queda_negativo(cambiados):
        return {"error": "No se puede: con ese cambio el saldo quedaría negativo"}, 400

    try:
        actualizada = transaccion_model.actualizar(id, limpios)
    except UniqueViolationError:
        return {"error": f"Ya existe una transacción con el código {limpios['codigo']}"}, 409
    return a_diccionario(actualizada), 200


def eliminar_transaccion(id):
    movimientos = movimientos_actuales()
    if not any(t["id"] == id for t in movimientos):
        return NO_EXISTE, 404

    # Se prueba como quedaria la cuenta sin ese movimiento.
    sin_ese = [t for t in movimientos if t["id"] != id]
    if saldo_queda_negativo(sin_ese):
        return {"error": "No se puede eliminar: el saldo quedaría negativo"}, 400

    eliminada = transaccion_model.eliminar(id)
    return {"mensaje": f"Transacción {eliminada.codigo} eliminada"}, 200
