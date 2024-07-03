const { Schema, model } = require('mongoose');

const cookieCountSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  cookieCount: {
    type: Number,
    default: 0,
  }
})

module.exports = model('CookieCount', cookieCountSchema);