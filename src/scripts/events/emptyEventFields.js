
const $ = document.querySelector.bind(document)

const clearEventForm = () => {

     $("#eventName").value="",
     $("#userId").value="",
     $("#eventId").value="",
     $("#eventLocation").value="",
     $("#eventDate").value=""

}

export default clearEventForm