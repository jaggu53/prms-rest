const sql = require('sequelize');

exports.doctor = {
    doc_phone: {
        type: sql.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    doc_name: {
        type: sql.DataTypes.STRING,
        allowNull: true
    },
    doc_fp1: {
        type: sql.DataTypes.TEXT,
        allowNull: false
    },
    doc_fp2: {
        type: sql.DataTypes.TEXT,
        allowNull: false
    },
    isAdmin: {
        type: sql.DataTypes.BOOLEAN,
        defaultValue: false
    }
};


