import { DataTypes, Model } from 'sequelize'
import sequelize from '../configs/sequelize'
import { UserPrivilege } from './UserPrivilege'

// definisikan interface User,
// interface ini yang akan digunakan oleh Service
export interface User {
  id?: number
  email: string
  name: string
  password: string

  privilegeId?: number // 1 privilege menampung banyak user, sementara 1 user hanya memiliki 1 privilege
  createdAt?: Date
  updatedAt?: Date

  privilege?: UserPrivilege
}

// Definisikan Model, model ini akan digunakan hanya pada repository saja
const UserModel = sequelize.define<Model<User>>('User', {
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
  privilegeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user_privileges', // Reference the table name
      key: 'id',
    },
    defaultValue: 1, // Default privilege ID (e.g., regular user)
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
  defaultScope: { // default scope akan digunakan ketika Model dipanggil
    attributes: {
      exclude: ['password'], // attribute 'password' dikecualikan agar tidak tampil pada response
    },
  },
  scopes: { // scope adalah 'ruang lingkup' yang hanya akan digunakan ketika method .scope dipanggil di Model
    allAttributes: {}, // cara pemanggilan scope 'allAttributes' yakni `UserModel.scope('allAttributes').`
    onlyEmailPassword: { // cara pemanggilan yakni `UserModel.scope('onlyEmailPassword').`
      attributes: {
        include: ['email', 'password'], // kolom yang didapatkan hanya email dan password saja
      },
    },
  },
})

export default UserModel
