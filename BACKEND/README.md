# BACKEND · API del Banco de Tecnología CEIPA (Flask + Prisma + MySQL)

Servidor independiente: recibe peticiones HTTP y responde en JSON. No sabe que existe un frontend.

## Capas

```
routes/        →  controllers/                     →  models/
URL y método      valida, aplica las reglas del       consulta MySQL
HTTP              banco y calcula el saldo            con Prisma
```

## Reglas del banco (controllers/transaccion_controller.py)

- `CONSIGNAR` y `AVANCE` suman al saldo; `PAGAR` y `TRANSFERIR` restan.
- La cuenta empieza en $0 y el saldo nunca puede quedar negativo.
- El saldo no se guarda: se calcula a partir de los movimientos.

## Ejecutar (macOS)

```bash
cp .env.example .env              # solo la primera vez
pip3 install -r requirements.txt
python3 -m prisma db push
python3 app.py                    # http://localhost:5000
```

Con el backend encendido, en otra terminal:

```bash
python3 probar_api.py             # prueba automática del CRUD (12/12)
python3 probar_api.py --semilla   # 8 movimientos de ejemplo
```

## Endpoints

| Método | Ruta | Respuestas |
|---|---|---|
| GET | `/api/salud` | 200 · 503 |
| GET | `/api/transacciones/` | 200 |
| GET | `/api/transacciones/<id>` | 200 · 404 |
| POST | `/api/transacciones/` | 201 · 400 · 409 |
| PUT | `/api/transacciones/<id>` | 200 · 400 · 404 · 409 |
| DELETE | `/api/transacciones/<id>` | 200 · 400 · 404 |
