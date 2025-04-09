const ThemeFactory = require('./ThemeFactory');
const { DarkButton } = require('../components/Button');
const { DarkTextField } = require('../components/TextField');
const { DarkTable } = require('../components/Table');

class DarkThemeFactory extends ThemeFactory {
    createButton() {
        return new DarkButton();
    }

    createTextField() {
        return new DarkTextField();
    }

    createTable() {
        return new DarkTable();
    }
}

module.exports = DarkThemeFactory;
