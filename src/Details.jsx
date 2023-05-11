import { useParams } from 'react-router-dom';

/* how useParams() works? 
- basically because of the context, and the BrowserRouter that is making this thing called context available to components underneath it,
so when i use useParams() i said ok i asume that a browser router is available so im going to reach into a browser router and pull out something called id
in other words is coming from the browser component
*/

const Details = () => {
    const { id } = useParams();
    return(
        <h2>{id}</h2>
    )
}

export default Details;