// factories/PaymentFactory.js
class PaymentFactory {
    createPayment(amount) {
        throw new Error("Método createPayment() debe ser implementado en la subclase");
    }
}

module.exports = PaymentFactory;
