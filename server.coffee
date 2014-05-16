express = require('express')
app = express()

app.use express.static(__dirname + '/public')

app.get '/json', (req, res) ->
  res.json require('./data.json')

app.listen Number(process.env.PORT || 3000)
