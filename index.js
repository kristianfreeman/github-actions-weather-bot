require('dotenv').config()
const fetch = require('node-fetch')
const Telegram = require('node-telegram-bot-api')
const bot = new Telegram(process.env.TELEGRAM_TOKEN)

const weatherToken = process.env.WEATHER_API_TOKEN

const weatherURL = new URL('https://api.openweathermap.org/data/2.5/weather')
weatherURL.searchParams.set('zip', '78747,us')
weatherURL.searchParams.set('APPID', weatherToken)
weatherURL.searchParams.set('units', 'imperial')

const getWeatherData = async () => {
  const resp = await fetch(weatherURL.toString())
  const body = await resp.json()
  return body
}

const generateWeatherMessage = weatherData =>
  `The weather in ${weatherData.name}: ${weatherData.weather[0].description}. Current temperature is ${weatherData.main.temp}, with a low temp of ${weatherData.main.temp_min} and high of ${weatherData.main.temp_max}.`

const main = async () => {
  const weatherData = await getWeatherData()
  const weatherString = generateWeatherMessage(weatherData)
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, weatherString)
}

main()
