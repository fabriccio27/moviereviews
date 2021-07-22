import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

import Header from "../components/Header.js";
//...rest es una teje para nombrar en el destructurado lo que nombre explicitamente, o sea, 
//...rest es todo lo que no es isAuthenticated y component en props. (exact, path, history, etc)
//component:Component es ponerle alias Component a la prop que venia llamandose component
export const PrivateRoute = ({isAuthenticated, component:Component, ...rest}) => (
    <Route {...rest} component={(props)=>{
        return isAuthenticated? 
        (
            <div>
                
                <Component {...props}/>
            </div>
        ) 
        : (<Redirect to="/login"/>);
    }}/>
)

const mapStateToProps = (state)=>{
    return {
        isAuthenticated:state.auth.isAuthenticated
        //esto lo hacia para convertir la existencia o ausencia de un string en un booleano
        //si state.auth.uid es undefined un !, lo hace true, y !! lo hace false
        //si state.auth.uid es un string, !lo hace false, y !! lo hace true
    };
};

export default connect(mapStateToProps)(PrivateRoute);