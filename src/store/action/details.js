import * as actionTypes from '../action/actionTypes'

export const addIncome = (income,incomeDetails) => {
    return {
        type:actionTypes.ADD_INCOME,
        income:income,
        incomeDetails:incomeDetails
  
    }
}

export const addExpense = (expense,expenseDetails) => {
    return {
        type:actionTypes.ADD_EXPENSE,
        expense:expense,
        expenseDetails:expenseDetails
    }
}
