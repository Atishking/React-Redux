import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup } from 'reactstrap';
 

class AllNotes extends Component {
  state = {
    modal: false,
    imdbID:''
}

toggle(event) {
  if(event.target.id){
    this.setState({
      modal: !this.state.modal,
      imdbID:event.target.id
  });
  }
    else{
      this.setState({
        modal: !this.state.modal
    });
    }
}


  
  handleChange (ev){
    this.setState({ [ev.target.name]:ev.target.value })
}

  check(){
    debugger;
}
  render() { 
    
    return (
      <div className="App" key={this.props.date}  > 
       <h1>All Notes</h1>
       {this.props.allNotes.map(n=> {
         return <div key={n.title} className="note"> <h3>{n.title}</h3> <h3>{n.date}</h3></div>;
       }   )}

         {this.props.allMovies.map(m=> {
         return <div onClick={(event) => { this.toggle(event); }} id={m.imdbID} className="note"> <h3>{m.Title}</h3></div>;
       }   )}
       <button onClick={this.check.bind(this)} ></button>
       <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                    <ModalHeader toggle={this.toggle.bind(this)}> Edit Movie
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

                        <Button color="success" onClick={this.Edit.bind(this)}>Edit!</Button>
                    </ModalFooter>
                </Modal>
      </div>
    );
  }
  Edit (){
debugger;
    let Editedmovie= this.state;
    this.props.editMovie(Editedmovie)
    
    
 }
}

function mapStateToProps(stateFromRedux)
{
    return { allNotes:stateFromRedux.allNotesRedux,
    date:stateFromRedux.date,
    allMovies:stateFromRedux.MoviesArray
    }
}

var mapDispatchToProps= function(dispatch)
{
    return {
      editMovie:function(editedMovie)
        {
            dispatch(EDIT(editedMovie))  
  
       }
   }
}

function EDIT(editedMovie)
{

  return {
    type: "EDIT_MOVIE",
    data: editedMovie
    
  }
}
 

const allNotesComp = connect(mapStateToProps, mapDispatchToProps)(AllNotes);
export default allNotesComp;
