import React from 'react'
import Api from '../../utils/Api'

import './MovieLayout.css'
import Movie from '../../widgets/Movie/Movie'
import SearchBar from '../../widgets/SearchBar/SearchBar'
import { Link } from 'react-router-dom'


const includes = (array, object) => {
    return array.filter( obj => obj.id == object.id).length != 0
}

const SectionHorizontal = (props) => (
    <div className="SectionHorizontal" key={props.index}>
        {props.data && props.data.map((object, i ) => 
            <Movie
                list={props.myList}
                data={object}
                isSelected={includes(props.myList, object)}
                onMovieSelect = {(isSelected) => {
                    props.onMovieSelect(i, isSelected, object)
                }}
            />
        )}
    </div>
)




class MovieLayout extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            search: "",
            results: false,
            loading: false
        }
    }

    onSearch = async (isTvShow) => {
        this.setState({ results: null })
        let query = this.state.search
        if (query.trim() != "") {
            try {
                let type = isTvShow ? "tv" : "movie"
                const results = await Api.get("search/" + type + "?query=" + query + "&")
                this.setState({ results: results.filter(obj => obj.poster_path != null) })
            } catch (e) {
                this.showError(e)
            }
        } 
    }

    showError = (error) => {
        console.log("[Home] error occured", error.message)
    }

    render () {
        let { results } = this.state  
        return (
            <div className="MovieLayout">
                <SearchBar
                    search={this.state.search}
                    loading={this.state.loading}
                    onSearch={this.onSearch}
                    listCount={this.props.myList.length}
                    onInputChange = {(e) => this.setState({ search: e.target.value })}
                />
                {results !== false && 
                    (results === null || results.length > 0 ? 
                        <>
                            <h1>Найдено</h1>
                            <SectionHorizontal
                                index={1}
                                data={results}
                                myList={this.props.myList}
                                onMovieSelect={this.props.onMovieSelect}
                            />
                        </>   
                        : 
                        <div>Ничего не найдено</div> 
                    )
                }
                <h1>В тренде</h1>
                <SectionHorizontal
                    index={2}
                    data={this.props.trending}
                    myList={this.props.myList}
                    onMovieSelect={this.props.onMovieSelect}
                />
                <h1>Популярные фильмы</h1>
                <SectionHorizontal
                    index={3}
                    data={this.props.bestMovies}
                    myList={this.props.myList}
                    onMovieSelect={this.props.onMovieSelect}
                />
                <h1>Популярные сериалы</h1>
                <SectionHorizontal
                    index={3}
                    data={this.props.bestShows}
                    myList={this.props.myList}
                    onMovieSelect={this.props.onMovieSelect}
                />
                <Link 
                    to="/"
                    className={this.props.myList.length >= 1 ? "ready ready__active" : "ready ready__disabled"}
                    onClick={async () => {
                       await localStorage.setItem("list", JSON.stringify(this.props.myList))
                    }}>
                    Готово
                </Link>
            </div>
        )
    }
}


export default MovieLayout;
