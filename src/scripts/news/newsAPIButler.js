//creates an object with TWO keys, each is a method
const newsAPIButler = {
    //deletes a contact from the database
    delete: newsID => {
        return fetch(`http://127.0.0.1:8088/news/${newsID}`, {
            method: "DELETE"
        });
    },
    getNews: newsID => {
        return fetch(`http://127.0.0.1:8088/news/${newsID}`).then(response =>
            response.json()
        );
    },

    //gets the contact array and parses the json
    getForUser: function (userId) {
        return fetch(`http://localhost:8088/news?userId=${userId}`).then(response =>
            response.json()
        );
    },
    //gets the contact array and parses the json
    get: function () {
        return fetch("http://localhost:8088/news").then(response =>
            response.json()
        );
    },
    //posts to the database - the function accepts an object as the argument
    Put: function (id, contact) {
        return fetch(`http://localhost:8088/news/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
        });
    },
    //posts to the database - the function accepts an object as the argument
    Post: function (entryToPost) {
        return fetch("http://localhost:8088/news", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entryToPost)
        });
    }
};
//exports the contactCollection object
export default newsAPIButler;