//today Reja 
// 1 getusers
//update Chosen users
 

const palindromCheck = (word: string): boolean => {
    
    const cleanedWord = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    const reversedWord = cleanedWord.split('').reverse().join('');

    
    return cleanedWord === reversedWord;
}


console.log(palindromCheck("dad")); 
console.log(palindromCheck("son"));
console.log(palindromCheck("Falastin")); 
