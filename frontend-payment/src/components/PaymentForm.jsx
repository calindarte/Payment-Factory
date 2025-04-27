import React, { useState } from "react";
import { createPayment } from "../services/paymentApi";
import Swal from 'sweetalert2';


const PaymentForm = () => {
  const [type, setType] = useState("credit_card");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!amount || isNaN(amount)) {
      setError("Ingresa un monto válido.");
      return;
    }
  
    try {
      console.log("🧾 Enviando datos:", { type, amount });
  
      const response = await createPayment({ type, amount: parseFloat(amount) });
  
      console.log("✅ Respuesta del backend:", response.data);
  
      // Asigna correctamente el resultado
      console.log(response.data.message)
      setError("");
       // Mostrar modal de selección de notificación
    const { value: notificationType } = await Swal.fire({
      title: "¿Cómo deseas recibir la notificación?",
      input: "select",
      inputOptions: {
        EMAIL: "Correo electrónico",
        SMS: "Mensaje de texto (SMS)",
        PUSH: "Notificación push",
        WHATSAPP: "WhatsApp"
      },
      customClass: {
        confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
      },
      buttonsStyling: false,
      inputPlaceholder: "Selecciona un canal",
      showCancelButton: true,
      confirmButtonText: "Confirmar"
    });

    if (notificationType) {


      let notificationData = {};

      if (notificationType === "EMAIL") {
          // Solicitar el correo electrónico al usuario
    const { value: emailAddress } = await Swal.fire({
      title: 'Ingresa tu correo electrónico',
      input: 'email',
      inputPlaceholder: 'Correo electrónico',
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
      }
    });

    if (emailAddress) {
      notificationData = {
        type: "EMAIL",
        to: emailAddress,
        subject: "Pago exitoso",
        body: `¡Hola! Tu pago de $${amount} con ${type === "credit_card" ? "tarjeta de crédito" : type === "debit_card" ? "tarjeta débito" : "PayPal"} fue procesado exitosamente.`,
        cc: ["copiacorreo@correo.com"],
        bcc: ["oculto@correo.com"],
        attachments: [
          {
            filename: "recibo.pdf",
            url: "https://example.com/recibo.pdf"
          }
        ],
        priority: "alta"
      };
      // Crear el mensaje para el correo electrónico
      const subject = "Pago exitoso";
      const body = `¡Hola! Gracias por tu pago de $${amount}. Tu pago con ${type === "credit_card" ? "tarjeta de crédito" : type === "debit_card" ? "tarjeta débito" : "PayPal"} fue procesado exitosamente. ¡Gracias!`;

      // Generar el enlace para abrir el cliente de correo con el mensaje predefinido
      const emailLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Redirigir al usuario a su cliente de correo
      window.open(emailLink, '_blank'); // Esto abrirá el cliente de correo predeterminado en una nueva pestaña

      // Mostrar confirmación
      Swal.fire("Redirigiendo", "Te estamos redirigiendo a tu correo electrónico...", "success");
    } else {
      Swal.fire("❌ Error", "No se ingresó un correo electrónico válido", "error");
      return; // Si no se ingresa el correo, termina la ejecución
    }
        
      } else if (notificationType === "SMS") {
        notificationData = {
          type: "SMS",
          phoneNumber: "3013103390",
          message: `Tu pago fue exitoso por $${amount}.`,
          senderId: "PagosApp",
          deliveryReportRequired: true,
          scheduleTime: null // o una fecha en formato ISO: "2025-04-20T14:30:00Z"
        };
      } else if (notificationType === "WHATSAPP") {
        // Solicitar el número de WhatsApp si se selecciona la opción
        const { value: whatsappNumber } = await Swal.fire({
          title: 'Ingresa tu número de WhatsApp',
          input: 'text',
          inputPlaceholder: 'Número de WhatsApp',
          confirmButtonText: 'Enviar',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          customClass: {
            confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
            cancelButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
          }
        });
      
        // Verificar si el número de WhatsApp fue proporcionado
        if (whatsappNumber) {
          notificationData = {
            type: "WHATSAPP",
            phoneNumber: whatsappNumber, // Usar el número de WhatsApp ingresado
            message: `Tu pago de ${type==="credit_card"? "tarjeta credito": type === "debit_card"? "tarjeta debito":"paypal" } por $${amount} fue exitoso. ¡Gracias!`,
            mediaUrl: "https://example.com/recibo.jpg",
            caption: "Recibo de pago",
            interactiveButtons: [
              { type: "reply", title: "Ver Detalles" },
              { type: "reply", title: "Contactar Soporte" }
            ],
            language: "es"
          };

          const message = `Tu pago de ${type==="credit_card"? "tarjeta credito": type === "debit_card"? "tarjeta debito":"paypal" } por $${amount} fue exitoso. ¡Gracias!`
          // Generar el enlace para abrir WhatsApp con el mensaje
          const whatsappLink = `https://wa.me/57${whatsappNumber}?text=${encodeURIComponent(message)}`;
          
          // Redirigir al usuario a WhatsApp
          window.open(whatsappLink, '_blank'); // Esto abrirá WhatsApp en una nueva pestaña
      
          // Si quieres mostrar una notificación en pantalla que confirme que se redirige a WhatsApp:
          Swal.fire("Redirigiendo", "Te estamos redirigiendo a WhatsApp...", "success");
        } else {
          // Si no se ingresa un número, cancelar la operación
          Swal.fire("❌ Error", "No se ingresó un número de WhatsApp válido", "error");
          return; // Salir de la función si no se ingresa el número
        }
      } else if (notificationType === "PUSH") {
        notificationData = {
          type: "PUSH",
          deviceToken: "abc123def456ghi789",
          title: "Pago confirmado",
          message: `Se ha procesado correctamente tu pago de $${amount}.`,
          imageUrl: "https://example.com/pago.png",
          clickAction: "https://tuapp.com/confirmacion-pago",
          priority: "high"
        };
      }
      
      
      console.log("📩 Enviando notificación:", notificationData);


       // Enviar al backend
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
        <div className="mt-6 bg-gray-50 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">✅ Resultado del Pago</h3>
          <p><strong>Estado:</strong> {result.status}</p>
          <p><strong>Monto:</strong> ${result.amount}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
