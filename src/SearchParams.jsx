import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query'
import AdoptedPetContext from './AdoptedPetContext';
import fetchSearch from './fetchSearch';
import useBreedList from './useBreedList';
import Results from './Results';
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];


//now the form within the component will be a uncontrolled form
const SearchParams = () => {
    //we are not going to track the location, breed anymore, since now we want to only search when the submit button is clicked
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal:"",
        breed:"",
    });
    const [animal, setAnimal] = useState("");
    const [breeds] = useBreedList(animal);
    const [adoptedPet, _] = useContext(AdoptedPetContext); //here we are going to only read so we dont need the funtion setAdoptedPet

    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];
    
    return (
        <div className="search-params">
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target) //this is a browser api, you can fill a form and then it will pull out all of the data on the form into an object
                const obj = {
                    animal: formData.get("animal") ?? "",
                    breed: formData.get("breed") ?? "",
                    location: formData.get("location") ?? "",
                };
                setRequestParams(obj);    
            }}>
                {
                    adoptedPet ? (
                        <div className="pet image-container">
                            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
                        </div>
                    ) : null

                }
                <label htmlFor="location">
                    Location
                    <input name="location" id="location" placeholder="Location"></input>
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        name = "animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value)
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
                    <select
                        id="breed"
                        name="breed"
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
        </div>
    );
};

export default SearchParams;