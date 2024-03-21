const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controllers')

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', Controller.home)

app.get('/register', Controller.registerForm)
app.post('/register', Controller.registerProcess)

app.get('/login', Controller.login)
app.get('/medical_record/:id', Controller.medicalRecord)
app.get('/medical_record/:userId/add', Controller.medicalRecordAdd)
app.post('/medical_record/:userId/add', Controller.medicalRecordAddPost)
app.get('/medical_record/:userId/edit', Controller.medicalRecordEdit)
app.post('/medical_record/:userId/edit', Controller.medicalRecordEditPost)
app.get('/medical_record/:userId/delete', Controller.medicalRecordDelete)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})