const { User, Medical_Record, Disease, User_Detail } = require('../models')
const {Op} = require('sequelize')
const dateFormat = require('../helpers/helper')

class Controller {
    static async home (req, res) {
        try {
            const {search} = req.query
            let option = {
                include :{
                    model : Medical_Record
                },
                where : {}
            }
            if(search){
                option.where = {
                    username :{
                        [Op.iLike] : `%${search}%`
                    }
                }
            }
            const data = await User.findAll(option)
            // res.send({data})
            res.render("home", {data})
        } catch (error) {
            res.send(error.message)
        }
    }
    static async medicalRecord (req, res) {
        try {
            let { msg } = req.query;
            if (!msg) msg = "";
            const id = req.params.id
            const data = await Medical_Record.findAll({where : { UserId : id}})
            const total = await Medical_Record.summary()
            res.render("medicalRecord", {data, id, dateFormat, msg, total})
            // res.send({data})
        } catch (error) {
            res.send(error.message)
        }
    }
    static async medicalRecordAdd (req, res) {
        try {
            let {errors} = req.query
            if(!errors) {
                errors = []
            }else{
                errors = errors.split(",")
            }
            const { userId } = req.params
            // ambil dta deas
            const disease = await Disease.findAll()
            // res.send({disease})
            res.render("medicalRecordAdd", {userId, disease, errors})
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }
    static async medicalRecordAddPost (req, res) {
        try {
            const { userId } = req.params
            const {history, date, medicine, DiseasesId} = req.body
            await Medical_Record.create({history, date, medicine, UserId: userId, DiseasesId })
            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    }
    static async medicalRecordEdit (req, res) {
        try {
            let {errors} = req.query
            if(!errors) {
                errors = []
            }else{
                errors = errors.split(",")
            }
            const { userId } = req.params
            // ambil dta deas
            const disease = await Disease.findAll()
            const data = await Medical_Record.findAll({
                where : {
                    UserId : userId
                }
            })
            // res.send({data})
            res.render("medicalRecordEdit", {data, userId, disease})
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }
    static async medicalRecordEditPost (req, res) {
        const { userId } = req.params
        try {
            const {history, medicine} = req.body
            // ambil dta deas
            // const disease = await Disease.findAll()
            await Medical_Record.update({history, medicine},{
                where : {
                    UserId : userId
                }
            })
            res.redirect('/')
            // res.send({data})
            // res.render("medicalRecordEdit", {data, userId, disease})
        } catch (error) {
            if(error.name === 'SequelizeDatabaseError'){
                const error = error.errors.map((el)=> el.message)
                res.redirect(`/medical_record/${userId}/edit?errors=${error}`)
            }
            console.log(error);
            res.send(error.message)
        }
    }
    static async medicalRecordDelete (req, res) {
        try {
            const { userId } = req.params
            await Medical_Record.destroy({
                where : {
                    UserId : userId
                }
            })
            const data = User.findAll({
                where: {
                    id : userId
                }
            })
            res.redirect(`/medical_record/${userId}?msg= medical record on ${data.username} Has Been Deleted`)
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async login (req,res){
        try {
            res.render('loginPage')
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }

    static async registerForm (req, res){
        try {
            res.render('registerPage')
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }

    static async registerProcess (req, res){
        try {
            const {username, email, password, role} = req.body
            User.create({
                
            })
            res.redirect('/login')
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
}

module.exports = Controller

