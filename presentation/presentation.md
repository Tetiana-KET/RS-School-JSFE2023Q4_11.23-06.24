- 🎥 **VIDEO: [link](https://www.youtube.com/watch?v=Ex10GjRSxys)**
- 📷 **PRESENTATION: [link](https://662e28923c7ed9abe653036d--sunny-moonbeam-a5aa78.netlify.app/)**
- 📝 **Speaker Notes**

**1.** Title Slide: Exploring React.js
Today, I want to dive into the React.js library, that has become extremely popular nowadays.
It allows developers to create reusable UI components, making it easier to manage complex user interfaces in large-scale web applications by building user interfaces out of individual pieces called components.
In todays presentation,
We will delve into brief react history,
Explore the core concepts of React.js,
Learn how to create and nest components,
How to add markup and styles, and display data

**2.** Introduction to React.js
Back in 2011, the developers at Facebook started to face some issues with code maintenance. So, Jordan Walke built a prototype that made the process more efficient, and this marks the birth of React.js. It was first released in may 2013.
Fun Fact: The audience was skeptical. Most people thought React was a huge step backward. 2014 is The year of Expansion when React had gradually gained its reputation and from 2016 – React becomes mainstream

**3.** ReactJS core concepts include components, VDOM , JSX, state, and props.

- The Virtual DOM is an abstract representation of the actual DOM.
  It’s stored in memory and is not directly visible to users.
  React maintains a lightweight copy of the UI in the Virtual DOM.
  The VDOM serves as an intermediary between your React components and the real DOM. Understanding the Virtual DOM can help developers write more efficient and performant ReactJS applications.
- How Does It Work?
  When you make changes to your React components (e.g., updating state or props), React creates a new Virtual DOM.
  React then compares this new VDOM with the previous one.
  It identifies the differences between the two representations.
  Finally, React updates only the necessary parts of the real DOM based on these diffs.

- Benefits of the Virtual DOM:
  Efficiency: By minimizing direct DOM manipulation, React improves performance.
  Batch Updates: React batches multiple changes together, reducing the number of DOM updates.
  Declarative API: You describe the desired UI state, and React handles the rest.
  Abstraction: Developers don’t need to manually manipulate attributes or events on the real DOM.

**4.** Components

- What is a React Component?
  In React, a component is a reusable building block,
  a piece of the UI (user interface) that has its own logic and appearance.
- Why do we need it
  Components allow you to break down your application into smaller, manageable parts.
  **A component can be as small as a button, or as large as an entire page.**
  The key points about components are:
  Modularity: Components promote modularity by dividing your UI into smaller, self-contained units.
  Reusability: You can reuse components across different parts of your application.|
  Composition: Components can be combined to create more complex UIs.

**5.** Creating and nesting a React Component:
Functional Components are simple JavaScript functions that return JSX (JavaScript XML) elements.
Once you’ve declared one component, you can nest it into another component.
Notice that React component names must always start with a capital letter, while HTML tags must be lowercase.

**6.** Class Components are ES6 classes that extend React.Component. They are still supported by React, but are not recommend to be used in new code.
The only method you must define in a React.Component subclass is called render(). All the other methods described on this page are optional.
**7.** JSX
JSX (JavaScript XML) is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file.
NOTE it is necessary to close tags.
The component also can’t return multiple JSX tags.
They should be wrapped into a shared parent, like a <div>...</div> or an empty angle brackets <>...</>

**8.** Props (short for “properties”) and state are both plain JavaScript objects.
Props are a way to pass the data or properties from one component to other components

State is a built-in object in React that allows components to manage their own data
It exists and can be used inside the component, cannot be accessed or modified outside the component. Works very similarly to a variable that is declared inside a function that cannot be accessed outside the scope of the function in javascript.
State Can be modified using this.setState.
The main significant difference between states and props is that props are used to transfer data from a parent component to a child whereas states are used to manage the data inside a component itself.

**9.** Adding class
In React, you specify a CSS class with className. It works the same way as the HTML class attribute. Then you write the CSS rules for it in a separate CSS file
**10.** Displaying data
JSX lets you put markup into JavaScript. Curly braces let you embed some variable from your code and display it to the user.
You can also pass variable to attributes, but you have to use curly braces. In the example, className="avatar" passes the "avatar" string as the CSS class, but src={user.imageUrl} reads the JavaScript user.imageUrl variable value, and then passes that value as the src attribute.

**11.** You can put more complex expressions inside the JSX curly braces too, for example, string concatenation. In this example, style={{}} is not a special syntax, but a regular {} object inside the style={ } JSX curly braces. You can use the style attribute when your styles depend on JavaScript variables.

**12.** Summary
React is a declarative JavaScript library for creating user interfaces. It allows you to assemble a complex UI from small, isolated pieces of code called “components.”
Components are the building blocks of ReactJS applications and can be reused across different parts of the application. ReactJS has become a popular choice for building web applications due to its ease of use and flexibility. Its virtual DOM allows for efficient rendering and updating of components. Additionally, ReactJS provides a robust ecosystem of libraries and tools, making it easy to integrate with other frameworks and technologies. ReactJS also allows for code reusability, which can save developers time and effort when building complex applications.
JSX is a syntax extension of JavaScript that allows developers to write HTML-like code within JavaScript. Any valid JavaScript expression inside curly braces are availible.
