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
                }
            }
        }
    }

    buttonPress = (event) => {
        event.preventDefault();
        this.setState({controls:{labels:{
            value:''
        }}})

        this.props.onAddLabels(this.props.labels,this.state.controls.labels.value);
        let newArr = [...this.props.labels]; 
        newArr.push({value:this.state.controls.labels.value,displayValue:this.state.controls.labels.value}); 
        this.props.onPostData('Hbfo28g25xXUCoexgKVi6TPcHhg2',newArr,"category")
    }

    delLabelFromDB= (e) => {

        var array = [...this.props.labels]; // make a separate copy of the array
       
        let removeIndex =  array.map( (ar,index) => {
             return ar.value}).indexOf(e.currentTarget.parentElement.firstChild.innerHTML)
     
        array.splice(removeIndex,1);

        this.props.ondeleteLabel(array);
      
        this.props.onPostData('Hbfo28g25xXUCoexgKVi6TPcHhg2',array,"category");
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

        let listItems = null; 
        if(this.props.labels){
        
        let newArr=   this.props.labels.slice(1)
          
        listItems = newArr.map( label => {
                    return (
                    
                        <div  key={label.value}  className={classes.label}>
                            <li  key={label.value} value={label.value}>{label.displayValue}</li>
                            <div className={classes.cross} onClick={(e) => this.delLabelFromDB(e)}></div>
                        </div>
                      
        
                    )
            })
        }
        return (
            <div className={classes.container}>

                <div className={classes.inner}>
                <h1 className={classes.heading}>Manage your labels</h1>
                    <form className={classes.form} >
                    {form}
                    <Button btnType="small" disabled={(!this.state.controls.labels.valid)} clicked={event => this.buttonPress(event)}>Create new Label</Button>
                   </form>
                    <ul className={classes.labelList}>
                       {/* https://blog.logrocket.com/the-complete-guide-to-building-inline-editable-ui-in-react/ */}
                            {listItems}
                        
                          
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
        onAddLabels:(arr,item) => dispatch(actions.addLabel(arr,item)),
        onPostData:(id,data,type) => dispatch(actions.postData(id,data,type))
                
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(LabelEdit)