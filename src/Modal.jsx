import { useEffect, useRef } from "react";
import { createPortal } from 'react-dom'

const Modal = ({children}) => {
    //ref is basically i have this piece of something and i need that the same thing back every single time
    //for example i gonna create a div and i wanna have the same div back every time
    const elRef = useRef(null); //default value null, useRef is another hook
    if (!elRef.current){
        elRef.current = document.createElement('div'); //always gonna be the same div that i create here, and it will create the div once
    }

    useEffect(() => {
        const modalRoot = document.getElementById("modal");
        modalRoot.appendChild(elRef.current);
        //but then we need to sacar el modal de la pantallla cuando se responda yes or no, in a class component you will do at componentWillUnmount
        
        //anything that you return in an effect will be run after a component will be unmounted from the DOM, it does before it totally unmounts
        return () => modalRoot.removeChild(elRef.current);
        //if we dont remove the div we are gonna get infinite divs just being left inside of this modal
        //its a technique used for remove something from the dom, remove event listeners, stop setTimeOuts, setIntervals
    }, []); //this will happen once

    return createPortal(<div>{children}</div>, elRef.current); //you also could return children directly
}

export default Modal;