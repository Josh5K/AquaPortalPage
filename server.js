var express = require('express')
  , logger = require('morgan')
  , app = express()
  , template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
  , fs = require('fs')
  , api = require('./node_modules/twitch-api-v5')


app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

app.get('/', function (req, res, next) {
  try {
    getStreamInfo();
    var html = template({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
 
function getStreamInfo () {
  api.clientID = '1ktk2dzdxmhef3gk1xbaqw5gxbnpd0';

  api.streams.channel({ channelID: '134666774' }, (err, res) => {
      if(err) {
          console.log(err);
      } 
      else {
          fs.writeFile("static/twitch.json", JSON.stringify(res, null, 4), 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
          });
      }
  });
}