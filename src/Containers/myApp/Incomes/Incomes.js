import React from 'react'
import classes from './Incomes.module.css';
import { Component } from 'react';

import '../../../../node_modules/react-vis/dist/style.css';
// import {XYPlot, LineSeries,VerticalGridLines,HorizontalGridLines,XAxis,YAxis} from 'react-vis';
import {RadialChart} from 'react-vis';
import * as actions from '../../../store/action/index'
import {connect} from 'react-redux'; 
// import Input from '../../../Components/UI/input/input';


class Expense extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
        
        }

         
       
    }

    
    daysInMonth(month,year){
    
        return new Date(year,month,0).getDate()
        
    }  

    componentDidMount(){

        if(!this.props.error  ||( this.props.incomeDetails && this.props.incomeDetails[this.props.currentYear] && this.props.incomeDetails[this.props.currentYear][this.props.currentMonth])){
            
        let newArr = [] 
        let incArr = this.props.incomeDetails[this.props.currentYear][this.props.currentMonth];
           
           
         
        let newObj = incArr.reduce((obj,item) => {

            if(!obj[item.labelSelect]){
            obj[item.labelSelect] = { amount:parseInt(item.amount)}
            
            }else{
            
                obj[item.labelSelect].amount += parseInt(item.amount)
            }
       
            return obj;

        },{})


        //calculate angle
        
        //calculate angle
        let totalAmount = 0;
        for(let key in newObj) {
            
            totalAmount += parseInt(newObj[key].amount); 
          
        
            newArr.push({angle:((newObj[key].amount/totalAmount) * 100), label:key+ " "+ newObj[key].amount.toFixed(2)})
        }

        this.setState({data:newArr})

        }else{
            return;
        }
}
    
    render(){

let inc = null; 
let newArr = [];
let list = null; 
    if(!this.props.loading){
          inc = 0
          inc = inc.toFixed(2)

        // let num = this.daysInMonth(this.props.currentMonthIndex, this.props.currentYear); 
 
        // newArr = new Array (num); 
      
     

    if(!this.props.incomeDetails || !this.props.incomeDetails[this.props.currentYear] || !this.props.incomeDetails[this.props.currentYear][this.props.currentMonth]){
                inc = 0
                inc = inc.toFixed(2)
    }else if(this.props.incomeDetails[this.props.currentYear][this.props.currentMonth]){
            
         inc = parseInt(this.props.cash[this.props.currentYear][this.props.currentMonth].income).toFixed(2);
            let incArr = this.props.incomeDetails[this.props.currentYear][this.props.currentMonth];
           
           
         
            let newObj = incArr.reduce((obj,item) => {

                if(!obj[item.labelSelect]){
                obj[item.labelSelect] = { amount:parseInt(item.amount)}
                
                }else{
                  
                    obj[item.labelSelect].amount += parseInt(item.amount)
                }
           
                return obj;

            },{})

 


            //calculate angle
            let totalAmount = 0;
            for(let key in newObj) {
                
                totalAmount += parseInt(newObj[key].amount); 
              
            
                newArr.push({angle:((newObj[key].amount/totalAmount) * 100), label:key+ " "+ newObj[key].amount.toFixed(2)})
            }

            list = this.state.data.map(item => {
              return <li key={item.label} className={classes.listItem}> {item.label}</li>

               
            })
            
     

    }
    
    }

      
    return (

      <div className={classes.Graph}>
            <h1 className={classes.heading}>Total income this month:{inc}</h1>
  
        <div className={classes.Flex}>
            <RadialChart className={classes.Donut}innerRadius={95} labelsStyle={{fontSize:17}} radius={145} data ={this.state.data} height={300} width={400} showLabels></RadialChart>
            <div className={classes.listContainer}>
                <h3 className={classes.subheading}>List of Incomes</h3>
                <ul className={classes.list}>
                    {list}
                </ul>
            </div>
        </div>
      </div>
    )
    
    }
}

const mapStateToProps = state => {
    return {
        cash:state.details.cash,
        incomeDetails:state.details.incomeDetails,
        expenseDetails:state.details.expenseDetails,
        loading:state.details.loading,
        error:state.details.error
       
    }
}

const mapDispatchToProps = dispatch => {
    return {
   
        onRenderingData: () => dispatch(actions.renderData())
      
                
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Expense);