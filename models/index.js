const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydatabase'
});

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database: ' + error.stack);
        return;
    }

    console.log('Connected to the database.');
});

// start the application
function startApp() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
        ],
    })

    .then(answer => {
        switch (answer.action) {
            case 'View all departments':
                viewAllDepartments();

                break;

            case 'View all roles':
                viewAllRoles();

                break;

            case 'View all employees':
                viewAllEmployees();

                break;

            case 'Add a department':
                addDepartment();

                break;

            case 'Add a role':
                addRole();

                break;

            case 'Add an employee':
                addEmployee();

                break;

            case 'Update an employee role':
                updateEmployeeRole();

                break;

            case 'Exit':
                connection.end();
                console.log('Goodbye!');

                break;
        }
    });
}

// function to view all departments
function viewAllDepartments() {
    connection.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// function to view all roles
function viewAllRoles() {
    connection.query('SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// function to view all employees
function viewAllEmployees() {
    connection.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, departments.name AS department, roles.salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS managers ON employees.manager_id = managers.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// function to add a department
function addDepartment() {
    inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department:',
    })

    .then(answer => {
        connection.query('INSERT INTO departments SET ?', { name: answer.name }, (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} department added!\n`);
            startApp();
        });
    });
}

// function to add a role
function addRole() {
    connection.query('SELECT * FROM departments', (err, departments) => {
        if (err) throw err;
        inquirer
        .prompt([

        {
            name: 'title',
            type: 'input',
            message: 'Enter the title of the role:',
        },

        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary of the role:',
        },

        {
            name: 'department',
            type: 'list',
            message: 'Select the department for the role:',
            choices: departments.map((department) => 
            
            ({
                name: department.name,
                value: department.id,
            })),

        },
        ])

    .then((answer) => {
        const query = 'INSERT INTO roles SET ?';
            connection.query(
            query,

                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department,
                },

                (err, res) => {
                    if (err) throw err;
                        console.log(`${res.affectedRows} role added!\n`);
                            startApp();
                }
            );
        });
    });
};