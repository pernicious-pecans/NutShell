const newsPrintToDom = (html, destination) => document.querySelector(`#${destination}`).innerHTML += html

export default newsPrintToDom
