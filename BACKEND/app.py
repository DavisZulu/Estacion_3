"""
Punto de arranque del backend del Banco de Tecnologia CEIPA.
"""

import logging

from flask import Flask, jsonify
from flask_cors import CORS
from prisma.errors import PrismaError

from db import db
from routes.transaccion_routes import transaccion_bp

# Oculta los mensajes internos de Prisma en la terminal.
logging.getLogger("httpx").setLevel(logging.WARNING)

app = Flask(__name__)
app.json.ensure_ascii = False  # para que las tildes se vean bien en el JSON
CORS(app)

db.connect()

app.register_blueprint(transaccion_bp, url_prefix="/api/transacciones")


@app.route("/api/salud")
def salud():
    """Dice si la API y la base de datos estan respondiendo."""
    total = db.transaccion.count()
    return jsonify({"api": "ok", "base_datos": "conectada", "transacciones": total})


@app.errorhandler(PrismaError)
def base_de_datos_caida(error):
    """Si MySQL no responde, se contesta en JSON en vez de una pagina de error."""
    return jsonify({
        "error": "La base de datos no está disponible. Enciende el contenedor: docker start empresa"
    }), 503


if __name__ == "__main__":
    app.run(debug=True, port=5000)
