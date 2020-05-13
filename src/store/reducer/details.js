import * as actionTypes from '../action/actionTypes'
import {updatedObject} from '../../share/utility';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';


const initialState = {
        income:0,
        expense:0,
        cashAvailable:0,
        incomeDetails : [],
        expenseDetails: []
}



const addIncome =(state,action) => {
    
    let newIncome = parseInt(state.income)+ parseInt(action.income)
    
    let newArr = state.incomeDetails.slice();
    newArr.push(action.incomeDetails);

    let cash  = newIncome - state.expense

    return updatedObject(state, {
       income:newIncome,
       cashAvailable:cash,
       incomeDetails:newArr
    })
}

const addExpense = (state,action) => {
    let newExpense = parseInt(state.expense)+ parseInt(action.expense)
    
    let newArr = state.expenseDetails.slice();
    newArr.push(action.expenseDetails);


    let cash  = state.income - newExpense
    return updatedObject(state, {
       expense:newExpense,
       cashAvailable:cash,
       expenseDetails:newArr
    })
}

const reducer = (state = initialState,action) => {

    switch(action.type){
        case actionTypes.ADD_INCOME: return addIncome(state,action);
        case actionTypes.ADD_EXPENSE: return addExpense(state,action);
     

    default:return state
    }
}

export default reducer