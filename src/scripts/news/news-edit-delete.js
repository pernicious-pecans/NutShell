const $ = document.querySelector.bind(document)
import newsAPIButler from "./newsAPIButler";
import newsGetAndShow from "./news-display";

//adds an event listener to the entire news_display container
let newsItemChange = () => {
  let contactDisplayEl = $("#news_display");
  contactDisplayEl.addEventListener("click", () => {
    //if the id of the event target starts with "delte button"
    if (event.target.id.startsWith("delete--")) {
      //create a refrence to the actual id of the contact you want to delte
      let newsId = event.target.id.split("--")[1];
      console.log(newsId)
      //calls the method of delete on newsAPIButler with the ID refrence as an argument
      newsAPIButler
        .delete(newsId)
        //re-populates the container with updated database information
        .then(newsGetAndShow);
    } else if (event.target.id.startsWith("edit--")) {
      //create a refrence to the actual id of the contact you want to edit
      let newsId = event.target.id.split("--")[1];


      newsAPIButler.getNews(newsId).then(response => {
        $("#name").value = response.name;
        $("#summary").value = response.synopsis;
        $("URL").value = response.url;
        $("#newsId").value = response.id;
      });



    }
  });
};
export default newsItemChange;