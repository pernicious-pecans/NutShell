const $ = document.querySelector.bind(document)
import newsGetAndShow from "./news-display"
const NewsManager = {
    postNews : () => {
        document.getElementById("#newsPost").addEventListener("click", () => {

    const newsToAdd = {
                userId: 2,
                newsTitle: $("#name").value,
                synopsis: $("#summary").value,
                url: $("#URL").value,
                newsTimestamp: 2
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

        newsGetAndShow() })
    },
    generateNewsForm : () => {
        document.querySelector("#news_input").innerHTML = `
        <label for="Name">Name: </label>
        <input id="name" type="text">
        <label for="name">Summary: </label>
        <input id="summary" type="text" placeholder="summary">
        <label for="name">URL: </label>
        <input id="URL" type="text">
        <button id="#newsPost">Save Article</button>
        `
    }

}





export default NewsManager