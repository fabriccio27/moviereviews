import React from "react";

class RegisterPage extends React.Component {
    state = {
        username: "",
        email:"",
        password: "",
        password2:"",
        submitted:false,
        error_message:"",
    }
    handleOnChange = (e) =>{
        e.persist();
        this.setState(() => ({
            [e.target.name]: e.target.value 
        }))
    }

    handleOnSubmit = (ev) =>{
        const url = `http://localhost:8000/api/users/register/`;
        ev.preventDefault()
        /* make post request */
        fetch(url, {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify({
                username:this.state.username,
                email:this.state.email,
                password:this.state.password,
                password2:this.state.password2
            })
        })
        .then(res=>res.json())
        /* {
            "response": "Succesfully registered new user.",
            "username": "agustin",
            "email": "agustin@ejem.com"
        } */
        .then(data=>{
            if (data.response){
                this.setState(()=>({
                    submitted:true
                }))
            }else{
                this.setState(()=>({
                    error: data.username || data.error
                }))
            }
        })
        .catch(err=>console.log(`This happened while trying to register user:${err}`))
        /* 400 no me tira para este lado, por eso tengo condicional en then anterior */
    }

    render(){
        if (this.state.submitted){
            return(
                <div>
                    <h2>Your registration was taken care of. Go to Login to please.</h2>
                </div>
            )
        }
        return(
            <div className="form-div">
                <h4 className="form-message">{this.state.error}</h4>
                <form onSubmit={this.handleOnSubmit}>
                    <div className="form-group">
                        <label htmlFor="username"></label>
                        <input 
                        type="text" 
                        placeholder="Username" 
                        name="username"
                        id="username"
                        value={this.state.username}
                        onChange={this.handleOnChange}
                        className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"></label>
                        <input 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        id="password"
                        value={this.state.password}
                        onChange={this.handleOnChange}
                        className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2"></label>
                        <input 
                        type="password" 
                        placeholder="Confirm Password"
                        id="password2"
                        name="password2" 
                        value={this.state.password2}
                        onChange={this.handleOnChange}
                        className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"></label>
                        <input 
                        type="email" 
                        placeholder="Email (optional)" 
                        name="email" 
                        id="email"
                        value={this.state.email}
                        onChange={this.handleOnChange}
                        className="form-control"
                        />
                    </div>
                    <div className="form-btn-div">
                        <button type="submit" className="btn btn-dark">Register</button>
                    </div>
                </form>
                
            </div>
            
        )
    }
}

export default RegisterPage;