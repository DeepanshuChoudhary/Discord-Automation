require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js")

const client = new Client ({
    intents: [
        GatewayIntentBits.Guilds,   // for permissions, allows the bot to access basic info about servers (guilds)
        GatewayIntentBits.GuildMessages,    // Allows the bot to receive events about messages sent in servers
        GatewayIntentBits.MessageContent    // Allows the bot to read the actual content/text of the messages
    ]
})

client.once("ready", () => {
    console.log('Bot is ready!');
});

client.on("messageCreate", (message) => {
    console.log(`Message received: ${message.content}`)
})

client.login(process.env.DISCORD_BOT_TOKEN);