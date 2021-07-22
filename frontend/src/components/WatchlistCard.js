import React from "react";
import MovieCard from "./MovieCard";
import {connect} from "react-redux";

const WatchlistCard =({movie, owner, handleRemoveFromWl, isAuthenticated})=>{
    
    return(
        <div className="wl-card-container">
            <MovieCard movie={movie} /> 
            {owner && isAuthenticated && <button className="btn btn-danger remove-wl-btn" onClick={()=>handleRemoveFromWl(movie.id)}>X</button>}
        </div>
        
        
    )
}

const mapStateToProps = (state) =>{
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(WatchlistCard);