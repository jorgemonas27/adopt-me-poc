import { Component } from 'react';

class Carousel extends Component {
    //since we dont have hooks this is the way that we can keep track of state
    state = { //the state for active photos
        active: 0,
        name: "luna",
    }

    // the static default props its like hey if you dont pass anything as props into the carousel then use the default props
    static defaultProps = {
        images: ["http://pets-images.dev-apis.com/pets/none.jpg"]
    }

    //this function needs to be an arrow function since if we do it a normal function we will lose the scope of the context and we will create a new scope
    //thats something that arrow function does not.
    handleIndexClick = (e) => {
        this.setState({ //we are mutating the state
            active: +e.target.dataset.index, //in this case its only going to overwrite 'active' its going to leave whatever else is there with the same values
            //e.target will be the <img>, dataset is a DOM function, and index is a string because everything that comes out of the DOM is the string all the time
            //the '+' its like a conversion from string to a number (int)
        });
    };

    //this function will get run once at the beggining of every time that it mounts onto the DOM and never gets run again
    componentDidMount() {}

    //this function will get run every single time that state gets updated
    componentDidUpdate() {}

    //function that will run something after the component has unmounted
    componentWillUnmount(){}
    
    //a render function is basically like the function body of our funtions components
    //every class component has a render function
    render() {
       const {active} = this.state; //this is a mutable state
       const {images} = this.props; //this is immutable since it comes from a parent component

       return (
        <div className="carousel">
            <img src={images[active]} alt="animal hero" />
            <div className="carousel-smaller">
                {
                    images.map((photo, index) => ( // parenthesis implicit return
                        // eslint-disable-next-line
                        <img
                         onClick={(e) => { this.handleIndexClick(e)}}
                         data-index={index}
                         key={photo}
                         src={photo}
                         className={index === active ? "active" : ""} 
                         alt="animal thumbnail"/>
                    ))
                }
            </div>
        </div>
       )
    }
}
 
export default Carousel;