import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Recommendations.css'
import Api from '../../utils/Api';
import MovieList from '../../components/MovieList/MovieList'
import Header from '../../components/Header/Header'
import Loading from '../../components/Loading/Loading'

const includes = (array, object) => {
    return array.filter( obj => obj.id == object.id).length != 0
}

const rating = (a, C) => {
    let V = a.vote_count
    let M = 500
    let R = a.vote_average
    return (V/(V+M))*R + (M/(V+M)) * C
}



class Recommendations extends React.Component {

    constructor (props) {
        super();
        this.state = {
            loading: false,
            data: [],
            genres: [],
            limit: 25
        }
    }

    async componentWillMount () {
        let data = localStorage.getItem("list")
        if (data) {
            let list = JSON.parse(data)
            this.props.dispatch ({
                type: "INIT_LIST",
                myList: list
            })
            this.findRecommendations(list)
        } else {
            window.location.href = "/list"
        }   
    }

    



    findRecommendations = async (list) => {
        try {   
            this.setState({ loading: true })
            const response = await Api.getRecommendations(list)
            var results = []
            response.map((item, i) => {
                item.json().then((result) => {
                    results.push(result.results)
                    if (i == response.length - 1) {
                        this.setState({ 
                            data: this.normalizeArray(results)
                        }, () => {
                            this.loadGenres()
                        })
                    }
                })
            })
        } catch (e) {
            alert(e.message)
        }
    }
    loadGenres = async () => {
        try {
            const response = await Api.loadGenres();
            var results = []
            response.map((item, i ) => {
                item.json().then((result) => {
                    results.push(...result.genres)
                    if (i == response.length - 1) {
                        this.setState({ 
                            genres: this.normalizeGenres(results),
                            loading: false
                        })
                    }
                })
            })

        } catch (e) {
            alert(e.message)
        }
    }

    // MARK: normalize format of genres
    normalizeGenres = (results) => {
        var output = {}
        results.map((item, i) => {
            output[item.id] = item.name
        })
        //console.log(output)
        return output
    }
    // MARK: normalize format of movies
    normalizeArray = (results) => {
        console.log(this.props.myList)
        var total = 0

        var output = []
        results.forEach(item => {
            item.forEach(object => {
                if (!includes(output, object) && !includes(this.props.myList, object)) {
                    total += object.vote_average
                    output.push(object)
                }
            })
        })
        var result = output.filter(obj => obj.poster_path != null)
        var average = total / result.length
        result.sort((a, b) => {
            if (a.overview && b.overview) {
              return rating(a, average) < rating(b, average)
            } else {
              if (a.overview) {
                return -1
              } else {
                return 1
              }
            }
        })

        return result
    }

    render () {
        if (this.state.loading) {
            return <Loading/>
        } else {
            return (
                <div className="Recommendations">
                    <Header
                        {...this.state.data[0]}
                        genres={this.state.genres}
                    />
                    <div className="movies">
                        <Link 
                            className="home_btn"
                            to="/list">
                                Домой
                        </Link>
                        <MovieList
                            data={this.state.data}
                            genres={this.state.genres}
                            limit={this.state.limit}
                            onLoadMore = {() => {
                                this.setState({
                                    limit: this.state.limit + 25
                                })
                            }}
                        />
                    </div>
                </div>
            )
        }   
    }
}

const mapStateToProps = (state) => {
    return {
        myList: state.user.myList
    };
}


export default connect(mapStateToProps)(Recommendations);