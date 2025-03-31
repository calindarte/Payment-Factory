
class Payment {

    constructor(amount) {
        this.amount = amount;
        this.commissionRate = 0; // Tarifa de comisión inicial
    }

    calculateCommission() {
        throw new Error("El método calculateCommission() debe ser implementado por las subclases.");
    }

    process() {
        const commission = this.calculateCommission();
        const totalAmount = this.amount + commission;

        return {
            amount: this.amount,
            commission: commission, // 🔹 Solo la comisión
            totalAmount: totalAmount, // 🔹 Monto total con comisión aplicada
            status: "Procesado"
        };
    }
}

module.exports = Payment;
