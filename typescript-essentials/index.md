# ✈️ My TypeScript Journey

* [TypeScript-Badges-Compilation.md](https://rolling-scopes-school.github.io/tetiana-ket-JSFE2023Q4/typescript-essentials/TypeScript-Badges-Compilation)

* [TypeScript-Modules-Reflections.md](https://rolling-scopes-school.github.io/tetiana-ket-JSFE2023Q4/typescript-essentials/TypeScript-Modules-Reflections)

## 🏆 Earned Badges Overview

Here is a collection of badges I earned from completing Microsoft Learn's TypeScript modules:

1. **Getting Started with TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/TetianaKETTetianaShpakova-3189/YVH5P4VR?sharingId=7B597E88B249D320)
2. **Declare Variable Types in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/TetianaKETTetianaShpakova-3189/ZPFCH7E2?sharingId=7B597E88B249D320)
3. **Implement Interfaces in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/TetianaKETTetianaShpakova-3189/YVH5P4VR?sharingId=7B597E88B249D320)
4. **Develop Typed Functions in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/TetianaKETTetianaShpakova-3189/7EN3B8NZ?sharingId=7B597E88B249D320)
5. **Declare and Instantiate Classes in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/TetianaKETTetianaShpakova-3189/3XLTCT4H?sharingId=7B597E88B249D320)
6. **Generics in TypeScript**: [Badge](badge-link)
7. **Work with External Libraries in TypeScript**: [Badge](badge-link)
8. **Organize Code with Namespaces in TypeScript**: [Badge](badge-link)


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
* Get acquainted with two forms of type assertion: ```(randomValue as string).toUpperCase(); (<string>randomValue).toUpperCase();``` (as is preferred)
* Usage of Type guards, conditional test to learn the type of a variable
* Learned to use "unknown" type and "any" when needed, and got the difference
* Learned to work with union and intersection types


💻 **Practical Implementation**

* From this module I found out more details about TS types and it's usage
* Using enumerations: Helps reduce errors; Makes it easy to change values in the future; Makes code easier to read
* Using the any type allows to call: A property that doesn't exist for the type; randomValue as a function;   A method that only applies to a string type.
* Using union can be helpful when a value is received  from a library, an API, or user input
* Intersection types are most often used with interfaces to create a new intersection type with properties from both interfaces.
* Using literal types let to specify several values that a string, number or boolean can have ```(type testResult = "pass" | "fail" | "incomplete")```

## 3. **Implement Interfaces in TypeScript**

💡 **Central Concepts**

* An interface describes the properties and return types, while a function or class defines the implementation details.
* A type alias cannot be reopened to add new properties whereas an interface is always extendable.
* The TypeScript coding guidelines suggest interfaces should not start with the letter I
* Properties of an interface can be required, optional(firstName?), or read only (readonly firstName: string;).


🎓 **Skills gained:**

* Understanding of the difference between an interface and a type alias 
* Declaring and implementing an interface
* Extending an interface with one or more interfaces
* Create indexable types
* Interface usage


💻 **Practical Implementation**

* Use interfaces to describe an object, naming and parameterizing the object's types, and to compose existing named object types into new ones. After defining an interface, you can use it as a type.
* You can use an interface to:
  - Create shorthand names for commonly used types.
  - Ensure that proper values are being passed into properties, constructors, or functions, especially when working with a team.
  - Describe existing JavaScript APIs and clarify function parameters and return types. The interface provides you with a clear understanding of what an API is expecting and what it will return.

## 4. **Develop Typed Functions in TypeScript**

💡 **Central Concepts**

* TS supports - Named function declarations, function expression (or anonymous function), Arrow functions
* TypeScript parameters are required by default, but can be made optional.
* When a function is called, the TypeScript compiler verifies:
  - A value has been provided for each parameter.
  - Only parameters that the function requires are passed to it.
  - The parameters are passed in the order in which they're defined in the function.
* TS allows to define functions with optional, default, and rest parameters, as well as deconstructed object parameters.
* Optional parameters must come after any required parameters in the parameter list. 
* Default parameters must come after required parameters in the parameter list.


