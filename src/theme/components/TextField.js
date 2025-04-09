class DarkTextField {
    render() {
        return { type: 'textField', theme: 'dark', style: 'background-color: #333; color: white;' };
    }
}

class LightTextField {
    render() {
        return { type: 'textField', theme: 'light', style: 'background-color: #f9f9f9; color: black;' };
    }
}

module.exports = { DarkTextField, LightTextField };
