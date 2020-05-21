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

const postStart = () => {
    return {
        type:actionTypes.POST_START,
        loading:true,
    };
}

const postSuccess = () => {
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


const postFailed = (error) => {
    return {
        type:actionTypes.POST_FAILED,
        error:error,
        loading:false
      
    }
}

export const postData = (id,data,type) => {
  

    return dispatch => {
        dispatch(postStart())
        var newPostKey = firebase.database().ref().child('users').push().key;

        let updates = {} 
            updates['/users/' + id + '/cash'] = data[0]
            if(type ==="income"){
        
                updates['/users/' + id + '/incomeDetails'] = data[1]
            }
            if(type ==="expense"){
                updates['/users/' + id + '/expenseDetails'] = data[1]
            }
            return firebase.database().ref().update(updates).then( () => {
                dispatch(postSuccess())
            })
            .catch(error => {
                dispatch(postFailed(error))
            })
        }
    
  
}




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
