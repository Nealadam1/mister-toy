const express = require('express')
const cookieParser = require('cookie-parser')
const toyService = require('../backend/services/toy.service.js')
const cors = require('cors')
const app = express()

// app.use(express.static('public'))

const corsOptions = {
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
}
app.use(cors(corsOptions))

app.use(cookieParser())
app.use(express.json())

//Real routing express
//List
app.get('/api/toy', (req, res) => {
    const filterBy = req.query
    filterBy.labels=JSON.parse(req.query.labels)
    console.log(filterBy)
    toyService.query(filterBy)
        .then((toys) => {
            res.send(toys)  
        })
        .catch(err => {
            console.log('error:', err)
            res.status(400).send('cannot get cars')
        })
      

})
//update
app.put('/api/toy', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('error', err)
            res.status(400).send('cannot update toy')
        })
})
//create
app.post('/api/toy', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('error', err)
            res.status(400).send('cannot update toy')
        })
})
//read
app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.get(toyId)
        .then((toy) => {
            res.send(toy)
        })
        .catch(err => {
            console.log('error:', err)
            res.status(400).send('cannot get toy')
        })
})

//remove
app.delete('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    console.log(req.params)
    toyService.remove(toyId)
        .then(() => {
            res.send({ msg: 'Toy removed successfully', toyId })
        })
        .catch(err => {
            console.log('error:', err)
            res.status(400).send('cannot delete toy')
        })
})

app.listen(3030, () => console.log('Server is listening on port 3030!'))