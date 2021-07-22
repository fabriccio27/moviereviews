import React, {useState} from "react";
//import { Redirect } from "react-router";

const RatingForm = ({movieId})=>{
    const [rating, setRating] =  useState(3);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleOnSubmit=(ev)=>{
        ev.preventDefault(); //el refresh me desloguea
    
        const url = `http://localhost:8000/api/movies/${movieId}/ratings/`;
        fetch(url, {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Accept":"application/json",
                "Authorization":`Token ${localStorage.getItem("token")}`
            },
            body:JSON.stringify({
                rating,
                comment
            })
        })
        .then(res=>res.json()) /* si es exitoso devuelve la info completa de la review, userid, movieid, etc. */
        .then(data=>{
            console.log(data);
            if (data.hasOwnProperty("movie") || data.hasOwnProperty("rating")){
                setSubmitted(true);
            } else {
                setError(data.comment[0]);
            }
            
        })
        .catch(err=>{
            console.log(`This happened while trying to create review: ${err}`);
        });
        
    }
    const handleOnCommentChange=(ev)=>{
        ev.persist();
        setComment(ev.target.value);
    }
    const handleRatingChange=(ev)=>{
        setRating(parseInt(ev.target.value))
    }
    
    if(submitted){
        return (
            <React.Fragment>
                <h3>Thanks for your review!</h3>
                <h2>Continue exploring the site.</h2>
            </React.Fragment>
        )
    }

    return(
        <form onSubmit={handleOnSubmit} className="review-form">
            
            <div className="form-group col-6 col-md-3" >
                <label htmlFor="ratingField">Rating</label>
                <input type="number" value={rating} onChange={handleRatingChange} min={1} max={5} id="ratingField" className="form-control"/>
                <small className="form-text text-muted">1 to 5 stars</small>
            </div>
            <h4 className="form-message">{error}</h4>
            <div className="form-group">
                <label htmlFor="commentField">Review</label>
                <textarea 
                    value={comment} 
                    onChange={handleOnCommentChange} 
                    maxLength={500} 
                    placeholder="Did you like it?"
                    rows={7} 
                    cols={40} 
                    className="form-control"
                    id="commentField"
                >
                </textarea>
                <small className="form-text text-muted">Up to 500 characters</small>
            </div>
            <button className="btn btn-secondary" type="submit">Send Review</button>
        </form>
    )
}

export default RatingForm;