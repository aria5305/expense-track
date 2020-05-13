import * as actionTypes from './actionTypes'; 
import * as firebase from "firebase/app";
import "firebase/auth";

export const showModal = () => {
    return {
        type:actionTypes.SHOW_MODAL 
    }
}

export const hideModal = () => {
    return {
        type:actionTypes.HIDE_MODAL
    }
}


export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (localId,email) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        localId:localId,
        email:email,
    }
}

export const logout = () => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        alert('signed out')
      }).catch(function(error) {
        alert('cannot signout')
      });
    return {
        type:actionTypes.AUTH_LOGOUT,
    }
}

export const clearLoginAfterDelete = () => {
    return {
        type:actionTypes.AUTH_LOGOUT,
    }
}


export const updateStart = () => {
    return{
        type:actionTypes.UPDATE_START
    }
}

export const updateSuccess = () => {
    return {
        type:actionTypes.UPDATE_SUCCESS
    }
}
export const updateFailed = (error) => {
    return {
        type:actionTypes.UPDATE_FAILED,
        error:error
    }
}

export const authFailed = (error) => {
    return {
        type:actionTypes.AUTH_FAILED,
        error:error
    }
}

export const updateEmail = (email) => {
    return dispatch => {
        
    dispatch(updateStart()); 

    var user = firebase.auth().currentUser;

            user.updateEmail(email).then(() => {
                
                alert('You have successfully updated your email, please re-login')
                dispatch(updateSuccess());
                dispatch(logout());

            
            }).catch(error => {
                alert(error)
                dispatch(updateFailed(error))
            });
        }

}

export const updatePassword = (newPassword) => {
    return dispatch => {
        
    dispatch(updateStart()); 

    var user = firebase.auth().currentUser;

    user.updatePassword(newPassword).then(function() {
      // Update successful.
        alert('You have successfully updated your password, please re-login')
        dispatch(updateSuccess());
        dispatch(logout());
    }).catch(function(error) {
      // An error happened.
        alert(error)
        dispatch(updateFailed(error))
    });
            
        }

}

export const sendAuthenticatedEmail = () => {
   
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function() {
        // Email sent.
        }).catch(function(error) {
        // An error happened.
        });
}
    


export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart()); 

        if(isSignup === false) {

            firebase.auth().signInWithEmailAndPassword(email, password).then(response =>{
                dispatch(authSuccess(response.user.uid,response.user.email))
                console.log(response)})
                .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                dispatch(authFailed(error))
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                  alert(errorMessage);
                }
                });
            
              
        }else{

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(response =>{
            dispatch(authSuccess(response.user.uid))
            console.log(response)})
        .catch(function(error) {
            dispatch(authFailed(error))
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        });
    }

    }
}

export const reagain = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred)
    .then( ()=> {
    })
    .catch((error)=>{
        console.log(error)
    })
}


export const setAuthRedirectPath = (path) => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH, 
        path:path
    }
}

///https://firebase.google.com/docs/auth/web/password-auth#next_steps





// var user = firebase.auth().currentUser;
// var credential;

// // Prompt the user to re-provide their sign-in credentials

// user.reauthenticateWithCredential(credential).then(function() {
//   // User re-authenticated.
// }).catch(function(error) {
//   // An error happened.
// });