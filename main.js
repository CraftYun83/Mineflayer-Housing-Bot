const mineflayer = require('mineflayer')
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
const registry = require('prismarine-registry')('1.8')
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
  ]
})

let cookies = 0;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", async msg => {
  if (msg.content === "cookies") {
    msg.reply("The housing currently has "+cookies+" cookies!");
  } if (msg.content === "players") {
    msg.reply("There are currently "+parseInt(Object.keys(bot.players).length-2)+" players online!");
  }
})

client.login("client-token")

let bot = mineflayer.createBot({
  host: 'mc.hypixel.net',
  auth: 'microsoft',
  username: "fdgnljksjnlkjglfjksd",
  version: "1.8.9"
})

bot.once('spawn', () => {
  // mineflayerViewer(bot, { port: 3007, firstPerson: true })
  bot.chat("/visit youngblock2k")
  setTimeout(updateStats, 20000)
})

bot.on("message", (jsonMsg, position, sender, verified) => {
  noformattingmessage = jsonMsg.toString()
  if (position === "chat") {
      console.log(noformattingmessage)
      if (noformattingmessage.includes("cookies: ")) {
        cookies = parseInt(noformattingmessage.replace("cookies: ", ""))
      } if (noformattingmessage.includes("* >>> Welcome Back! P#100 <<<")) {
        bot.chat("/tp 5 103 -28")
        bot.chat("/gms")
      }
  }
});

bot.on('windowOpen', (window) => {
  console.log("window opened");
  bot.clickWindow(13, 0, 0);
})

function updateStats() {
  bot.chat("/tp 5 103 -28")
  bot.chat("/viewglobalstats")
  setTimeout(updateStats, 20000)
}
