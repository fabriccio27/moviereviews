import React from "react";
import { Link } from "react-router-dom";
import StarIcon from '@material-ui/icons/Star';
import {DateTime} from "luxon";

const MovieCard = ({movie})=>{
    /* const [year, month, day] = movie.release.split("-"); */
    const formattedRelease = DateTime.fromISO(movie.release).toLocaleString(DateTime.DATE_MED);
    
    return(
        <div className="card" style={{"width": "18rem", "margin":"1rem 0"}}>
            <div className="card-body card-body-custom">
                <Link to={`/movies/${movie.id}`}>
                    <h3 className="card-title">{movie.title}</h3><span>{formattedRelease}</span>
                </Link>
                <p className="card-text">
                    <span>{movie.average_rating}</span> <StarIcon/>
                </p>
                <Link to={`/ratings/${movie.id}/`} className="toRatings-link">
                    Ratings
                </Link>
            </div>
        </div>
    )
};

export default MovieCard;