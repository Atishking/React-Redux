import React, { Component } from 'react';
import './App.css';
import AddNote from './comps/AddNote';
import AllNotes from './comps/AllNotes';
import AllMovies from './comps/AllMovies';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup } from 'reactstrap';
import { connect } from "react-redux";
import $ from "jquery"


class App extends Component {
  state = {
    modal: false
}

toggle() {
    this.setState({
        modal: !this.state.modal
    });
}


  
  handleChange (ev){
    this.setState({ [ev.target.name]:ev.target.value })
}


componentDidMount() {

const titles = ["shrek", "titanic", "lion-King", "deadpool", "avatar", "Inception"]
var Movies = []

for (let i = 0; i < titles.length; i++) {

    $.get({
        url: `http://www.omdbapi.com/?apiKey=6a1284f3&t=${titles[i]}`,
        success(resp) {
            console.log("success")
            debugger;
            Movies.push(resp)
        },
        error() {
            console.log("Error")
        }
    });
}
debugger;
  this.props.FetchMovies(Movies)
  debugger;
}

  render() {
    return (
      <div className="App">
      <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                    <ModalHeader toggle={this.toggle.bind(this)}> Add a Movie
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Input type="text" onChange={this.handleChange.bind(this)} name="Title" placeholder="Title" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" onChange={this.handleChange.bind(this)} name="Year" placeholder="Year" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" onChange={this.handleChange.bind(this)} name="Runtime"  placeholder="Runtime" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" onChange={this.handleChange.bind(this)} name="Genre"  placeholder="Genre" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" onChange={this.handleChange.bind(this)} name="Director"  placeholder="Director" />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>

                        <Button color="danger" onClick={this.toggle.bind(this)}>Cancel</Button>

                        <Button color="success" onClick={this.Add.bind(this)}>Edit!</Button>
                    </ModalFooter>
                </Modal>
      <div className="row">
      <button className="btn btn-dark btn-block center" onClick={(event) => { this.toggle(); }} >Add a Movie</button>
      </div>
       <AddNote  />
       <AllNotes   />
       <AllMovies />
      </div>
    );
  }
  onUpdateUser(ev){debugger;
    console.log(this.props.products)
    this.props.onUpdateUser(ev.target.value)
  }

  async Add (){
    let id= Math.floor(Math.random() * 1000); 
    let MovieID={
      imdbID:id
    }
    let Obj = Object.assign(this.state, MovieID)
    debugger;
    let movie= this.state;
    this.props.addNewMovie(Obj)
    this.toggle();
    
 }


}


var mapDispatchToProps= function(dispatch)
{
    return {
        FetchMovies:function(Movies)
        {
            dispatch(Fetching(Movies))  
        },
        addNewMovie:function(newMovie){
          dispatch(AddTheMovie(newMovie))
        }
    }
}

function Fetching(Movies)
{

  return {
    type: "API_FETCH",
    data: Movies
    
  }
}


function AddTheMovie(newMovie)
{

  return {
    type: "ADD_MOVIE",
    data: newMovie
    
  }
}




const app = connect(null, mapDispatchToProps)(App);

export default app;