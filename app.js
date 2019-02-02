const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const DoctorRoutes = require('./routes/Doctor');
const PatientRoutes = require('./routes/Patient');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});*/

app.use('/doctor', DoctorRoutes);
app.use('/patient', PatientRoutes);

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});


app.use((req, res, next) => {
    const err = new Error('Not Found!');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        err : {
            message: err.message
        }
    });
});

// module.exports = app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});