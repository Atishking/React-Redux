import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup } from 'reactstrap';


class AllMovies extends Component {
  state = {
    modal: false,
    imdbID: '',
    added:''
  }
  
  toggle(event) {
    debugger
this.props.GetMovie(event.target.id)
debugger;
    this.setState({
      modal: !this.state.modal,
      imdbID: event.target.id
    });
debugger
  }



  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }

  check() {
    debugger;
  }
  render() {

    return (
      <div key={this.props.added} className="Wrapper" >
     
  <span className="Error">{this.props.Titlemsg}</span>
        <div className="row">
          {
            this.props.allMovies.map(m => {
              return <div key={m.imdbID} className="col-sm-4 note">
                <div  className="card__container">
                  <div className="card card--blue">
                    <div className="card__title">
                      <div className="title Center"><b>Movie: </b> {this.Capitalize(m.Title)}
                      </div>
                    </div>
                    <div className="card__photo card__photo--mountain">
                      <div className="card__description Center">
                        <h5><b>Release Year: </b>{m.Year}</h5>
                        <h6><b>Runtime: </b>{m.Runtime}</h6>
                        <h6><b>Genre: </b>{this.Capitalize(m.Genre)}</h6>
                        <h6><b>Director: </b>{this.Capitalize(m.Director)}</h6>
                        <div className="Icon">
                        <i  onClick={(event) => { this.toggle(event); }} id={m.imdbID} className="fas fa-edit"></i>
                <i className="fas fa-trash-alt" id={m.Title} onClick={(e) => { if (window.confirm('Are you sure you want to delete this movie?')) this.Delete(e) }}></i>
                </div>
                      </div>
                    </div>
                    <div className="card__polygon card__polygon--blue card__polygon--first"></div>
                    <div className="card__polygon card__polygon--blue card__polygon--second"></div>
                    <div className="card__polygon card__polygon--blue card__polygon--third"></div>
                  </div>
                  
                </div>

              </div>;
            })
          }
        </div>
        
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <ModalHeader toggle={this.toggle.bind(this)}> Edit Movie - {this.props.Specific.Title}
                    </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Input type="text" onChange={this.handleChange.bind(this)}  name="Title" defaultValue={this.props.Specific.Title} placeholder="Title" />
            </FormGroup>
            <FormGroup>
              <Input type="text" onChange={this.handleChange.bind(this)} name="Year" defaultValue={this.props.Specific.Year} placeholder="Year" />
            </FormGroup>
            <FormGroup>
              <Input type="text" onChange={this.handleChange.bind(this)} name="Runtime" defaultValue={this.props.Specific.Runtime} placeholder="Runtime" />
            </FormGroup>
            <FormGroup>
              <Input type="text" onChange={this.handleChange.bind(this)} name="Genre" defaultValue={this.props.Specific.Genre} placeholder="Genre" />
            </FormGroup>
            <FormGroup>
              <Input type="text" onChange={this.handleChange.bind(this)} name="Director" defaultValue={this.props.Specific.Director} placeholder="Director" />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
          <span id="Error"></span>
            <Button color="danger" onClick={this.toggle.bind(this)}>Cancel</Button>

            <Button color="success" onClick={this.Edit.bind(this)}>Edit!</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  Edit(event) {
    let Editedmovie = this.state;
    if(Editedmovie.Title !== undefined && Editedmovie.Year && Editedmovie.Runtime !== undefined 
      && Editedmovie.Genre && Editedmovie.Director)
    {
      debugger;
    this.props.editMovie(Editedmovie)
    this.setState({ modal: !this.state.modal });
    }
    else{
      let InputError = document.getElementById("Error")
      InputError.className = "Error"
      InputError.innerHTML = "All input fields are required"
    }
  }

  Capitalize(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  Delete(event) {
    let Name = event.target.id
    this.setState({id:"deleted"})
    this.props.deleteMovie(Name)
  }
}

function mapStateToProps(stateFromRedux) {
  return {
    allMovies: stateFromRedux.MoviesArray,
    Specific:stateFromRedux.SpecificMovie,
    Titlemsg:stateFromRedux.Titlemsg
  }
}

var mapDispatchToProps = function (dispatch) {
  return {
    editMovie: function (editedMovie) {
      dispatch(EDIT(editedMovie))

    },
    deleteMovie: function (deletedMovie) {
      dispatch(DELETE(deletedMovie))
    },
    GetMovie: function (TheId) {
      dispatch(GET(TheId))
    }
  }
}

function EDIT(editedMovie) {
  return {
    type: "EDIT_MOVIE",
    data: editedMovie
  }

}

function DELETE(DeletedMovie) {
  return {
    type: "DELETE_MOVIE",
    data: DeletedMovie
  }
}

function GET(id) {
  return {
    type: "EDIT_MOVIE_DETAILS",
    data: id
  }

}




const allMovuesComp = connect(mapStateToProps, mapDispatchToProps)(AllMovies);
export default allMovuesComp;
//style={{backgroundImage:`url(${m.Poster})`}}











