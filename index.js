const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const postRoutes = require('./routes/posts.js')
const path = require('path')
const http = require('http')
const dotenv = require('dotenv')

const app = express()
const http1 = http.createServer(app)
dotenv.config()
// app.use(express.static('public'));
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
// const PORT = process.env.PORT || 5000


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
  }
  app.use(cors(corsOptions))
}
app.use('/posts', postRoutes)


mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { })
  .catch((err) => console.log(err.message))
mongoose.set('useFindAndModify', false)

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

http1.listen(process.env.PORT || 5000, () => console.log(`Server running on port: ${process.env.PORT || 5000}`))