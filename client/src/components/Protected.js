import { useEffect } from 'react';
import {Navigate} from 'react-router-dom';

const Protected = ({isLoggedIn, children, setProtectedError}) => {

    useEffect(() => {
        if(!isLoggedIn){
            setProtectedError("You must be logged in to view that page")
        }
    },[])
    
    if(!isLoggedIn) {
        return <Navigate to="/" replace />
    }; 
    return children;
};

export default Protected;