const usersInfo = {
    getUsername: username => {
        return fetch(`http://localhost:9999/users${username}`).then(response =>
            response.json()
        );
    },
    getUserPassword: password => {
        return fetch(`http://localhost:9999/users${password}`).then(response =>
        response.json()
        );
    },
    getallinfo: function () {
        return fetch("http://localhost:9999/users").then(response =>
            response.json()
        );
    },
     
}



export default usersInfo