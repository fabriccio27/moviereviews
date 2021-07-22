/* aca deberia tener un pedazo de state que tenga current movie reviews creo */
import React from "react";
import RatingForm from "./RatingForm";
import { connect } from "react-redux";
import Rating from "./Rating";
import { withRouter } from "react-router";

/* aca voy a llegar mediante movies/someid, en el componente accedo haciendo match.params.someid */
class MovieRatingPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movie_id:this.props.match.params["movieId"],
            movie:{},
            ratings:[],
            needToRefresh:false
        };
        this.activateRefresh = this.activateRefresh.bind(this);
    }
        

    abortController = new AbortController();

    componentDidMount(){
        console.log("Componente movierating montado");
        Promise.all([
            fetch(`http://localhost:8000/api/movies/${this.state.movie_id}/ratings/`, {signal:this.abortController.signal}).then(res=>res.json()),
            fetch(`http://localhost:8000/api/movies/${this.state.movie_id}/`, {signal:this.abortController.signal}).then(res=>res.json())
        ])
        .then(([ratingData, movieData])=>{
            if (Array.isArray(ratingData) && !movieData.hasOwnProperty("detail")){
                this.setState(()=>({
                    movie:movieData,
                    ratings:ratingData
                }))
            }
        })
        .catch(err=>console.log(`This happened while trying to fetch movie ratings: ${err}`))    
    }

    activateRefresh(){
        this.setState(()=>({
            needToRefresh:true
        }));
    }
    
    componentWillUnmount(){
        console.log("Componente movierating desmontado");
        this.abortController.abort();
    }


    render(){
        let rating_components = [];
        if (this.state.ratings.length!==0){
            rating_components = this.state.ratings.map(rating=>{
                return <Rating key={rating.id} rating={rating}/>
            });
        }
        
        const no_components = <h2>There's no ratings for this movie yet, be on the avant!</h2>

        return(
            <div className="movie-ratings-container">
                <h1>Reviews for {this.state.movie.title}</h1>
                {/* <button onClick={this.toggleShowForm}>Write your review</button> */}
                {this.props.isAuthenticated?
                (<RatingForm movieId={this.state.movie_id}/>)
                :(<h2 style={{"color":"darkgreen"}}>Log in to write a review</h2>)}
                {this.state.ratings.length===0?(no_components):(rating_components)}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    // tengo state.pruebas, state.auth, state.expenses segun lo que puse en configureStore
    return {
        isAuthenticated: state.auth.isAuthenticated
        
    }
}


export default withRouter(connect(mapStateToProps)(MovieRatingPage));


/* fetch(`http://localhost:8000/api/movies/${this.state.movie_id}/ratings/`, {signal:this.abortController.signal})
          .then(results => results.json())
          .then(data =>{
            if (Array.isArray(data)){
                this.setState(()=>{
                    return {
                      ratings:data
                    }
                });
            }
          })
          .catch(err=>console.log(`This happened while trying to fetch movie ratings: ${err}`)) */