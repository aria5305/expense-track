import React, {Component} from 'react'; 
import classes from './myApp.module.css';
import Details from './Details/Details'
import Graph from '../../Components/graph/graph';
class MyApp extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentComponent: 'details'
        }
    }

    renderComponent = (event) => {
        console.log(event.target.id)
        this.setState({currentComponent:event.target.id})
    }
    render(){
       
        return (
        <div className={classes.container}>
           
            <div className={classes.GridContainer}>


                <div className={classes.left}>
                    <h2 className={classes.heading}>Tool Bar</h2>
                    <ul className={classes.list}>
                        
                    {this.state.currentComponent ==="details" ? <li id="details" className={classes.itemActive} onClick={this.renderComponent}>Budgets in details</li>
                     : <li id="details" className={classes.item} onClick={this.renderComponent}>Budgets in details</li>}
                    {this.state.currentComponent ==="spendingGraphs"  ? <li id="spendingGraphs"  className={classes.itemActive} onClick={this.renderComponent}>Spending Graphs</li>
                     : <li id="spendingGraphs" className={classes.item} onClick={this.renderComponent}>Spending Graphs</li>}

                    {this.state.currentComponent ==="incomeGraphs"  ? <li id="incomeGraphs"  className={classes.itemActive} onClick={this.renderComponent}>Income Graphs</li>
                     : <li id="incomeGraphs" className={classes.item} onClick={this.renderComponent}>Income Graphs</li>}
                       
        
                    </ul>
                </div>


                <div className={classes.right}>
                    {this.state.currentComponent ==="details" ? <Details/> : null}
                    {this.state.currentComponent ==="graph" ? <Graph/> : null}
                </div>

            </div>
        </div>
        )
    }
}

export default MyApp;
