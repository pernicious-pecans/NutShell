import newsFactory from "./newsHTML"
const $ = document.querySelector.bind(document)

const newsGetAndShow = () => {
    return fetch("http://localhost:8088/news")
        .then(response => response.json())
        .then(myParsedNews => {
            myParsedNews.forEach(news => {
                const newsName = news.newsTitle
                const newsUrl = news.url
                const newsSumm = news.synopsis
                const newsId = news.id

                let newsHTML = newsFactory(newsUrl, newsName, newsSumm, newsId)
                $("#news_display").innerHTML += newsHTML
            })
        })
}
export default newsGetAndShow