import React from "react";
import StarIcon from '@material-ui/icons/Star';
import {DateTime} from "luxon";

const Rating = ({rating})=>{
    const date = DateTime.fromISO(rating.rate_date).toLocaleString();
    return (
        <div className="rating-card">
            <h2>{rating.comment}</h2>
            <p>{rating.rating} <StarIcon/></p>
            <small>{date}</small>
            <hr></hr>
        </div>
    )
}

export default Rating;