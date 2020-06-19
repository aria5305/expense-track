import React,{Component} from 'react'
import Aux from '../../hoc/Auxillary';
import classes from './Layout.module.css'
// import Toolbar from '../Navigation/Toolbar/Toolbar'
import Navigation from '../../Components/Navigation/Navigation'
import Drawer from '../../Components/Navigation/Drawer/Drawer'

class layout extends Component {
    constructor(props){
        super(props)
        this.state = {
            showSideDrawer:false
        }
    }

    sideDrawerClosedHandler = () => {
        
        this.setState({showSideDrawer:false})
    }
    sideDrawerOpenHandler = () => {
        console.log("hello")
        this.setState( (prevState)=> {
            return { showSideDrawer:!this.state.showSideDrawer}
        })
    }
    render(){
        return(
            <div className={classes.Layout}>
                <div className={classes.Header}>
                    <Navigation clicked={this.sideDrawerOpenHandler}/>
                    <Drawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                </div>
                <main className={classes.Content}>
                        {this.props.children}
                </main>
            </div>
          
        )
    }
 
}

export default layout;