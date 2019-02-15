
const $ = document.querySelector.bind(document)

const clearEventForm = () => {

     $("#eventName").value="",
     $("#userId").value="",
     $("#eventLocation").value="",
     $("#eventDate").value=""

}

export default clearEventForm