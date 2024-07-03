require ('dotenv').config();
const mongoose = require('mongoose');
const { Client, IntentsBitField } = require('discord.js');
const CookieCount = require('./models/cookieCount');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
});

(async() => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('Connedted to Database')

    
client.on('ready', (c) => {
  console.log(`✅ ${c.user.username} is online`)
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'give-cookie') {
    const recipient_id = interaction.options.get('recipient')?.value;
    const guild_id = interaction.guildId;
    console.log('recipient_id: ', recipient_id, 'guild_id:' , guild_id);

    try {
      // check if user already has cookies in the database
      const query = {
        userId: recipient_id,
        guildId: guild_id
      }

      const existingCookieCount = await CookieCount.findOne(query)

      if (existingCookieCount) {
        console.log('existing cookiecount found', existingCookieCount);
        existingCookieCount.cookieCount += 1;
        await existingCookieCount.save();
        // interaction.reply(`<@${recipient_id}> Here's a cookie 🍪 (total: ${existingCookieCount.cookieCount})`);
      } else {
          const newCookie = new CookieCount({
            userId: recipient_id,
            guildId: guild_id,
            cookieCount: 1
          });

          console.log('no new cookie count found', newCookie)


          await newCookie.save().then(savedCookieCount => {
            console.log('Saved new cookie count:', savedCookieCount);
            // interaction.reply(`<@${recipient_id}> Here's a cookie 🍪 (total: 1)`);
        })
        .catch(err => {
            console.error('Error saving cookie count:', err);
        });
      }

      interaction.reply(`<@${recipient_id}> Here's a cookie 🍪`);
      
    } catch (error) {
      console.log(`Error awarding cookie: ${error}`);
    }
  };

});

client.login(process.env.TOKEN);

  } catch (error) {
    console.log(`Error connecting to database: ${error}`)
  }
})();
