// import ReactDOM from 'react-dom' // import all the react dom things
import { useState } from 'react';
import { createRoot } from 'react-dom/client'; //only import partial things from react-dom 
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import Details from './Details';
import AdoptedPetContext from './AdoptedPetContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchParams from './SearchParams';

/*//just declaring the component, that is a function component that always return a markup  element
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
};*/

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, //its like a question that hey how long do you want me to cache things for our pet api, breedList and all our things
      cacheTime: Infinity, //its telling once you fetch something dont refetch it
    }
  }
})


//now with jsx, whatever you wrap in BrowserRouter is where BrowserRouter is going to be available for use
const App = () => {
  const adoptedPetHook = useState(null); //in this case, this is a whole hook
  return( //you have to put a return, because its like is just declared and never used
    <BrowserRouter> 
     <QueryClientProvider client={queryClient}>
      <AdoptedPetContext.Provider value={adoptedPetHook}>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Routes>
          <Route path="/details/:id" element={<Details />} /> 
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </AdoptedPetContext.Provider>
     </QueryClientProvider>
    </BrowserRouter>
  );
};

//BrowserRouter and QueryClientProvider manages also a context under the hood for all the things underneath them
///details/:id , the :id means that the id is a variable that is coming out of your path
//QueryClientProvider tag is only providing context to all the components underneath it.
// whats  <AdoptedPetContext.Provider value={adoptedPet}> doing? - It's making the adoptedPet available to any consumer of AdoptedPetContext inside of it
// -- for example now Details has the adoptedPet available, SearchParams as well
// --- value={adoptedPet} is a like a transportation method

//using it
const container = document.getElementById("root"); //access the tag/element by id from the dom
//const root = ReactDOM.createRoot(container); choosing only a method from ReactDOM
const root = createRoot(container);
//root.render(React.createElement(App)); // the createElement of react can also render directly components, also you can pass (App, {}, null) but no necesary
root.render(<App />); //jsx
//theory of components made up of components made up of components

//one way data flow:
//in this case i can pass data from App down to Pet component but cannot pass data from Pet to App

//live code inclusion: only includes code that you are using
