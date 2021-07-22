import React from "react";
import {connect} from "react-redux";
import { Redirect } from "react-router";
//import MovieCard from "./MovieCard";
import WatchlistCard from "./WatchlistCard";

class WatchlistPage extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            userId:this.props.match.params["userId"],
            watchlist:[],
            owner:this.props.match.params["userId"] == this.props.currentUserId
        }
        this.handleRemoveFromWl = this.handleRemoveFromWl.bind(this);
    }
    
    abortController = new AbortController();
    componentDidMount(){
        console.log("componente watchlist montado");
        const url = `http://localhost:8000/api/users/${this.state.userId}/watchlist/`;

        fetch(url, {signal:this.abortController.signal})
        .then(resp => resp.json())
        .then(data=>{
            if (Array.isArray(data)){
                this.setState(()=>({
                    watchlist:data
                }))
            }
        })
        .catch(err=>console.log(`This happened while trying to fetch watchlist: ${err}`))
    };

    componentWillUnmount(){
        console.log("componente Watchlist desmontado.");
        this.abortController.abort();
    }

    handleRemoveFromWl(targetId){
        const newWatchlist = this.state.watchlist.filter(movie=>{
            return movie.id!=targetId; //si tiene id distinto al target, queda
        });
        const url = `http://localhost:8000/api/users/${this.state.userId}/watchlist/`;
        fetch(url, {
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "Accept":"application/json",
                "Authorization":`Token ${localStorage.getItem("token")}`
            },
            body:JSON.stringify({
                "movie_id":targetId
            })
        })
        .then(resp=>resp.json())
        .then(data=>{
            console.log(`This came back from the put request ${data}`);
            this.setState(()=>({
                watchlist:newWatchlist
            }))
        })
        .catch(err=>console.log(`This happened while trying to update watchlist: ${err}`))
    }


    render(){
        if (!this.props.isAuthenticated){
            return <Redirect to="/dashboard" />
        }
        if (this.state.watchlist.length===0){
            return <h2>Your watchlist is empty</h2>
        }
        //triple igualdad no porque uno es int y el otro str
        const movies = this.state.watchlist.map(movie=>{
            return <WatchlistCard key={movie.id} movie={movie} owner={this.state.owner} handleRemoveFromWl={this.handleRemoveFromWl}/>
        })
        return(
            <div>
                <h1>Watchlist for {this.props.username} </h1>
                {movies}
            </div>
        )
    };
}

const mapStateToProps = (state) =>{
    return {
        username: state.auth.user_info["username"],
        currentUserId: state.auth.user_info["user_id"],
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(WatchlistPage);