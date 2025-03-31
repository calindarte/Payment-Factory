const Payment = require('./Payment')
class CreditCardPayment extends Payment {
    constructor(amount) {
        super(amount);
        this.commissionRate = 0.03; // Tarifa de comisión para tarjetas de crédito
    }

    calculateCommission() {
        let commission = this.amount * this.commissionRate;
        if (this.amount > 1000) {
            commission += 10; // Cargo adicional si el monto es mayor a 1000
        }
        return commission; // 🔹 Solo retorna la comisión
    
    }
}

module.exports = CreditCardPayment;
