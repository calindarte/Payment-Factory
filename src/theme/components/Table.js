class DarkTable {
    render() {
        return { type: 'table', theme: 'dark', style: 'background-color: #222; color: white;' };
    }
}

class LightTable {
    render() {
        return { type: 'table', theme: 'light', style: 'background-color: white; color: black;' };
    }
}

module.exports = { DarkTable, LightTable };
