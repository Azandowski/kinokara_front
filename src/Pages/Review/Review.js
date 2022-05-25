import React from "react";
import api from "../../utils/Api";
import './Review.css';
import Loading from '../../components/Loading/Loading'
import ReactStars from "react-rating-stars-component";


export default class Review extends React.Component {
    
    constructor() {
        super();
        this.state = {
            reviews: [],
            isLoading: false,
            reviewStar: 0,
            reviewText: "",
            isAdmin: false
        }
    }

    loadCurrentUser = async () => {
        try {
            const response = await api.getUserProfile();
            this.setState({
                isAdmin: response.roles.includes('ADMIN')
            });
        } catch (e) {
        }
    }

    accept = (index) => {
        let r = this.state.reviews[index];
        this.setState({ isLoading: true });
        api.acceptPost(r._id)
            .then(() => {
                this.setState({
                    reviews: this.state.reviews.filter((review) => {
                        return review._id !== r._id;
                    })
                })
            })
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }

    decline = (index) => {
        let r = this.state.reviews[index];
        this.setState({ isLoading: true });
        api.declinePost(r._id)
            .then(() => {
                 this.setState({
                    reviews: this.state.reviews.filter((review) => {
                        return review._id !== r._id;
                    })
                })
            })
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        await this.loadCurrentUser();
        if (this.state.isAdmin) {
            api.getAdminPosts()
                .then((posts) => {
                    this.setState({
                        reviews: posts,
                    })
                }).finally(() => {
                    this.setState({ isLoading: false });
                });
        } else {
            api.getPosts()
                .then((posts) => {
                    console.log(posts);
                    this.setState({
                        reviews: posts,
                    })
                }).finally(() => {
                    this.setState({ isLoading: false });
                });
        }
    }

    submit = () => {
        this.setState({ isLoading: true });
        api.addPost(this.state.reviewText, this.state.reviewStar).then(() => {
            this.setState({
                reviewStar: 0,
                reviewText: ""
            })
        }).finally(() => {
            this.setState({ isLoading: false });
        })
    }

    
    render() {
        if (this.state.isLoading) {
            return <Loading/>
        }

        return (
            <div className="Review">
                <label onClick={() => {
                    window.location.href = "/list"
                }} className="top-back">На главную</label>
                <h1>Reviews</h1>
                { this.state.isAdmin ? <div/> : <div className="leave-feedback">
                    <label className="title">Leave feedback</label>
                    <textarea
                        placeholder="Review"
                        className="review-field"
                        value={this.state.reviewText}
                        onChange={(e) => {
                            this.setState({
                                reviewText: e.target.value
                            })
                        }}
                    />
                    <div className="row">
                        <ReactStars
                            count={5}
                            onChange={(t) => {
                                this.setState({
                                    reviewStar: t
                                })
                            }}
                            size={24}
                            activeColor="#ffd700"
                        />
                        <button
                            className="submit"
                            onClick={() => {
                                if (this.state.reviewText.trim()) {
                                    this.submit();
                                } else {
                                    alert('FUCK YOURSELF IDIOT')
                                }
                            }}
                        >Submit</button>
                    </div>
                </div> }
                <div className="reviews">
                    {this.state.reviews.map((item, i) => (
                        <div className="review">
                            <div className="top">
                                <label className="user_name">{item.username}</label>
                                <label className="user_name">{new Date(item.datePost).toLocaleString()}</label>
                            </div>
                            <p>
                                {item.value}
                            </p>
                            <ReactStars
                                value={item.review}
                                count={5}
                                edit={false}
                                onChange={(t) => {
                                    this.setState({
                                        reviewStar: t
                                    })
                                }}
                                size={16}
                                activeColor="#ffd700"
                            />
                            {
                                this.state.isAdmin ? <div className="admin-tools">
                                    <button id="accept" onClick={() => {
                                        this.accept(i);
                                    }}>
                                        Accept
                                    </button>
                                    <button id="decline" onClick={() => {
                                        this.decline(i);
                                    }}>
                                        Decline
                                    </button>
                                </div> : <div/>
                            }
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}