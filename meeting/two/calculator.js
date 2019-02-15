function multiply(a, b){
    console.log(a*b);
}

function sum(a, b){
    console.log(a + b);
    return a + b;
}

function pow(a, b) {
    var sum = 0;
    if (b !== 0) {
        for (let i = 0; i < b; ++i) {
            if (i === 0) {
                sum = a;
            } else {
                sum *= a;
            }
        }
    } else {
        sum = 1;
    }
    return sum;
}

function divide(a,b)
{
    console.log(a/b);
    return a / b;
}

console.log(pow(2, 0));
