'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notebook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Todo, User}) {
      this.hasMany(Todo, { foreignKey: 'notebook_id',onDelete: 'CASCADE'})
      this.belongsTo(User, { foreignKey: 'user_id'})
    }
  }
  Notebook.init({
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notebook',
  });
  return Notebook;
};