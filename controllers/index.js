const { User, Medical_Record } = require('../models')
const {Op} = require('sequelize')

class Controller {
    static async home (req, res) {
        try {
            const data = await User.findAll()
            res.render("home", {data})
        } catch (error) {
            res.send(error.message)
        }
    }
    static async medicalRecord (req, res) {
        try {
            const id = req.params.id
            const data = await Medical_Record.findByPk(id)
            res.render("medicalRecord", {data})
            // res.send(data)
        } catch (error) {
            res.send(error.message)
        }
    }
    static async medicalRecordAdd (req, res) {
        try {
            const { id } = req.params
            res.render("medicalRecordAdd", {id})
        } catch (error) {
            res.send(error.message)
        }
    }
    static async medicalRecordAddPost (req, res) {
        try {
            const id = req.params.id
            const {username, history, date, medicine} = req.body
            const user = await User.findAll({
                where : {
                    username
                }
            })
            // res.send(id)
            await Medical_Record.create({history, date, medicine})
        } catch (error) {
            res.send(error)
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
}

module.exports = Controller