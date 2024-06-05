// Compiled languages: Java, GoLang, C,C++,C#,Rust  => Compiling & Running

//Interpreted Languages: NodeJs, Python,PHP, Ruby => Running

//TypeScript da 2 hil type boladi Primitive va Object types
// let  box: string = "hello"
//let countrer: number = 100
//let stage: number |  string = "hello"
//let stage = 101

//interface
// interface Person{
//   name:string,
//   age: nullumber,
//   nation: string
// }
// const person: Person = {
//   name: "Adam",
//   age: 25,
//   nation: Uzbekistan
// }

// let skills: (string | number) [];
// skills = ['problem solving', "creative thinking", "24"]

// class Person{
//   age: number
//   firstName: string
//   lastName: string

//   constructor(age: number,firstName: string,lastName: string){
//     this.age = age
//     this.firstName = firstName
//     this.lastName = lastName
//   }

// }

// const person1 = new Person (23, "Adam", "Jimmy")

const arrayy: number[] = [5, 21, 12, 21, 8];
const getHighestIndex = (numbers: number[]) => {
    return numbers.indexOf(Math.max(...numbers));
  };
  
  const result = getHighestIndex(arrayy);
  console.log("The first maximum value of the index is", result);
  console.log(getHighestIndex([1, 2, 3, 4, 5]));   
  console.log(getHighestIndex([10, 9, 8, 10, 7])); 