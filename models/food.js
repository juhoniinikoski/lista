import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'

export class Food extends Model {}

Food.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.TEXT
  },
  weekday: {
    type: DataTypes.BOOLEAN
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'food'
})

Food.sync()