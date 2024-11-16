from flask import Flask, jsonify, request, Blueprint
from db_queries.queries import add_worker, registered_worker, worker_list

worker = Blueprint("worker", __name__, url_prefix="/worker")


@worker.route("/reg", methods=["POST"])
def reg():
    data = request.json
    status, _ = registered_worker(data, True)
    if status:
        return jsonify({"status": "error", "error": "user is already registered"}), 400

    add_worker(data)
    return jsonify({"status": "ok"}), 200


@worker.route("/auth", methods=["POST"])
def auth():
    data = request.json
    status, fio = registered_worker(data, False)
    if (status):
        return jsonify({"status": "ok", "fio": fio}), 200

    return jsonify({"status": "error", "error": "user is not registered"}), 400


@worker.route('/list', methods=['GET'])
def get_workers():
    return jsonify(worker_list()), 200
