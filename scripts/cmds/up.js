const fs = require("fs-extra");

module.exports = {
  config: {
    name: "uptime",
    version: "1.0",
    author: "Sαmყ",
    countDown: 2,
    role: 0,
    shortDescription: { en: "Show the bot's uptime" },
    category: "info",
    guide: { en: "uptime" }
  },

  onStart: async function ({ message, event }) {
    try {
      // 1. Récupération du nom du bot
      const botName = global.GoatBot.config.botName || "KU-DX";

      // 2. Calcul du temps d'activité (Uptime)
      const uptimeProcess = process.uptime();
      const hours = Math.floor(uptimeProcess / 3600);
      const minutes = Math.floor((uptimeProcess % 3600) / 60);
      const seconds = Math.floor(uptimeProcess % 60);
      const uptimeString = `${hours}h ${minutes}m ${seconds}s`;

      // 3. Récupération de la Date et de l'Heure (Fuseau Europe/Paris)
      const optionsDate = { timeZone: "Europe/Paris", day: "2-digit", month: "2-digit", year: "numeric" };
      const optionsTime = { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
      
      const date = new Date().toLocaleDateString("fr-FR", optionsDate);
      const time = new Date().toLocaleTimeString("fr-FR", optionsTime);

      // 4. Construction du message avec ton design personnalisé
      const uptimeMessage = 
`╭── 🎀 ${botName} 🎀 ──╮
│ ⏱️ Uptime : 『 ${uptimeString} 』
│ 📅 Date : ${date}
│ ⏰ Heure : ${time}
│ 🎀 Toujours en ligne et prêt à t'aider !
╰── 𖥻 Merci de m’avoir invoqué 💌 ──╯`;

      // Envoi du message
      return message.reply(uptimeMessage);

    } catch (error) {
      console.error(error);
      return message.reply("❌ Une erreur est survenue lors de l'affichage de l'uptime.");
    }
  }
};
