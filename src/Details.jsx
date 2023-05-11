import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import fetchPet from './fetchPet';


/* how useParams() works? 
- basically because of the context, and the BrowserRouter that is making this thing called context available to components underneath it,
so when i use useParams() i said ok i asume that a browser router is available so im going to reach into a browser router and pull out something called id
in other words is coming from the browser component
*/

const Details = () => {
    const { id } = useParams();
    //here we give a it a key (id) of what we're requesting
    //(["details", id], fetchPet) 
    //the id is from the animal that we want to fetch
    //the details could be any arbitrary caching key, is like a key from where the data will be store in the cache
    //the fetchPet method its like we said ok if you dont have that in your cache run this method
    //for example if you dont hahve "details": 5 in your cache run fetchPet and get it
    const results = useQuery(["details", id], fetchPet); 

    if(results.isLoading) { //inmediatly the user will see something loading
        return (
            <div className="loading-pane">
                <h2 className="loader">🌀</h2>
            </div>
        );
    }

    //and then as soon as fetchPet completes, its going to go and re render with the correct info
    const pet = results.data.pets[0]; //thats how it comes back from the api

    return(
        <div className="details">
            <div>
                <h1>{pet.name}</h1>
                <h2>{pet.animal} - {pet.breed} - {pet.city} - {pet.state}
                    <button>Adopt {pet.name}</button>
                    <p>{pet.description}</p>
                </h2>
            </div>
        </div>
    );
};

export default Details;