
import React,{Component} from 'react'; 
import classes from './uploadProfile.module.css';
import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import Modal from '../../../../Components/UI/modal/modal';
import {connect} from 'react-redux';
import * as actions from '../../../../store/action/index';
import Spinner from '../../../../Components/UI/spinner/spinner';

class UploadProfile extends Component { 
   
    constructor(props){
        super(props)
        this.state ={
              // Initially, no file is selected 
              selectedFile: null,
              url:null,
              error:null,
    
            }
    }
  
    componentDidMount(){
      const storage = firebase.storage();
      console.log(storage)
      var user = firebase.auth().currentUser;
      storage.ref(user.uid + '/profilePicture/').child("profile").getDownloadURL().then(url =>{
        this.setState({url:url})
        console.log(url)
      })
     
    }
    // On file select (from the pop up) 
    onFileChange = event => { 
     
      if(event.target.files[0]){
      this.setState({ selectedFile: event.target.files[0],url:null}); 
      }
     
    }; 
     
    // On file upload (click the upload button) 
    onFileUpload = () => { 

        if(this.state.selectedFile){
        const storage = firebase.storage();
        var user = firebase.auth().currentUser;
   
        const {selectedFile} = this.state;
      
      
        const uploadFile = storage.ref(user.uid + '/profilePicture/profile').put(selectedFile);
        uploadFile.on('state_changed',(snapShot)=> {
               

        },(error) => {
            //error
            this.setState({error:error})
            console.log(error)
        }, () => {
             //complete
            storage.ref(user.uid + '/profilePicture/').child('profile').getDownloadURL().then(url => {
                    this.setState({url:url})
                    this.props.onShowModal();
            })
           
        }); 
    }else{
        alert("please select a file")
    } 
}

    loadFile = (event) => {
        const output  = document.getElementById('output'); 
        console.log(output);
        output.src = URL.createObjectURL(event.target.files[0]);
        output.style.width = '30%'
        output.style.display = 'block'
        output.style.margin = '.5rem'
        
        output.onload = () => {
            URL.revokeObjectURL(output.src)
        }
    }
     
    // File content to be displayed after choosing file
    fileData = () => { 
     
      if (this.state.selectedFile) { 
          
        return ( 
          <div> 
            <h2>File Details:</h2> 
            <p>File Name: {this.state.selectedFile.name}</p> 
            <p>File Type: {this.state.selectedFile.type}</p>
            
            <p> 
              Last Modified:{" "} 
              {this.state.selectedFile.lastModifiedDate.toDateString()} 
            </p> 
          </div> 
        ); 
      }
    }; 
     
    render() { 
     
        let modal = null; 

        let imageURL = null; 

        if(this.props.showModal){
           modal = 
           <Modal color="white" show={this.props.showModal} modalClosed={this.props.onHideModal}>
             <p>You've successfully upload a profile pic!</p>
            </Modal>
        }

        if(this.state.error) {
            modal = 
            <Modal color="white" show={this.state.error} modalClosed={this.props.onHideModal}>
                {this.state.error}
            </Modal>
        }


        if(this.state.url){
          imageURL = this.state.url


          const output  = document.getElementById('output'); 
        
          output.src = imageURL
          output.style.width = '30%'
          output.style.display = 'block'
          output.style.margin = '.5rem'
          
        }
    


      return ( 
        <div > 
            <div className={classes.container}> 
                <input type="file" accept=".jpeg,.jpg,.png"
                onChange={(event => {
                    this.onFileChange(event)
                    this.loadFile(event)
                })} /> 
                <img id="output"/>
                <button onClick={this.onFileUpload}> 
                  Upload
                </button> 
            </div> 
          {this.fileData()} 
          {modal}
        </div> 
      ); 
    } 
  } 
  

const mapStateToProps = state => {
    return {
        showModal:state.auth.showModal
    }

}

const mapDispatchToProps = dispatch => {
    return {
       onShowModal: () => dispatch(actions.showModal()),
       onHideModal:() => dispatch(actions.hideModal())
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(UploadProfile); 