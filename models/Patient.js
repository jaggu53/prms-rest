const sql = require('sequelize');

exports.patient = {
    patient_phone: {
        type: sql.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    patient_name: {
        type: sql.DataTypes.STRING,
        allowNull: true
    },
    patient_fp1: {
        type: sql.DataTypes.TEXT,
        allowNull: false
    },
    patient_fp2: {
        type: sql.DataTypes.TEXT,
        allowNull: false
    },
    reports_dir:{
        type: sql.DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
};
