//Task H
function getDigits(input: string): string {
  let result = '';
  for (let a of input) {
      if (a >= '0' && a <= '9') {
          result += a;
      }
  }
  return result;
}

const result = getDigits("m14i1t");
console.log(result); 