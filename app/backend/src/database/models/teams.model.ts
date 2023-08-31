import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import db from './index';

class SequelizeTeams extends Model<InferAttributes<SequelizeTeams>,
InferCreationAttributes<SequelizeTeams>> {
  declare id: number;

  declare teamName: string;
}

SequelizeTeams.init(
  {
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
    },
  },
  {
    sequelize: db,
    underscored: true,
    modelName: 'teams',
    timestamps: false,
  },
);

export default SequelizeTeams;
