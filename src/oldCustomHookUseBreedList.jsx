import {useState, useEffect} from 'react';

// the local cache will work as for example will take an animal and if its seen before, for example first i search dog and then cat and then go back to dog, its gonna
 //serve it from whatever from cache
 const localCache = {};

 //this custom hook where we are encapsulating other hooks like use state, use effect
 export default function useBreedList(animal) {
    const [breedList, setBreedList] = useState([]);
    const [status, setStatus] = useState("unloaded"); //unloaded, loading, loaded

    useEffect(() => { 
        if (!animal) { //if they pass me an empty string or null or undefined animal
            setBreedList([]);
        } else if (localCache[animal]) { //if i've seen the animal before in my local cache
            setBreedList(localCache[animal]);    
        } else { //if we call the requestBreedList this means that we did not have the animal before
            requestBreedList(); //this is a promise in js
        }
        
        async function requestBreedList() { //this function is inside the effect since first React encourage to do it in that way and then it makes sense to group all of these things together when the effect happens to all this thing, same time, same closure
          setBreedList([]);
          setStatus("loading");     
          const res = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);
          const json = await res.json();
          localCache[animal] = json.breeds || []; //save the new data to the cache
          setBreedList(localCache[animal]);
          setStatus("loaded");      
          //same to above code
          //const persons = [];
          //localcache["gato"] = {name: "pedro", age:23, lastname: "patuurro"};
          //setBreedList({name: "pedro", age:23, lastname: "patuurro"});
        }
    }, [animal]); // when this effect will re run? - everytime that the animal changes

    return [breedList, status]; //practically we will ignore the status, its more for testing porpouses
 }