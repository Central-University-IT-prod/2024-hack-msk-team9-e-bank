command = """
DROP TABLE IF EXISTS user_groups;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS mailing;
DROP TABLE IF EXISTS workers;

CREATE TABLE IF NOT EXISTS workers (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password TEXT,
    fio TEXT,
    role TEXT
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT
);

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    group_name TEXT
);

CREATE TABLE IF NOT EXISTS user_groups (
    user_id INT,
    group_id INT,
    PRIMARY KEY (user_id, group_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (group_id) REFERENCES groups(id)
);

CREATE TABLE IF NOT EXISTS mailing (
    id SERIAL PRIMARY KEY,
    theme TEXT,
    target TEXT,
    community TEXT,
    template TEXT,
    status TEXT,
    analyst INT,
    product INT,
    editor INT,
    main_editor INT,
    marketolog INT,

    FOREIGN KEY (analyst) REFERENCES workers (id),
    FOREIGN KEY (product) REFERENCES workers (id),
    FOREIGN KEY (editor) REFERENCES workers (id),
    FOREIGN KEY (main_editor) REFERENCES workers (id),
    FOREIGN KEY (marketolog) REFERENCES workers (id)
);
"""
