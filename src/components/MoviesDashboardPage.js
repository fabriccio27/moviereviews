import React from "react";
import MovieCard from "./MovieCard";
import LoadingPage from "./LoadingPage";
import {connect} from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import {Link} from "react-router-dom";

class MovieDashboardPage extends React.Component {
   state = {
        token:"",
        user_id:"",
        movies:[],
        sorting:"average_rating"
    }
  
    abortController = new AbortController();
  
    componentDidMount(){
      // aca tengo que buscar recursos de drf API
      // http://localhost:8000/api/movies/
      console.log("Componente app montado");
      fetch('http://localhost:8000/api/movies/', {signal:this.abortController.signal})
        .then(results => results.json())
        .then(data =>{
          this.setState(()=>{
            return {
              movies:data
            }
          })
        })
        .catch(err=>console.log(`This happened while trying to fetch movie list: ${err}`))
    }

    componentWillUnmount(){
      console.log("Componente desmontado");
      this.abortController.abort()
    }

    sortByDate=()=>this.setState(()=>({sorting:"release"}))
    sortByRating=()=>this.setState(()=>({sorting:"average_rating"}))

    render(){

      if (this.state.movies.length===0){
        return <LoadingPage />
      }

      const moviesSorted = this.state.movies.sort((a,b)=>{
        return a[this.state.sorting]<b[this.state.sorting]?1:-1
      })
      
      return(
        <div>
          <div className="dashboard-title">
            <h1>Movie List</h1>
            {this.props.isAuthenticated && <Link to="/add-movie"><AddIcon fontSize="large"/></Link>}
          </div>
          
          
          <p>
            <button className="btn btn-outline-success" onClick={this.sortByDate}>Sort by release date</button>
            <button className="btn btn-outline-success" onClick={this.sortByRating}>Sort by rating</button>
          </p>
          {moviesSorted.map( movie =>{
            return <MovieCard key={movie.id} movie={movie}/>
          })}
        </div>
      )
    }
}

const mapStateToProps = (state) =>{
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps)(MovieDashboardPage);