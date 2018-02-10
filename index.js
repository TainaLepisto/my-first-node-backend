const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())


let people = [
      {
        "name": "Martti Tienari",
        "number": "098765",
        "id": 2
      },
      {
        "name": "Lea Kutvonen",
        "number": "1234",
        "id": 4
      },
      {
        "name": "lkaehrva",
        "number": "1365",
        "id": 10
      },
      {
        "name": "ARto hellas",
        "number": "**",
        "id": 11
      },
      {
        "name": "iolökölk",
        "number": "t6875764",
        "id": 12
      },
      {
        "name": "qwertyu",
        "number": "!!!",
        "id": 13
      }
    ]


    app.get('/', (req, res) => {
        res.send('<h1>Hello World!</h1>')
    })
      
    app.get('/info', (req, res) => {
        let paiva = new Date()
        let kpl = people.length
        res.send(`<p>Puhelinluettelossa tällä hetkellä ${kpl} henkilön tiedot.</p><p>${paiva}</p>`)
    })

      app.get('/api/people', (req, res) => {
        res.json(people)
      })


      app.get('/api/people/:id', (req, res) => {
        const id = Number(req.params.id)
        const person = people.find(person => person.id === id )

        if(person){
            res.json(person)
        } else {
            res.status(404).end()
        }

      })

      const randomId = () => {
        return Math.round(Math.random() * 10000000)
      }

      app.post('/api/people', (req, res) => {
        const person = req.body

        if (person.name === undefined) {
          return response.status(400).json({error: 'name missing'})
        }
      
        const personNew = {
          name: person.name,
          number: person.number,
          id: randomId()
        }
        
        people = people.concat(personNew)
        res.json(people)

      })

      app.delete('/api/people/:id', (req, res) => {
        const id = Number(req.params.id)
        people = people.filter(person => person.id !== id)
      
        res.status(204).end()
      })

      
      const PORT = 3001
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })
