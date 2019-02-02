const sql = require('sequelize');
const dbConfig = require('./dbConfig').mysqlConfig;
// const dbConfig = require('./dbConfig').mssqlConfig;


const doctor = require('./models/Doctor').doctor;
const patient = require('./models/Patient').patient;

// const conn = new sql.Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
//     dialect: 'mssql',
//     host: dbConfig.server,
//     port: dbConfig.port,
//     dialectOptions: {
//         encrypt: true
//     }
// });

//const conn = new sql.Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
//    dialect: 'mysql',
//    host: dbConfig.host,
//    port: dbConfig.port
//});

const conn = new sql.Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
     dialect: 'mysql',
	 host: dbConfig.host,
     //port: dbConfig.port,
     dialectOptions: {
         socketPath: '/cloudsql/prms-rest:asia-south1:prms-db-micro'
     }
 });

const Doctor = conn.define('Doctor', doctor);
const Patient = conn.define('Patient', patient);
Doctor.hasMany(Patient);

// const Patient = conn.define('Patient', patient);
// Patient.associate = models => {
//     Doctor.hasMany(Patient);
//     Order.belongsTo(models.Customer);
// };

// exports.Test = conn.define('test',{
//     name: sql.DataTypes.STRING,
//     password: sql.DataTypes.STRING,
//     },
//     {
//         freezeTableName:true,
//         timestamps: false
//     }
//     );

conn.sync()
    .then(() => {
        console.log("Sync successful")
    })
    .catch(err => {
        console.log("err "+err)
    });

module.exports = {
    Doctor: Doctor,
    Patient: Patient,
};

/*exports.ExecuteSql = (sqlQuery, callback) => {
    let conn = new sql.ConnectionPool(dbConfig);

    conn.connect()
        .then(() => {
            const request = new sql.Request(conn);
            request.query(sqlQuery)
                .then(result => {
                    callback(result.recordset);
                })
                .catch(err => {
                    console.log(err);
                    callback(null, err);
                });
        })
        .catch(err => {
            console.log(err);
            callback(null, err);
        });
};*/