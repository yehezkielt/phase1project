const express = require('express')
const helmet = require('helmet')
const app = express()
const port = 3000
const session = require('express-session')
const Controller = require('./controllers')

app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true 
  }
}))
app.use(helmet())
app.set('view engine', 'ejs')



app.get('/register', Controller.registerForm)
app.post('/register', Controller.registerProcess)

app.get('/login', Controller.loginForm)
app.post('/login', Controller.loginProcess)

app.use(function(req, res, next){
  if(!req.session.userId){
    const error = 'Please login first'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
})

app.get('/logout', Controller.logout)

app.get('/', Controller.home)
app.get('/medical_record/:id', Controller.medicalRecord)
app.get('/medical_record/:userId/add', Controller.medicalRecordAdd)
app.post('/medical_record/:userId/add', Controller.medicalRecordAddPost)
app.get('/medical_record/:userId/edit', Controller.medicalRecordEdit)
app.post('/medical_record/:userId/edit', Controller.medicalRecordEditPost)
app.get('/medical_record/:userId/delete', Controller.medicalRecordDelete)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})