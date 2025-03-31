const PaymentService = require("../services/PaymentService");

let payments = []; // Simulación de base de datos en memoria
const paymentService = new PaymentService(); // Instancia del servicio de pagos

const createPayment = (req, res) => {
    try {
        const { type, amount } = req.body;
        if (!type || !amount) {
            return res.status(400).json({ error: "Faltan datos en la solicitud" });
        }

        // Procesar el pago con el servicio
        const paymentResult = paymentService.processPayment(type, amount);

        const newPayment = {
            id: payments.length + 1,
            type,
            amount,
            commission: paymentResult.commission,
            totalAmount: paymentResult.totalAmount,
            status: paymentResult.status
        };

        payments.push(newPayment);

        res.json({ 
            message: `Pago de ${amount} USD realizado con ${type}. Comisión aplicada: ${paymentResult.commission} USD`, 
            payment: newPayment 
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const processPayment = (req, res) => {
    const { id } = req.params;
    const payment = payments.find((p) => p.id == id); 

    if (!payment) {
        return res.status(404).json({ error: `No se encontró el pago con ID ${id}` });
    }

    res.json({ 
        message: `Estado del pago con ID ${id}: ${payment.amount} USD con ${payment.type}`, 
        payment 
    });
};

const updatePayment = (req, res) => {
    try {
        const { id } = req.params;
        const { type, amount } = req.body;
        const payment = payments.find((p) => p.id == id);

        if (!payment) {
            return res.status(404).json({ error: `No se encontró el pago con ID ${id}` });
        }

        if (type) {
            const paymentResult = paymentService.processPayment(type, amount || payment.amount);
            payment.type = type;
            payment.amount = amount || payment.amount;
            payment.commission = paymentResult.commission;
            payment.totalAmount = paymentResult.totalAmount;
            payment.status = paymentResult.status;
        }

        res.json({ message: `Pago con ID ${id} actualizado`, payment });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deletePayment = (req, res) => {
    const { id } = req.params;
    const index = payments.findIndex((p) => p.id == id);

    if (index === -1) {
        return res.status(404).json({ error: `No se encontró el pago con ID ${id}` });
    }

    payments.splice(index, 1);
    res.json({ message: `Pago con ID ${id} eliminado` });
};

module.exports = {
    processPayment,
    createPayment,
    updatePayment,
    deletePayment
};
