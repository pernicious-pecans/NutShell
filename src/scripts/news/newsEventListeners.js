import apiButlerNews from "./newsAPI";
import newsForm from "./newsForm";
import newsGetAndShow from "./newsPrintToDom";

const newsEventListeners = {
    newsContainer() {
        //edit single news
        $("#news_display").addEventListener("click", (e) => {
            // const activeUserId = sessionStorage.getItem("activeUser")
            const buttonId = e.target.id
            if (buttonId.includes("editNews--")) {
                //open new news form and prefill it with card data
                document.querySelector("#news_display").innerHTML = newsForm.formEntrySlots
                const newsId = buttonId.split("--")[1]
                $("#newsHiddenInput").value = parseInt(newsId)
                //change post button text to save
                $("#newsPostButton").textContent = "Save"
                $("#newsInputContainer").classList.add("newsEdit")
                //grab that object from API and prefill form
                apiButlerNews.getOnenews(parseInt(newsId))
                    .then((news) => {
                        $("#newsName").value = news.title
                        $("#newsSynopsisInput").value = news.summary
                        $("#newsURLInput").value = news.url
                    })
                //remove card from database
            } else if (event.target.id.startsWith("deleteNews--")) {
                //create a refrence to the actual id of the contact you want to delte
                let newsId = event.target.id.split("--")[1]
                console.log(newsId)
                //calls the method of delete on apiButlerNews with the ID refrence as an argument
                apiButlerNews.deleteNews(newsId).then(newsGetAndShow())
            }
        })
    }
}
export default newsEventListeners