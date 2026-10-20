const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');
const dataDir = path.join(__dirname, 'data');
const messagesFile = path.join(dataDir, 'messages.json');

fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(messagesFile)) fs.writeFileSync(messagesFile, '[]', 'utf8');

app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));
app.use(express.static(publicDir));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: '300-maktab-api' });
});

app.post('/api/contact', (req, res) => {
  const name = String(req.body?.name || '').trim();
  const phone = String(req.body?.phone || '').trim();
  const topic = String(req.body?.topic || 'Umumiy savol').trim();
  const message = String(req.body?.message || '').trim();

  if (name.length < 2 || phone.replace(/\D/g, '').length < 7 || message.length < 5) {
    return res.status(400).json({
      ok: false,
      message: 'Ism, telefon raqam va xabarni to‘g‘ri kiriting.'
    });
  }

  try {
    const messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
    const record = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.slice(0, 100),
      phone: phone.slice(0, 40),
      topic: topic.slice(0, 120),
      message: message.slice(0, 2000),
      createdAt: new Date().toISOString()
    };
    messages.push(record);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf8');
    return res.status(201).json({ ok: true, message: 'Murojaatingiz saqlandi. Rahmat!' });
  } catch (error) {
    console.error('Murojaatni saqlashda xatolik:', error.message);
    return res.status(500).json({ ok: false, message: 'Serverda xatolik yuz berdi. Keyinroq urinib ko‘ring.' });
  }
});

app.use('/api', (req, res) => {
  res.status(404).json({ ok: false, message: 'API manzili topilmadi.' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`300-maktab sayti ishga tushdi: http://localhost:${PORT}`);
  console.log('API holati: http://localhost:' + PORT + '/api/health');
});
