const ThemeFactory = require('./ThemeFactory');
const { LightButton } = require('../components/Button');
const { LightTextField } = require('../components/TextField');
const { LightTable } = require('../components/Table');

class LightThemeFactory extends ThemeFactory {
    createButton() {
        return new LightButton();
    }

    createTextField() {
        return new LightTextField();
    }

    createTable() {
        return new LightTable();
    }
}

module.exports = LightThemeFactory;
