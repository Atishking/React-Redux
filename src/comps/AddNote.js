import React, { Component } from 'react';
import { connect } from "react-redux";
 

class AddNote extends Component { 
  state={ 
    } 
    
  render() {
       
    return (
      <div className="App">
       <h1>Add Note</h1>

       <input placeholder="title" name="title"  onChange={this.handleChange.bind(this)} />
       <input placeholder="date" name="date"   onChange={this.handleChange.bind(this)}  />

       <button  onClick={this.saveNote.bind(this)}   >save</button>

      </div>
    );
  }
 
  handleChange(ev)
  {
    this.setState({[ev.target.name]:ev.target.value})
  }


  saveNote()
  {
      //this.state
      let note= this.state;
      this.props.addNewNote(note);
  }
}


var mapDispatchToProps= function(dispatch)
{
    return {
        addNewNote:function(note)
        {
            dispatch(myAddnewNote(note))  
        }
    }
}

function myAddnewNote(note)
{

  return {
    type: "ADD_NOTE",
    data: note
    
  }
}






const addNote = connect(null, mapDispatchToProps)(AddNote);

export default addNote;
