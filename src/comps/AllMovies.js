import React, { Component } from 'react';
import { connect } from "react-redux";


 
class AllMovies extends Component {
    componentDidMount(){
        debugger;
    }
  render() { 
      
    return (
      <div className="App" > 
       <h1>All Movies</h1>
       {this.props.movies.map(m=> {return<h1 className="note" >{m.Title}</h1> })}
       <button onClick={this.check.bind(this)} ></button>
      </div>
    );
  }
  check(){
      alert(this.props.movies[4].Title)
  }

  
}

function mapStateToProps(stateFromRedux)
{
    return { 
             movies:stateFromRedux.MoviesArray
    }
    
}
 

const allMoviesComp = connect(mapStateToProps, null)(AllMovies);
export default allMoviesComp;
