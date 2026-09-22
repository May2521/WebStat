const express = require('express');
const cors = require('cors');
const app = express();

// 🔓 ปลดล็อก CORS ให้หน้าเว็บและเกมเชื่อมต่อได้สมบูรณ์
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// 📦 ตัวแปรเก็บข้อมูลล่าสุดจาก Roblox ในหน่วยความจำ (Memory)
let gameDataStore = {
    lastUpdate: "ยังไม่มีข้อมูล",
    playerName: "Waiting for player...",
    money: "$0",
    speed: 0,
    scramble: "0",
    pets: [],
    predictions: []
};

// 1. Endpoint สำหรับรับข้อมูลจากเกม Roblox (POST)
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
    res.status(200).json({ success: true, message: "Synced successfully" });
});

// 2. Endpoint สำหรับส่งข้อมูลให้หน้าเว็บ HTML (GET)
app.get('/api/data', (req, res) => {
    res.status(200).json(gameDataStore);
});

// รันเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
