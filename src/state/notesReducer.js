//when state is undefined it wil get default param initialState
//const initialState = {
//     movies: [],
//     msg: ""
// };
 
// const notesReducer = (state = initialState, action) => {
//     debugger;
//     let newState = {};
//     switch (action.type) {

    const initialState = {
        MoviesArray: [],
        SpecificMovie:[],
        Titlemsg:''
    };
    
    const notesReducer = (state = initialState, action) => {
     
        let newState = {};
        switch (action.type) {
            case 'EDIT_MOVIE_DETAILS':
                newState = Object.assign({}, state);
                debugger
                for (let S = 0; S < newState.MoviesArray.length; S++) {
                    debugger;
                   if(action.data == newState.MoviesArray[S].imdbID){
                        newState.SpecificMovie=newState.MoviesArray[S]
                   }
                }
                return newState
                case 'API_FETCH':
                newState = Object.assign({}, state);
               newState.MoviesArray = action.data;
               return newState
            case 'ADD_MOVIE':            
                 newState = Object.assign({}, state);
                let UpperWord = action.data.Title.replace(/\b\w/g, l => l.toUpperCase())
                var index = newState.MoviesArray.findIndex(x => x.Title == UpperWord)
                // here you can check specific property for an object whether it exist in your array or not
                if (index === -1) {
                    newState.MoviesArray.push(action.data);
                    newState.Titlemsg=""
                }
                // else alert("This movie already exists")
                else newState.Titlemsg="This movie already exists. Please add movie with a different title."
                return newState;
            case 'EDIT_MOVIE':              
                 newState = Object.assign({}, state);           
                for (let i = 0; i < newState.MoviesArray.length; i++) {
                    if (action.data.imdbID == newState.MoviesArray[i].imdbID) {
                        var editedMovie = action.data
                        newState.MoviesArray[i] = editedMovie;
                        return newState;
                    }
                }
                return newState;
                case 'DELETE_MOVIE':   
                 newState = Object.assign({}, state);
                for (let f = 0; f <newState.MoviesArray.length; f++) {
                    if(action.data==newState.MoviesArray[f].Title)
                    {
                        newState.MoviesArray.splice([f],1)
                    }
                }
                return newState;
            default:
                return state;
        }
    };
    //now
    export default notesReducer;