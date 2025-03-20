import { DataTypes, Model } from 'sequelize'
import sequelize from '../configs/sequelize'

// Define interface for UserPrivilege
export interface UserPrivilege {
  id?: number
  name: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
}

// Define UserPrivilege Model
const UserPrivilegeModel = sequelize.define<Model<UserPrivilege>>('UserPrivilege', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'user_privileges',
  timestamps: true,
  underscored: true,
})

export default UserPrivilegeModel
