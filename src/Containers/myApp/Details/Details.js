import React, { Component } from 'react'
import Aux from '../../../hoc/Aux'
import classes from './Details.module.css';
import Input from '../../../Components/UI/input/input';
import {checkValidity} from '../../../share/utility'
import Button from '../../../Components/UI/button/button'
import {connect} from 'react-redux';
import * as actions from '../../../store/action/index';
import * as firebase from "firebase/app";
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
                    style:{width:'30rem'},
                    validation:{
                        required:true,
                       
                    },
                    valid:false,
                    touched:false,
    
                },
                labelSelect:{
                    elementType:'select',
                    elementConfig:{
                        type:'select',
                     
                        options:[
                            {value:'',displayValue:'Select a label'},
                            {value:'Food',displayValue:'Food'},
                            {value:'Entertainment',displayValue:'Entertainment'},
                            {value:'Shopping',displayValue:'Shopping'},
                            {value:'Transport',displayValue:'Transport'},
                            {value:'Health & Exercise',displayValue:'Health & Exercise'},
                            {value:'Gifts',displayValue:'Gifts'},
                            {value:'Home and Utility',displayValue:'Home and Utility'},
                            ],
                      
                    },
                    style:{width:'10rem'},
                    id:'select',
                    value:'+',
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
      
         }  
       
    }

//     MONTHNAMES = ["January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];



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

 

  
    recordDetails = (event) => {
        event.preventDefault();
        let formElementsObj = {};

        for(let key in this.state.controls){
            formElementsObj[key] = this.state.controls[key].value
        }

        
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
            labelSelect:{
                ...this.state.controls.labelSelect,
                value:''
            }

        }

        this.setState({controls:updatedControl})
        console.log(updatedControl.date);
            

        if(formElementsObj.select === "-"){
            let newArr = this.expenseCalc(formElementsObj.amount,formElementsObj,this.props.currentMonth,this.props.currentYear)
            console.log(newArr)
            this.props.onAddExpense(newArr[0],newArr[1])
            // this.props.onPostData(this.props.localId,newArr[0],newArr[1],"expense");
            this.props.onPostData("Hbfo28g25xXUCoexgKVi6TPcHhg2",newArr,"expense");
          
           
        }else if(formElementsObj.select ==="+"){
            let newArr = this.incomeCal(formElementsObj.amount, formElementsObj,this.props.currentMonth,this.props.currentYear)
            this.props.onAddIncome(newArr[0], newArr[1])
           
            this.props.onPostData("Hbfo28g25xXUCoexgKVi6TPcHhg2",newArr,"income");

            
            // this.props.onPostData(this.props.localId,newArr[0],newArr[1],"income");
           
          
            
           
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

            const updatedControl = {
                ...this.state.controls, 
                date:{
                    ...updatedControlElement,
                    value:today,
                    elementConfig:{...updatedControlElement.elementConfig,
                        min:yyyy+ '-' + mm + '-01',
                    max: today}
                    
                }
            }
    
            this.setState({controls:updatedControl})
            console.log(updatedControl)
    
    
        }
    
    
    //     let currentMonth = this.MONTHNAMES[new Date().getMonth()]; 
    //     let currentYear = new Date().getUTCFullYear()
    //     console.log(currentYear)
    //     this.setState({currentMonth:currentMonth,currentYear:currentYear})

    //     this.props.onRenderingData()
      
    //   // only need to load from the server once - to save to state
        
    // }


   
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

        let expenseList = null; 
        let incomeList = null;

        if(this.props.incomeDetails){
            if(this.props.incomeDetails[this.props.currentYear]){
                if(this.props.incomeDetails[this.props.currentYear][this.props.currentMonth]){
                incomeList = (
                    this.props.incomeDetails[this.props.currentYear][this.props.currentMonth].map((inc,id) => {
                
                        return <li key={id}><p>{inc.details}</p><p>${inc.amount}</p></li>
                    })
                )
                }
            
        }else{
                incomeList = null;
        }
        }

        if(this.props.expenseDetails){
            if( this.props.expenseDetails[this.props.currentYear]){
                if( this.props.expenseDetails[this.props.currentYear][this.props.currentMonth]){
                            expenseList = this.props.expenseDetails[this.props.currentYear][this.props.currentMonth].map((exp,id) => {
            
                            return <li key={id}><p>{exp.details}</p><p>${exp.amount}</p></li>
                })
            
            }
        }
        }else{
            expenseList= null
        }

    
    


        return (
            <Aux>
 
                    <div className={classes.mediumContainer}>
                        <form className={classes.form}>
                            {form}
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
      
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIncome: (income,data) => dispatch(actions.addIncome(income,data)),
        onAddExpense: (expense,data) => dispatch(actions.addExpense(expense,data)),
        onPostData: (id,data,type) => dispatch(actions.postData(id,data,type)),
        onRenderingData: () => dispatch(actions.renderData())
                
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(Details)