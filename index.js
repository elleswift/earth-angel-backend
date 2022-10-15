import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import 'dotenv/config'

const URI          =   process.env.MONGO_URI 
const client       =   new MongoClient(URI)
const database     =   client.db('earth-angels')
const wishes       =   database.collection('wishes')

client.connect()
console.log('Hey gurl, you connected to Mongo. 😌')

const app = express()
app.use(cors())
app.use(express.json())

app.listen(3001, () => console.log('Listening on 3001'))

app.get('/', async (req, res) => {
  const allWishes = await wishes.find().toArray()
  res.json(allWishes)
})

app.post('/', async (req, res) => {
  await wishes.insertOne(req.body)
  res.json('Wish added')
})

app.delete('/remove-wish', async (req, res) => {
  await wishes.findOneAndDelete(req.query)
  res.json('Wish removed')
}) 

app.put('/', async (req, res) => {
  console.log(req.query)
  await wishes.findOneAndUpdate(req.query, {$set:req.body})
  res.json('Wish updated')
})