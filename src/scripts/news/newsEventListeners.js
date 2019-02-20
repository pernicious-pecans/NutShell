import apiButlerNews from "./newsAPI";
import newsForm from "./newsForm";
import newsGetAndShow from "./newsPrintToDom";

const $ = document.querySelector.bind(document)

const newsEventListeners = {
    newsContainer() {
        //edit single news
        $("#news_display").addEventListener("click", () => {
            // const activeUserId = sessionStorage.getItem("activeUser")
            const buttonId = event.target.id
            if (buttonId.includes("editNews--")) {
                //open new news form and prefill it with card data
                document.querySelector("#news_display").innerHTML = newsForm.formEntrySlots2
                const newsId = buttonId.split("--")[1]
                $("#newsHiddenInput2").value = parseInt(newsId)
                //change post button text to save
                $("#newsPostButton2").textContent = "Save"
                $("#news_input").classList.add("newsEdit")
                //grab that object from API and prefill form
                apiButlerNews.getOneNews(parseInt(newsId))
                    .then((news) => {
                        $("#newsName2").value = news.newsTitle
                        $("#newsSummary2").value = news.synopsis
                        $("#newsUrl2").value = news.url
                    })
                    //now to set up the actual editing

                .then(() => {
    $("#newsPostButton2").addEventListener("click", ()=>{
        const title = $("#newsName2").value
        const summary = $("#newsSummary2").value
        const url = $("#newsUrl2").value
        const stringArticleId = $("#newsHiddenInput2").value
        const articleId = parseInt(stringArticleId)
        //create new object
        const newsObject = {
            "newsTitle": title,
            "synopsis": summary,
            "url": url,
            "timestamp": Date.now(),
            "userId": 1
        }
        //replace object in database
        apiButlerNews.editNews(articleId, newsObject)
            .then(() => {
                $("#news_display").innerHTML = ""
            })
            .then(()=>{
                newsGetAndShow()
            })
    })
                })

    }  else if (event.target.id.startsWith("deleteNews--")) {
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