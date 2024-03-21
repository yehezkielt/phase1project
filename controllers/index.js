const { User, Medical_Record } = require('../models')
const bcrypt = require('bcryptjs')

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

    static async loginForm (req,res){
        try {
            const{error} = req.query
            res.render('loginPage', {error})
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }

    static async loginProcess (req,res){
        try {
            const {email, password} = req.body

            User.findOne({ where: {email} })
            .then(user =>{
                if(user){
                    const isValidPassword = bcrypt.compareSync(password, user.password)

                    if(isValidPassword) {
                        req.session.userId = user.id
                        return res.redirect('/')
                    } else {
                        const error = 'invalid email or password'
                        return res.redirect(`login/?error=${error}`)
                    }
                } else {
                        const error = 'invalid email or password'
                        return res.redirect(`login/?error=${error}`)   
                }
            })
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
            await User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            })
            res.redirect('/login')
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }

    static async logout (req, res){
        req.session.destroy((err) =>{
            if (err) res.send(err)
            else {
                res.redirect('/login')
            }
        })
    }
}

module.exports = Controller