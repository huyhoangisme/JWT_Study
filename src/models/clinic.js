'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Clinic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Clinic.hasOne(models.DoctorInfo, { foreignKey: 'clinicID' });
        }
    };
    Clinic.init({
        address: DataTypes.STRING,
        contentMarkdown: DataTypes.TEXT,
        contentHTML: DataTypes.TEXT,
        image: DataTypes.BLOB,
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Clinic',
    });
    return Clinic;
};