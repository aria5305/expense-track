import * as actionTypes from '../action/actionTypes'
import * as firebase from "firebase/app";
import "firebase/database"


export const addIncome = (income,data) => {
    return {
        type:actionTypes.ADD_INCOME,
        income:income,
        data:data,
    }
}

export const addExpense = (expense,data) => {
    
    return {
        type:actionTypes.ADD_EXPENSE,
        expense:expense,
        data:data
    }
}

const updateStart = () => {
    return {
        type:actionTypes.POST_START,
        loading:true,
    };
}

const updateSuccess = () => {
    return {
        type:actionTypes.POST_SUCCESS,
        loading:false
    }
}

const fetchStart = () => {
    return {
        type:actionTypes.FETCH_DATA_START,
    };
}

const fetchFailed = (error) => {
    return {
        type:actionTypes.FETCH_DATA_FAILED,
        error:error,
        loading:false
    };
}


const fetchSuccess  = (cash,incomeDetails,expenseDetails) => {
    return {
        type:actionTypes.FETCH_DATA_SUCCESS,
        cash:cash,
        incomeDetails:incomeDetails,
        expenseDetails:expenseDetails,
        loading:false,
    };
}


const updateFailed = (error) => {
    return {
        type:actionTypes.POST_FAILED,
        error:error,
        loading:false
      
    }
}

// export const postData = (id,cash,data,type) => {
  
// return dispatch => {
//     dispatch(updateStart)
//     var newPostKey = firebase.database().ref().child('users').push().key;

//     if(type ==="income"){

//         let updates = {} 
//         updates['/users/' + id + '/cash'] = cash
//         updates['/users/' + id + '/incomeDetails'] = data

//         return firebase.database().ref().update(updates).then(
//             dispatch(updateSuccess()))
//             .catch(error => {dispatch(updateFailed(error))})


//     }
//     if(type === "expense"){
//          let updates = {} 
//             updates['/users/' + id + '/cash'] = cash
//             updates['/users/' + id + '/expenseDetails'] = data
    
//             return firebase.database().ref().update(updates).then(dispatch(updateSuccess())).catch(error => {dispatch(updateFailed(error))})

//     }
//     }
    
  
// }




export const renderData = () => {
    
    return dispatch => {

    dispatch(fetchStart())
    // let cash
        // var user = firebase.auth().currentUser;
        // firebase.database().ref('/users/' + user.uid + '/').once('value').then(snapshot=> {
        firebase.database().ref('/users/Hbfo28g25xXUCoexgKVi6TPcHhg2/').once('value').then(snapshot=> {
       
            let ca = snapshot.val();
            console.log(ca.cash);
                dispatch(fetchSuccess(ca.cash, ca.incomeDetails, ca.expenseDetails))
        }).catch( error => {
            console.log(error)
            dispatch(fetchFailed(error))
        })




}
}
