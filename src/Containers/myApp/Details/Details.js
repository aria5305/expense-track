import React, { Component } from 'react'
import Aux from '../../../hoc/Aux'
import classes from './Details.module.css';
import Input from '../../../Components/UI/input/input';
import {checkValidity} from '../../../share/utility'
import Button from '../../../Components/UI/button/button'
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'; 
import * as actions from '../../../store/action/index';

import "firebase/database"

class Details extends Component{
    constructor(props){
        super(props)
        this.state = {
          
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
              
                date:{
                    elementType:'input',
                    elementConfig:{
                        type:'date',
                        placeholder:'Pick a date within this month',
                        min:null,
                        max:null,
                    },
                    id:'date',
                    value:'',
                    // style:{width:'30rem'},
                    validation:{
                        required:true,
                       
                    },
                    valid:false,
                    touched:false,
    
                },
              
                details: {
                 elementType:'input',
                 elementConfig:{
                     type:'text',
                     placeholder:'Describe expense/income in details'
                 },
                 id:'details',
                 value:'',
                 valid:false,
                 touched:false,
             },
             amount: {
                elementType:'input',
                elementConfig:{
                    type:'number',
                    placeholder:'Enter an amount'
                },
                id:'amount',
                value:'',
                validation:{
                    required:true,
                    minLength:1
                },
                valid:false,
                touched:false,
             },
            
             
            },
            // currentMonth: null,
            // currentYear: null,
            loading:true,
            selectLabel:'income',
      
         }  
       
    }


    inputChangedHandler = (event,controlName) => {

        console.log(event.target.value, controlName);
        const updatedControlElement = this.state.controls[controlName];
   
      if(controlName ==="selectLabel"){
    
        this.setState({selectLabel:event.target.value})
      }else{

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

    console.log(this.state)

      

            

    }

 

  
    recordDetails = (event) => {
        event.preventDefault();
        let formElementsObj = {};

        for(let key in this.state.controls){
            formElementsObj[key] = this.state.controls[key].value
        }

        formElementsObj.labelSelect = this.state.selectLabel
        
        let  today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        today = yyyy+ '-' + mm + '-' + dd;

        
        const updatedControl = {
            ...this.state.controls, 
            amount:{
                ...this.state.controls.amount,
                value:'',
                touched:false,
                valid:false
            },
            details:{
                ...this.state.controls.details,
                value:''
            },
            date:{
                ...this.state.controls.date,
                value:today
            },
            

        }

        this.setState({controls:updatedControl})

        console.log(updatedControl.date);
            

        if(formElementsObj.select === "-"){
            let newArr = this.expenseCalc(formElementsObj.amount,formElementsObj,this.props.currentMonth,this.props.currentYear)
            console.log(newArr)
            this.props.onAddExpense(newArr[0],newArr[1])
            this.props.onPostData(this.props.localId,newArr,"expense");
          
           
        }else if(formElementsObj.select ==="+"){
            let newArr = this.incomeCal(formElementsObj.amount, formElementsObj,this.props.currentMonth,this.props.currentYear)
            this.props.onAddIncome(newArr[0], newArr[1])
           
            this.props.onPostData(this.props.localId,newArr,"income");

   
            
           
        }

        
    
        

    }

    expenseCalc = (expense,expenseDetails,currentMonth,currentYear) => {
        let expenseDe;
        let monthDetails = []; 
       
        console.log(this.props.cash ,"state");
    
    
        if(!this.props.cash[currentYear]){
            expenseDe = {[currentYear]:{[currentMonth]:{"expense":parseInt(expense)}}}
            console.log(expenseDe,"frist")
        }else if(!this.props.cash[currentYear][currentMonth]){
            expenseDe = {[currentYear]:{...this.props.cash[currentYear],
                [currentMonth]:{"expense":parseInt(expense)}}}
            console.log(expenseDe,"second= new month ")
        }
        else if(this.props.cash[currentYear][currentMonth].expense){
                let newExpense = parseInt(this.props.cash[currentYear][currentMonth].expense) + parseInt(expense);
                expenseDe= {[currentYear]:{...this.props.cash[currentYear],[currentMonth]:{...this.props.cash[currentYear][currentMonth],"expense": newExpense}}}
                console.log(expenseDe,"second")
        }else if(!this.props.cash[currentYear][currentMonth].expense){
            expenseDe= {[currentYear]:{...this.props.cash[currentYear],[currentMonth]:{...this.props.cash[currentYear][currentMonth],"expense": parseInt(expense)}}}
            console.log(expenseDe,"second")
        }  else{
            expenseDe=null;
        }
        
        let yearObj; 
        let monthObject

        if(!this.props.expenseDetails ||!this.props.expenseDetails[currentYear] ){
            monthDetails.push(expenseDetails);
    
            monthObject = {
            
                [currentMonth]:monthDetails
            }
        
    
        }else if(!this.props.expenseDetails[currentYear][currentMonth]){
                
            monthDetails.push(expenseDetails);
    
            monthObject = {
                ...this.props.expenseDetails[currentYear],
                [currentMonth]:monthDetails
            }
            
        
               
        }else{
            monthDetails = this.props.expenseDetails[currentYear][currentMonth].slice();
            monthDetails.push(expenseDetails)
    
            monthObject = {
                ...this.props.expenseDetails[currentYear],
                [currentMonth]:monthDetails
            }
    
        }
        
            
        yearObj = {
            ...this.props.expenseDetails,
            [currentYear]:monthObject
        }
        
            return [expenseDe,yearObj]
    }

    incomeCal = (income,incomeDetails,currentMonth,currentYear) => {
        let incomeDe;
        let monthDetails = []; 
   
    console.log(this.props.cash ,"this.props");


    if(!this.props.cash[currentYear]){
        incomeDe = {[currentYear]:{[currentMonth]:{"income":income}}}
        console.log(incomeDe,"frist")
    }else if(!this.props.cash[currentYear][currentMonth]){
        incomeDe = {[currentYear]:{...this.props.cash[currentYear],
            [currentMonth]:{"income":parseInt(income)}}}
        console.log(incomeDe,"second= new month ")
    }
    else if(this.props.cash[currentYear][currentMonth].income){
           let newIncome = parseInt(this.props.cash[currentYear][currentMonth].income) + parseInt(income);
            incomeDe= {[currentYear]:{...this.props.cash[currentYear],[currentMonth]:{...this.props.cash[currentYear][currentMonth],"income": newIncome}}}
            console.log(incomeDe,"second")
    }else if(!this.props.cash[currentYear][currentMonth].income){
        incomeDe= {[currentYear]:{...this.props.cash[currentYear],[currentMonth]:{...this.props.cash[currentYear][currentMonth],"income": parseInt(income)}}}
        console.log(incomeDe,"second")
    }else{
        incomeDe= null;
    }
    

    
       


    let yearObj; 
    let monthObject

    if(!this.props.incomeDetails ||!this.props.incomeDetails[currentYear] ){
        monthDetails.push(incomeDetails);

        monthObject = {
        
            [currentMonth]:monthDetails
        }
    

    }else if(!this.props.incomeDetails[currentYear][currentMonth]){
            
        monthDetails.push(incomeDetails);

        monthObject = {
            ...this.props.incomeDetails[currentYear],
            [currentMonth]:monthDetails
        }
        
    
           
    }else{
        monthDetails = this.props.incomeDetails[currentYear][currentMonth].slice();
        monthDetails.push(incomeDetails)

        monthObject = {
            ...this.props.incomeDetails[currentYear],
            [currentMonth]:monthDetails
        }

    }
    
        
    yearObj = {
        ...this.props.incomeDetails,
        [currentYear]:monthObject
    }
    
        return [incomeDe,yearObj]
    }

  


    componentDidMount(){
        

            const updatedControlElement = this.state.controls.date;
       
        
              let  today = new Date();
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                const yyyy = today.getFullYear();
    
                today = yyyy+ '-' + mm + '-' + dd;
                let updatedControl = {
               ...this.state.controls,
                date:{
                    ...updatedControlElement,
                    value:today,
                    elementConfig:{...updatedControlElement.elementConfig,
                        min:yyyy+ '-' + mm + '-01',
                    max: today}
                    
                },
                // labelSelect:{
                //     ...this.state.controls.labelSelect,
                //     elementConfig:{
                //      ...this.state.controls.labelSelect.elementConfig,
                //         options:this.props.labels,
                //     }
                // }
                // where to update this instead? 
            }
        

            console.log(updatedControl,"updatedcontrol for state"); 

            this.setState({controls:updatedControl})
          

    
    }
    

     

   
    render(){

        let exp = 0;
        let inc = 0;
        let label = null;
        // let total =0;

        if(!this.props.loading ) {
           
            if(this.props.cash){
                if(this.props.cash[this.props.currentYear] && this.props.cash[this.props.currentYear][this.props.currentMonth]){
                    if(this.props.cash[this.props.currentYear][this.props.currentMonth].expense){
                        exp = parseInt(this.props.cash[this.props.currentYear][this.props.currentMonth].expense).toFixed(2)
                    }
                    if(this.props.cash[this.props.currentYear][this.props.currentMonth].income){
                    inc = parseInt(this.props.cash[this.props.currentYear][this.props.currentMonth].income).toFixed(2)
                  
                    }
                    // total = (inc - exp).toFixed(2)
            }else{
                exp = exp.toFixed(2)
                inc = inc.toFixed(2)
                // total = total.toFixed(2);
            }

        }
        if(this.state.controls.select.value === "+") {
            label =   <Input 
              elementType="select"
              elementConfig={{"type":"select",options:this.props.labels.income}}
              style={{margin:".5rem",width:"15rem"}}
              changed={(event) => this.inputChangedHandler(event, "selectLabel")}/>
        }
        else if(this.state.controls.select.value === "-"){
              label = <Input 
              elementType="select"
              elementConfig={{"type":"select",options:this.props.labels.expense}}
              style={{margin:".5rem",width:"15rem"}}
              changed={(event) => this.inputChangedHandler(event, "selectLabel")}/>
          }
      
    }
      
        const formElementsArray = []; 

       
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        console.log(formElementsArray);
        let form = formElementsArray.map(formElement => {

            
            return (
                <Input 
                className={classes.Input}
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

        let expenseList = null; 
        let incomeList = null;

      
       
       
        if(this.props.incomeDetails ){
            if(this.props.incomeDetails[this.props.currentYear]){
                if(this.props.incomeDetails[this.props.currentYear][this.props.currentMonth]){
                incomeList = (
                    this.props.incomeDetails[this.props.currentYear][this.props.currentMonth].map((inc,id) => {
                
                        return <li className={classes.items} key={id}><p>{inc.details}<span className={classes.smallLabel}>{inc.labelSelect ? inc.labelSelect: "income"}</span></p><p>${inc.amount}</p> 
                        <FontAwesomeIcon  className={classes.icon}icon="trash" 
                        onClick={() => {
                            this.props.onDeleteIncEntry(this.props.incomeDetails,inc,this.props.currentYear,this.props.currentMonth)}

                        }></FontAwesomeIcon></li>
                    })
                )
                }
            
        }else{
                incomeList = null;
        }
        }

        if(this.props.expenseDetails ){
            if( this.props.expenseDetails[this.props.currentYear]){
                if( this.props.expenseDetails[this.props.currentYear][this.props.currentMonth]){
                            expenseList = this.props.expenseDetails[this.props.currentYear][this.props.currentMonth].map((exp,id) => {
                                
                            return <li className={classes.items}  key={id}><p>{exp.details} <span className={classes.smallLabel}>{exp.labelSelect ? exp.labelSelect: "expense"}</span></p><p>${exp.amount}</p> 
                            <FontAwesomeIcon className={classes.icon} icon="trash"  
                            onClick={()=>this.props.onDeleteExpEntry(this.props.expenseDetails,exp, this.props.currentYear,this.props.currentMonth)}></FontAwesomeIcon></li>
                })
            
            }
        }
        }else{
            expenseList= null
        }

 

    


        return (
            <Aux>
                    <div className={classes.topContainer}>
                                    <div className={classes.banner + ' ' + classes.red}>Total Expense:<p  className={classes.subHeading_white}>{exp}</p></div>
                                    <div className={classes.banner + ' ' + classes.green}>Total Income:<p className={classes.subHeading_white}>{inc}</p></div>
                    </div>
                    <div className={classes.mediumContainer}>
                        <form className={classes.form}>
                            {form}
                            {label}
                            <Button btnType="small" style={{margin:"1rem"}} 
                            disabled={(!this.state.controls.amount.valid)} 
                            clicked={this.recordDetails}>Add</Button>
                        </form>
                    </div>
                    <div className={classes.bottomContainer}>
                        <div className={classes.bottomLeft}>
                            <h3 className={classes.heading}>Expense</h3>
                               
                                 <ul className={classes.list}>
                                    {expenseList} 
                                </ul>
                            
                        </div>
                        <div className={classes.bottomRight}>
                            <h3 className={classes.heading}>Income</h3>
                           
                            <ul className={classes.list}>
                                {incomeList}
                            </ul>
                        </div>
                    </div>
            </Aux>
        )
    }
}


const mapStateToProps = state => {
    return {
        cash:state.details.cash,
        incomeDetails:state.details.incomeDetails,
        expenseDetails:state.details.expenseDetails,
        localId:state.auth.localId,
        loading:state.details.loading,
        labels:state.details.labels,
        error:state.details.error,

      
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIncome: (income,data) => dispatch(actions.addIncome(income,data)),
        onAddExpense: (expense,data) => dispatch(actions.addExpense(expense,data)),
        onPostData: (id,data,type) => dispatch(actions.postData(id,data,type)),
        onRenderingData: () => dispatch(actions.renderData()),
        onDeleteExpEntry: (obj,item, currentYear,currentMonth) => dispatch(actions.deleteExpenseEntry(obj,item, currentYear,currentMonth)),
        onDeleteIncEntry: (obj,item, currentYear,currentMonth) => dispatch(actions.deleteIncomeEntry(obj,item, currentYear,currentMonth))
                
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(Details)