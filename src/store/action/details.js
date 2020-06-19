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

const fetchFailed = (error ="no data") => {
 
    
    let  label = {
        income:[ {value:'income',displayValue:'income'},], 
        expense:[ {value:'Shopping',displayValue:'Shopping'},
                  {value:'Food',displayValue:'Food'},]}

    return {
        type:actionTypes.FETCH_DATA_FAILED,
        error:error,  
        labels:label,
        loading:false,
     
    };
}


const fetchSuccess  = (cash,incomeDetails,expenseDetails,labels) => {
    let label;


    if(!labels){
        label = {
        income:[ {value:'income',displayValue:'income'},], 
        expense:[ {value:'Shopping',displayValue:'Shopping'},
                  {value:'Food',displayValue:'Food'},]}

        return {
            type:actionTypes.FETCH_DATA_SUCCESS,
            cash:cash,
            incomeDetails:incomeDetails,
            expenseDetails:expenseDetails,
            labels:label,
            loading:false,
        };
    }else{

        return {
            type:actionTypes.FETCH_DATA_SUCCESS,
            cash:cash,
            incomeDetails:incomeDetails,
            expenseDetails:expenseDetails,
            labels:labels,
            loading:false,
        };
    }
   
    
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
            
            if(type ==="income"){
                updates['/users/' + id + '/cash'] = data[0]
                updates['/users/' + id + '/incomeDetails'] = data[1]
            }
            if(type ==="expense"){
                updates['/users/' + id + '/cash'] = data[0]
                updates['/users/' + id + '/expenseDetails'] = data[1]
            }

            if(type ==="category") {
                updates['/users/' + id + '/categories'] = data
            }

            return firebase.database().ref().update(updates).then( () => {
                dispatch(postSuccess())
            })
            .catch(error => {
                dispatch(postFailed(error))
            })
        }
    
  
}

// const initialRender = () => {


//     return {
//         type:actionTypes.INITIAL_RENDER
//         cash:cash,
//         incomeDetails:incomeDetails,
//         expenseDetails:expenseDetails,
//         labels:labels,
      
//     };

// }

export const clearState  = () => {
return {
    type:actionTypes.CLEAR_STATE,
         
    }
}

export const renderData = () => {
    
    return dispatch => {

    dispatch(fetchStart())
    // let cash
        var user = firebase.auth().currentUser;

     
        firebase.database().ref('/users/' + user.uid + '/').once('value').then(snapshot=> {
        
           
            let ca = snapshot.val();
            console.log(ca);
                 if(ca !== null){
                        dispatch(fetchSuccess(ca.cash, ca.incomeDetails, ca.expenseDetails,ca.categories));
                 }else{
                        dispatch(fetchFailed())
                 }
                })
        // }).catch(error => {
        //     dispatch(fetchFailed(error))
        //     console.log(error)
        // })
      
        //    }else{
        //        dispatch(fetchFailed())
           }
        // })
    }
        




// }
// }

export const deleteLabel  = (obj) => {

        // var array = [...arr]; // make a separate copy of the array
       
        //    let removeIndex =  array.map( (ar,index) => {
        //         return ar.value}).indexOf(e.currentTarget.parentElement.firstChild.innerHTML)
        
        //         array.splice(removeIndex,1);

            return {
                type:actionTypes.DELETE_LABEL,
                label:obj
            }
}

export const addLabel = (obj,item,type) => {
    
    let key = null;

    if(type ==="+"){
        key  = "income"
    }else{
        key = "expense"
    }

    let newArr = [...obj[key]]; 
    console.log("newArr:",newArr);
    newArr.push({value:item,displayValue:item}); 
    let stateObj = {...obj, [key]:newArr}; // make a separate copy of the obj - for labels   

    console.log("stateObj:",stateObj)


    return {
        type:actionTypes.ADD_LABEL,
        label:stateObj
    }
}