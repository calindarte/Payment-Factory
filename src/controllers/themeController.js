const ThemeService = require('../services/ThemeService');

const getThemeComponents = (req, res) => {
    const mode = req.query.mode || 'light'; // <- aquí el frontend puede pasar ?mode=dark o ?mode=light
    const themeService = new ThemeService(mode);
    const components = themeService.getUIComponents();

    res.json(components); // <- AQUÍ es donde el frontend debe consumir y renderizar los componentes con estilos
};

module.exports = { getThemeComponents };
