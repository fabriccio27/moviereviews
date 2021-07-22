import React from "react";
import {connect} from 'react-redux';
import {setUser} from '../actions/authActions';


class LoginPage extends React.Component {
    state = {
        username: "",
        password: "",
        error:this.props.error
    }
    handleOnChange = (e) => {
        e.persist();
        this.setState(() => ({
            [e.target.name]: e.target.value 
        }))
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/api/api-token-auth/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username:this.state.username,
                password:this.state.password
            })
        })
        .then(res => {
            console.log(res.status)
            return res.json()
        })
        .then(data => {
            
            if (data.hasOwnProperty("token")){
                localStorage.setItem("token", data.token);
                this.props.setUser(data.user_info);
            }else{
                console.log(data.error);
                this.setState(()=>({
                    error:data.error
                }))
            }

        })
        .catch(err=>console.log(`This happened while trying to authenticate: ${err}`))
        
    }
    
    render(){

        return(
            <div className="form-div">
                {this.state.error && <h4 className="form-message">{this.state.error}</h4>}
                <form onSubmit={this.handleOnSubmit}>
                    <div className="form-group">
                        <label htmlFor="logUsername"></label>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            name="username" 
                            value={this.state.username}
                            onChange={this.handleOnChange}
                            id="logUsername"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="logPassword"></label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            value={this.state.password}
                            onChange={this.handleOnChange}
                            id="logPassword"
                            className="form-control"
                        />
                    </div>
                    <div className="form-btn-div"> 
                        <button type="submit" className="btn btn-primary login-btn"> Log In </button>
                    </div>
                </form>
                
            </div>
            
        )
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (userInfo) => dispatch(setUser(userInfo))
    }
}

export default connect(null, mapDispatchToProps)(LoginPage)