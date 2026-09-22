const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // ปลดล็อก CORS ให้หน้าเว็บดึงข้อมูลได้
app.use(express.json());

// 📦 ตัวแปรเก็บข้อมูลล่าสุดจาก Roblox ในหน่วยความจำ (Memory)
let latestGameData = {
    playerName: "Waiting for player...",
    money: "$0",
    speed: 0,
    scramble: 0,
    pets: [],
    predictions: []
};

// 1. Endpoint สำหรับให้ Script Roblox ยิงข้อมูลเข้ามา (POST)
app.post('/api/sync', (req, res) => {
    const data = req.body;
    if (data) {
        latestGameData = {
            playerName: data.player || "Unknown",
            money: data.money || "$0",
            speed: data.speed || 0,
            scramble: data.scramble || 0,
            pets: data.pets || [],
            predictions: data.predictions || []
        };
        console.log("Data synced from:", latestGameData.playerName);
        res.status(200).json({ success: true, message: "Synced successfully" });
    } else {
        res.status(400).json({ success: false, message: "Invalid data" });
    }
});

// 2. Endpoint สำหรับให้หน้าเว็บ HTML ดึงข้อมูลล่าสุดไปแสดง (GET)
app.get('/api/data', (req, res) => {
    res.status(200).json(latestGameData);
});

// รันเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
