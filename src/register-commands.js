require('dotenv').config()
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

const commands = [
  {
    name: 'give-cookie',
    description: 'give someone a cookie',
    options: [
      {
        name: 'recipient',
        description: 'who deserves a cookie?',
        type: ApplicationCommandOptionType.User,
        required: true
      },
    ]
  }
];

const rest = new REST( { version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...')
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands}
    )

    console.log('Successfully registered slash commands');
  } catch (error) {
    console.log(`There was an error: ${error}`)
  }
})();