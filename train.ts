const arrayy: number[] = [5, 21, 12, 21, 8];
const getHighestIndex = (numbers: number[]) => {
    return numbers.indexOf(Math.max(...numbers));
  };
  
  const result = getHighestIndex(arrayy);
  console.log("The first maximum value od the index is:", result);
  console.log(getHighestIndex([1, 2, 3, 4, 5]));   
  console.log(getHighestIndex([10, 9, 8, 10, 7])); 