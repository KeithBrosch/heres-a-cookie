require ('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
});

client.on('ready', (c) => {
  console.log(`✅ ${c.user.username} is online`)
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'give-cookie') {
    const recipient = interaction.options.get('recipient')?.value;
    
    
    // interaction.reply(`The sum is ${num1 + num2}`);
    
    console.log(recipient);
  };

});

client.login(process.env.TOKEN);

