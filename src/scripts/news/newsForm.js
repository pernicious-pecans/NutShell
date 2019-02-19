
const newsForm = {
    formEntrySlots: `
    
    <input type="hidden" id=newsHiddenInput value="">
    <label for="Name">Name: </label>
    <input id="newsName" type="text">
    <label for="name">Summary: </label>
    <input id="newsSummary" type="text" placeholder="summary">
    <label for="newsUrl">URL: </label>
    <input id="newsUrl" type="text">
    <button id="#newsPostButton">Save Article</button>`
}
export default newsForm