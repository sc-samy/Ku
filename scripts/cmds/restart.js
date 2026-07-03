const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: "restart",
    version: "1.2",
    author: "Sαmყ",
    role: 2,
    shortDescription: { en: "Redémarre le bot" },
    category: "system"
  },

  onStart: async function ({ message, event }) {
    try {
      const tmpDir = path.join(__dirname, 'tmp');
      if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

      const pathFile = path.join(tmpDir, 'restart.txt');
      
      // On sauvegarde l'ID du groupe et le texte de confirmation
      fs.writeFileSync(pathFile, JSON.stringify({
        threadID: event.threadID,
        msg: "✅ Redémarrage terminé avec succès."
      }));

      await message.reply("🔄 Redémarrage en cours...");
      process.exit(1); 
    } catch (e) {
      return message.reply("❌ Erreur : " + e.message);
    }
  }
};
