import { DataTypes, Model } from 'sequelize'
import sequelize from '../configs/sequelize'

// Define the attributes interface
export interface UserAttributes {
  id?: number
  email: string
  name: string
  password: string
  created_at?: Date
  updated_at?: Date
}

const User = sequelize.define<Model<UserAttributes>>('User', {
  id: {
    type: DataTypes.INTEGER, // INTEGER => SERIAL, BIGINT => BIGSERIAL
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(50), // VARCHAR(50)
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.TEXT('tiny'), // TINYTEXT maksimal 255 karakter
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING, // VARCHAR(255)
    allowNull: false,
  },
}, {
  // Opsi model
  tableName: 'users', // nama tabel di database
  timestamps: true, // membuat kolom createdAt dan updatedAt
  underscored: true, // menggunakan snake_case untuk nama kolom
})

export default User
