const express = require('express')

const generate = require('shortid').generate

const app = express()
app.use(express.json())

const PORT = 6000

// fake data
let users = [
    {
        id: generate(),
        name: "Jane",
        bio: "hey"
    }
]

//add users
app.post('/api/users', (req, res) => {
    const { name, bio } = req.body
   try { 
    if (!name || !bio) {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    } else {
        const newUser = { id: generate(), name, bio }
        users.push(newUser)
        res.status(201).json(newUser)
    }
   }
   catch (error) {
       res.status(500).json({ errorMessage: "There was an error while saving the user to the database"})
   }
})

//get all users
app.get('/api/users', (req, res) => {
    try{
        res.status(200).json(users)
    }
    catch (error){
    res.status(500).json({errorMessage: "The users information could not be retrieved."})
    }
})

//get one user with id
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    const user = users.find(user => user.id === id)
    try{
        if (!user) {
            res.status(404).json({message: 'user not found'})
        } else {
            res.status(200).json(user)
        }
    }
    catch (error) {
        res.status(500).json({message: 'server error'})
    }
})



app.use('*', (req, res) => {
    res.status(404).json({ message: 'not found'})
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

