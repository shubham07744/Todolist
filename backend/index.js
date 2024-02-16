const a=require('./db')
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000


app.use(cors())
app.use(express.json());
app.use('/auth',require('./routes/auth'))
app.use('/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})
