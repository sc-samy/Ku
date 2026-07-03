const fs = require("fs-extra");

module.exports = {
  config: {
    name: "help",
    version: "7.5",
    author: "Sαmყ",
    countDown: 2,
    role: 0,
    shortDescription: { en: "Explore all bot commands" },
    category: "info",
    guide: { en: "help" }
  },

  onStart: async function ({ message, event, threadsData }) {
    try {
      const { commands } = global.GoatBot;
      const threadID = event.threadID;

      // 1. Calcul de l'Uptime (Temps d'activité du bot)
      const uptimeProcess = process.uptime();
      const hours = Math.floor(uptimeProcess / 3600);
      const minutes = Math.floor((uptimeProcess % 3600) / 60);
      const seconds = Math.floor(uptimeProcess % 60);
      const uptimeString = `${hours}h ${minutes}m ${seconds}s`;

      // 2. Récupération du Mode (Public ou Admin)
      let mode = "Public";
      if (threadsData) {
        const threadInfo = await threadsData.get(threadID);
        if (threadInfo && threadInfo.data && threadInfo.data.isGroupAdminOnly) {
          mode = "Admin uniquement";
        }
      }

      // 3. Récupération de la Date Actuelle
      const date = new Date().toLocaleDateString("fr-FR", {
        timeZone: "Europe/Paris",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });

      // 4. Calcul du Ping (Latence)
      const ping = Date.now() - event.timestamp;

      // 5. Utilisation de la mémoire RAM (en Mo)
      const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

      // 6. Nombre total de commandes disponibles
      const allCommands = Array.from(commands.keys());
      const totalCommands = allCommands.length;
      
      // Formatage de la liste des commandes {cmd}
      const formattedCommands = allCommands.map(cmd => `│  ◌ ${cmd}`).join("\n");

      // 7. Construction du message final avec les nouvelles infos
      const helpMessage = 
`╭──────  🔮 〔KU-DX〕
│  ◌ ᴜᴘᴛɪᴍᴇ : ${uptimeString}
│  ◌ ᴍᴏᴅᴇ : ${mode}
│  ◌ ᴏᴡɴᴇʀ : Samy charles
│  ◌ ᴅᴀᴛᴇ : ${date}
│  ◌ ᴘɪɴɢ : ${ping}ms
│  ◌ ʀᴀᴍ : ${ramUsage} MB
│  ◌ ᴄᴏᴍᴍᴀɴᴅᴇs : ${totalCommands} au total
╰───────────╯

╭────  🔮〔 List Commands 〕
${formattedCommands}
╰─────────╯`;

      // Envoi du menu d'aide
      return message.reply(helpMessage);

    } catch (error) {
      console.error(error);
      return message.reply("❌ Une erreur est survenue lors de l'affichage du menu help.");
    }
  }
};
