const express = require('express')
const app = express()

const data = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(data)
})

app.get('/info', (request, response) => {
    const currentDate = new Date()
    response.send(`<p>Phonebook has info for 2 people <br/> ${currentDate}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const phonebookEntry = data.find(entry => id === entry.id)

    phonebookEntry ? response.json(phonebookEntry) : response.status(404).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})