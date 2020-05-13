import React, { Component } from 'react'
import Aux from '../../../hoc/Aux'
import classes from './Details.module.css';
import Input from '../../../Components/UI/input/input';
import {checkValidity} from '../../../share/utility'
import Button from '../../../Components/UI/button/button'
import {connect} from 'react-redux';
import * as actions from '../../../store/action/index';

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
            currentMonday: null,
            currentYear: null
                   
         }  
    }

    MONTHNAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];



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

        console.log(this.state.controls)

    }

    recordDetails = (event) => {
        event.preventDefault();
        let formElementsObj = {};

        for(let key in this.state.controls){
            formElementsObj[key] = this.state.controls[key].value

        }

        const updatedControl = {
            ...this.state.controls, 
            amount:{
                ...this.state.controls.amount,
                value:'' 
            },
            details:{
                ...this.state.controls.details,
                value:''
            }
        }

        this.setState({controls:updatedControl})
            
      
        if(formElementsObj.select ==="-"){
            this.props.onAddExpense(formElementsObj.amount,formElementsObj)
        }
        
        if(formElementsObj.select ==="+"){
            this.props.onAddIncome(formElementsObj.amount, formElementsObj)
        }

    }

    rendermonthBefore = () => {
      
        let currentMonth = this.state.currentMonth; 
        let num  = this.MONTHNAMES.indexOf(currentMonth); 
        console.log(num)

        if(num === 0) {
            num = 11; 
            let newYear = this.state.currentYear - 1; 
            let monthBefore = this.MONTHNAMES[num] 
            this.setState({currentMonth:monthBefore,currentYear:newYear})
        }else{
            num-=1; 
            let monthBefore = this.MONTHNAMES[num] 
           this.setState({currentMonth:monthBefore})
        }
    }

    rendermonthAfter =() => {

        let currentMonth = this.state.currentMonth; 
        let num  = this.MONTHNAMES.indexOf(currentMonth); 
     
        if(num === 11) {
            num = 0; 
            let newYear = this.state.currentYear + 1; 
            let monthAfter = this.MONTHNAMES[num] 
            this.setState({currentMonth:monthAfter,currentYear:newYear})
        }else{
            num+=1; 
            let monthAfter = this.MONTHNAMES[num] 
           this.setState({currentMonth:monthAfter})
        }

    }
    componentDidMount(){
        let currentMonth = this.MONTHNAMES[new Date().getMonth()]; 
        let currentYear = new Date().getUTCFullYear()
        console.log(currentYear)
        this.setState({currentMonth:currentMonth,currentYear:currentYear})
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
                   
                   
                  
                />

            )
        })

        let expenseList = null; 
        let incomeList = null;

        
        incomeList = (
            this.props.incomeDetails.map((inc,id) => {
                console.log(inc)
                return <li key={id}><p>{inc.details}</p><p>${inc.amount}</p></li>
            })
        )

        expenseList = this.props.expenseDetails.map((exp,id) => {
                console.log(exp)
                return <li key={id}><p>{exp.details}</p><p>${exp.amount}</p></li>
            })
           
            
        
    


        return (
            <Aux>
            <div className={classes.monthContainer}>
                <div className={classes.arrowLeft} onClick={this.rendermonthBefore}></div>
                <div className={classes.arrowRight} onClick={this.rendermonthAfter}></div>
        <h1 className={classes.heading}>Available Budget in {this.state.currentMonth} {this.state.currentYear}</h1>
                <h2 className={classes.subHeading}>{this.props.cashAvailable.toFixed(2)}</h2>
            </div>
                <div className={classes.topContainer}>
                        <div className={classes.banner + ' ' + classes.red}>Total Expense:<p  className={classes.subHeading_white}>{this.props.expense.toFixed(2)}</p></div>
                        <div className={classes.banner + ' ' + classes.green}>Total Income:<p className={classes.subHeading_white}>{this.props.income.toFixed(2)}</p></div>
                    </div>

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
        income:state.details.income,
        expense:state.details.expense,
        cashAvailable:state.details.cashAvailable,
        incomeDetails:state.details.incomeDetails,
        expenseDetails:state.details.expenseDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIncome: (income,incomeDetails) => dispatch(actions.addIncome(income,incomeDetails)),
        onAddExpense: (expense,expenseDetails) => dispatch(actions.addExpense(expense,expenseDetails))
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(Details)