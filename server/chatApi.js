// Simple chat API for customer support
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const CHAT_DB_PATH = path.join(__dirname, 'chat.json');

function loadChats() {
  if (!fs.existsSync(CHAT_DB_PATH)) return [];
  return JSON.parse(fs.readFileSync(CHAT_DB_PATH, 'utf8'));
}

function saveChats(chats) {
  fs.writeFileSync(CHAT_DB_PATH, JSON.stringify(chats, null, 2));
}

// Get all chats (admin)
router.get('/api/chats', (req, res) => {
  const chats = loadChats();
  res.json(chats);
});

// Get chat by bookingId
router.get('/api/chats/:bookingId', (req, res) => {
  const chats = loadChats();
  const chat = chats.find(c => c.bookingId === req.params.bookingId);
  res.json(chat || { messages: [] });
});

// Send message (customer or admin)
router.post('/api/chats/:bookingId', (req, res) => {
  const { sender, message } = req.body;
  if (!sender || !message) return res.status(400).json({ error: 'Missing sender or message' });
  let chats = loadChats();
  let chat = chats.find(c => c.bookingId === req.params.bookingId);
  if (!chat) {
    chat = { bookingId: req.params.bookingId, messages: [] };
    chats.push(chat);
  }
  chat.messages.push({ sender, message, time: new Date().toISOString() });
  saveChats(chats);
  res.json({ success: true });
});

module.exports = router;
