import React from 'react'
import classes from './Expenses.module.css';
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
        let newArr = [] 
        let incArr = this.props.expenseDetails[this.props.currentYear][this.props.currentMonth];
           
           
         
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

    }
    
    render(){

        let exp = null; 
        let newArr = [];
        let list = null; 
      if(!this.props.loading ){
        exp = 0
        exp = exp.toFixed(2)
        // let num = this.daysInMonth(this.props.currentMonthIndex, this.props.currentYear); 
 
        // newArr = new Array (num); 
      
            
        if(!this.props.expenseDetails){
            exp = 0
            exp = exp.toFixed(2)
        }
        else if(this.props.expenseDetails[this.props.currentYear][this.props.currentMonth]){
            
         exp = parseInt(this.props.cash[this.props.currentYear][this.props.currentMonth].expense).toFixed(2);
           

            list = this.state.data.map(item => {
              return <li key={item.label} className={classes.listItem}> {item.label}</li>

               
            })
           

        
    
    }else{
             
        exp= 0
          exp= exp.toFixed(2)


   
}
}
      
    return (

      <div className={classes.Graph}>
            <h1 className={classes.heading}>Total Expenses this month:{exp}</h1>
  
        <div className={classes.Flex}>
            <RadialChart className={classes.Donut}innerRadius={95} labelsStyle={{fontSize:17}} subLabelsStyle={{fontSize:15}} radius={145} data ={this.state.data} height={300} width={400} showLabels></RadialChart>
            <div className={classes.listContainer}>
                <h3 className={classes.subheading}>List of Expense</h3>
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
        loading:state.details.loading
       
    }
}

const mapDispatchToProps = dispatch => {
    return {
   
        onRenderingData: () => dispatch(actions.renderData())
                
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Expense);