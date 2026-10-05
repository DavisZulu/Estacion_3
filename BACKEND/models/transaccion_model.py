"""
CAPA 3 - models: la unica capa que habla con la base de datos (via Prisma).
"""

from db import db


def obtener_todas():
    # Orden del mas antiguo al mas reciente: asi se puede ir calculando el saldo.
    return db.transaccion.find_many(order={"id": "asc"})


def obtener_por_id(id):
    return db.transaccion.find_unique(where={"id": id})


def crear(datos):
    return db.transaccion.create(data=datos)


def actualizar(id, datos):
    return db.transaccion.update(where={"id": id}, data=datos)


def eliminar(id):
    return db.transaccion.delete(where={"id": id})
