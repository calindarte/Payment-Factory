// src/controllers/paymentController.js

const processPayment = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Estado del pago con ID ${id} consultado` });
};

const createPayment = (req, res) => {
    const { type, amount } = req.body;
    if (!type || !amount) {
        return res.status(400).json({ error: "Faltan datos en la solicitud" });
    }
    res.json({ message: `Pago de ${amount} USD realizado con ${type}` });
};

const updatePayment = (req, res) => {
    const { id } = req.params;
    const { type, amount } = req.body;
    if (!type || !amount) {
        return res.status(400).json({ error: "Faltan datos en la solicitud" });
    }
    res.json({ message: `Pago con ID ${id} actualizado a ${amount} USD con ${type}` });
};

const deletePayment = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Pago con ID ${id} eliminado` });
};

module.exports = {
    processPayment,
    createPayment,
    updatePayment,
    deletePayment
};
