import newsImportFactory from "./news/news-form"
import newsPrintToDom from "./news/news-input-render"

const html = newsImportFactory()

newsPrintToDom(html, "news_input")