import newsPrintToDom from "./news-render"
import newsFactory from "./news-display-factory"

const newsGetAndShow = () => {
    return fetch("http://localhost:8088/news")
        .then(response => response.json())
        .then(myParsedNews => {
            myParsedNews.forEach(news => {
                const newsName = news.newsTitle
                const newsUrl = news.url
                const newsSumm = news.synopsis

                const html = newsFactory(newsUrl, newsName, newsSumm)
                newsPrintToDom(html, "news_display")
            })
        })
}
export default newsGetAndShow