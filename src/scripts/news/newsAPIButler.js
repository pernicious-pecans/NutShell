//creates an object with TWO keys, each is a method
const newsAPIButler = {

    getUserNews: (userId) => {
        return fetch(`http://localhost:8088/news?_expand=user&userId=${userId}`)
            .then(res => res.json())
    },
    getOneArticle: (id) => {
        return fetch(`http://localhost:8088/news/${id}`)
            .then(res => res.json())
    },
    postNews: (userId, obj) => {
        return fetch(`http://localhost:8088/news?_expand=user&userId=${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
    },
    editNews: (id, obj) => {
        return fetch(`http://localhost:8088/news/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
    },
    deleteNews: (id) => {
        return fetch(`http://localhost:8088/news/${id}`, {
            method: "DELETE",
        })
}
//     //deletes a contact from the database
//     deleteNews: newsID => {
//         return fetch(`http://127.0.0.1:8088/news/${newsID}`, {
//             method: "DELETE"
//         });
//     },
//     getNews: newsID => {
//         return fetch(`http://127.0.0.1:8088/news/${newsID}`).then(response =>
//             response.json()
//         );
//     },

//     //gets the contact array and parses the json
//     getForUser: function (userId) {
//         return fetch(`http://localhost:8088/news?userId=${userId}`).then(response =>
//             response.json()
//         );
//     },
//     //gets the contact array and parses the json
//     get: function () {
//         return fetch("http://localhost:8088/news").then(response =>
//             response.json()
//         );
//     },
//     //posts to the database - the function accepts an object as the argument
//     Put: function (newsID, contact) {
//         return fetch(`http://localhost:8088/news/${newsID}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(contact)
//         });
//     },
//     //posts to the database - the function accepts an object as the argument
//     Post: function (entryToPost) {
//         return fetch("http://localhost:8088/news", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(entryToPost)
//         });
//     }
// };
//exports the contactCollection object
}
export default newsAPIButler;