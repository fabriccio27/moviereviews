
//quiero que tome de startDate y endDate los extremos del mes corriente

const filReducerDefaultState = {
    text:"",
    year:"1991"
};
const filtersReducer = (state=filReducerDefaultState, action) =>{
    switch(action.type){
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text:action.text
            };
        case "SET_YEAR":
            return {
                ...state,
                year:action.year
            };
        default:
            return state;
    }
};

export default filtersReducer;