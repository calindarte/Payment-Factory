import React, { useState } from "react";
import { createPayment } from "../services/paymentApi";
import Swal from 'sweetalert2';
import { generateReportPDF } from "./generateReportPDF";


const PaymentForm = () => {
  const [type, setType] = useState("credit_card");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const paymentDescriptions = {
    credit_card: "tarjeta de crédito",
    debit_card: "tarjeta débito",
    paypal: "PayPal"
  };

  const promptInput = async (title, inputType = "text", placeholder = "") => {
    const { value } = await Swal.fire({
      title,
      input: inputType,
      inputPlaceholder: placeholder,
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
      }
    });
    return value;
  };

  const buildNotificationData = (notificationType, userInput) => {
    const description = paymentDescriptions[type] || "Pago";
    const baseMessage = `Tu pago de ${description} por $${amount} fue exitoso. ¡Gracias!`;

    switch (notificationType) {
      case "EMAIL":
        return {
          type: "EMAIL",
          to: userInput,
          subject: "Pago exitoso",
          body: `¡Hola! Tu pago de $${amount} con ${description} fue procesado exitosamente.`,
          cc: ["copiacorreo@correo.com"],
          bcc: ["oculto@correo.com"],
          attachments: [{ filename: "recibo.pdf", url: "https://example.com/recibo.pdf" }],
          priority: "alta"
        };
      case "SMS":
        return {
          type: "SMS",
          phoneNumber: userInput,
          message: baseMessage,
          senderId: "PagosApp",
          deliveryReportRequired: true,
          scheduleTime: null
        };
      case "WHATSAPP":
        return {
          type: "WHATSAPP",
          phoneNumber: userInput,
          message: baseMessage,
          mediaUrl: "https://example.com/recibo.jpg",
          caption: "Recibo de pago",
          interactiveButtons: [
            { type: "reply", title: "Ver Detalles" },
            { type: "reply", title: "Contactar Soporte" }
          ],
          language: "es"
        };
      case "PUSH":
        return {
          type: "PUSH",
          deviceToken: userInput,
          title: "Pago confirmado",
          message: `Se ha procesado correctamente tu pago de $${amount} usando ${description}.`,
          imageUrl: "https://example.com/pago.png",
          clickAction: "https://tuapp.com/confirmacion-pago",
          priority: "high"
        };
      default:
        return {};
    }
  };
  const redirectUser = (notificationType, userInput) => {
    const description = paymentDescriptions[type] || "Pago";
    const message = `Tu pago de ${description} por $${amount} fue exitoso. ¡Gracias!`;

    if (notificationType === "EMAIL") {
      const subject = "Pago exitoso";
      const emailLink = `mailto:${userInput}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      window.open(emailLink, "_blank");
    } else if (notificationType === "SMS") {
      window.open(`sms:${userInput}?body=${encodeURIComponent(message)}`, "_blank");
    } else if (notificationType === "WHATSAPP") {
      window.open(`https://wa.me/57${userInput}?text=${encodeURIComponent(message)}`, "_blank");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!amount || isNaN(amount)) {
      setError("Ingresa un monto válido.");
      return;
    }
  
    try {
      const response = await createPayment({ type, amount: parseFloat(amount) });
      console.log("✅ Respuesta del backend:", response.data);
      setError("");

      const { value: notificationType } = await Swal.fire({
        title: "¿Cómo deseas recibir la notificación?",
        input: "select",
        inputOptions: {
          EMAIL: "Correo electrónico",
          SMS: "Mensaje de texto (SMS)",
          PUSH: "Notificación push",
          WHATSAPP: "WhatsApp"
        },
        inputPlaceholder: "Selecciona un canal",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        customClass: {
          confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
          cancelButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
        }
      });

      if (notificationType) {
        let inputType = (notificationType === "EMAIL") ? "email" : "text";
        let placeholder = (notificationType === "EMAIL") ? "Correo electrónico" : "Número de teléfono o token";

        const userInput = await promptInput(
          notificationType === "PUSH" ? "Ingresa el token del dispositivo" : `Ingresa tu ${notificationType === "WHATSAPP" ? "número de WhatsApp" : notificationType === "SMS" ? "número de teléfono" : "correo electrónico"}`,
          inputType,
          placeholder
        );

        if (!userInput) {
          Swal.fire("❌ Error", `No se ingresó un ${notificationType.toLowerCase()} válido.`, "error");
          return;
        }

        const notificationData = buildNotificationData(notificationType, userInput);

        // Si es correo, SMS o WhatsApp, redirecciona además
        if (["EMAIL", "SMS", "WHATSAPP"].includes(notificationType)) {
          redirectUser(notificationType, userInput);
          Swal.fire("Redirigiendo", `Te estamos redirigiendo a tu ${notificationType.toLowerCase()}...`, "success");
        } else {
          Swal.fire("✅ Notificación Push creada", "Tu notificación Push está lista para enviarse al dispositivo.", "success");
        }

        await fetch("http://localhost:3000/notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notificationData)
        });

        Swal.fire("✅ Notificación enviada", "", "success");
      }
    setResult({ status: "success", amount });
} catch (err) {
      console.error("❌ Error al procesar el pago:", err);
      setError(err.response?.data?.error || "Error al procesar el pago");
    }
  };

  const handleGeneratePDF = () => {
    generateReportPDF(type, amount);
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6 border dark:border-zinc-800 dark:bg-zinc-800 dark:text-white">
      <h2 className="text-xl font-bold mb-4">💳 Realizar Pago</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Método de pago:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 dark:text-zinc-900"
          >
            <option value="credit_card">Tarjeta de Crédito</option>
            <option value="debit_card">Tarjeta de Débito</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Monto:</label>
          <input
            type="number"
            placeholder="Ingrese Monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 dark:text-zinc-900"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Realizar Pago
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-600 font-semibold">{error}</p>
      )}

      {result && (
        <div className="flex flex-col">
        <div className="mt-6 bg-gray-50 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">✅ Resultado del Pago</h3>
          <p><strong>Estado:</strong> {result.status}</p>
          <p><strong>Monto:</strong> ${result.amount}</p>
        </div>
         <button 
         onClick={handleGeneratePDF} 
         className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
       >
         Generar Reporte PDF
       </button>

        </div>
      )}
      
     
      
       
    </div>
  );
};

export default PaymentForm;
