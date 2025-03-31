const Payment = require('./Payment')
class PayPalPayment extends Payment {
    constructor(amount) {
        super(amount);
        this.commissionRate = 0.02; // Tarifa de comisión para PayPal
    }

    calculateCommission() {
        let commission = this.amount * this.commissionRate;
        if (this.amount > 750) {
            commission += 7; // Cargo adicional si el monto es mayor a 1000
        }
        return commission; // 🔹 Solo retorna la comisión
    }
}

module.exports = PayPalPayment;
