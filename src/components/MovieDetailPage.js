import React from "react";
import {connect} from "react-redux";
import { Redirect } from "react-router";
import StarIcon from '@material-ui/icons/Star';
import LoadingPage from "./LoadingPage";


class MovieDetailPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movieId: this.props.match.params["movieId"],
            movie:{},
            error:"",
            addedToWl:false,
        };
        this.handleAddToWl = this.handleAddToWl.bind(this);
    }
    abortController = new AbortController();

    componentDidMount(){
        console.log("componente MovieDetail montado.")
        const url = `http://localhost:8000/api/movies/${this.state.movieId}/`;
        fetch(url, {signal:this.abortController.signal})
        .then(res=>res.json())
        .then(data=>{
            if (data.hasOwnProperty("title")){
                this.setState(()=>({
                    movie:data
                }));
            }else{
                this.setState(()=>({
                    movie:{error:"Not Found"},
                    error:data.detail
                }))
            }
        })
        .catch(err=>console.log(`This happened while trying to fetch movie details: ${err}`))
    }
    /* si no existe me da {"detail": "Not found."} */
    
    componentWillUnmount(){
        console.log("componente MovieDetail desmontado.")
        this.abortController.abort()
    }

    handleAddToWl(){
        const url = `http://localhost:8000/api/users/${this.props.currentUserId}/watchlist/`;
        fetch(url, {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Accept":"application/json",
                "Authorization":`Token ${localStorage.getItem("token")}`
            },
            body:JSON.stringify({
                movie_id:this.state.movieId
            })
        })
        .then(resp=>{
            console.log(resp.status)
            return resp.json()
        })
        .then(data=>{
            if (data.hasOwnProperty("success")){
                this.setState(()=>({
                    addedToWl:true 
                }))
                /* esto me va a disparar redirect a watchlist */
            }else{
                console.log(`Esta es la rama else de solicitud de agregado: ${data}`);
                this.setState(()=>({
                    error:data["message"]
                }));
            }
        })
        .catch(err=>console.log(`This happened while trying to add to watchlist: ${err}`))
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    
    render(){
        if (this.isEmpty(this.state.movie)) {
            return <LoadingPage/>
        } else if (this.state.addedToWl){
            return <Redirect to={`/watchlist/${this.props.currentUserId}`} />
        }

        return(
            <div className="movie-detail-container">
                <h1 className="movie-detail-title">{this.state.movie.title}</h1>
                <div className="card-text">
                    <span>{this.state.movie.average_rating} <StarIcon/></span>
                </div>
                {this.state.error!=="" && <h3 style={{"color":"crimson"}}>{this.state.error}</h3>}
                {this.props.isAuthenticated &&  !this.state.error && <button className="btn btn-success" onClick={this.handleAddToWl}>Add to Watchlist</button>}
                <h2>Release date: {this.state.movie.release}</h2>
                <p>Genre: {this.state.movie.genre.charAt(0).toUpperCase() + this.state.movie.genre.slice(1)}</p>
                <p>{this.state.movie.plot}</p>
            </div>
        )

    }
    
}

const mapStateToProps = (state) =>{
    return {
        isAuthenticated: state.auth.isAuthenticated,
        currentUserId: state.auth.user_info["user_id"]
    }
}

export default connect(mapStateToProps)(MovieDetailPage);

/* } else if (this.state.error==="Movie already in watchlist"){
            return <h2>{this.state.error}</h2> */