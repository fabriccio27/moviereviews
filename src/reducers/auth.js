const defaultState = {
    isAuthenticated:false,
    user_info:{},
    error:""
}

const authReducer = (state = defaultState, action) =>{
    switch (action.type){
        case "LOGIN":
            return {
                isAuthenticated:true,
                user_info:{...action.payload},
                error:""
            };
        case "LOGOUT":
            localStorage.clear();
            return {
                isAuthenticated:false,
                error:"",
                user_info:{}
            };
        case "SET_ERROR":
            return {
                ...state,
                error:action.payload
            };
        default:
            return state;
    }
};

export default authReducer;