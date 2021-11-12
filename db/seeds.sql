INSERT INTO departments (name)
VALUES
  ("Human Resources"),
  ("Editorial"),
  ("Accounting"),
  ("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES
  ("Payroll Director", 125000, 1),
  ("Accountant", 100000, 3),
  ("Stylist", 120000, 2),
  ("PR Assistant", 75000, 4),
  ("PR Lead", 120000, 4),
  ("Editor-In-Chief", 250000, 2),
  ("Junior Editor", 95000, 2);

INSERT INTO employees (first_name, last_name, role_id)
VALUES
  ('Monica', 'Bellucci', 6),
  ('Rebecca', 'Johnson', 1),
  ('John', 'Dryden', 2),
  ('Alexander', 'Poppins', 7),
  ('Lionel', 'Rivers', 4),
  ('Aubrey', 'Hepburn', 3),
  ('Tulse', 'Luper', 4),
  ('Jonathan', 'Morris', 7),
  ('George', 'Shaw', 5),
  ('Amanda', 'Bennett', 2);

UPDATE employees
SET employees.manager_id = 1
WHERE employees.role_id = 3 OR employees.role_id = 7;

UPDATE employees
SET employees.manager_id = 9
WHERE employees.role_id = 4;