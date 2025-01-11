CREATE TABLE USER (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    refresh_token VARCHAR(255)
);

INSERT INTO USER (name, username, password, email) VALUES ('John Doe', 'john_doe', 'password', 'test@gmail.com');
