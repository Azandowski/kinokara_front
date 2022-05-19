
const initialState = {
    trending: null,
    bestMovies: null,
    bestShows: null,
    myList: []
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case "SET_TRENDING":
            return {
                ...state, 
                trending: action.trending
            }
        case "SET_BEST_MOVIES":
            return {
                ...state,
                bestMovies: action.bestMovies
            }
        case "SET_BEST_SHOWS":
            return {
                ...state, 
                bestShows: action.bestShows
            }
        case "SET_LIST":
            if (action.isAdd) {
                return {
                    ...state,
                    myList: [...state.myList, action.data]
                }
            } else {
                return {
                    ...state,
                    myList: state.myList.filter(obj => obj != action.data) 
                }
            }
        case "INIT_LIST":
            return {
                ...state,
                myList: action.myList
            }
        default:
            return state;
    }
}
