const express = require('express');
const router  = express.Router();
const url = require('url');
const PatientController = require('../controllers/Patient');
const crypto = require('crypto');
const checkTime = require('../timestamp').checkTime;

router.get('/image/:name', (req, res, next) => {
    const name = req.params.name;
    const oldhash = url.parse(req.url, true).query.hash;
    const time = url.parse(req.url, true).query.time;
    const fullUrl = req.protocol + 's'  + '://' + req.get('host') + req.originalUrl.split("&time")[0];
    // const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split("&time")[0];
    const newHash = crypto.createHash('sha512')
        .update(fullUrl+"prmsproject"+time,'latin1')
        .digest('hex');
    if(oldhash === newHash && checkTime(time)){
        PatientController.sendImage(req, res, name);
    }
    else{
        res.status(401).end();
    }
});

router.post('/reports/:phone', (req, res, next) => {
    const id = req.params.phone;
    const oldhash = url.parse(req.url, true).query.hash;
    const time = url.parse(req.url, true).query.time;
    const fullUrl = req.protocol + 's'  + '://' + req.get('host') + req.originalUrl.split("?")[0];
    // const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split("?")[0];
    const newHash = crypto.createHash('sha512')
        .update(fullUrl+"prmsproject"+time,'latin1')
        .digest('hex');
    if(oldhash === newHash && checkTime(time)){
        PatientController.getReports(req, res, id);
    }
    else{
        res.status(401).end();
    }
});

router.post('/uploadimage', (req, res, next) => {
    const oldhash = url.parse(req.url, true).query.hash;
    const time = url.parse(req.url, true).query.time;
    const fullUrl = req.protocol + 's'  + '://' + req.get('host') + req.originalUrl.split("?")[0];
    // const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split("?")[0];
    console.log(fullUrl)
    const newHash = crypto.createHash('sha512')
        .update(fullUrl+"prmsproject"+time,'latin1')
        .digest('hex');
    console.log(time);
    if(oldhash === newHash && checkTime(time)){
        PatientController.saveImage(req, res);
    }
    else{
        console.log("image fail");
        res.end();
    }
});


router.get('/:phone', (req, res, next) => {
    const phone = req.params.phone;
    const oldhash = url.parse(req.url, true).query.hash;
    const time = url.parse(req.url, true).query.time;
    const fullUrl = req.protocol + 's'  + '://' + req.get('host') + req.originalUrl.split("?")[0];
    // const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split("?")[0];
    const newHash = crypto.createHash('sha512')
        .update(fullUrl+"prmsproject"+time,'latin1')
        .digest('hex');
    if(oldhash === newHash && checkTime(time)){
        PatientController.checkNumber(req, res, phone);
    }
    else{
        res.status(401).end();
    }
});

router.post('/register', (req, res, next) => {
    const newBody = {...req.body};
    delete newBody.hash;
    delete newBody.time;
    // delete newBody.prehash;
    const fullUrl = req.protocol + 's'  + '://' + req.get('host') + req.originalUrl;
    // const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // console.log(fullUrl+JSON.stringify(newBody)+"prmsproject");
    // console.log(req.body.prehash);
    const newHash = crypto.createHash('sha512')
        .update(fullUrl+JSON.stringify(newBody)+"prmsproject"+req.body.time,'latin1')
        .digest('hex');
    // console.log("newhash",newHash);
    // console.log("oldhash",req.body.hash);
    // console.log(time);
    if(req.body.hash === newHash && checkTime(req.body.time)){
        PatientController.registerPatient(req, res);
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
    // const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const newHash = crypto.createHash('sha512')
        .update(fullUrl+JSON.stringify(newBody)+"prmsproject"+req.body.time,'latin1')
        .digest('hex');
    if(req.body.hash === newHash && checkTime(req.body.time)){
        console.log("inside");
        PatientController.loginPatient(req, res);
    }
    else{
        res.end();
    }
});

module.exports = router;