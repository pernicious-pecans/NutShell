const userDataManager = {
    getUser: () => {
        return fetch(`http://localhost:8088/users`)
        .then(users => users.json())
        .then(parusers => {
            return parusers
        })

    },
    saveUser: (users) => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
}



export default userDataManager