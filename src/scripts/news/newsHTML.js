const newsFactory = (newsURL, newsName, newsSumm, newsId) => {
    return `<section>
    <h2><a href="${newsURL}">${newsName}</a></h2>
        <p>${newsSumm}</p>
        <button id="editNews--${newsId}">edit</button>
        <button id="deleteNews--${newsId}">delete</button>
            </section>`
}
export default newsFactory