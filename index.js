const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
let users = [{ id: 1, firstName: 'jack', lastName: 'michel' }]
let i = 2
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/user', (req, res) => {
    res.send(users)
})
app.post('/user', (req, res) => {
    let sendedUser = {id : i, firstName : req.body.firstName, lastName : req.body.lastName }
    i++
    users.push(sendedUser)
    res.sendStatus(201)
})

app.get('/user/:firstName', (req, res) => {
    let found = false
    for (let user of users) {
        if (user.firstName == req.params.firstName){
            res.send(user)
            found = true
        }
    }
    if (!found) {
        res.sendStatus(404)
    }
})

app.put('/user/:firstName', (req, res) => {
    let found = false
/*    const foundUser = users.find((user) => user.firstName === req.params.firstName);

    foundUser.firstName = req.body.firstName
    foundUser.lastName = req.body.lastName*/

    for (let user of users) {
        if (user.firstName == req.params.firstName){
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            res.sendStatus(201);
            found = true;
        }
    }
    if (!found) {
        res.sendStatus(404)
    }
})

app.delete('/user/:firstName', (req, res) => {
    let found = false
    for (let user of users) {

        if (user.firstName == req.params.firstName){
            console.log(user.id-1)
            users.splice(user.id-1,1)
            res.sendStatus(201);
            found = true
        }
    }
    if (!found) {
        res.sendStatus(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
