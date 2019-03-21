import React, { Component } from 'react';
import './App.css';
import AllMovies from './comps/AllMovies';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup } from 'reactstrap';
import { connect } from "react-redux";


class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    modal: false,
    added: ''
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }



  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }


  async componentDidMount() {

    const titles = ["shrek", "titanic", "lion-King", "deadpool", "avatar", "Inception"]
    var Movies = []

    for (let i = 0; i < titles.length; i++) {

      let data = await fetch(`https://www.omdbapi.com/?apiKey=6a1284f3&t=${titles[i]}`)

      let response = await data.json()
      Movies.push(response)

    }
    debugger;
    this.props.FetchMovies(Movies)
    debugger;
  }

  render() {
    return (
      <div className="contianer-fluid Center">
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <ModalHeader toggle={this.toggle.bind(this)}> Add a New Movie
                    </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Input type="text" onChange={this.handleChange.bind(this)} name="Title" placeholder="Title" />
            </FormGroup>
            <FormGroup>
              <Input type="text" onChange={this.handleChange.bind(this)} name="Year" placeholder="Year" />
            </FormGroup>
            <FormGroup>
              <Input type="text" onChange={this.handleChange.bind(this)} name="Runtime" placeholder="Runtime" />
            </FormGroup>
            <FormGroup>
              <Input type="text" onChange={this.handleChange.bind(this)} name="Genre" placeholder="Genre" />
            </FormGroup>
            <FormGroup>
              <Input type="text" onChange={this.handleChange.bind(this)} name="Director" placeholder="Director" />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <span id="Error"></span>

            <Button color="danger" onClick={this.toggle.bind(this)}>Cancel</Button>

            <Button color="success" onClick={this.Add.bind(this)}>Add!</Button>
          </ModalFooter>
        </Modal>
        <div>
          <button className="btn btn-dark btn-block center" onClick={(event) => { this.toggle(); }} >Add a New Movie</button>
        </div>
        <div className="container-fluid">
          <AllMovies key={this.state.added} />
        </div>
      </div>
    );
  }


  async Add() {
    let movie = this.state;
    if (movie.Title !== undefined && movie.Year !== undefined && movie.Runtime !== undefined
      && movie.Genre !== undefined && movie.Director) {
      let id = Math.floor(Math.random() * 1000);
      let MovieID = {
        imdbID: id
      }
      let ObjToSend = {
        Director: movie.Director,
        Genre: movie.Genre,
        Runtime: movie.Runtime +" min",
        Title: movie.Title.replace(/\b\w/g, l => l.toUpperCase()),
        Year: movie.Year
      }
      let Obj = Object.assign(ObjToSend, MovieID)
      debugger;
      this.props.addNewMovie(Obj)
      this.setState({ added: id })
      this.toggle();
      this.setState({Title:undefined})


    }
    else {
      let InputError = document.getElementById("Error")
      InputError.className = "Error"
      InputError.innerHTML = "All input fields are required"
    }
  }
}



var mapDispatchToProps = function (dispatch) {
  return {
    FetchMovies: function (Movies) {
      dispatch(Fetching(Movies))
    },
    addNewMovie: function (newMovie) {
      dispatch(AddTheMovie(newMovie))
    }
  }
}


function Fetching(Movies) {

  return {
    type: "API_FETCH",
    data: Movies

  }
}


function AddTheMovie(newMovie) {

  return {
    type: "ADD_MOVIE",
    data: newMovie

  }
}




const app = connect(null, mapDispatchToProps)(App);

export default app;