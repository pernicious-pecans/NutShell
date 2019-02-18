const newsFactory = (newsURL, newsName, newsSumm) => {
    return `<section>
    <h2><a href="${newsURL}">${newsName}</a></h2>
        <p>${newsSumm}</p>
            </section>`
}

export default newsFactory