🎓 **Skills gained:**

* Understanding ot the benefits of using types in functions.
* Work with functions that have required, optional, default, and rest parameters.
* Function types definition using type aliases or interfaces.


💻 **Practical Implementation**

* Adding types to functions helps prevent you from passing values that you shouldn't pass to your functions
* To apply the same function type signature to more than one function, function type can be defined and then used when creating a function.
* When defining a function type, an interface is better if you want to have the option of extending the function type; a type alias is better if you want to use unions or tuples.
* Using typed functions helps catch errors early in the development process and provides better documentation and code readability.
* Common use for an anonymous function is to assign a function expression to a variable


## 5. **Declare and Instantiate Classes in TypeScript**

💡 **Central Concepts**

* Classes are another way to define the shape of an object, in addition to describing object types with interfaces and functions
* Class is a blueprint for building objects. It describes the attributes of an object and behaviors it can perform, but to assign property values an instance of an object must be build first. 
* When one class extends another, it includes all of the properties and methods of the class it extends, plus its own unique attributes and behaviors.
* Properties of a class are just raw data that is passed to the object when it's initialized.
* A class may contain at most one constructor declaration. If a class contains no constructor declaration, an automatic constructor is provided.
* TypeScript allows to control the visibility of class members by adding the public, private, or protected keyword before the member name.
  - private members cannot be accessed from outside of its containing class.
  - protected members can also be accessed within deriving classes.
  - readonly modifier makes properties readonly, it may only be set when initialized at their declaration or in the constructor.
* For two types to be considered compatible, if one of them has a private member, then the other must have a private member that originated in the same declaration. The same applies to protected members.
* Static properties and methods are shared by all instances of a class.
* The syntax ```className.propertyName``` is used instead of ```this```, when accessing the static property.
* When a derived class has a different definition for one of the member functions of the base class, the base function is said to be overridden.
* The ```super()``` keyword in the body of the constructor executes the constructor of the base class, to include the parameters from the base class. It must appear before any references to ```this```.
* Classes allow to define implementation details - methods, fields, and properties. Interfaces solely define how data is structured.


🎓 **Skills gained:**

* Usage of TypeScript classes to describe the shape of objects.
* Declaration of a class using TypeScript.
* Instantiation of a class using TypeScript.
* Learned to apply access modifiers to a class.
* Static properties definition in a class.
* Class extension with another class.
* Declaration of an interface to ensure class shape.
* Understanding when to use an interface or a class to define the structure of an object.


💻 **Practical Implementation**

* Accessors are used to control access to values, such as implementing validation, or to calculate values dynamically.
* Get and Set accessors can be used to validate data, impose constraints, or other manipulation of the data.
* Inheritance is used to extend a class and create a new class that will inherit properties and methods of the parent class but can also have its own unique attributes and behaviors. It
* Inheritance makes code reusable, helps you avoid redundancy.
* Centralized Code Modification - Instead of having to make code changes in many different classes that have similar functionality, you just need to make the changes once in the base class.
* Use an interface to define how data will be structured. You can use interfaces to define parameter objects for functions, define the structure for various framework properties, and define how objects look from remote services or APIs.
* Interfaces do not require a class. what allows to use them whenever is a need to define a data structure without having to create a full class implementation.

## 6. **Generics in TypeScript**

💡 **Central Concepts**

* 
* 
* 
* 
* 


🎓 **Skills gained:**

* 
* 
* 
* 
* 


💻 **Practical Implementation**

* 
* 
* 
* 

## 7. **Work with External Libraries in TypeScript**

💡 **Central Concepts**

* 
* 
* 
* 
* 


🎓 **Skills gained:**

* 
* 
* 
* 
* 


💻 **Practical Implementation**

* 
* 
* 
* 

## 8. **Organize Code with Namespaces in TypeScript**

💡 **Central Concepts**

* 
* 
* 
* 
* 


🎓 **Skills gained:**

* 
* 
* 
* 
* 


💻 **Practical Implementation**

* 
* 
* 
* 
