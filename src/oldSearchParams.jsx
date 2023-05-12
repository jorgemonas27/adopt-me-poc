import { useState, useEffect } from 'react';
import useBreedList from './useBreedList';
import Results from './Results';
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const OldSearchParams = () => {
    const [location, setLocation] = useState(""); 
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [pets, setPets] = useState([]);
    const [breeds] = useBreedList(animal);

    useEffect(() => { //the effect runs every single time after that you re render the component
        requestPets();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps, 
      //the second parameter are the dependencies

    /*  useEffect(() => {
        requestPets(); 
        }); //rerun everytime

        useEffect(() => {
        requestPets(); 
    }, [animal]); THIS WILL TELL REACT hey everytime that animal changes i want you to re run the request pets or run the effect

     useEffect(() => {
        requestPets();
    }, [location]); THIS WILL TELL REACT hey everytime that location changes i want you to re run the request pets or run the effect

     useEffect(() => {
        requestPets();
    }, [breed]); THIS WILL TELL REACT hey everytime that breed changes i want you to re run the request pets or run the effect

     useEffect(() => {
        requestPets();
    }, [animal, location, breed]);THIS WILL TELL REACT hey everytime that location,animal,breed changes i want you to re run the request pets or run the effect 
    */   

    /* why the empty array of dependecies?
    - you’re basically telling to the effect hey when do i run this effect again? 
    and with the empty array as a dependency the answer will be never run this again, run it once, after that very first time, never do it again
    */

    async function requestPets() {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        const json = await res.json();
        setPets(json.pets);
    }


   /* const locationHook = useState(""); //this will return an array
    const location = locationHook[0];
    const setLocation = locationHook[1];*/ //those 3 lines are equivalent to the hook line

    return ( //put the parentheses to tell javascript that im going to the next line
        <div className="search-params">
            <form onSubmit={(e) => { //this is a controlled form not the best way to do forms
                e.preventDefault(); //prevents the form from actually literally
                requestPets();
            }}>
                <label htmlFor="location">
                    Location
                    <input onChange={e => setLocation(e.target.value) } id="location" value={location} placeholder="Location"></input>
                </label>
                <label htmlFor="animal">
                    Animal
                    <select //curly {} for introduce js code, 
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value)
                            setBreed("");
                        }}>
                       <option/>
                       {
                         ANIMALS.map(animal => {
                           return( 
                            <option key={animal}>{animal}</option>
                           )})
                       }          
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select //curly {} for introduce js code, 
                        id="breed"
                        value={breed}
                        onChange={e => setBreed(e.target.value)}
                        disabled={breeds.length === 0} >
                       <option/>
                       {
                         breeds.map(breed => {
                           return( 
                            <option key={breed}>{breed}</option>
                           )})
                       }          
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <Results pets={pets}/>
        </div> //className is the class atribute used for css and js
    );
};

export default OldSearchParams;