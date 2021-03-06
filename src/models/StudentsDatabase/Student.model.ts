import studentsDb from '../../config/database/studentsDb';
import { Model, ModelCtor, DataTypes, Optional } from 'sequelize';

export interface StudentAttributes {
    id: number;
    Codigo: string;
    Nombre: string;
    imagen: string;
    Tiempo: string;
    Distancia: string;
    fecha: string;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, 'id' | 'imagen' | 'Tiempo' | 'Distancia' | 'fecha'> {}

export interface StudentInstance extends Model<StudentAttributes, StudentCreationAttributes>, StudentAttributes {}

const Student: ModelCtor<StudentInstance> = studentsDb.define<StudentInstance>(process.env.STUDENT_TABLE || 'carrera', {
    id: {
        type: DataTypes.INTEGER({ length: 11 }),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Codigo: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'https://dcc2.000webhostapp.com/imagenes/avatar.png'
    },
    Tiempo: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: '0'
    },
    Distancia: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: '0'
    },
    fecha: {
        type: DataTypes.STRING(10),
        defaultValue: '27-06-2021'
    }
},{
    timestamps: false,
    freezeTableName: true,
});

export default Student;
