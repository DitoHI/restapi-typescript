export function multiply(a: number, b: number): number {
    return a * b;
}

export function sum(a: number, b: number): number {
    return a + b;
}

export function minus(a: number, b: number): number {
    return a - b;
}

export function divide(a: number, b: number): number {
    return a / b;
}

export function pow(a: number, b: number): number {
    let total: number = 0;

    if (b === 0) {
        total = 1;
    } else {
        for (let i: number = 0; i < b; ++i) {
            if (i !== 0) {
                total *= a;
            } else {
                total = a;
            }
        }
    }
    return total;
}
