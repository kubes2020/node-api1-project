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






app.use('*', (req, res) => {
    res.status(404).json({ message: 'not found'})
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

