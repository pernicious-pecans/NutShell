import newsImportFactory from "./news-form"
import newsPrintToDom from "./news-input-render"

html = newsImportFactory()

newsPrintToDom(html, "news_input")