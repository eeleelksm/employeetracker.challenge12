DROP TABLE IF EXISTS departments;
-- DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;

CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- CREATE TABLE employees (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   role_id INTEGER,
-- );

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL(8,2),
  department_id INT,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) 
);