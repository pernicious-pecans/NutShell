import formHTML from "./eventHTMLforForm"


const $ = document.querySelector.bind(document)
const post = $("#events_input")

const formFunctions = () => {


         post.innerHTML = formHTML()


}
export default formFunctions
