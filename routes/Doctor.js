const express = require('express');
const url = require('url');
const crypto = require('crypto');
const router  = express.Router();
const DoctorController = require('../controllers/Doctor');
const checkTime = require('../timestamp').checkTime;

router.post('/', (req, res, next) => {
    const oldhash = url.parse(req.url, true).query.hash;
    const time = url.parse(req.url, true).query.time;
    const fullUrl = req.protocol + 's'  + '://' + req.get('host') + req.originalUrl.split("?")[0];
    const newHash = crypto.createHash('sha512')
        .update(fullUrl+"prmsproject"+time,'latin1')
        .digest('hex');
    if(oldhash === newHash && checkTime(time)){
        DoctorController.getList(req, res);
    }
    else{
        res.end();
    }
});

router.get('/test', (req, res, next) => {
    console.log('test');
   DoctorController.getList(req, res);
});

router.post('/patients', (req, res, next) => {
    const oldhash = url.parse(req.url, true).query.hash;
    const time = url.parse(req.url, true).query.time;
    const fullUrl = req.protocol + 's'  + '://' + req.get('host') + req.originalUrl.split("&time")[0];
    const newHash = crypto.createHash('sha512')
        .update(fullUrl+"prmsproject"+time,'latin1')
        .digest('hex');
    if(oldhash === newHash && checkTime(time)){
        DoctorController.getPatientList(req, res);
    }
    else{
        res.end();
    }
});

router.post('/delete', (req, res, next) => {
    const newBody = {...req.body};
    delete newBody.hash;
    delete newBody.time;
    const fullUrl = req.protocol + 's'  + '://' + req.get('host') + req.originalUrl;
    const newHash = crypto.createHash('sha512')
        .update(fullUrl+JSON.stringify(newBody)+"prmsproject"+req.body.time,'latin1')
        .digest('hex');
    if(req.body.hash === newHash && checkTime(req.body.time)){
        DoctorController.deleteDoctor(req, res);
    }
    else{
        res.end();
    }
});

router.get('/:phone', (req, res, next) => {
    const phone = req.params.phone;
    const oldhash = url.parse(req.url, true).query.hash;
    const time = url.parse(req.url, true).query.time;
    const fullUrl = req.protocol + 's' + '://' + req.get('host') + req.originalUrl.split("?")[0];
    const newHash = crypto.createHash('sha512')
        .update(fullUrl+"prmsproject"+time,'latin1')
        .digest('hex');
    if(oldhash === newHash && checkTime(time)){
        DoctorController.checkNumber(req, res, phone);
    }
    else{
        res.status(500).json({oldhash:oldhash,newHash:newHash,url:fullUrl});
    }
});

router.post('/register', (req, res, next) => {
    const newBody = {...req.body};
    delete newBody.hash;
    delete newBody.time;
    const fullUrl = req.protocol + 's'  + '://' + req.get('host') + req.originalUrl;
    const newHash = crypto.createHash('sha512')
        .update(fullUrl+JSON.stringify(newBody)+"prmsproject"+req.body.time,'latin1')
        .digest('hex');
    if(req.body.hash === newHash && checkTime(req.body.time)){
        DoctorController.registerDoctor(req, res);
    }
    else{
        res.end();
    }
});

router.post('/login', (req, res, next) => {
    const newBody = {...req.body};
    delete newBody.hash;
    delete newBody.time;
    const fullUrl = req.protocol + 's'  + '://' + req.get('host') + req.originalUrl;
    const newHash = crypto.createHash('sha512')
        .update(fullUrl+JSON.stringify(newBody)+"prmsproject"+req.body.time,'latin1')
        .digest('hex');
    if(req.body.hash === newHash && checkTime(req.body.time)){
        DoctorController.loginDoctor(req, res);
    }
    else{
        res.end();
    }
});

module.exports = router;