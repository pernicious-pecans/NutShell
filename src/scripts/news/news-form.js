const newsInputFactory = () => {
return `<label for="Name">Name: </label>
        <input id="name" type="text">
        <label for="name">Summary: </label>
        <input id="summary" type="text" placeholder="summary">
        <label for="name">Email: </label>
        <input id="URL" type="text">
        <button id="button">Save Article</button>`
}

export default newsInputFactory