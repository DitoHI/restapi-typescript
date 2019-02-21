"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiply = (a, b) => {
    return a * b;
};
exports.divide = (a, b) => {
    return a / b;
};
exports.calculator = (a, b, c) => {
    switch (c) {
        case '+':
        case 'plus':
            return a + b;
        case '-':
        case 'minus':
            return a - b;
        case '*':
        case 'multiply':
            return a * b;
        case '/':
        case 'divide':
            return a / b;
        default:
            console.log('Invalid Operator');
    }
};
//# sourceMappingURL=mult.js.map