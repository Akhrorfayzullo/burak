
const calculateSumOfNumbers = (arr: any[]): number => {
    let sum = 0;

    for (const value of arr) {
        if (typeof value === 'number') {
            sum += value;
        }
    }

    return sum;
}

console.log(calculateSumOfNumbers([10, "10", {son: 10}, true, 35])); 
