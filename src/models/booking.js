'use strict';
const { INTEGER } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    userId: {
      type:DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
    bookId:{
      type:DataTypes.INTEGER,
      references: {
        model: "Book",
        key: "id",
      },
    },
    status:DataTypes.STRING,
    quantity:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Booking',
  }, {
    indexes:[
      {
        unique: true,
        fields: ['userId', 'bookId']
      }
    ]
  }
  );
  return Booking;
};