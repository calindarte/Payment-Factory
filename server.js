// server.js
const express = require('express');
const paymentController = require('./src/controllers/paymentController');

const app = express();
const PORT = 3000;

app.use(express.json());


// Definir las rutas correctamente
app.post('/payment/process', paymentController.createPayment);
app.get('/payment/status/:id', paymentController.processPayment);
app.put('/payment/update/:id', paymentController.updatePayment);
app.delete('/payment/cancel/:id', paymentController.deletePayment);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
