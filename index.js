const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const config = require('./config');

// === INIT BOT ===
const bot = new TelegramBot(config.BOT_SETTINGS.TOKEN, {
  polling: config.BOT_SETTINGS.POLLING
});

// === DATABASE PATH ===
const dbDir = path.join(__dirname, 'database');
const panelDB = path.join(dbDir, 'panels.json');

// === INIT DATABASE ===
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir);

if (!fs.existsSync(panelDB)) {
  fs.writeFileSync(panelDB, JSON.stringify({ panels: [] }, null, 2));
}

// === HELPERS ===
function isOwner(id) {
  return config.BOT_SETTINGS.ADMIN_IDS.includes(id);
}

function readPanels() {
  return JSON.parse(fs.readFileSync(panelDB)).panels;
}

function savePanels(panels) {
  fs.writeFileSync(panelDB, JSON.stringify({ panels }, null, 2));
}

// === COMMANDS ===
bot.onText(/\/start/, (msg) => {
  if (!isOwner(msg.from.id)) {
    return bot.sendMessage(msg.chat.id, '❌ Kamu bukan owner.');
  }

  bot.sendMessage(
    msg.chat.id,
    `🚀 *HmVPS BOT*

Perintah tersedia:
/addpanel
/mypanels
/createvps

Owner ID: ${msg.from.id}`,
    { parse_mode: 'Markdown' }
  );
});

// === ADD PANEL ===
bot.onText(/\/addpanel (.+)/, (msg, match) => {
  if (!isOwner(msg.from.id)) return;

  const apiKey = match[1];
  const panels = readPanels();

  panels.push({
    id: panels.length + 1,
    apiKey,
    createdAt: new Date().toISOString()
  });

  savePanels(panels);

  bot.sendMessage(msg.chat.id, '✅ Panel DigitalOcean berhasil ditambahkan');
});

// === LIST PANELS ===
bot.onText(/\/mypanels/, (msg) => {
  if (!isOwner(msg.from.id)) return;

  const panels = readPanels();
  if (!panels.length) {
    return bot.sendMessage(msg.chat.id, '❌ Belum ada panel.');
  }

  let text = '📦 *Panel DigitalOcean:*\n\n';
  panels.forEach(p => {
    text += `• Panel #${p.id}\n`;
  });

  bot.sendMessage(msg.chat.id, text, { parse_mode: 'Markdown' });
});

// === CREATE VPS ===
bot.onText(/\/createvps/, async (msg) => {
  if (!isOwner(msg.from.id)) return;

  const panels = readPanels();
  if (!panels.length) {
    return bot.sendMessage(msg.chat.id, '❌ Tambahkan panel dulu.');
  }

  const panel = panels[0]; // default panel pertama

  try {
    const res = await axios.post(
      'https://api.digitalocean.com/v2/droplets',
      {
        name: 'hmvps-' + Date.now(),
        region: config.DO_SETTINGS.DEFAULT_REGION,
        size: config.DO_SETTINGS.DEFAULT_SIZE,
        image: config.DO_SETTINGS.DEFAULT_IMAGE,
        ipv6: true,
        tags: ['hmvps-bot']
      },
      {
        headers: {
          Authorization: `Bearer ${panel.apiKey}`
        }
      }
    );

    bot.sendMessage(
      msg.chat.id,
      `✅ VPS dibuat!\nID: ${res.data.droplet.id}`
    );
  } catch (e) {
    bot.sendMessage(msg.chat.id, '❌ Gagal membuat VPS');
  }
});

// === BOT READY ===
console.log('🤖 HmVPS BOT berjalan...');
