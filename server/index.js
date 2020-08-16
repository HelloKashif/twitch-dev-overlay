const tmi = require("tmi.js");
require("dotenv").config();
const cors = require("cors");
const app = require("express")();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [process.env.CHANNEL],
};
const client = new tmi.client(opts);

client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);
client.connect();

function onMessageHandler(target, context, msg, self) {
  if (self) return;

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === "!dice") {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  }

  chatMsgs.push({ username: context.username, msg });
}
// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

const chatMsgs = [];

app.get("/about", (req, res) => {
  res.json({
    twitterHandle: "HelloKashif",
    today: "Coding our stream overlay in JS: Chill Stream",
    website: "mono.fm",
  });
});

app.get("/msgs", (req, res) => {
  res.json(chatMsgs);
});

app.listen(9001);
