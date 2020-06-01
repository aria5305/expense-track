import React from 'react'
import classes from './Graphs.module.css';
import { Component } from 'react';
import Aux from '../../../hoc/Aux'
import '../../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries,VerticalGridLines,HorizontalGridLines,XAxis,YAxis} from 'react-vis';
import * as actions from '../../../store/action/index'
import {connect} from 'react-redux'; 
import Input from '../../../Components/UI/input/input';


class Graphs extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            controls:{  
                selectGraph:{ elementType:'select',
                elementConfig:{
                    type:'select',
                    options:[
                        {value:'pie',displayValue:'Pie Graph'},
                        {value:'line',displayValue:'Line Graph'},
                        {value:'bar',displayValue:'Bar Graph'}],
                  
                },
                id:'selectGraph',
                value:'please select',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                style:{width:'5rem'}
            },
            

             }  
        }

         
       
    }

    
    daysInMonth(month,year){
    
        return new Date(year,month,0).getDate()
        
    }  
    
    render(){

    let newArr = null; 
    let eArr = null; 

      if(!this.props.loading ){

        
        let num = this.daysInMonth(this.props.currentMonthIndex, this.props.currentYear); 
 
        newArr = new Array (num); 
        eArr = new Array(num)
            

        if(this.props.incomeDetails[this.props.currentYear][this.props.currentMonth] || 
            this.props.expenseDetails[this.props.currentYear][this.props.currentMonth]){
            let incArr = this.props.incomeDetails[this.props.currentYear][this.props.currentMonth];
            let expArr = this.props.expenseDetails[this.props.currentYear][this.props.currentMonth];

            for (let i = 0; i < newArr.length; i++){
                newArr[i] = {}
                eArr[i] = {}
                newArr[i].x = i + 1; 
                eArr[i].x = i + 1; 
                newArr[i].y = 0;
                eArr[i].y = 0;
            }

            console.log(newArr,eArr)


        incArr.map(item => {
            let date = item.date.slice(-2); 
          
            if(date.indexOf("0") === 0){
                date = date.slice(-1);
            }


            if(newArr[date].x === parseInt(date)+1){
               newArr[date].y += parseInt(item.amount)
              
            }

            return newArr
           

        })

        expArr.map(item => {
            let date = item.date.slice(-2); 
          
            if(date.indexOf("0") === 0){
                date = date.slice(-1);
            }

           
            console.log(eArr[date], newArr[date].x)

            if(eArr[date].x === parseInt(date)+1){
               eArr[date].y += parseInt(item.amount)
              
            }

            return eArr
        
            })
        }
    
    }else{

        for (let i = 0; i < newArr.length; i++){
            newArr[i] = {}
            eArr[i] = {}
            newArr[i].x = i + 1; 
            eArr[i].x = i + 1; 
            newArr[i].y = 0;
            eArr[i].y = 0;
        }

    }
    

      
    return (

      <div className={classes.Graph}>
  
        <XYPlot height={500} width={750}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <LineSeries data={newArr} curve={'curveMonotoneX'}/> 
            <LineSeries data={eArr} color="pink"  curve={'curveMonotoneX'}/>
        </XYPlot>
      </div>
    );
    
    }
}

const mapStateToProps = state => {
    return {
        // cash:state.details.cash,
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

export default connect(mapStateToProps,mapDispatchToProps)(Graphs);