console.log("working");

let input = document.querySelector("#topicInp");
let btn = document.querySelector(".submit");
let result = document.querySelector("#results");
const API_KEY = '1c23e88c41574e588b7eab7922b9eec3';

async function fetchData(url) {
    data = await fetch(url);
    resJson = await data.json();
    return resJson;
}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    result.innerHTML = "<h2 class='text-center'>Wait a moment !!</h2>";
    // console.log(input.value);
    const url = `https://newsapi.org/v2/top-headlines?q=${input.value}&apiKey=${API_KEY}`;
    if (input.value.length > 1) {
        dataJson = fetchData(url);
        dataJson.then(data => {
            if (data["status"] = "ok") {
                if (data["totalResults"] > 0) {
                    articles = data["articles"]
                    result.innerHTML = "";
                    Array.from(articles).forEach(element => {
                        console.log(element)
                        if (String(element["content"]).length > 10) {
                            let index = element["content"].indexOf("[");
                            result.innerHTML += `
                            <div class="cards">           
                                <h3 class="title">${element["title"]}</h3>
                                <p class="content">${element["content"].slice(0, index)}</p>
                                <p class="author"><b>Author: </b>${element["author"]}</p>
                                <div class="readBtn"><a href="${element["url"]}">Read</a></div>                           
                            </div>`;
                        }

                    });
                    input.value = "";
                }
                else {
                    console.log("No data found");
                    result.innerHTML = "<h2 class='text-center'>No data found !!</h2"
                }
            }
            else {
                console.log("error occured");
                result.innerHTML = "<h2 class='text-center'>Error Occured !!</h2"
            }

        })
    }
    else {
        console.log("Please Give Some Argument");
        result.innerHTML = "<h2 class='text-center'>Please Give Some Argument</h2"
    }
});