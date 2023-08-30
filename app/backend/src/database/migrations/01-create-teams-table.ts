import { Model, DataTypes, QueryInterface } from "sequelize"
import { Teams } from '../../Interfaces/teams.interface'

export default {
    up(queryInterface: QueryInterface) {
        return queryInterface.createTable<Model<Teams>>('teams',{
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            teamName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'team_name',
            }
        })
    },
    down(queryInterface: QueryInterface) {
        return queryInterface.dropTable('teams')
    },
}