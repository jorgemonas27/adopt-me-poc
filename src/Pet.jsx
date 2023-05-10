//declaring the component
/*const Pet = (props) => {
    return React.createElement("div", "{}", [
      //array of components
      React.createElement("h1", {}, props.name),
      React.createElement("h2", {}, props.animal),
      React.createElement("h2", {}, props.breed),
    ]);
  };*/

//this is the same as the code above, functional component
const Pet = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
            <h2>{props.animal}</h2>
            <h2>{props.breed}</h2>
        </div>
    )
}

export default Pet; //the default is a function of how es6 modules work