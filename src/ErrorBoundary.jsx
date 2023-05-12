import { Component } from "react";

class ErrorBoundary extends Component {
    state = { hasError: false};

    //everytime that theres an error its going to call this function and youre just gonna give it like, ok if you encounter an error this is what 
    //i want you to set the new state to be.
    static getDerivedStateFromError(){
        return {hasError:true} //its like calling the set state
    }

    //error will be the actual error that it caught, info is some additional info that react will give you
    componentDidCatch(error, info) {
        //Typically you would log this to something like trackJS or something like that where you log your errors.
        console.error("ErrorBoundary component caught an error", error, info);
    }

    render() {
        if (this.state.hasError) {
           /* return (
                <h2> this is the correct way if youre only manage an error boundary
                    There was an error with this listing. 
                    <Link to="/">Click here to go back to the home page.</Link>
                </h2>
            )*/
            return(
                this.props.errorComponent //the reusable way
            );
        }
        
        
        return this.props.children;
    }

}

export default ErrorBoundary;