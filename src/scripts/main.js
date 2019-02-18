import newsImportFactory from "./news/news-form"
import newsPrintToDom from "./news/news-render"
import newsGetAndShow from "./news/news-display"
import postNews from "./news/news-add"


newsGetAndShow();
const html = newsImportFactory()
postNews()

newsPrintToDom(html, "news_input")