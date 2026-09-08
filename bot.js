const mineflayer = require('mineflayer')
const http = require('http')

// 1. Create a dummy web server so Render doesn't shut down the project
http.createServer((req, res) => {
  res.write("Bot is running!")
  res.end()
}).listen(8080)

const botOptions = {
  host: 'MittelalterStadt1803.aternos.me', 
  port: 25071,                            
  username: 'AFK_Bot',                    
  version: '1.21' 
}

function createBot() {
  console.log('Connecting bot via 1.21 protocol translation...')
  const bot = mineflayer.createBot(botOptions)

  bot.on('spawn', () => {
    console.log('Bot successfully joined the server!')
  })

  bot.on('kick', (reason) => {
    console.log('Bot was kicked. Reason: ' + reason)
  })

  bot.on('end', () => {
    console.log('Connection lost. Reconnecting in 10 seconds...')
    setTimeout(createBot, 10000) 
  })

  bot.on('error', (err) => {
    console.log('Error encountered: ', err.message)
  })
}

createBot()
