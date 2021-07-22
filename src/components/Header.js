import React from "react";
import {NavLink} from "react-router-dom";
import {logUserOut} from "../actions/authActions";
import {connect} from "react-redux";
import MovieIcon from '@material-ui/icons/Movie';

export const Header = ({isAuthenticated, logUserOut, userId}) => (
    <header>
        <nav className="navbar">
            <MovieIcon/>        
            <NavLink to="/dashboard" activeClassName="selected">Home</NavLink>
            {isAuthenticated && <NavLink to={`/watchlist/${userId}`} activeClassName="selected">Watchlist</NavLink>}
            {isAuthenticated && <button className="logout-btn" onClick={()=>logUserOut()}>Log Out</button>}
            {!isAuthenticated && <NavLink to="/login" activeClassName="selected">Login</NavLink>}
            {!isAuthenticated && <NavLink to="/register" activeClassName="selected">Register</NavLink>}
        </nav>
    </header>
    
)

const mapDispatchToProps = (dispatch)=>{
    return {
        logUserOut: ()=> dispatch(logUserOut())
    };
};

const mapStateToProps = (state) =>{
    return {
        isAuthenticated:state.auth.isAuthenticated,
        userId:state.auth.user_info["user_id"]
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);