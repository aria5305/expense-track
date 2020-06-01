import React, { Component } from 'react'; 
import classes from './LabelEdit.module.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/action/index'
import Aux from '../../../hoc/Aux';
import {checkValidity} from '../../../share/utility';
import Input from '../../../Components/UI/input/input';
import Button from '../../../Components/UI/button/button';
class LabelEdit extends Component{
    constructor(props){
        super(props)
        this.state= {
            controls:{
                select: {
                    elementType:'select',
                    elementConfig:{
                        type:'select',
                        options:[{value:'+',displayValue:'+'},{value:'-',displayValue:'-'}],
                      
                    },
                    id:'select',
                    value:'+',
                    validation:{
                        required:true,
                    },
                    valid:false,
                    touched:false,
                    style:{width:'5rem'}
                },
                labels:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Create a new Label'
                },  
                validation:{
                    required:true,
                    minLength:1
                },
                id:'labels',
                value:'',
                valid:false,
                touched:false,
                },
               
            },
            
        }
    }

    buttonPress = (event) => {
        event.preventDefault();
         
        const updatedControl = {
            ...this.state.controls, 
            select:{
                ...this.state.controls.select,
                value:'',

            },
           labels:{
               ...this.state.controls.labels,
               value:'',
               valid:false,
               touched:false,
           }

        }

        this.setState({controls:updatedControl})

        this.props.onAddLabels(this.props.labels,this.state.controls.labels.value, this.state.controls.select.value);


        if(this.state.controls.select.value ==="+"){
            
            let newArr = [...this.props.labels.income];
           
            newArr.push({value:this.state.controls.labels.value,displayValue:this.state.controls.labels.value}); 
            let stateObj = {...this.props.labels, income:newArr}; // make a separate copy of the obj - for labels   
        
            this.props.onPostData(this.props.localId,stateObj,"category")

        }else{

            let newArr = [...this.props.labels.expense];
        
            newArr.push({value:this.state.controls.labels.value,displayValue:this.state.controls.labels.value}); 
            let stateObj = {...this.props.labels, expense:newArr}; // make a separate copy of the obj - for labels   
        
           
            this.props.onPostData(this.props.localId,stateObj,"category")

        }
    }

    delLabelFromDB= (e,type) => {
        let array; 
        let stateObj;
        if (type ==="income"){

            array = [...this.props.labels.income]; // make a separate copy of the array
            let removeIndex =  array.map( (ar,index) => {
             return ar.value}).indexOf(e.currentTarget.parentElement.firstChild.innerHTML)
     
            array.splice(removeIndex,1);
            stateObj = {...this.props.labels, income:array}; // make a separate copy of the obj - for labels   
        }else if(type ==="expense"){

            array = [...this.props.labels.expense]; // make a separate copy of the array
            let removeIndex =  array.map( (ar,index) => {
             return ar.value}).indexOf(e.currentTarget.parentElement.firstChild.innerHTML)
     
            array.splice(removeIndex,1);
            stateObj = {...this.props.labels, expense:array}; // mak
        }
        

        
        this.props.ondeleteLabel(stateObj);
        
        this.props.onPostData(this.props.localId,stateObj,"category");

    
      
    }

    inputChangedHandler = (event,controlName) => {

        const updatedControlElement = this.state.controls[controlName];
   

        const updatedControl = {
            ...this.state.controls, 
            [controlName]:{
                ...updatedControlElement,
                value:event.target.value,
                valid:checkValidity(event.target.value,updatedControlElement.validation),
                touched:true
            }
        }


        this.setState({controls:updatedControl})


    }

    render(){
        const formElementsArray = []; 

       
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => {

            
            return (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    style={formElement.config.style}
                   
                   
                  
                />

            )
        })

      
        let listItemsExpense = null; 
        let listItemsIncome = null;
        if(!this.props.loading){ 
        if(this.props.labels){
        
        let newArr=   this.props.labels.income.slice()
          
        listItemsIncome = newArr.map( label => {
                    return (
                    
                        <div  key={label.value}  className={classes.label}>
                            <li  key={label.value} value={label.value}>{label.displayValue}</li>
                            <div className={classes.cross} onClick={(e) => this.delLabelFromDB(e,"income")}></div>
                        </div>
                      
        
                    )
            })

            let eArr=   this.props.labels.expense.slice()
          
            listItemsExpense = eArr.map( label => {
                        return (
                        
                            <div  key={label.value}  className={classes.label}>
                                <li  key={label.value} value={label.value}>{label.displayValue}</li>
                                <div className={classes.cross} onClick={(e) => this.delLabelFromDB(e,"expense")}></div>
                            </div>
                          
            
                        )
                })
        }
    }
        return (
            <div className={classes.container}>
                <div className={classes.inner}>
                <h1 className={classes.heading}>Manage your labels</h1>
                    <form className={classes.form} >
                    {form}
                    <Button btnType="small" disabled={(!this.state.controls.labels.valid)} clicked={event => this.buttonPress(event)}>Create new Label</Button>
                   </form>

                   <h2 className={classes.subheading}>Income Lables:</h2>
                    <ul className={classes.labelList}>
                       {/* https://blog.logrocket.com/the-complete-guide-to-building-inline-editable-ui-in-react/ */}
                            {listItemsIncome}
                    </ul>
                   

                    <h2  className={classes.subheading}>Expense Lables:</h2>
                    <ul className={classes.labelList}>
                       {/* https://blog.logrocket.com/the-complete-guide-to-building-inline-editable-ui-in-react/ */}
                            {listItemsExpense}
                    </ul>
                </div>
               
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loading:state.details.loading,
        labels:state.details.labels,
        localId:state.auth.localId,
      
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ondeleteLabel: (arr) => dispatch(actions.deleteLabel(arr)),
        onAddLabels:(obj,item,type) => dispatch(actions.addLabel(obj,item,type)),
        onPostData:(id,data,type) => dispatch(actions.postData(id,data,type))
                
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(LabelEdit)