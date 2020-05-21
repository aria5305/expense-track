
export const updatedObject = (oldObject,updatedProperties) => {

    return {
        ...oldObject, 
        ...updatedProperties
    };
};


export const checkValidity = (value,rules) => {
    let isValid = false; 


    if(!rules){
        isValid = true;
        return isValid;
    }

    if(rules.required) {
        isValid = value.trim() !==''; 
        // updated to true or false depending on the if value is empty
    }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.length) {
            isValid = value.length === rules.length
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

   

    return isValid; 
}
