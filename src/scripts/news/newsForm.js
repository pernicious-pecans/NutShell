
const newsForm = {
    formEntrySlots: `
    <label for="Name">Name: </label>
    <input id="newsName" type="text" placeholder=title>
    <label for="name">Summary: </label>
    <input id="newsSummary" type="text" placeholder="summary">
    <label for="newsUrl">URL: </label>
    <input id="newsUrl" type="text" placeholder="url">
    <button id="newsPostButton">Post New Article</button>`,

    formEntrySlots2: `
    <input type="hidden" id="newsHiddenInput2" value="">
    <label for="Name">Name: </label>
    <input id="newsName2" type="text" placeholder=title>
    <label for="name">Summary: </label>
    <input id="newsSummary2" type="text" placeholder="summary">
    <label for="newsUrl">URL: </label>
    <input id="newsUrl2" type="text" placeholder="url">
    <button id="newsPostButton2">Save Article</button>
    
    <script>
    $("newsPostButton2").addEventListener("click", ()=>{
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
            "user": 1
        }
        //replace object in database
        apiButlerNews.editNews(articleId, newsObject)
    //         .then(() => {
    //             $("#newsFeed-article-container").innerHTML = ""
    //             newsHTMLFactory(activeUserId)
    
    // })
    })
    </script>`
}

export default newsForm