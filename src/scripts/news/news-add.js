const postNews = document.querySelector("#newsPost").addEventListener("click", event => {

const $ = document.querySelector
            
const userId = 2
const newsTitle = $("name").value
const synopsis = $("#summary").value
const url = $("#URL").value
const newsTimeStamp = "time time time"

const newsToAdd = `
            "userId": ${userId},
			"newsTitle": "${newsTitle}",
			"synopsis": "${synopsis}",
			"url": "${url}",
            "newsTimestamp": "${newsTimeStamp}"
            `

fetch("http://localhost:8080/news", { 
method: "POST",
headers: {
    "Content-Type": "application/json"
},
body: JSON.stringify(newsToAdd)
})})

export default postNews