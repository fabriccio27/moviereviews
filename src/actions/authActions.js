/* aca tengo que tener las llamadas a api para obtener token, guardarlo en local storage y pasar info del usuario a state */

/* 
Esto devuelve el endpoint de token
'token': token.key,
'user_id': user.pk,
'username':user.username,
'email': user.email */

export const setUser = (payload) => ({ type: "LOGIN", payload})
const setError = (payload) => ({ type: "SET_ERROR", payload})

export const logUserOut = () => ({type: "LOGOUT"})

// Methods

/* userInfo es lo que tengo de state en el componente de Login */
export const fetchUser = (userInfo) => dispatch => {
    fetch(`http://localhost:8000/api/api-token-auth/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data => {
        /* console.log(data); */
        if (data.hasOwnProperty("token")){
            localStorage.setItem("token", data.token);
            dispatch(setUser(data.user_info));
        }else{
            console.log(data.error);
            dispatch(setError(data["error"]))
        }
        
    })
    .catch(err=>console.err(`This happened while trying to authenticate: ${err}`))
    //QUE PASA SI LAS CREDENCIALES SON INVALIDAS?
}

/* export const registerUser = (userInfo) => dispatch => {
    fetch(`http://localhost:4000/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data => {
        // data sent back will in the format of
        // {
        //     user: {},
        //.    token: "aaaaa.bbbbb.bbbbb"
        // }
        localStorage.setItem("token", data.token)
        dispatch(setUser(data.user))
    })
} */