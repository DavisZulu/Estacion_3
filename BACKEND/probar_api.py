"""
probar_api.py
Prueba automatica del CRUD contra la API real del Banco de Tecnologia CEIPA.

En vez de probar a mano cada caso, este script los prueba todos de una vez
y dice si alguno fallo. Usa movimientos con codigo PRUEBA-... y los borra al
final, asi que no cambia el saldo de la cuenta.

USO (con el backend encendido en otra terminal)
    python3 probar_api.py            -> prueba Create, Read, Update, Delete y las reglas
    python3 probar_api.py --semilla  -> carga 8 movimientos de ejemplo
"""

import json
import sys
import urllib.error
import urllib.request

API = "http://localhost:5000/api"
VERDE, ROJO, GRIS, NEGRITA, FIN = "\033[92m", "\033[91m", "\033[90m", "\033[1m", "\033[0m"

SEMILLA = [
    ("TX-0001", "CONSIGNAR", 3_500_000),
    ("TX-0002", "PAGAR", 420_000),
    ("TX-0003", "TRANSFERIR", 850_000),
    ("TX-0004", "AVANCE", 1_000_000),
    ("TX-0005", "PAGAR", 185_000),
    ("TX-0006", "CONSIGNAR", 1_200_000),
    ("TX-0007", "TRANSFERIR", 640_000),
    ("TX-0008", "PAGAR", 96_000),
]

resultados = []


def pesos(valor):
    return f"${valor:,.0f}".replace(",", ".")


def pedir(metodo, ruta, cuerpo=None):
    """Hace la peticion HTTP y devuelve (codigo, respuesta en JSON)."""
    datos = json.dumps(cuerpo).encode() if cuerpo is not None else None
    peticion = urllib.request.Request(API + ruta, data=datos, method=metodo,
                                      headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(peticion, timeout=10) as r:
            return r.status, json.loads(r.read())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read())


def verificar(paso, esperado, codigo, detalle):
    ok = codigo == esperado
    resultados.append(ok)
    marca = f"{VERDE}✔{FIN}" if ok else f"{ROJO}✘{FIN}"
    print(f" {marca} {paso:<44} HTTP {codigo} {GRIS}(esperado {esperado}){FIN}")
    print(f"     {GRIS}→ {detalle}{FIN}")


def saldo():
    return pedir("GET", "/transacciones/")[1]["saldo"]


def crear(codigo, tipo, monto):
    return pedir("POST", "/transacciones/", {"codigo": codigo, "tipo": tipo, "monto": monto})


def sembrar():
    print(f"\n{NEGRITA}Cargando movimientos de ejemplo{FIN}\n")
    for codigo, tipo, monto in SEMILLA:
        c, r = crear(codigo, tipo, monto)
        estado = "creado" if c == 201 else r["error"]
        print(f"  {codigo}  {tipo:<11} {pesos(monto):>12}  → {estado}")
    print(f"\n  {NEGRITA}Saldo disponible: {pesos(saldo())}{FIN}\n")


def probar():
    print(f"\n{NEGRITA}Banco de Tecnología CEIPA · prueba automática del CRUD{FIN}\n")

    c, r = pedir("GET", "/salud")
    verificar("0. La API y la base de datos responden", 200, c, r)
    inicial = saldo()
    print(f"     {GRIS}→ saldo inicial: {pesos(inicial)}{FIN}")

    print(f"\n{NEGRITA}CREATE{FIN}")
    c, r = crear("PRUEBA-01", "CONSIGNAR", 1_000_000)
    verificar("1. Consignar $1.000.000", 201, c, f"saldo: {pesos(saldo())}")
    id_consignacion = r.get("id")
    c, r = crear("PRUEBA-02", "PAGAR", 300_000)
    verificar("2. Pagar $300.000", 201, c, f"saldo: {pesos(saldo())}")
    id_pago = r.get("id")

    print(f"\n{NEGRITA}READ{FIN}")
    c, r = pedir("GET", f"/transacciones/{id_pago}")
    verificar("3. Consultar el pago por su id", 200, c, f"{r.get('codigo')} · {r.get('tipo')} · {pesos(r.get('monto', 0))}")

    print(f"\n{NEGRITA}UPDATE{FIN}")
    c, r = pedir("PUT", f"/transacciones/{id_pago}", {"codigo": "PRUEBA-02", "tipo": "PAGAR", "monto": 500_000})
    verificar("4. Cambiar el pago a $500.000", 200, c, f"saldo: {pesos(saldo())}")

    print(f"\n{NEGRITA}REGLAS DEL BANCO{FIN}")
    c, r = crear("PRUEBA-03", "TRANSFERIR", inicial + 99_000_000)
    verificar("5. Transferir más de lo que hay", 400, c, r.get("error"))
    c, r = crear("PRUEBA-04", "PAGAR", -500)
    verificar("6. Monto negativo", 400, c, r.get("error"))
    c, r = crear("PRUEBA-05", "PRESTAMO", 1000)
    verificar("7. Tipo que no existe", 400, c, r.get("error"))
    c, r = crear("PRUEBA-01", "CONSIGNAR", 1000)
    verificar("8. Código repetido", 409, c, r.get("error"))
    c, r = pedir("DELETE", "/transacciones/999999")
    verificar("9. Eliminar un id que no existe", 404, c, r.get("error"))

    print(f"\n{NEGRITA}DELETE{FIN}")
    c, r = pedir("DELETE", f"/transacciones/{id_pago}")
    verificar("10. Eliminar el pago", 200, c, r.get("mensaje"))
    c, r = pedir("DELETE", f"/transacciones/{id_consignacion}")
    verificar("11. Eliminar la consignación", 200, c, f"saldo de vuelta en {pesos(saldo())}")

    total, bien = len(resultados), sum(resultados)
    color = VERDE if bien == total else ROJO
    print(f"\n{color}{NEGRITA}Resultado: {bien}/{total} pruebas correctas{FIN}\n")


if __name__ == "__main__":
    try:
        sembrar() if "--semilla" in sys.argv else probar()
    except urllib.error.URLError:
        print(f"\n{ROJO}No hay conexión con la API. Enciende el backend: python3 app.py{FIN}\n")
        sys.exit(1)
