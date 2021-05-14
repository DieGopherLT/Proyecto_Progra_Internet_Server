import db from '../config/db';
import { Model, ModelCtor, DataTypes, Optional } from 'sequelize';

export interface StudentAttributes {
    code: string;
    name: string;
    university: string;
    career: string;
    profilePicture: string;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, 'profilePicture'> {}

export interface StudentInstance extends Model<StudentAttributes, StudentCreationAttributes>, StudentAttributes {}

const Student: ModelCtor<StudentInstance> = db.define<StudentInstance>('student', {
    code: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    university: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    career: {
        type: DataTypes.STRING(4),
        allowNull: false
    },
    profilePicture: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: ''
    }
}, {
    timestamps: false
});

export default Student;
