const sumEvens = (nums: number[]): number => {
    let sum = 0;

    for (const num of nums) {
        if (num % 2 === 0) {
            sum += num;
        }
    }

    return sum;
}

console.log(sumEvens([1, 2, 3])); 
console.log(sumEvens([4, 5, 6, 7]));





