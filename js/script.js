// API link 
const uri = "https://lanciweb.github.io/demo/api/pictures/"

// htmlElements 
const containerElement = document.getElementById("cards-container");
const bodyElement = document.querySelector("body");

// overlay container 
const divOverlay = document.createElement("div");
divOverlay.classList.add("overlay");

// close Button Overlay 
closeButtonElement = document.createElement("button");
closeButtonElement.innerHTML = "Chiudi";
closeButtonElement.classList.add("close-button");




axiosCall(uri);



// functions 

function axiosCall (apiLink){
    axios.get(apiLink)

        .then (function (response) {
            const elements = response.data;
            // console.log(elements)
            // console.log(elements[0])
            divOverlay.append(closeButtonElement);
            divOverlay.innerHTML +=createImgElement(elements[0]);
            bodyElement.append(divOverlay);
            bodyElement.classList.add("body-overflow")
            for(i=0; i<elements.length; i++){
                containerElement.innerHTML += createHTMLElement(elements[i])
            }

            // Button Overlay functions 


            const closeButtonElementResponseCheck = document.querySelector(".close-button");

            closeButtonElementResponseCheck.addEventListener("click", function() {
                bodyElement.classList.remove("body-overflow");
                divOverlay.classList.add("d-none");
            })

            // Image Overlay Options 

            const photoCardAllElements = document.querySelectorAll(".photo-card");

            console.log(photoCardAllElements);
            console.log(response.data);

            for(i=0; i<photoCardAllElements; i++){
                const photoCardCurrentElement = photoCardAllElements(i).value;
                console.log(photoCardCurrentElement);
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
                <div class="photo-date">${obj.date}</div>
            </div>
    `
    return htmlElement;
}

function createImgElement (obj){
    imgElement = `
                    <img class="overlay-img" src="${obj.url}" alt=" ${obj.title}">
    `
    return imgElement;
}






