
const newsInputFactory = () => {
        document.querySelector("#news_input").innerHTML = `<label for="Name">Name: </label>
        <input id="name" type="text">
        <label for="name">Summary: </label>
        <input id="summary" type="text" placeholder="summary">
        <label for="name">URL: </label>
        <input id="URL" type="text">
        <button id="#newsPost">Save Article</button>`
}
export default newsInputFactory