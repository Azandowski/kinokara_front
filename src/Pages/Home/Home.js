import React from 'react'
import './Home.css'
import { connect } from 'react-redux' 
import Api from '../../utils/Api'
import scrollToComponent from 'react-scroll-to-component';


// MARK: UI components
import MovieLayout from '../../components/MovieLayout/MovieLayout'
import MainScreen from '../../components/MainScreen/MainScreen.js'
import About from '../../components/About/About'
import Footer from '../../components/Footer/Footer'

class Home extends React.Component {
    constructor(props) {
        super();
        this.state = {
            userName: null,
            lastVisitedTime: Date
        }
    }

    componentWillMount() {
        let timeMilliseconds = localStorage.getItem('last_visited');
        if (timeMilliseconds) {
            this.setState({
                lastVisitedTime: new Date(timeMilliseconds)
            })
        }
        
        localStorage.setItem('last_visited', new Date());

        this.props.dispatch({
            type: "INIT_LIST",
            myList: []
        })
        this.loadCurrentUser();
    }

    componentDidMount () {
        let { trending, bestMovies, bestShows } = this.props

        if ( trending === null ) {
            this.loadTrending()
        }      
        if ( bestMovies === null ) {
            this.loadBestMovies () 
        }
        if (bestShows === null) {
            this.loadBestShows()
        }

    }

    componentWillUnmount() {
        localStorage.setItem('last_visited', new Date());
    }



    // MARK: Loading data from server
    loadTrending = async () => {
        try {
            const response = await Api.get("trending/all/day?")
            this.props.dispatch ({
                type: "SET_TRENDING",
                trending: response
            })
        } catch (e) {
            this.showError(e)
        }
    }

    loadBestMovies = async () => {
        try {
            const response = await Api.get("movie/top_rated?")
            console.log('movies', response)
            this.props.dispatch ({
                type: "SET_BEST_MOVIES",
                bestMovies: response
            })
        } catch (e) {
            this.showError(e)
        }
    }

    loadBestShows = async () => {
        try {
            const response = await Api.get("tv/top_rated?")
            console.log('shows', response)
            this.props.dispatch ({
                type: "SET_BEST_SHOWS",
                bestShows: response
            })
        } catch (e) {
            this.showError(e)
        }
    }

    loadCurrentUser = async () => {
        try {
            const response = await Api.getUserProfile();
            console.log('USER', response)
            this.setState({ userName: response.username });
        } catch (e) {
            this.showError(e)
        }
    }

    
    // MARK: UI methods
    showError = (error) => {
        console.log("[Home] error occured", error.message)
    }

    scrollToElement = (name) => {
        let content = {
            "about": this.About,
            "movies": this.Movies,
            "authors": this.Authors
        }
        // alert(name + "scroll")
        scrollToComponent(content[name], { offset: 0, align: 'top', duration: 1000})
    }


    render () {
        return (
            <div className="Home">

                <MainScreen
                    userName={this.state.userName}
                    scrollTo={this.scrollToElement}
                />

                <MovieLayout
                    ref={ (ref) => this.Movies = ref}
                    trending={this.props.trending}
                    bestMovies={this.props.bestMovies}
                    bestShows={this.props.bestShows}
                    myList={this.props.myList}
                    onMovieSelect={(index, isSelected, object) => {
                        this.props.dispatch({
                            type: "SET_LIST",
                            data: object,
                            isAdd: !isSelected,
                            index
                        })
                    }}
                />
                <div 
                    className="Wrapper" 
                    ref={(ref) => this.About = ref}>
                        <About/>
                </div>
                <div 
                    className="Wrapper" 
                    ref={(ref) => this.Authors = ref}>
                    <Footer lastVisited={this.state.lastVisitedTime}/>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        trending: state.user.trending,
        bestMovies: state.user.bestMovies,
        bestShows: state.user.bestShows,
        myList: state.user.myList
    };
}


export default connect(mapStateToProps)(Home);