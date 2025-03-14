// API link 
const uri = "https://lanciweb.github.io/demo/api/pictures/"

// htmlElements 
const containerElement = document.getElementById("cards-container");
const bodyElement = document.querySelector("body");
// console.log(containerElement)




axiosCall(uri);



// functions 

function axiosCall (apiLink){
    axios.get(apiLink)

        .then (function (response) {
            const elements = response.data;
            // console.log(elements)
            // console.log(elements[0])
            for(i=0; i<elements.length; i++){
                containerElement.innerHTML += createHTMLElement(elements[i])
            }
        })
        .catch(function (error){
            htmlnewH1 = document.createElement("h1");
            htmlnewH2 = document.createElement("h2");
            htmlnewH1.innerText = "Ops, Qualcosa è andato storto"
            htmlnewH2.innerHTML = `ERROR ${error.status}`
            bodyElement.innerHTML = "";
            bodyElement.append(htmlnewH1, htmlnewH2);
            bodyElement.classList.add("error");
        })
}


function createHTMLElement (obj){
    htmlElement = `
    <div class="photo-card">
                <img src="img/pin.svg" alt="" class="pin">
                <div class="photo-container">
                    <img src="${obj.url}" alt=" ${obj.title}">
                </div>
                <div class="photo-description">
                    ${obj.title}
                </div>
            </div>
    `
    return htmlElement;
}


