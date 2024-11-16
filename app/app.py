from flask import Flask, request, jsonify
from db_queries.queries import init_db, add_worker, worker_list
from argon2 import PasswordHasher

from handlers.worker_handling import worker
from handlers.user_handling import user
from handlers.mail_handling import mail

app = Flask(__name__)
hasher = PasswordHasher()
init_db()

app.register_blueprint(worker)
app.register_blueprint(user)
app.register_blueprint(mail)


@app.route('/api/ping', methods=['GET'])
def send():
    return jsonify({"status": "ok"}), 200
