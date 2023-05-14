-- DROP DATABASE
DROP DATABASE IF EXISTS employee_db;

-- CREATE DATABASE
CREATE DATABASE employee_db;

-- USE DATABASE
USE employee_db;

-- DEPARTMENT TABLE
CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);

-- ROLE TABLE
CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

-- MANAGER TABLE
CREATE TABLE manager (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

-- EMPLOYEE TABLE
CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES manager(id) ON DELETE SET NULL
);
