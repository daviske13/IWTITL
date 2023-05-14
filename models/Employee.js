const { Model, DataTypes } = require('sequelize');

const inquirer = require('inquirer');

class Employee extends Model {}

Employee.init(
{
        id: 
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        {
            type: DataTypes.STRING,
            allowNull: false
        },

    role_id:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'roles',
                key: 'id'
            }
        },

    manager_id: 
        {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'employees',
                key: 'id'
            }
        }
},

{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee'
}
);

module.exports = Employee;
