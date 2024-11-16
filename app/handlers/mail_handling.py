from flask import jsonify, request, Blueprint
from db_queries.queries import get_mails, add_mail, mails_list, edit_mail


mail = Blueprint("mail", __name__, url_prefix="/mail")


@mail.route("/add", methods=["POST"])
def reg_mail():
    data = request.json
    add_mail(data)
    return jsonify({"status": "ok"}), 200


@mail.route("/<role>", methods=["POST"])
def reg_user(role):
    data = request.json
    return jsonify(get_mails(role, data))


@mail.route('/list', methods=['GET'])
def get_workers():
    return jsonify(mails_list()), 200

@mail.route('/edit', methods=["POST"])
def edit_mail():
    data = request.json
    edit_mail(data)
    return jsonify({"status": "ok"}), 200