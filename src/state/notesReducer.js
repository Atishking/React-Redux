//when state is undefined it wil get default param initialState
const notesReducer = function (state = {
    allNotesRedux: [], date: "", MoviesArray: []
}, action) {

    switch (action.type) {
        case 'ADD_NOTE':
            debugger;
            let newState = Object.assign({}, state);
            newState.allNotesRedux.push(action.data);
            newState.date = new Date().toString()
            return newState;
        case 'API_FETCH':
            debugger;
            let newState2 = Object.assign({}, state);
            newState2.MoviesArray = action.data;
            return newState2;
        case 'ADD_MOVIE':
            debugger;
            let newState3 = Object.assign({}, state);
            var index = newState3.MoviesArray.findIndex(x => x.Title == action.data.Title)
            // here you can check specific property for an object whether it exist in your array or not
            if (index === -1) {
                newState3.MoviesArray.push(action.data);
            }
            else console.log("object already exists")
            return newState3;
        case 'EDIT_MOVIE':
            debugger;
            let newState4 = Object.assign({}, state);
            debugger;
            for (let i = 0; i < newState4.MoviesArray.length; i++) {
                if (action.data.imdbID == newState4.MoviesArray[i].imdbID) {
                    var editedMovie = action.data
                    newState4.MoviesArray[i] = editedMovie;
                }
            }
            return newState4;
        default:
            return state;
    }
};

export default notesReducer;