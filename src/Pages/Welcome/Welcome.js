import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Api from '../../utils/Api';
import './Welcome.css';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginMode: true,
            email: '',
            password: '',
            isLoading: false,
        }
    }

    signIn = () => {
        this.setState({ isLoading: true });
        Api.login(this.state.email, this.state.password).then((value) => {
            if (value.isAdmin) {
                window.location.href = '/admin';
            } else {
                window.location.href = '/list';
            }
        }).catch((reason) => {
            alert(reason);
        }).finally((_) => {
            this.setState({ isLoading: false });
        })
    }

    signUp = () => {
        this.setState({ isLoading: true });
        Api.register(this.state.email, this.state.password).then(() => {
            this.setState({ isLoginMode: true });
        }).catch((reason) => {
            alert(reason);
        }).finally((_) => {
            this.setState({ isLoading: false });
        })
    }

    render() {
        let state = this.state;
        var buttonTitle = state.isLoginMode ? 'У меня нет аккаунта' : 'У меня есть аккаунт';
        if (state.isLoading) buttonTitle = 'Загрузка...';

        return (
                <div className="Auth">
                    <div className='Content'>
                    <label className='title'>{state.isLoginMode ? 'Вход' : 'Регистрация'}</label>
                    <label className='subtitle'>Введите свои данные</label>
                    <div className='inner-content'>
                        <input
                            placeholder='Ник'
                            value={state.email}
                            onChange={(email) => this.setState({ email: email.target.value })}
                        />
                        <input
                            placeholder='Пароль' type='password'
                            value={state.password}
                            onChange={(password) => this.setState({ password: password.target.value })}
                        />
                        <button onClick={() => {
                            if (state.isLoginMode) {
                                this.signIn();
                            } else {
                                this.signUp();
                            }
                        }}>Готово</button>
                        <label className='no-account' onClick={() => {
                            this.setState({ isLoginMode: !state.isLoginMode });
                        }}>
                            {buttonTitle}
                        </label>
                    </div>
                    </div>
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        myList: state.user.myList
    };
}


export default connect(mapStateToProps)(Welcome);