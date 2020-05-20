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
            currentMonth: null,
            currentYear: null,
            loading:true,
            tempIncome:0,
            tempExpense:0
                   
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
                value:'',
                touched:false,
                valid:false
            },
            details:{
                ...this.state.controls.details,
                value:''
            }
        }

        this.setState({controls:updatedControl})
            

        if(formElementsObj.select === "-"){
            let newArr = this.expenseCalc(formElementsObj.amount,formElementsObj,this.state.currentMonth,this.state.currentYear)
            console.log(newArr)
            this.props.onAddExpense(newArr[0],newArr[1])
            // this.props.onPostData(this.props.localId,newArr[0],newArr[1],"expense");
            this.postToDB("Hbfo28g25xXUCoexgKVi6TPcHhg2",newArr,"expense");
          
           
        }else if(formElementsObj.select ==="+"){
            let newArr = this.incomeCal(formElementsObj.amount, formElementsObj,this.state.currentMonth,this.state.currentYear)
            this.props.onAddIncome(newArr[0], newArr[1])
           
            this.postToDB("Hbfo28g25xXUCoexgKVi6TPcHhg2",newArr,"income");

            
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
        
           
    
    
        if(!this.props.expenseDetails[currentYear] || !this.props.expenseDetails[currentYear][currentMonth]){
                monthDetails.push(expenseDetails);
               
        }else{
            monthDetails = this.props.expenseDetails[currentYear][currentMonth].slice();
            monthDetails.push(expenseDetails)
        }
        
            let yearObj; 
            let monthObject = {
                ...this.props.expenseDetails[currentYear],
                [currentMonth]:monthDetails
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
    

    
       


    if(!this.props.incomeDetails[currentYear] || !this.props.incomeDetails[currentYear][currentMonth]){
            monthDetails.push(incomeDetails);
           
    }else{
        monthDetails = this.props.incomeDetails[currentYear][currentMonth].slice();
        monthDetails.push(incomeDetails)
    }
    
        let yearObj; 
        let monthObject = {
            ...this.props.incomeDetails[currentYear],
            [currentMonth]:monthDetails
        }

        yearObj = {
            ...this.props.incomeDetails,
            [currentYear]:monthObject
        }

        
        return [incomeDe,yearObj]        
         
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
        
        this.props.onRenderingData()
      
      // only need to load from the server once - to save to state
        
    }


    postToDB = (id = "Hbfo28g25xXUCoexgKVi6TPcHhg2",data,type) => {
        
      
        var newPostKey = firebase.database().ref().child('users').push().key;

        let updates = {} 
        updates['/users/' + id + '/cash'] = data[0]
        if(type ==="income"){
       
            updates['/users/' + id + '/incomeDetails'] = data[1]
        }
        if(type ==="expense"){
            updates['/users/' + id + '/expenseDetails'] = data[1]
        }

        return firebase.database().ref().update(updates).then(
            alert("you did i "))
            .catch(error => {alert(error)})
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

        if(this.props.incomeDetails){
            if(this.props.incomeDetails[this.state.currentYear]){
                if(this.props.incomeDetails[this.state.currentYear][this.state.currentMonth]){
                incomeList = (
                    this.props.incomeDetails[this.state.currentYear][this.state.currentMonth].map((inc,id) => {
                
                        return <li key={id}><p>{inc.details}</p><p>${inc.amount}</p></li>
                    })
                )
                }
            
        }else{
                incomeList = null;
        }
        }

        if(this.props.expenseDetails){
            if( this.props.expenseDetails[this.state.currentYear]){
                if( this.props.expenseDetails[this.state.currentYear][this.state.currentMonth]){
                            expenseList = this.props.expenseDetails[this.state.currentYear][this.state.currentMonth].map((exp,id) => {
            
                            return <li key={id}><p>{exp.details}</p><p>${exp.amount}</p></li>
                })
            
            }
        }
        }else{
            expenseList= null
        }

        let exp = 0;
        let inc = 0;
        let total =0;

        if(!this.props.loading) {
           
            if(this.props.cash){
                if(this.props.cash[this.state.currentYear] && this.props.cash[this.state.currentYear][this.state.currentMonth]){
                    if(this.props.cash[this.state.currentYear][this.state.currentMonth].expense){
                        exp = parseInt(this.props.cash[this.state.currentYear][this.state.currentMonth].expense).toFixed(2)
                    }
                    if(this.props.cash[this.state.currentYear][this.state.currentMonth].income){
                    inc = parseInt(this.props.cash[this.state.currentYear][this.state.currentMonth].income).toFixed(2)
                  
                    }
                    total = (inc - exp).toFixed(2)
            }else{
                exp = exp.toFixed(2)
                inc = inc.toFixed(2)
                total = total.toFixed(2);
            }

        }
    }
    
    


        return (
            <Aux>
            <div className={classes.monthContainer}>
                <div className={classes.arrowLeft} onClick={this.rendermonthBefore}></div>
                <div className={classes.arrowRight} onClick={this.rendermonthAfter}></div>
        <h1 className={classes.heading}>Available Budget in {this.state.currentMonth} {this.state.currentYear}</h1>
                <h2 className={classes.subHeading}>{total}</h2>
            </div>
                <div className={classes.topContainer}>
                    <div className={classes.banner + ' ' + classes.red}>Total Expense:<p  className={classes.subHeading_white}>{exp}</p></div>
                     <div className={classes.banner + ' ' + classes.green}>Total Income:<p className={classes.subHeading_white}>{inc}</p></div>
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
        // onPostData: (id,data) => dispatch(actions.postData(id,data)),
        onRenderingData: () => dispatch(actions.renderData())
                
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(Details)