import React, {Component} from 'react'; 
import classes from './myApp.module.css';
import Details from './Details/Details'
import Expenses from './Expenses/Expenses';
import Income from './Incomes/Incomes';
import {connect} from 'react-redux';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import LabelEdit from './LabelEdit/LabelEdit';
import Aux from '../../hoc/Aux';
import * as actions from '../../store/action/index';
class MyApp extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentComponent: 'details',
               currentMonth: null,
            currentYear: null,
            currentMonthIndex:null
            
          
        }
    }
    
    MONTHNAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];




  
    renderComponent = (event) => {
       
        this.setState({currentComponent:event.currentTarget.id})
    }
    
    componentDidMount(){
        let currentMonth = this.MONTHNAMES[new Date().getMonth()]; 
        let currentMonthIndex = new Date().getMonth() + 1;
       
        let currentYear = new Date().getUTCFullYear()
        // console.log(currentYear)
        this.setState({currentMonth:currentMonth,currentYear:currentYear,currentMonthIndex:currentMonthIndex})

        this.props.onRenderingData()
      
      // only need to load from the server once - to save to state
        
    }

    rendermonthBefore = () => {
      
        let currentMonth = this.state.currentMonth; 
        let num  = this.MONTHNAMES.indexOf(currentMonth); 
   

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

     
    
     
    
        return (
        <div className={classes.container}>
           
            <div className={classes.GridContainer}>


                <div className={classes.left}>
                    {/* <h2 className={classes.heading}>Tool Bar</h2> */}
                    <ul className={classes.list}>
                        
                    {this.state.currentComponent ==="details" ? 
                    <li id="details" className={classes.itemActive} onClick={(e) => this.renderComponent(e)}>
                    <FontAwesomeIcon className={classes.FontAwesome}  icon="list"></FontAwesomeIcon>
                            Monthly Overview
                    </li>
                     : <li id="details" className={classes.item} onClick={(e) => this.renderComponent(e)}>
                         <FontAwesomeIcon className={classes.FontAwesome} icon="list"></FontAwesomeIcon>
                     Monthly Overview</li>}
                      {this.state.currentComponent ==="expense" ? 
                      <li id="expense" className={classes.itemActive} onClick={(e) => this.renderComponent(e)}>
                          <FontAwesomeIcon className={classes.FontAwesome} icon="money-bill-alt"></FontAwesomeIcon>
                          Expense 
                          </li>
                     : <li id="expense" className={classes.item} onClick={(e) => this.renderComponent(e)}>
                         <FontAwesomeIcon className={classes.FontAwesome} icon="money-bill-alt"></FontAwesomeIcon>
                     Expense  </li>}

                      {this.state.currentComponent ==="income" ? 
                      <li id="income" className={classes.itemActive} onClick={(e) => this.renderComponent(e)}>
                            <FontAwesomeIcon className={classes.FontAwesome}  icon="piggy-bank"></FontAwesomeIcon>
                     Income
                      </li>
                     : <li id="income" className={classes.item} onClick={(e) => this.renderComponent(e)}>
                    <FontAwesomeIcon className={classes.FontAwesome}  icon="piggy-bank"></FontAwesomeIcon>
                     Income  </li>}
                    

                    {this.state.currentComponent ==="label"  ?
                     <li id="label"  className={classes.itemActive} onClick={(e) => this.renderComponent(e)}>
                          <FontAwesomeIcon className={classes.FontAwesome} icon="tags"></FontAwesomeIcon>
                     Manage Labels
                     </li>
                     : <li id="label" className={classes.item} onClick={(e) => this.renderComponent(e)}> 
                     <FontAwesomeIcon className={classes.FontAwesome}  icon="tags"></FontAwesomeIcon>
                     Manage Labels
                     </li>}

                     
                    </ul>
                </div>


                <div className={classes.right}>
                { this.state.currentComponent === "label" ? null :
               
               (   <Aux><div className={classes.monthContainer}>
                        <div className={classes.arrowLeft} onClick={this.rendermonthBefore}></div>
                        <div className={classes.arrowRight} onClick={this.rendermonthAfter}></div>
                        <h1 className={classes.headingRight}>{this.state.currentMonth} {this.state.currentYear}</h1>
                             
                    </div>
                   
                    </Aux>
                        ) 
                        }
               
        
                    {this.state.currentComponent ==="details" ? 
                    <Details currentYear={this.state.currentYear} 
                        currentMonth={this.state.currentMonth}
                        /> : null} 
                    {this.state.currentComponent ==="expense" ? <Expenses currentMonthIndex = {this.state.currentMonthIndex} currentYear={this.state.currentYear} 
                        currentMonth={this.state.currentMonth}/> : null}
                    {this.state.currentComponent ==="income" ? <Income currentMonthIndex = {this.state.currentMonthIndex} currentYear={this.state.currentYear} 
                        currentMonth={this.state.currentMonth}/> : null}

                    {this.state.currentComponent ==="label" ? <LabelEdit currentMonthIndex = {this.state.currentMonthIndex} currentYear={this.state.currentYear} 
                        currentMonth={this.state.currentMonth}/> : null}
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
