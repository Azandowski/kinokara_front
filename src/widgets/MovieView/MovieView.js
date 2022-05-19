import React from 'react'
import './MovieView.css'
import Progress from '../Progress/Progress'


const imageUrl = "https://image.tmdb.org/t/p/w220_and_h330_face"
const wallUrl = "https://image.tmdb.org/t/p/w440_and_h660_face"



const MovieView = (props) => {
    let { header } = props

    let style = header ? "_header" : ""
    return (
        <div className={"MovieView" + style + " MovieView"}>
            <img 
                className={"poster" + style}
                src={(header ? wallUrl : imageUrl) + props.poster_path}
            />
            <div className={"details" + style + " details"}>
                <label className="title">
                    {props.name || props.title}
                </label>
                <label className="subtitle"> 
                    {(props.first_air_date || "")}
                    <span className="genres">
                        {" ● " + props.genre}
                    </span>
                </label>

                <div className="progress__wrapper">
                    <Progress value={Math.round(props.vote_average * 10)}/>
                    <label className="hint">
                        Пользовательская оценка
                    </label>
                </div>
                {props.overview && 
                    <>
                        <label className="little__title">Обзор</label>
                        <p>
                            {props.overview}
                        </p>   
                    </>
                }

                <div className="index">
                    <label>{props.index + 1}</label>
                </div>
            </div>
        </div>
    )
} 

export default MovieView;