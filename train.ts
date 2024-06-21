function countVowels(sentence: string): number {
    const vowels = 'aeiouAEIOU';
    
    let count = 0;
    
    for (const char of sentence) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    
    return count;
}

console.log(countVowels("string")); 
console.log(countVowels("I come from here Uzbekistan")); 

 

