import { useState } from 'react';
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
const breeds = [];

const SearchParams = () => {
    const [location, setLocation] = useState(""); 
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
   /* const locationHook = useState(""); //this will return an array
    const location = locationHook[0];
    const setLocation = locationHook[1];*/ //those 3 lines are equivalent to the hook line

    return ( //put the parentheses to tell javascript that im going to the next line
        <div className="search-params">
            <form>
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
        </div> //className is the class atribute used for css and js
    );
};

export default SearchParams;