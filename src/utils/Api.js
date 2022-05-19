class Api {
    constructor () {
        const api_key = "bcd3c6393606f8cd9ab1c236f6d4e0ea"

        this.baseUrl = "https://api.themoviedb.org/3/"
        this.defaultUrlEnd = "api_key=" + api_key + "&language=ru-RU"
    }
    get = (path) => {
        let url = this.baseUrl + path + this.defaultUrlEnd
        console.log("get", url)
        return fetch(url)
                .then(response => response.json())
                .then(json => json.results)
                .catch(e => {
                    throw e
                }) 
    }
    getRecommendations = (list) => {
        let promises = [];
        list.forEach(element => {
            let type = element.video !== undefined ? "movie" : "tv"
            let path = type + "/" + element.id + "/recommendations?"
            let url = this.baseUrl + path + this.defaultUrlEnd
            promises.push(fetch (url))
        });
        return Promise.all(promises)
    }
    loadGenres = () => {
        let promises = []
        let types = ["tv", "movie"]
        types.forEach(type => {
            let url = this.baseUrl + "genre/" + type + "/list?" + this.defaultUrlEnd
            promises.push(fetch (url))
        })
        return Promise.all(promises)
    }

    login = async (username, password) => {
        let url = "https://kinokara.herokuapp.com/auth/login"
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });
        let result = await response.json();
        if (response.status >= 200 && response.status < 300) {
            localStorage.setItem('token', result.token);
            return result;
        } else {
            throw result.message;
        }
    }

    register = async (username, password) => {
        let url = "https://kinokara.herokuapp.com/auth/registration"
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });
        let result = await response.json();
        if (!(response.status >= 200 && response.status < 300)) {
            throw result.errors.errors.map((el) => el.msg).join("\n");
        } 
    }

    getUserProfile = () => {
        let url = "https://kinokara.herokuapp.com/auth/currentUser"
        return fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
        }).then(response => response.json());
    }

    getUsers = () => {
        let url = "https://kinokara.herokuapp.com/auth/users"
        return fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token')
            },
        }).then(response => response.json());
    }

    deleteUser = (id) => {
        let url = "https://kinokara.herokuapp.com/auth/user"
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "id": id,
            })
        }).then(response => response.json());
    }

    updateUserName = (id, name) => {
        let url = "https://kinokara.herokuapp.com/auth/editUser"
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "id": id,
                "name": name
            })
        }).then(response => response.json());
    }
}


const api = new Api()
export default api;