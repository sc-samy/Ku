const fs = require("fs-extra");

module.exports = {
  config: {
    name: "prefix",
    version: "1.0",
    author: "Sαmყ",
    countDown: 2,
    role: 0,
    shortDescription: { en: "Show the bot's prefix" },
    category: "info",
    guide: { en: "prefix" }
  },

  onStart: async function ({ message, event }) {
    try {
      // 1. Récupération du préfixe global du bot et de son nom
      const prefix = global.GoatBot.config.prefix || "/";
      const botName = global.GoatBot.config.botName || "KU-DX";

      // 2. Récupération de la Date et de l'Heure (Fuseau Europe/Paris)
      const optionsDate = { timeZone: "Europe/Paris", day: "2-digit", month: "2-digit", year: "numeric" };
      const optionsTime = { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
      
      const date = new Date().toLocaleDateString("fr-FR", optionsDate);
      const time = new Date().toLocaleTimeString("fr-FR", optionsTime);

      // 3. Construction du message avec ton design personnalisé
      const prefixMessage = 
`╭── 🎀 ${botName} 🎀 ──╮
│ 💬 Préfixe actuel : 『 ${prefix} 』
│ 📅 Date : ${date}
│ ⏰ Heure : ${time}
│ 🎀 Utilise ce préfixe pour m'appeler !
╰── 𖥻 Merci de m’avoir invoqué 💌 ──╯`;

      // Envoi du message
      return message.reply(prefixMessage);

    } catch (error) {
      console.error(error);
      return message.reply("❌ Une erreur est survenue lors de l'affichage du préfixe.");
    }
  }
};
