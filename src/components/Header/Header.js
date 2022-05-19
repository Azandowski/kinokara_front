import React from 'react'
import './Header.css'
import Progress from '../../widgets/Progress/Progress'
import MovieView from '../../widgets/MovieView/MovieView'
const imagePath = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/"


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


const Header = (props) => (
    <div className="Header">
        <div className="big_overlay"/>
        <img
            className="big_poster"
            src={imagePath + props.backdrop_path}
        />
        <label className="large">
            Наши рекомендации:
        </label>
        <div className="content">
            <MovieView
                {...props}
                index={0}
                header={true}
                genre={returnGenre(props.genre_ids, props.genres)}
            />
        </div>
    </div>
)

export default Header;