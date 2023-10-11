create database Commerce;
use Commerce;
​
CREATE TABLE Products (
    id INT AUTO_INCREMENT NOT NULL,
    Nombre VARCHAR(50),
    Price DECIMAL(10 , 2 ),
    Categorie VARCHAR(50),
    PRIMARY KEY (id)
);
CREATE TABLE Users (
    id INT AUTO_INCREMENT NOT NULL,
    isAdmin BOOLEAN,
    Name VARCHAR(30),
    Surname VARCHAR(30),
    Email VARCHAR(30),
    Address VARCHAR(30),
    Password VARCHAR(70),
    Telephone VARCHAR(10),
    PRIMARY KEY (id)
);
CREATE TABLE Orders (
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT,
    total_price DECIMAL(10, 2),
    shipping_type ENUM('retiro por el local', 'envío a domicilio'),
    shipping_address VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
CREATE TABLE OrderDetails (
    id INT AUTO_INCREMENT NOT NULL,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);
​
INSERT INTO Users (isAdmin, Name, Surname, Email, Address, Password, Telephone)
VALUES (1, 'Nacho', 'Vasconcellos', 'nachovasconcellos@gmail.com', 'B° Sta Lucia Calle 12 y 11', '$2b$12$LkITKMogMP8HvrkdnGxuw.LqGorFhVjVDOXImYBep7qD0ZouyUhNK', '3874829929');

