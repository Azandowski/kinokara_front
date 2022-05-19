//https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/3lBDg3i6nn5R2NKFCJ6oKyUo2j5.jpg
import React from 'react'
import './MainScreen.css'
import {
    MouseScroll
} from '../../widgets/UIElements'


const MainScreen = (props) => (
    <div className="MainScreen">
        <div className="dark_overlay"/>
        <img 
            className="wall"
            src="https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/3lBDg3i6nn5R2NKFCJ6oKyUo2j5.jpg"
        />
        <div className="nav">
            <div className="logo">
                <label className="letter">K</label>
            </div>
            <div className='header'>
                 {props.userName ? 'Добро пожаловать,' + props.userName : ''}
            </div>

            <div className="buttons">
                <button 
                    id='danger'
                    className="nav_btn"
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.reload();
                    }}>
                        ВЫЙТИ
                </button>
                <button 
                    className="nav_btn"
                    onClick={() => {
                        props.scrollTo("about")
                    }}>
                        О НАС
                    </button>
                <button 
                    className="nav_btn"
                    onClick={() => {
                        props.scrollTo("movies")
                    }}>
                        ФИЛЬМЫ
                </button>
                <button 
                    className="nav_btn"
                    onClick={() => {
                        props.scrollTo("authors")
                    }}>
                        АВТОРЫ
                </button>
            </div>
        </div>
        <div className="main">
            <label className="title_top" id="select_your_fav_title">Выберите ваши любимые</label>
            <label className="title_main">ФИЛЬМЫ</label>
            <button className="next_btn" 
                onClick={() => {
                    props.scrollTo("movies")
                }}>
                    Перейти
            </button>
            <div className="mouse-wrapper">
                <MouseScroll/>
            </div>
        </div>
    </div>
)


export default MainScreen;