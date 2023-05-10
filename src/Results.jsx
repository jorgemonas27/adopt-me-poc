import Pet from "./Pet";

//here we are destructoring the props to only get the pets
const Results = ({ pets }) => {
    return(
        <div className="search">
            {!pets.length ? (
                <h1>No Pets Found</h1>
            ) : (
               pets.map((pet) => (
                 <Pet
                    //spread operator, you're saying i have a bag of properties here inside of pet i want youy to spread them out over
                    //{...pet}
                    //better do it explicit and give the needed things to the component
                    animal={pet.animal}
                    name={pet.name}
                    breed={pet.breed}
                    images={pet.images}
                    location={`${pet.city}, ${pet.state}`}
                    key={pet.id} 
                 />
                ))     
            )}
        </div>
    )
}

export default Results;

