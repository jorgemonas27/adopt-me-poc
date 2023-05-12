//declaring the component
/*const Pet = (props) => {
    return React.createElement("div", "{}", [
      //array of components
      React.createElement("h1", {}, props.name),
      React.createElement("h2", {}, props.animal),
      React.createElement("h2", {}, props.breed),
    ]);
  };*/
import { Link } from 'react-router-dom';

//the Link is better than the <a> tag since the <a> tag when you click on it will do a full refresh of the page
//with link its not gonna be a full page refresh the BrowserRouter captures it on the client side and works better

//this is the same as the code above, functional component
const Pet = ({name, animal, breed, images, location, id}) => {
    let hero = "http://pets-images.dev-apis.com/pets/none.jpg"
    if (images.length) {
      hero = images[0];
    }

    return (
        <Link to={`/details/${id}`} className="pet">
          <div className="image-container">
            <img src={hero} alt={name} />
          </div>
          <div className="info">
            <h1>{name}</h1>
            <h2>{animal} - {breed} - {location}</h2>
          </div>
        </Link>
    );
};

export default Pet; //the default is a function of how es6 modules work