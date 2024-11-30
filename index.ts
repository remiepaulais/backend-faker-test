import { faker, fakerFR } from '@faker-js/faker'
import express from 'express'
import cors from 'cors'

const app = express()

interface User {
  name: string
  lastName: string
  bio: string
  email: string
  phone: string
  avatar: string
}

const generateUser = (): User => ({
  name: fakerFR.person.firstName(),
  lastName: fakerFR.person.lastName(),
  bio: fakerFR.person.bio(),
  email: fakerFR.internet.email(),
  phone: fakerFR.phone.number(),
  avatar: fakerFR.image.avatar()
})

app.use(cors({ origin: 'http://localhost:5174', credentials: true }))

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})

app.get('/users', (req, res) => {
  const count = parseInt(req.query.count as string) || 5
  const users: User[] = Array.from({ length: count }, () => generateUser())
  res.json(users)
})
