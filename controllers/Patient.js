const db = require('../db');
const path = require('path');
const fs = require('fs');
const url = require('url');
const upload = require('./FileUpload').upload;

exports.checkNumber = (req, res, phone) => {
    db.Patient.findAll({
        where:{
            patient_phone: phone
        }
    })
        .then(patients => {
            if(patients.length>0){
                res.status(200).json({value : true});
            }
            else {
                res.status(200).json({value : false});
            }

        })
        .catch(err => {
            res.status(err.status).json({
                message : err.message
            });
        });
};

exports.registerPatient = (req, res) => {
    db.Patient.findAll({
        where:{
            patient_phone: req.body.phone
        }
    })
        .then(patients => {
            if(patients.length>0){
                res.status(500).json({
                    message:"Phone number already registered."
                });
            }
            else{
                db.Doctor.findByPk(req.body.doc_id)
                    .then(doctor => {
                        doctor.getPatients().then(patient => {
                            assignedPatients = patient;
                        }).catch(err => {
                            console.log(err);
                        });
                        db.Patient.create({
                                patient_name: req.body.name,
                                patient_phone: req.body.phone,
                                patient_fp1: req.body.fp1,
                                patient_fp2: req.body.fp2,
                                reports_dir: '../reports/' + req.body.phone
                            })
                            .then(patient => {
                                assignedPatients.push(patient);
                                doctor.setPatients(assignedPatients);
                                fs.mkdir('./reports/'+req.body.phone, (err)=> {
                                   console.log(err);
                                });
                                res.status(201).json({
                                    result: true,
                                    ...patient.dataValues
                                });
                            })
                            .catch(err => {
                                console.log("create",err);
                                res.status(500).json({
                                    result: false,
                                    message: err
                                })
                            })
                    })
                    .catch(err => {
                        console.log("findbypk",err);
                        res.status(500).json({
                            result: false,
                            message: err
                        })
                    })
                // db.Patient.build({
                //     patient_name: req.body.name,
                //     patient_phone: req.body.phone,
                //     patient_fp1: req.body.fp1,
                //     patient_fp2: req.body.fp2,
                // })
                //     .save()
                //     .then(() => {
                //         fs.mkdir('./reports/'+req.body.phone, (err)=> {
                //            console.log(err);
                //         });
                //         res.status(201).json({
                //             result: true,
                //             patient_name: req.body.name,
                //             patient_phone: req.body.phone,
                //         });
                //     })
                //     .catch(err => {
                //         console.log(err);
                //         res.status(500).json({
                //             result: false,
                //             message: err
                //         });
                //     });
            }
        })
        .catch(err => {
            console.log("find",err);
            res.status(500).json({
                    result: false,
                    message: err
                }
            );

        });
};

exports.getReports = (req, res, phone) => {
    db.Patient.findOne({
        where:{
            patient_phone: phone
        }
    })
        .then(patient => {
            dir = './reports/'+patient.dataValues.patient_phone+'/';
            fs.readdir(dir, (err, files) => {
                // console.log(files.length);
                let result = [];
                files.forEach(file => {
                    result.push({
                        name: file,
                        //path: dir
                    });
                });
                res.status(200).json(result)
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                    message: err,
                }
            );
        });

    // fs.readdir(dir, (err, files) => {
    //     console.log(files.length);
    //     files.forEach(file => {
    //         console.log(file);
    //     });
    // });
    //res.sendFile(path.join(__dirname, dir, 'ic_fingerprint.png'));
};

exports.sendImage = (req, res, name) => {
    id = url.parse(req.url, true).query.id;
    console.log(id);
    rel_path='../reports/'+id;
    res.sendFile(path.join(__dirname, rel_path, name));
};

exports.saveImage = (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.status(500).json({message:"Uploading failed."});
        }
        return res.status(200).json({message:"Successfully uploaded."});
    })
};

exports.loginPatient = (req, res) => {
    db.Patient.findOne({
        where:{
            patient_phone: req.body.phone
        }
    })
        .then(patient => {
            res.status(200).json(patient.dataValues);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                    message: "Register first"
                }
            );
        });
};