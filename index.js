const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const fs = require('fs');
const topics = JSON.parse(fs.readFileSync('./topics.json', 'utf8'));
const questionParser = require('./question-parser');

const clientId     = '282209670404.282315448773';
const clientSecret = 'eb093a3e2468d065cf9f6a9b0c0474bc';

const app = express();
const port = 4390;

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, function () {
  console.log(`[help_docs] Listening on port ${port}`);
  console.log("[help_docs] Loaded topics %o", topics);
});

app.get('/', function(req, res) {
  res.send('Ngrok is working! Path Hit: ' + req.url);
});

app.get('/oauth', function(req, res) {
  if (!req.query.code) {
    res.status(500);
    res.send({"Error": "Looks like we're not getting code."});
    console.log("Looks like we're not getting code.");
  } else {
    // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
    request({
        url: 'https://slack.com/api/oauth.access', //URL to hit
        qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret}, //Query string data
        method: 'GET', //Specify the method
      }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.json(body);
            }
        })
    }
});

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
app.post('/topic', (req, res) => {
  const questionOrTopic = req.body.text;
  const url = questionParser(questionOrTopic);

  if (url !== undefined) {
    res.send(`[help_docs] Results for "${questionOrTopic}" - ${url}`);
  } else {
    res.send(`[help_docs] :thinking_face: could not find page for "${questionOrTopic}" :thinking_face:`);
  }
});
