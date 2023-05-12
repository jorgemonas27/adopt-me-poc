import { useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';
import ErrorBoundary from './ErrorBoundary';
import Carousel from './Carousel';
import fetchPet from './fetchPet';
import Modal from './Modal';

/* how useParams() works? 
- basically because of the context, and the BrowserRouter that is making this thing called context available to components underneath it,
so when i use useParams() i said ok i asume that a browser router is available so im going to reach into a browser router and pull out something called id
in other words is coming from the browser component
*/

const Details = () => {
    const [showModal, setShowModal] = useState(false);
    //navigate will be use to route someone back to the home page
    const navigate = useNavigate(); //this is a function from react router and is just a function to programmatically reroute someone to somewhere 
    // eslint-disable-next-line no-unused-vars
    const [_, setAdoptedPet] = useContext(AdoptedPetContext); //_ function that im not gonna use it
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
            <Carousel images={pet.images} />
            <div>
                <h1>{pet.name}</h1>
                <h2>{pet.animal} - {pet.breed} - {pet.city} - {pet.state}
                    <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
                    <p>{pet.description}</p>
                    {
                        showModal ?
                        (
                            <Modal>
                                <div>
                                    <h1>Would you like to adopt {pet.name}?</h1>
                                    <div className="buttons">
                                        <button onClick={() => {
                                        setAdoptedPet(pet); //we set the pet to the AdoptedPetContext
                                        navigate("/");
                                        }}>Yes</button>
                                        <button onClick={() => setShowModal(false)}>No</button>
                                    </div>
                                </div>
                            </Modal>
                        ) : null //rendering null does nothing
                    }
                </h2>
            </div>
        </div>
    );
};
//we are not reciving props in details and thats a problem coz if for whatever reason we started passing props to details they were not use properly 
function DetailsErrorBoundary(props) { //these props are generic props
    return(
        <ErrorBoundary errorComponent={ //the errorComponent makes the error boundary more reusable
            <h2>
            There was an error with this listing. 
            <Link to="/">Click here to go back to the home page.</Link>
        </h2>
        }>
            <Details {...props}/> 
        </ErrorBoundary>
    )
}

// {...props}/> we are using the spread operator since DetailsErrorBoundary does not care about these props at all 
// basically youre saying, i dont care what props are coming in just go directly through the error boundary
export default DetailsErrorBoundary; //this component also has the details component so this export is valid