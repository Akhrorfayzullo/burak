function getSquareNumbers(numbers) {
    return numbers.map(number => ({
      number: number,
      square: number * number
    }));
  }
  
  const result = getSquareNumbers([1, 2, 3]);
  console.log(result);
  
 

