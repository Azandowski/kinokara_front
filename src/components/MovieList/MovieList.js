import React from 'react'
import './MovieList.css'
import MovieView from '../../widgets/MovieView/MovieView';


const returnGenre = (array, list) => {
    var str = ""
    array.map((item, i) => {
        if (array.length - 1 != i) {
        str += (list[item] + ", ") 
        } else {
        str += list[item]
        }
    })
    return str
}

const MovieList = (props) => (
    <div className="MovieList">
        {props.data && props.data.map((item, i) =>
            <MovieView
                {...item}
                index={i}
                genre={returnGenre(item.genre_ids, props.genres)}
            />
        )}
    </div>
)

export default MovieList;