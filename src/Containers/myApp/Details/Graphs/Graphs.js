import React from 'react'
import classes from './Graphs.module.css';
import { Component } from 'react';
import Aux from '../../../../hoc/Aux'
import '../../../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries,VerticalGridLines,HorizontalGridLines,XAxis,YAxis} from 'react-vis';
import * as actions from '../../../../store/action/index'
import {connect} from 'react-redux'; 

class Graphs extends Component{
    constructor(props){
        super(props)
        this.state = {

         }  

         
       
    }


    data = [
        {x: 0, y: 1},
        {x: 1, y: 5},
        {x: 2, y: 4},
        {x: 3, y: 9},
        {x: 4, y: 1},
        {x: 5, y: 7},
        {x: 6, y: 6},
        {x: 7, y: 3},
        {x: 8, y: 2},
        {x: 9, y: 0}
      ];

      //x will be the month, Y will be the income/expense
      //array should be 30 - with total income of that day/showing
  
      //button to swtich between bar and line graph
      //page to add labels and show % of spending

      gatherData = () => {
        let incArr = this.props.incomeDetails[this.props.currentYear][this.props.currentMonth];
        let expArr = this.props.expenseDetails[this.props.currentYear][this.props.currentMonth];

        // incArr.reduce( r => {

        // },{})
        console.log(incArr,expArr)
      }
    render(){
       
        if(!this.props.loading){
            this.gatherData();
            

        }
        
        return (

      <div>
          Hello
        <XYPlot height={300} width={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
    <YAxis />
          <LineSeries data={this.data} />
        </XYPlot>
      </div>
    );
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
   
        // onRenderingData: () => dispatch(actions.renderData())
                
    }
}

export default connect(mapStateToProps,null)(Graphs);