const DarkThemeFactory = require('../theme/factories/DarkThemeFactory');
const LightThemeFactory = require('../theme/factories/LightThemeFactory');

class ThemeService {
    constructor(mode = 'light') {
        this.factory = mode === 'dark' ? new DarkThemeFactory() : new LightThemeFactory();
    }

    getUIComponents() {
        const button = this.factory.createButton().render();
        const textField = this.factory.createTextField().render();
        const table = this.factory.createTable().render();

        return { button, textField, table };
    }
}

module.exports = ThemeService;
