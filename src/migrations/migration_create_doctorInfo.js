"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("doctorinfos", {
            // key: DataTypes.STRING,
            // type: DataTypes.STRING,
            // valueVi: DataTypes.STRING,
            // valueEn: DataTypes.STRING,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            price: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            clinicID: {
                type: Sequelize.INTEGER,
            },
            specialityID: {
                type: Sequelize.INTEGER,
            },
            doctorId: {
                type: Sequelize.INTEGER,
            },
            paycash: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("doctorinfos");
    },
};
