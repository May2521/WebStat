const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 🔓 ปลดล็อก CORS ให้เว็บและเกมเชื่อมต่อได้ทุกโดเมน
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json({ limit: '1mb' }));

let gameDataStore = {
    lastUpdate: "ยังไม่มีข้อมูล",
    playerName: "Waiting...",
    money: "$0",
    speed: 0,
    scramble: "0",
    pets: [],
    predictions: []
};

// 1. รับข้อมูลจากเกม (POST)
app.post('/api/sync', (req, res) => {
    const data = req.body;
    if (!data || !data.player) {
        return res.status(400).json({ success: false, message: "Invalid Data" });
    }
    gameDataStore = {
        lastUpdate: new Date().toISOString(),
        playerName: data.player,
        money: data.money || "$0",
        speed: data.speed || 0,
        scramble: data.scramble || "0",
        pets: data.pets || [],
        predictions: data.predictions || []
    };
    console.log(`[SYNC SUCCESS] ได้รับข้อมูลจาก: ${data.player}`);
    res.status(200).json({ success: true });
});

// 2. ส่งข้อมูลให้หน้าเว็บ (GET)
app.get('/api/data', (req, res) => {
    res.status(200).json(gameDataStore);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
