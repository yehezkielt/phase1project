const { User, Medical_Record } = require('../models')

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
    // static async medicalRecordAdd (req, res) {
    //     try {
            
    //         res.render("medicalRecordAdd")
    //         // res.send(data)
    //     } catch (error) {
    //         res.send(error.message)
    //     }
    // }

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