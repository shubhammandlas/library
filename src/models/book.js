const {BookType} = require('../commons/enums')
const { Sequelize } = require('sequelize');


'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    type: Sequelize.ENUM(Object.keys(BookType)),
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};

