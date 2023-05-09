import React from 'react';
// import ReactDOM from 'react-dom' // import all the react dom things
import { createRoot } from 'react-dom'; //only import partial things from react-dom 
 
//declaring the component
const Pet = (props) => {
  return React.createElement("div", "{}", [
    //array of components
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ]);
};

//just declaring the component, that is a function component that always return a markup  element
const App = () => {
  //App is the name of the component always is required to capitalize the name of the components
  return React.createElement(
    //create html tags in the dom
    "div", //the element that you want to create p,div,link,h1,h2,etc, you can render everything that you want xD "its-not-a-dic" will render that tag
    {}, // {} or null, will be the attributes of the element the id, class name, style, etc, e.g id: "my-id"
    [
      React.createElement("h1", {}, "Adopt Me!"), // the third thing is the children element <div><h1></h1><div>
      React.createElement(Pet, {
        animal: "Dog",
        name: "Luna",
        breed: "Havanese",
      }), //you can also give properties to the component that you are passing as a parameter
      React.createElement(Pet, {
        animal: "Bird",
        name: "Pepper",
        breed: "Cockatiel",
      }),
      React.createElement(Pet, {
        animal: "Cat",
        name: "Doink",
        breed: "Mixed",
      }),
    ]
  );
};

//using it
const container = document.getElementById("root"); //access the tag/element by id from the dom
//const root = ReactDOM.createRoot(container); choosing only a method from ReactDOM
const root = createRoot(container);
root.render(React.createElement(App)); // the createElement of react can also render directly components, also you can pass (App, {}, null) but no necesary

//theory of components made up of components made up of components

//one way data flow:
//in this case i can pass data from App down to Pet component but cannot pass data from Pet to App

//live code inclusion: only includes code that you are using
