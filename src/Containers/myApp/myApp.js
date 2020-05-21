import React, {Component} from 'react'; 
import classes from './myApp.module.css';
import Details from './Details/Details'
import Graphs from './Details/Graphs/Graphs';
import {connect} from 'react-redux';

import * as actions from '../../store/action/index';
class MyApp extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentComponent: 'details',
             currentMonth: null,
            currentYear: null,
        }
    }

    MONTHNAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
    renderComponent = (event) => {
        console.log(event.target.id)
        this.setState({currentComponent:event.target.id})
    }
    
    componentDidMount(){
        let currentMonth = this.MONTHNAMES[new Date().getMonth()]; 
        let currentYear = new Date().getUTCFullYear()
        console.log(currentYear)
        this.setState({currentMonth:currentMonth,currentYear:currentYear})

        this.props.onRenderingData()
      
      // only need to load from the server once - to save to state
        
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
    render(){

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
        <div className={classes.container}>
           
            <div className={classes.GridContainer}>


                <div className={classes.left}>
                    <h2 className={classes.heading}>Tool Bar</h2>
                    <ul className={classes.list}>
                        
                    {this.state.currentComponent ==="details" ? <li id="details" className={classes.itemActive} onClick={this.renderComponent}>Monthly Overview</li>
                     : <li id="details" className={classes.item} onClick={this.renderComponent}>Monthly Overview</li>}
                    {this.state.currentComponent ==="spendingGraphs"  ? <li id="spendingGraphs"  className={classes.itemActive} onClick={this.renderComponent}>Spending Graphs</li>
                     : <li id="spendingGraphs" className={classes.item} onClick={this.renderComponent}>Spending Graphs</li>}

                    {this.state.currentComponent ==="incomeGraphs"  ? <li id="incomeGraphs"  className={classes.itemActive} onClick={this.renderComponent}>Income Graphs</li>
                     : <li id="incomeGraphs" className={classes.item} onClick={this.renderComponent}>Income Graphs</li>}

                        {this.state.currentComponent ==="incomeGraphs"  ? <li id="incomeGraphs"  className={classes.itemActive} onClick={this.renderComponent}>Manage your labels</li>
                     : <li id="incomeGraphs" className={classes.item} onClick={this.renderComponent}>Manage your labels</li>}
        
                    </ul>
                </div>


                <div className={classes.right}>
               
                        <div className={classes.monthContainer}>
                        <div className={classes.arrowLeft} onClick={this.rendermonthBefore}></div>
                        <div className={classes.arrowRight} onClick={this.rendermonthAfter}></div>
                        <h1 className={classes.headingRight}>Available Budget in {this.state.currentMonth} {this.state.currentYear}</h1>
                                <h2 className={classes.subHeading}>{total}</h2>
                            </div>
                                <div className={classes.topContainer}>
                                    <div className={classes.banner + ' ' + classes.red}>Total Expense:<p  className={classes.subHeading_white}>{exp}</p></div>
                                    <div className={classes.banner + ' ' + classes.green}>Total Income:<p className={classes.subHeading_white}>{inc}</p></div>
                        </div>
           
                    {/* <Graphs currentYear={this.state.currentYear} 
                        currentMonth={this.state.currentMonth}
                    /> */}
                    {this.state.currentComponent ==="details" ? 
                    <Details currentYear={this.state.currentYear} 
                        currentMonth={this.state.currentMonth}
                        /> : null}
                    {/* {this.state.currentComponent ==="graph" ? <Graphs/> : null} */}
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
        localId:state.auth.localId,
        loading:state.details.loading,
      
    }
}

const mapDispatchToProps = dispatch => {
    return {
     
        onRenderingData: () => dispatch(actions.renderData())
                
    }
}



export default connect(mapStateToProps,mapDispatchToProps) (MyApp);
