const calculate = (num: string): number => {
    const parts = num.split('+');
    
    const sum = parts.reduce((total, num) => total + parseFloat(num), 0);
    
    return sum;
}

console.log(calculate("10+20+30")); 
console.log(calculate("5.5+4.5"));
  

