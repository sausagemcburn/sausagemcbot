const tmi = require('tmi.js');
let bukkake = 0;

// Define configuration options
const opts = {
  identity: {
    username: 'SausageMcBot',
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    'SausageMcBurn'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  
  msg = msg.toLowerCase();
  
  if (msg.includes('bukkake')) {
    bukkake += 1;
    client.say(target, `ah i see you're a man of culture as well :: bukkake count = ${bukkake}`);
    return;
  }
  
  if (msg.includes('chosen one')) {
    bukkake += 1;
    client.say(target, ` ..(‿ˠ‿) _(‿ˠ‿) only the chosen one can fist both asses.⎝. Kreygasm .⎠`);
    return;
  }

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!d20') {
    const num = rollDice(commandName);
    client.say(target, `You rolled a ${num}`);
    return;
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}