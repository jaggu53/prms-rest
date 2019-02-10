exports.mssqlConfig = {
    user: 'rpatil',
    password: '64Rajpatil',
    server: 'prms.database.windows.net',
    database: 'prms',
    port: 1433,
    options:
        {
            encrypt: true,
        }
};

// exports.mysqlConfig = {
//     user: 'root',
//     password: '',
//     host: 'localhost',
//     database: 'prms',
//     port: 3306,
// };

exports.mysqlConfig = {
    user: 'root',
    password: 'root',
    host: '/cloudsql/prms-rest:asia-south1:prms-db-micro',
    database: 'prms',
    port: 3306,
};

// prms-rest:asia-south1:prms-db-micro
