const countChars = (str: string): { [key: string]: number } => {
    const charCount: { [key: string]: number } = {};

    for (const char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    return charCount;
}

console.log(countChars("hello")); 
console.log(countChars("test")); 
console.log(countChars("aabbcc")); 




