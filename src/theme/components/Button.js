class DarkButton {
    render() {
        return { type: 'button', theme: 'dark', style: 'background-color: black; color: white;' };
    }
}

class LightButton {
    render() {
        return { type: 'button', theme: 'light', style: 'background-color: white; color: black;' };
    }
}

module.exports = { DarkButton, LightButton };
