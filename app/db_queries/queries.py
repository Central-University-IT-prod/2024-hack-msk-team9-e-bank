import os
import psycopg2
from psycopg2 import extras
from db_queries.init_database import command
from argon2 import PasswordHasher

user = os.environ['POSTGRES_USERNAME']
password = os.environ['POSTGRES_PASSWORD']
host = os.environ['POSTGRES_HOST']
port = os.environ['POSTGRES_PORT']
database = os.environ['POSTGRES_DATABASE']
connection = psycopg2.connect(user=user,
                              password=password,
                              host=host,
                              port=port,
                              database=database)

ph = PasswordHasher()


def init_db():
    with connection:
        with connection.cursor(cursor_factory=extras.RealDictCursor) as cursor:
            cursor.execute(command)
            connection.commit()


def add_worker(data):
    data["password"] = ph.hash(data.get("password"))

    query = f"INSERT INTO workers ("
    for key, _ in data.items():
        query += f"{key}, "
    query = query[:-2] + ") VALUES ("

    for _, value in data.items():
        if type(value) == int:
            query += f"{value}, "
        else:
            query += f"'{value}', "

    query = query[:-2] + ")"

    with connection:
        with connection.cursor(cursor_factory=extras.RealDictCursor) as cursor:
            cursor.execute(query)
            connection.commit()


def worker_list():
    query = "SELECT * FROM workers"

    data = []
    with connection:
        with connection.cursor(cursor_factory=extras.RealDictCursor) as cursor:
            cursor.execute(query)
            data = cursor.fetchall()

    return data


def registered_worker(request, type):
    query = f"""SELECT * FROM workers WHERE email = '{request.get("email")}'"""
    data = []
    with connection:
        with connection.cursor(cursor_factory=extras.RealDictCursor) as cursor:
            cursor.execute(query)
            data = cursor.fetchall()
    if len(data) == 0:
        return False, ""

    if type:
        return True, ""
    try:
        ph.verify(data[0].get("password"), request.get("password"))
        return True, data[0].get("fio")
    except:
        return False, ""


def add_user(data):
    query = f"INSERT INTO users ("
    for key, _ in data.items():
        query += f"{key}, "
    query = query[:-2] + ") VALUES ("

    for _, value in data.items():
        if type(value) == int:
            query += f"{value}, "
        else:
            query += f"'{value}', "

    query = query[:-2] + ")"

    with connection:
        with connection.cursor(cursor_factory=extras.RealDictCursor) as cursor:
            cursor.execute(query)
            connection.commit()


def registered_user(request):
    query = f"""SELECT * FROM users WHERE email = '{request.get("email")}'"""

    data = []
    with connection:
        with connection.cursor(cursor_factory=extras.RealDictCursor) as cursor:
            cursor.execute(query)
            data = cursor.fetchall()

    return len(data) != 0


def users_list():
    query = "SELECT * FROM users"

    data = []
    with connection:
        with connection.cursor(cursor_factory=extras.RealDictCursor) as cursor:
            cursor.execute(query)
            data = cursor.fetchall()

    return data


def get_mails(role, data):
    query = f"""SELECT * FROM mailing WHERE status = '{role}' AND {
        role} IN (SELECT id FROM workers WHERE email = '{data.get("email")}');"""

    data = []
    with connection:
        with connection.cursor(cursor_factory=extras.RealDictCursor) as cursor:
            cursor.execute(query)
            data = cursor.fetchall()

    return data


def add_mail(data):
    query = f"INSERT INTO mailing ("
    for key, _ in data.items():
        query += f"{key}, "
    query = query[:-2] + ") VALUES ("

    for _, value in data.items():
        if type(value) == int:
            query += f"{value}, "
        else:
            query += f"'{value}', "

    query = query[:-2] + ")"

    with connection:
        with connection.cursor(cursor_factory=extras.RealDictCursor) as cursor:
            cursor.execute(query)
            connection.commit()


def mails_list():
    query = "SELECT * FROM mailing"

    data = []
    with connection:
        with connection.cursor(cursor_factory=extras.RealDictCursor) as cursor:
            cursor.execute(query)
            data = cursor.fetchall()

    return data
