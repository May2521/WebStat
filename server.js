const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

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
    console.log(`[SYNC SUCCESS] ${data.player}`);
    res.status(200).json({ success: true });
});

app.get('/api/data', (req, res) => {
    res.status(200).json(gameDataStore);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
