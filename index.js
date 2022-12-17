const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require('cors')
 
const app = express();
app.use(cors())

// Set static path
app.use(express.static(path.join(__dirname, "../client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BBTySeWwsrm46Uqs2wzuQWsUIcy0Q4k9VKJZhj8O-VS65Wc75yWWzzNcEIKGwOLR2NF15vvQ3AAjDyGU7JbBORw";
const privateVapidKey = "JMsh0hsPHdoC2eX1gmquMiqXTwGBcg8Rfkal10Bccec";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = process.env.PORT || 5000;;

app.listen(port, () => console.log(`Server started on port ${port}`));
