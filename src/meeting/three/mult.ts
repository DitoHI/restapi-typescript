export let multiply = (a: number, b: number): number => {
    return a * b;
};

export let divide = (a: number, b: number): number => {
    return a / b;
};

export let calculator = (a: number, b: number, c: string): number => {
    switch (c) {
        case "+" :
        case "plus" :
            return a + b;
        case "-" :
        case "minus" :
            return a - b;
        case "*" :
        case "multiply" :
            return a * b;
        case "/" :
        case "divide" :
            return a / b;
        default :
            console.log("Invalid Operator");
    }
};
