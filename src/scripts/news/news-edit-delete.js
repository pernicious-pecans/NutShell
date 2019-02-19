const $ = document.querySelector.bind(document)
import newsAPIButler from "./newsAPIButler";
import newsGetAndShow from "./news-display";

//adds an event listener to the entire news_display container
let newsItemChange = () => {
  let contactDisplayEl = document.querySelector("#news_display");
  contactDisplayEl.addEventListener("click", () => {
    //if the id of the event target starts with "delte button"
    if (event.target.id.startsWith("delete--")) {
      //create a refrence to the actual id of the contact you want to delte
      let newsId = event.target.id.split("--")[1];
      console.log(newsId)
      //calls the method of delete on newsAPIButler with the ID refrence as an argument
      newsAPIButler.deleteNews(newsId).then(newsGetAndShow());
    } else if (event.target.id.startsWith("edit--")){
              //open new article form and prefill it with card data
              newsPrintToDom.printInputField(newsForms.newsInputForm, "#newsFeed-input-container")
              const articleId = buttonId.split("--")[1]
              $("#newsHiddenInput").value = parseInt(articleId)
              //change post button text to save
              $("#postArticleButton").textContent = "Save"
              $("#newsInputContainer").classList.add('newsArticleEdit')
              //grab that object from API and prefill form
              apiHandler.getOneArticle(parseInt(articleId))
                  .then((article) => {
                      $("#newsTitleInput").value = article.title
                      $("#newsSynopsisInput").value = article.summary
                      $("#newsURLInput").value = article.url
                  })
              //remove card from database
}
      });



    }
  });
};

export default newsItemChange;