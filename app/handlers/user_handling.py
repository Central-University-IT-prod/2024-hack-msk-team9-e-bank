from flask import jsonify, request, Blueprint
from db_queries.queries import add_user, registered_user, users_list

user = Blueprint("user", __name__, url_prefix="/user")


@user.route("/reg", methods=["POST"])
def reg_user():
    data = request.json
    if (registered_user(data)):
        return jsonify({"status": "error", "error": "user is already registered"}), 400

    add_user(data)
    return jsonify({"status": "ok"}), 200


@user.route("/list", methods=["GET"])
def get_users():
    return jsonify(users_list()), 200