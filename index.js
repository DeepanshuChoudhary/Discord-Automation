require("dotenv").config();
const { Client, GatewayIntentBits, AttachmentBuilder } = require("discord.js")
const { GoogleGenAI } = require("@google/genai");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,   // for permissions, allows the bot to access basic info about servers (guilds)
        GatewayIntentBits.GuildMessages,    // Allows the bot to receive events about messages sent in servers
        GatewayIntentBits.MessageContent    // Allows the bot to read the actual content/text of the messages
    ]
})

client.once("clientReady", () => {
    console.log('Bot is ready!');
});

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

// async function generateImage(prompt) {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: prompt,
//     })

//     let idx = 1;
//     for (const generatedImage of response.generatedImages) {
//         let imgBytes = generatedImage.image.imageBytes;
//         const buffer = Buffer.from(imgBytes, "base64");
//         idx++;
//         return buffer;
//     }
// }

async function generateContent(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    })

    return response.text
}

// async function generateImage(prompt {

//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash-image-preview",
//         contents: prompt,
//     })

//     for(const part of response.candidates[ 0 ].content.parts) {
        
//     }

// })

client.on("messageCreate", async (message) => {
    // console.log(`Message received: ${message.content}`)
    // console.log(message)
    // console.log(message.member)
    // console.log(message.member.user)
    // console.log(message.author)
    // message.member("Hello, This is response from the Bot");

    const attachments = message.attachments;

    const isBot = message.author.bot;

    if (isBot) return

    const content = await generateContent(message.content);

    if(content) {
        message.reply(content);
    }

    

    // message.reply("Hello, How can help you today?")

    // console.log(attachments)

    // attachments.forEach(attachment => {
    //     console.log(attachment.url);
    // })

})

client.login(process.env.DISCORD_BOT_TOKEN);