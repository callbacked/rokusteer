const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/send-command', async (req, res) => {
    const { rokuIp, command } = req.body;
    try {
        const response = await axios.post(`http://${rokuIp}:8060/keypress/${command}`);
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.get('/query-apps', async (req, res) => {
    const { rokuIp } = req.query;
    try {
        const response = await axios.get(`http://${rokuIp}:8060/query/apps`);
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.post('/launch-app', async (req, res) => {
    const { rokuIp, appId } = req.body;
    try {
        const response = await axios.post(`http://${rokuIp}:8060/launch/${appId}`);
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.get('/query-icon', async (req, res) => {
    const { rokuIp, appId } = req.query;
    try {
        const response = await axios.get(`http://${rokuIp}:8060/query/icon/${appId}`, { responseType: 'arraybuffer' });
        res.set('Content-Type', 'image/png');
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
