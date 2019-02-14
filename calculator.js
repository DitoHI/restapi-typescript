function multiply(a, b){
    console.log(a*b);

    return (a * b);
}

function pow(a, b) {
    var sum = 0;
    for (let i = 0; i < b; ++i) {
        if (i = 0) {
            sum = a;
        } else {
            sum *= a;
        }
    }
    return sum;
}

function divide(a,b)
{
    console.log(a/b);
    return a/b;
}

function sum(a, b){
    console.log(a + b);
    return a + b;
}