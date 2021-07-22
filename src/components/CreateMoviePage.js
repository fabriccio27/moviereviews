import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class CreateMoviePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title:"",
            genre:"",
            plot:"",
            release:"",
            submitted:false,
            error:""
        }
    }
    handleOnChange = (e) =>{
        e.persist();
        this.setState(() => ({
            [e.target.name]: e.target.value 
        }))
    }
    handleOnSubmit = (ev) =>{
        ev.preventDefault();
        const url = `http://localhost:8000/api/movies/`
        fetch(url, {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Accept":"application/json",
                "Authorization":`Token ${localStorage.getItem("token")}`
            },
            body:JSON.stringify({
                title:this.state.title,
                genre:this.state.genre,
                plot:this.state.plot,
                release:this.state.release
            })
        })
        .then(res => {
            if (!res.ok){
                const err = new Error("HTTP status code: " + res.status);
                err.response = res;
                err.status = res.status;
                throw err; /* esto me lleva al catch */
            }else{
                return res.json();
            }
        })
        .then(data=>{
            console.log(data);
            this.setState(()=>({
                submitted:true
            }))
        })
        .catch(err=>{
            console.log(`This happened while trying to create movie: ${err}`)
            const status = err.toString().split(" ")[4];
            console.log(status);
            if (status==="400"){
                this.setState(()=>({
                    error:"Invalid form data or title already exists."
                }));
            }
        })
    }

    render(){

        if (this.state.submitted){
            return <Redirect to="/dashboard"/>
        }

        return (
            <div>
                <h1>Add a movie</h1>
                <h3 className="form-message">{this.state.error}</h3>
                <form onSubmit={this.handleOnSubmit}>
                    <div className="form-group">
                        <label htmlFor="title"></label>
                        <input 
                        type="text" 
                        placeholder="Title" 
                        name="title"
                        id="title"
                        value={this.state.title}
                        onChange={this.handleOnChange}
                        className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genre"></label>
                        <input 
                        type="text" 
                        placeholder="Genre" 
                        name="genre" 
                        id="genre"
                        value={this.state.genre}
                        onChange={this.handleOnChange}
                        className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="plot"></label>
                        <textarea
                        placeholder="Plot"
                        id="plot"
                        name="plot" 
                        value={this.state.plot}
                        onChange={this.handleOnChange}
                        className="form-control"
                        >
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="release"></label>
                        <input 
                        type="text" 
                        placeholder="Release date (YYYY-MM-DD)" 
                        name="release" 
                        id="release"
                        value={this.state.release}
                        onChange={this.handleOnChange}
                        className="form-control"
                        />
                    </div>
                    <div className="form-btn-div">
                        <button type="submit" className="btn btn-dark">Add movie</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userInfo: state.auth.user_info
    }
}

export default connect(mapStateToProps)(CreateMoviePage);

