const fs = require('fs');
const path = require('path');

describe('Weather Alerts App', () => {
    beforeEach(() => {
        const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
        document.documentElement.innerHTML = html;
        jest.resetModules();
        require('../script.js');
    });

    test('clears the input field after clicking fetch', () => {
        const input = document.getElementById('state-input');
        const button = document.getElementById('get-alerts-btn');
        input.value = 'NY';
        button.click();
        expect(input.value).toBe('');
    });

    test('displays the error message div', () => {
        const errorDiv = document.getElementById('error-message');
        expect(errorDiv).toBeTruthy();
    });
});
