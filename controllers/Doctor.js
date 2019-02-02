const db = require('../db');
const url = require('url');

exports.getList = (req, res) => {
    db.Doctor.findAll()
        .then(doctors => {
            // const r=[];
            // for(let i=0;i<test.length;i++)
            // {
            //     r.push(test[i].dataValues)
            // }
            // console.log(test);
            res.status(200).json(doctors);
        })
        .catch(err => {
            res.status(err.status).json({
                message : err.message
            });
        });
};

exports.checkNumber = (req, res, phone) => {
    db.Doctor.findAll({
        where:{
            doc_phone: phone
        }
    })
        .then(doctors => {
            if(doctors.length>0){
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

exports.registerDoctor = (req, res) => {
    db.Doctor.findAll({
        where:{
            doc_phone: req.body.phone
        }
    })
        .then(doctors => {
            console.log(doctors.length);
            if(doctors.length>0){
                res.status(500).json({
                    result: false,
                    message:"Phone number already registered."
                });
            }
            else{
                db.Doctor.build({
                    doc_name: req.body.name,
                    doc_phone: req.body.phone,
                    doc_fp1: req.body.fp1,
                    doc_fp2: req.body.fp2,
                    isAdmin: req.body.admin
                })
                    .save()
                    .then(() => {
                        db.Doctor.findOne({
                            where:{
                                doc_phone: req.body.phone
                            }
                        })
                            .then(doctor => {
                                res.status(201).json({
                                    result: true,
                                    ...doctor.dataValues
                                });
                            });
                        // res.status(201).json({
                        //     result: true,
                        //     doc_name: req.body.name,
                        //     doc_phone: req.body.phone,
                        //     doc_id: id
                        // });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            result: false,
                            message: err
                        });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                    message: err
                }
            );

        });
};

exports.deleteDoctor = (req, res) => {
    db.Doctor.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(
            res.status(200).json({result: true})
        )
        .catch(err => {
            res.status(err.status).json({value : false,
                error: err.message});
        })
};

exports.loginDoctor = (req, res) => {
    db.Doctor.findOne({
        where:{
            doc_phone: req.body.phone
        }
    })
        .then(doctor => {
            res.status(200).json(doctor.dataValues);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                    message: "Register first"
                }
            );
        });
};

exports.getPatientList = (req, res) => {
    id = url.parse(req.url, true).query.id;
    db.Doctor.findByPk(id)
        .then(doctor => {
            doctor.getPatients()
                .then(patients => {
                    res.status(200).json(patients)
                })
                .catch(err => {
                    res.status(500).json({
                        err:err
                    })
                });
        })
        .catch(err => {
            res.status(500).json({
                err:err
            })
        })
};