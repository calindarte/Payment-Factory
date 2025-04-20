// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors());

//Controllers
const paymentController = require('./src/controllers/paymentController');


// Theme factories 
const DarkThemeFactory = require('./src/theme/factories/DarkThemeFactory');
const LightThemeFactory = require('./src/theme/factories/LightThemeFactory');


// Notification Builders & Director
const EmailNotificationBuilder = require('./src/builders/EmailNotificationBuilder');
const SMSNotificationBuilder = require('./src/builders/SMSNotificationBuilder');
const PushNotificationBuilder = require('./src/builders/PushNotificationBuilder');
const WhatsAppNotificationBuilder = require('./src/builders/WhatsAppNotificationBuilder');
const NotificationDirector = require('./src/directors/NotificationDirector');

// PDF Report Builder & Director
const PDFReportBuilder = require('./src/builders/PDFReportBuilder');
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

//almacenar los reportes
const reports = [];

/* PDF REPORT - Builder Pattern */
app.post('/report', (req, res) => {
    const config = req.body;

    const builder = new PDFReportBuilder();
    const director = new ReportDirector(builder);

    const report = director.construct(config);
    reports.push(report); // ← guardamos el reporte

    return res.json(report);
});

//traer los reportes
app.get('/report', (req, res) => {
    res.json(reports);
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
