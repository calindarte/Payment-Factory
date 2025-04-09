// server.js
const express = require('express');
const cors = require('cors');
const paymentController = require('./src/controllers/paymentController');
const DarkThemeFactory = require('./src/theme/factories/DarkThemeFactory');
const LightThemeFactory = require('./src/theme/factories/LightThemeFactory');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.get('/theme/:mode', (req, res) => {
    const { mode } = req.params;

    let factory;
    if (mode === 'dark') {
        factory = new DarkThemeFactory();
    } else if (mode === 'light') {
        factory = new LightThemeFactory();
    } else {
        return res.status(400).json({ error: 'Invalid theme mode' });
    }

    const button = factory.createButton().render();
    const textField = factory.createTextField().render();
    const table = factory.createTable().render();

    res.json({ button, textField, table });
});



// Definir las rutas correctamente
app.post('/payment/process', paymentController.createPayment);
app.get('/payment/status/:id', paymentController.processPayment);
app.put('/payment/update/:id', paymentController.updatePayment);
app.delete('/payment/cancel/:id', paymentController.deletePayment);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
