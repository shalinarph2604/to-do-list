import { DataTypes, Model } from 'sequelize'
import sequelize from '../configs/sequelize'
import { User } from './User'

export interface Task {
  id?: number
  title: string
  brief: string | null
  category: string | null
  icon: string | null
  priority: 'low' | 'medium' | 'high'
  deadline: Date | null
  completed: boolean
  userId: number // 1 user memiliki banyak task, sementara 1 task hanya dimiliki oleh 1 user
  user?: User
  createdAt?: Date
  updatedAt?: Date
}

const TaskModel = sequelize.define<Model<Task>>('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brief: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium',
  },
  deadline: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // menyesuaikan dengan nama tabel di database
      key: 'id',
    },
  },
}, {
  tableName: 'tasks',
  timestamps: true, // membuat kolom createdAt dan updatedAt
  underscored: true,
})

export default TaskModel
