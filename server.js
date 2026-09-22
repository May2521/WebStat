const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

let gameDataStore = {
    lastUpdate: "ยังไม่มีข้อมูล",
    playerName: "Waiting...",
    displayName: "Waiting...",
    userId: 0,
    avatarUrl: "",
    money: "$0",
    speed: 0,
    scramble: "0",
    pets: [],
    predictions: []
};

app.post('/api/sync', (req, res) => {
    const data = req.body;
    const pName = data.playerName || data.player;
    
    if (!data || !pName) {
        return res.status(400).json({ success: false, message: "Invalid Data" });
    }

    gameDataStore = {
        lastUpdate: new Date().toISOString(),
        playerName: pName,
        displayName: data.displayName || pName,
        userId: data.userId || 0,
        avatarUrl: data.avatarUrl || "",
        money: data.money || "$0",
        speed: data.speed || 0,
        scramble: data.scramble || "0",
        pets: data.pets || [],
        predictions: data.predictions || []
    };

    console.log(`[SYNC SUCCESS] ${gameDataStore.displayName} (@${gameDataStore.playerName})`);
    res.status(200).json({ success: true });
});

app.get('/api/data', (req, res) => {
    res.status(200).json(gameDataStore);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
