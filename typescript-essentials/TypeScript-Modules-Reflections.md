# 🌟 Personal Reflections on Completed TypeScript Modules 

## 1. **Getting Started with TypeScript**

💡 **Central Concepts**

* TypeScript is a superset of JavaScript, it extends JS with additional features
* The core feature of TypeScript is its type system. 
* Through static type checking, TypeScript catches code issues early in development 
* Writing types can be optional in TypeScript, it can automatically infer the data type
* All JS code is also TS code, and a TS program can consume JavaScript


🎓 **Skills gained:**

* Learned TypeScript advantages over JavaScript in web development
* Learned to work in typescript playground
* TypeScript Installation
* Setting up TypeScript projects in Visual Studio Code


💻 **Practical Implementation**

* From this module I found out what is the TypeScript language, why it was created, it's code features and how to use it for 
* JavaScript development. 
* I set up a TypeScript development environment for future exercises. 
* Create my first .ts program, compiled it into .js and rendered into browser.


## 2. **Declare Variable Types in TypeScript**

💡 **Central Concepts**

* TypeScript enables you to add static types to your JavaScript code
* Explicit type annotations are optional in TypeScript
* If a variable wasn't assign to a type or initialized when it was declared, it would be inferred of type "any"
* Explicit type declarations is preferable,  it provide a documentation of your code intention
* All types in TypeScript are subtypes of a single top type called the any type.
* The void type exists purely to indicate the absence of a value
* The null and undefined types are subtypes of all other types
* Enumeration type, or enum, allows to create sets of constants for use with variables and properties.
* While flexible, the "any" type can cause unexpected errors. One should avoid using "any" when it's not necessary.
* The core feature of "unknown" - it is impossible to interact with a variable of type unknown
* To treat a variable as a different data type, one can use a type assertion, It tells the compiler, the developer knows what he is doing.
* The union type restricts the assignment of values to one of several specified types
* An intersection type combines two or more types to create a new type that has all properties of the existing types
* There are three sets of literal types available in TypeScript: string, number, and boolean
* Narrowing - The process of going from an infinite number of potential cases to a smaller, finite number of potential cases
* Tuples - an array that contains values of mixed types. To declare a Tuple, use the syntax variableName: [type, type, ...].


🎓 **Skills gained:**

* Get acquainted with types and subtypes in TypeScript.
* Get an understanding of the advantages of declaring typed variables in TypeScript.
* Variables declaration using primitive types, object types, union and intersection types.
* Get acquainted with core features of enum.
* Get acquainted with two forms of type assertion: (randomValue as string).toUpperCase(); (<string>randomValue).toUpperCase(); (as is preferred)
* Usage of Type guards, conditional test to learn the type of a variable
* Learned to use "unknown" type and "any" when needed, and got the difference
* Learned to work with union and intersection types


💻 **Practical Implementation**

* From this module I found out more details about TS types and it's usage
* Using enumerations: Helps reduce errors; Makes it easy to change values in the future; Makes code easier to read
* Using the any type allows to call: A property that doesn't exist for the type; randomValue as a function;   A method that only applies to a string type.
* Using union can be helpful when a value is received  from a library, an API, or user input
* Intersection types are most often used with interfaces to create a new intersection type with properties from both interfaces.
* Using literal types let to specify several values that a string, number or boolean can have (type testResult = "pass" | "fail" | "incomplete")