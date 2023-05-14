INSERT INTO department (id, name)
VALUES 
    (1, "Customer Service"),
    (2, "Legal"),
    (3, "Finance"),
    (4, "Engineering");

INSERT INTO role (id, title, salary, department_id)
VALUES 
    (1, "Lead CSR", 100000, 1),
    (2, "CSR", 80000, 1),
    (3, "Junior Engineer", 150000, 4),
    (4, "Software Engineer", 120000, 4),
    (5, "Manager", 160000, 3),
    (6, "Accountant", 125000, 3),
    (7, "Legal Team Lead", 250000, 2),
    (8, "Lawyer", 190000, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
    (1, "Emily", "Doe", 1, NULL),
    (2, "Mary", "Smith", 2, 1),
    (3, "Kai", "Brown", 3, NULL),
    (4, "Katie", "Johnson", 4, 3),
    (5, "Wanda", "Garcia", 5, NULL),
    (6, "Bonnie", "Lee", 6, 5),
    (7, "Ron", "Davis", 7, NULL),
    (8, "Murphy", "Williams", 8, 7);
