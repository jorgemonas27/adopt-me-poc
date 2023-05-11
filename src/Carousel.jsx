import { Component } from 'react';

class Carousel extends Component {
    //since we dont have hooks this is the way that we can keep track of state
    state = { //the state for active photos
        active: 0
    }

    // the static default props its like hey if you dont pass anything as props into the carousel then use the default props
    static defaultProps = {
        images: ["http://pets-images.dev-apis.com/pets/none.jpg"]
    }

    //this function will get run once at the beggining of every time that it mounts onto the DOM and never gets run again
    componentDidMount() {

    }

    //this function will get run every single time that state gets updated
    componentDidUpdate() {

    }
    
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
                        <img 
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