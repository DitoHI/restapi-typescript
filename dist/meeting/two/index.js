"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function multiply(a, b) {
    return a * b;
}
exports.multiply = multiply;
function sum(a, b) {
    return a + b;
}
exports.sum = sum;
function minus(a, b) {
    return a - b;
}
exports.minus = minus;
function divide(a, b) {
    return a / b;
}
exports.divide = divide;
function pow(a, b) {
    let total = 0;
    if (b === 0) {
        total = 1;
    }
    else {
        for (let i = 0; i < b; i = i + 1) {
            if (i !== 0) {
                total *= a;
            }
            else {
                total = a;
            }
        }
    }
    return total;
}
exports.pow = pow;
//# sourceMappingURL=index.js.map