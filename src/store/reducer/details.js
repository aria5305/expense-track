import * as actionTypes from '../action/actionTypes'
import {updatedObject} from '../../share/utility';
import * as firebase from "firebase/app";
import "firebase/database"


const initialState = {
        cash: {}, 
        loading:true,
        // {2020:{"Jan": {income: 0, expense:0
        // }}}
        incomeDetails: {
            // 2020:{"Jan":[],"Feb":[]},
            // 2021:{}
        },
        expenseDetails: {},
        error:null,
        labels:{ }
              
        // {value:'',displayValue:'Select a label'},
        
        // {value:'expense',displayValue:'expense'},
   
        // {value:'Transport',displayValue:'Transport'},
        // {value:'Health & Exercise',displayValue:'Health & Exercise'},
        // {value:'Gifts',displayValue:'Gifts'},
        // {value:'Home and Utility',displayValue:'Home and Utility'},
        
}



const addIncome =(state,action) => {

        return updatedObject(state, {
            cash:action.income,
            incomeDetails:action.data
        })
}

const addExpense =(state,action) => {
        return updatedObject(state, {
            cash:action.expense,
            expenseDetails:action.data
        })
}

const fetchDataStart = (state,action) => {
    return updatedObject(state,{
        loading:true
    })
}

const postStart = (state,action) => {
    return state;
}


const postSuccess = (state,action) => {
    return state;
}

const postFailed = (state,action) => {
    return updatedObject(state,{error:action.error})
}

const fetchDataSuccess = (state,action) => {
    return updatedObject(state, {
        cash:action.cash, 
        loading:false,
        incomeDetails:action.incomeDetails,
        expenseDetails:action.expenseDetails,
        labels:action.labels
    })
}

const fetchDataFailed = (state,action) => {
    return updatedObject(state, {
        error:action.error,
        loading:false
    })
}


const addLabel = (state,action) => {
    return updatedObject(state,{
        labels:action.label
    })
}


const deleteLabel = (state,action) => {
    return updatedObject(state,{
        labels:action.label
    })
    
}




const reducer = (state = initialState,action) => {

    switch(action.type){
        case actionTypes.ADD_INCOME: return addIncome(state,action);
        case actionTypes.ADD_EXPENSE: return addExpense(state,action);

        case actionTypes.FETCH_DATA_START: return fetchDataStart(state,action);
        case actionTypes.FETCH_DATA_SUCCESS: return fetchDataSuccess(state,action);
        case actionTypes.FETCH_DATA_FAILED: return fetchDataFailed(state,action);

        case actionTypes.POST_START: return postStart(state,action );
        case actionTypes.POST_SUCCESS: return postSuccess(state,action); 
        case actionTypes.POST_FAILED: return postFailed(state,action);

        case actionTypes.DELETE_LABEL: return deleteLabel(state,action);
        case actionTypes.ADD_LABEL: return addLabel(state,action)
     

    default:return state
    }
}


export default reducer