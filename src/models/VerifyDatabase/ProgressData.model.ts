import verifyDb from '../../config/database/verifyDb';
import { Model, ModelCtor, DataTypes, Optional } from 'sequelize';

export interface ProgressDataAttributes{
    id: number | string;
    code: string;
    name: string;
    image: string;
    time: string;
    distance: string;
}

interface ProgressDataCreationAttributes extends Optional<ProgressDataAttributes, 'id'> {}

export interface ProgressDataInstance extends Model<ProgressDataAttributes, ProgressDataCreationAttributes>,
    ProgressDataAttributes {}

const ProgressData: ModelCtor<ProgressDataInstance> = verifyDb.define('progress', {
    id: {
        type: DataTypes.INTEGER({ length: 5 }),
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    distance: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
},
    {
        timestamps: false,
        freezeTableName: true
    }
);

export default ProgressData;
