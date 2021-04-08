import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import path from 'path'
import http from 'http'
const app = express()
const http1 = http.createServer(app)
// app.use(express.static('public'));
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
// const PORT = process.env.PORT || 5000


app.use('/posts', postRoutes)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
  }
  app.use(cors(corsOptions))
}


const CONNECTION_URL = 'mongodb+srv://elad:8dgCcE63AJei6cMe@cluster0.jspyg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { })
  .catch((err) => console.log(err.message))
mongoose.set('useFindAndModify', false)

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

http1.listen(process.env.PORT || 5000, () => console.log(`Server running on port: ${process.env.PORT || 5000}`))