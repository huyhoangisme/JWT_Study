'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DoctorInfo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            DoctorInfo.belongsTo(models.User, { as: 'DoctorInfo' });
            DoctorInfo.belongsTo(models.Clinic);
            DoctorInfo.belongsTo(models.Allcode, { foreignKey: 'price', targetKey: 'keyMap', as: 'priceData' });
            DoctorInfo.belongsTo(models.Allcode, { foreignKey: 'paycash', targetKey: 'keyMap', as: 'paymentData' });
            DoctorInfo.belongsTo(models.Specialty, { foreignKey: 'specialityID', as: 'specialityData' })
        }
    };
    DoctorInfo.init({
        price: DataTypes.STRING,
        address: DataTypes.STRING,
        clinicID: DataTypes.INTEGER,
        specialityID: DataTypes.INTEGER,
        doctorId: DataTypes.INTEGER,
        paycash: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'DoctorInfo',
    });
    return DoctorInfo;
};