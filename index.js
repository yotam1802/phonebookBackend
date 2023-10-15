const express = require('express')
var morgan = require('morgan')

const app = express()

app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let data = [
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

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const phonebookEntry = data.find(entry => id === entry.id)

    if (phonebookEntry) {
        data = data.filter(entry => entry.id !== id)
        return response.status(204).end()
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const maxId = data.length > 0 ? Math.max(...data.map(p => p.id)) : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const existingName = data.find((entry) => entry.name === body.name)

    if (!body.name || !body.number || existingName) {
        if (existingName) {
            response.status(400).json({
                "error": "Name provided already exists."
            })  
        } else {
            response.status(400).json({
                "error": "No name or number provided in the request header."
            })
        }
    }

    const newPhonebookEntry = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    data = data.concat(newPhonebookEntry)
    response.json(newPhonebookEntry)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})