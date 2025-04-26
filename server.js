// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
app.use(cors());

//Controllers
const paymentController = require('./src/controllers/paymentController');

//Prototype
const PDFReport = require ('./src/prototype/PDFReportProto')


// Theme factories 
const DarkThemeFactory = require('./src/theme/factories/DarkThemeFactory');
const LightThemeFactory = require('./src/theme/factories/LightThemeFactory');


// Notification Builders & Director
const EmailNotificationBuilder = require('./src/builders/EmailNotificationBuilder');
const SMSNotificationBuilder = require('./src/builders/SMSNotificationBuilder');
const PushNotificationBuilder = require('./src/builders/PushNotificationBuilder');
const WhatsAppNotificationBuilder = require('./src/builders/WhatsAppNotificationBuilder');
const NotificationDirector = require('./src/NotificationDirector');

// PDF Report Builder & Director
const PDFReportBuilder = require('./PDFReportBuilder');
const ReportDirector = require('./src/ReportDirector');


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

//almacenar las notificaciones
const notifications = []; // ← simulando almacenamiento

/* NOTIFICATION - Builder Pattern */
app.post('/notification', (req, res) => {
    const { type, ...data } = req.body;

    let builder;
    switch (type) {
        case 'EMAIL':
            builder = new EmailNotificationBuilder();
            break;
        case 'SMS':
            builder = new SMSNotificationBuilder();
            break;
        case 'PUSH':
            builder = new PushNotificationBuilder();
            break;
        case 'WHATSAPP':
            builder = new WhatsAppNotificationBuilder();
            break;
        default:
            return res.status(400).json({ error: 'Tipo de notificación no válido' });
    }

    const director = new NotificationDirector(builder);
    const notification = director.construct({ type, ...data });

    notifications.push(notification); // ← guardamos la notificación

    return res.json(notification);
});

// traer las notificaciones
app.get('/notification', (req, res) => {
    res.json(notifications);
});


// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use('/reports', express.static(path.join(__dirname, 'public')));


//almacenar los reportes
const reports = [];

// Endpoint para crear el reporte PDF
app.post('/report', (req, res) => {
    const config = req.body;
  
    try {
        const builder = new PDFReportBuilder();
        const director = new ReportDirector(builder);


        const report = director.construct(config);
        
      
        reports.push(report); // Guardamos el reporte

        res.json(report); // Enviar la URL del reporte generado
    } catch (error) {
        console.error('Error al generar el reporte:', error);
        res.status(500).json({ message: 'Error al generar el reporte PDF.' });
    }
});


//traer los reportes
app.get('/report', (req, res) => {
    res.json(reports);
});


//Prototype
app.post('/report/clone/:index', (req, res) => {
    const { index } = req.params;

    if (index < 0 || index >= reports.length) {
        return res.status(404).json({ message: 'Reporte no encontrado' });
    }

    const originalReport = reports[index];
    const clonedReport = new PDFReport(originalReport); // ← aquí aplicas Prototype creando un clon

    reports.push(clonedReport); // Guardamos el clon

    res.json(clonedReport); // Retornamos el clon
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
