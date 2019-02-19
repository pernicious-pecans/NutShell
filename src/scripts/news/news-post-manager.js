const $ = document.querySelector.bind(document)
import newsGetAndShow from "./newsPrintToDom"

const NewsManager = {
    postNews: () => {
        document.getElementById("#newsPostButton").addEventListener("click", () => {

            const newsToAdd = {
                // userId: 2,
                newsTitle: $("#newsName").value,
                synopsis: $("#newsSummary").value,
                url: $("#newsUrl").value,
                newsTimestamp: `${new Date(2019, 2)}`,
                user: {
                    userId: 2
                }
            }
            fetch("http://localhost:8088/news", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newsToAdd)
            })
            // .then(r => r.json())
            // // Because json-server sends us the new thing in response
            // .then((newUserObject) => {
            //     // Show contact entry form
            //     generateContactForm(newUserObject.id)
            //     contactForm()
            // })

            newsGetAndShow()
        })
    },
    generateNewsForm: () => {
        document.querySelector("#news_input").innerHTML = `
        <input type="hidden" id=newsHiddenInput value="">
        <label for="Name">Name: </label>
        <input id="newsName" type="text">
        <label for="name">Summary: </label>
        <input id="newsSummary" type="text" placeholder="summary">
        <label for="newsUrl">URL: </label>
        <input id="newsUrl" type="text">
        <button id="#newsPostButton">Save Article</button>
        `
    }

}





export default NewsManager