import { Model, DataTypes, QueryInterface } from "sequelize";
import { User } from "../../Interfaces/user.interface";

export default {
    up(queryInterface: QueryInterface) {
        return queryInterface.createTable<Model<User>>('users', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        });
    },
    down(queryInterface: QueryInterface) {
        queryInterface.dropTable('users');
    },
}