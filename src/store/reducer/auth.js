import * as actionTypes from '../action/actionTypes'
import {updatedObject} from '../../share/utility';

const initialState = {
    showModal:false, //for the modal to show
    isAuth:false, //checking if user is authenticated. 
    localId: null,
    error:null,
    loading:false,
    email:null,
    updateSuccesful:false,
    authRedirect:'/',
}

const showModal = (state,action) => {
    return updatedObject(state,{showModal:true})
}

const hideModal = (state,action) => {
    return updatedObject(state,{showModal:false})
}

const authStart = (state,action) => {
    return updatedObject(state,{error:null,loading:true})
}

const updateStart = (state,action) => {
    return updatedObject(state,{loading:true})
}

const updateSuccess = (state,action) => {
    return updatedObject(state,{loading:false, updateSuccesful:true})
}

const updateFailed = (state,action) => {
    return updatedObject(state,{
        error:action.error,
        loading:false

    })
}


const authSuccess = (state,action) => {
    return updatedObject(state,{
        error:null,
        isAuth:true,
        loading:false,
        localId:action.localId,
        email:action.email,
        updateSuccesful:false
    })
}

const authFailed =(state,action) => {
    return updatedObject(state,{
        error:action.error,
        loading:false
    })
}

const authlogout = (state,action) => {
    return updatedObject(state,{
        localId:null,
        isAuth:false
    })
}

const setAuthRedirectPath = (state,action) => {
    return updatedObject(state,{
        authRedirect:action.path
    })
}


const reducer = (state = initialState,action) => {

    switch(action.type){
        case actionTypes.SHOW_MODAL: return showModal(state,action);
        case actionTypes.HIDE_MODAL: return hideModal(state,action);
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action) 
        case actionTypes.AUTH_FAILED: return authFailed(state,action) 
        case actionTypes.AUTH_LOGOUT: return authlogout(state,action) 
        case actionTypes.SET_AUTH_REDIRECT_PATH : return setAuthRedirectPath(state,action)
  
        case actionTypes.UPDATE_START: return updateStart(state,action);
        case actionTypes.UPDATE_SUCCESS: return updateSuccess(state,action)
        case actionTypes.UPDATE_FAILED: return updateFailed(state,action)

    default:return state
    }
}

export default reducer