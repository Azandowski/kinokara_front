import React from 'react'
import Loading from '../../components/Loading/Loading'

import Api from '../../utils/Api';
import './Admin.css';

export default class Admin extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            users: [],
        }
    }

    componentDidMount() {
        this.loadCurrentUser();
        this.loadUsers();
    }

    loadCurrentUser = async () => {
        try {
            const response = await Api.getUserProfile();
            if (!response.roles.includes('ADMIN')) {
                window.location.href = '/';
            }
        } catch (e) {
            this.showError(e)
        }
    }

    loadUsers = async () => {
        try {
            const response = await Api.getUsers();
            console.log(response);
            this.setState({
                users: response,
                isLoading: false
            });
        } catch (e) {
            this.showError(e)
        }
    }
    
    showError = (error) => {
        console.log("[Admin] error occured", error.message)
    }

    deleteUser = async (index) => {
        let user = this.state.users[index];
        if (window.confirm('Do you you really want to remove ' + user.username + ' ?')) {
            try {
                this.setState({
                    isLoading: true,
                });
                console.log(user._id);
                const response = await Api.deleteUser(user._id);
                console.log(response);
                
                let newUsers = [...this.state.users];
                newUsers.splice(index, 1);
                
                this.setState({
                    users: newUsers,
                    isLoading: false
                });
            } catch (e) {
                this.showError(e)
            }
        }
    } 

    edit = async (index) => {
        let user = this.state.users[index];
        let newName = window.prompt('Enter new name for user ' + user.username);
        
        try {
            this.setState({
                isLoading: true,
            });
            
            const response = await Api.updateUserName(user._id, newName);
            console.log(response);
            
            let newUsers = [...this.state.users];
            newUsers[index].username = newName
            
            this.setState({
                users: newUsers,
                isLoading: false
            });
        } catch (e) {
            this.showError(e)
        }
    } 

    render() {
        if (this.state.isLoading) {
            return <Loading/>
        }
        return (
            <div className='Admin'>
                <h1>Admin</h1>

                <div className='users-list'>
                    <div className='row'>
                        <label className='title'>Users</label>
                        <label onClick={() => {
                            window.location.href = '/review';
                        }} className="posts">Посты</label>
                    </div>
                    <div className='users'>
                        {this.state.users.map((item, i) => <div className='user'>
                            <label>{item.username}</label>
                            <div className='controls'>
                                <div id='edit' onClick={() => this.edit(i)}>Изменить</div>
                                <div id='remove' onClick={() => this.deleteUser(i)}>Удалить</div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        );  
    }
}