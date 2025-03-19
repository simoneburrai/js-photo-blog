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



// Richiamo la funzione AXIOS 
axiosCall(uri);



// functions 

// Definisco la funzione axios 
function axiosCall (apiLink){
    axios.get(apiLink)

        .then (function (response) {
            //Array di Oggetti importato dall'API
            const elements = response.data;
            
            // Aggiunta del bottone all'interno dell'Overlay 
            divOverlay.append(closeButtonElement);
            
            // Aggiunta della prima immagine all'interno dell'overlay 
            divOverlay.innerHTML +=createImgElement(elements[0]);

            // Aggiunta dell'overlay all'interno del Body 
            bodyElement.append(divOverlay);

            // Rimozione overflow del body tramite aggiunta di classe CSS 
            bodyElement.classList.add("body-overflow")

            //Aggiunta di ogni card creata all'interno del contenitore di cards, 
            // una card per ogni oggetto dell'array importato tramite API
            for(i=0; i<elements.length; i++){
                containerElement.innerHTML += createHTMLElement(elements[i])
            }

            // Button Overlay function
            function buttonFunction(){
                // Ripreso il bottone inserito precedentemente per ascoltare eventi correlati ad esso
                const closeButtonElementResponseCheck = document.querySelector(".close-button");

                //Quando il bottone viene cliccato:
                //viene rimosso l'overflow del body;
                //L'overlay viene rimosso dal flusso del documento, tramite classe CSS
                closeButtonElementResponseCheck.addEventListener("click", function() {
                    bodyElement.classList.remove("body-overflow");
                    divOverlay.classList.add("d-none");
                })
            }

            // Richiamo la funzione button function 
            buttonFunction();

            
            // Image Overlay Options 

            // Selezione tutti gli elementi photo card all'interno del DOM 
            const photoCardAllElements = document.querySelectorAll(".photo-card");

            
            // Per ogni elemento 
            for(i=0; i < photoCardAllElements.length; i++){
                // Creo l'elemento card corrente 
                const photoCardCurrentElement = photoCardAllElements[i];
                // creo l'elemento API corrente 
                const currentAPIElement = elements[i];
                // Aggiungo un evento di ascolto per il clic alla card 
                photoCardCurrentElement.addEventListener("click", function(){
                    // Azzero l'HTML dell'overlay 
                    divOverlay.innerHTML = "";
                    // Reinserisco il bottone 
                    divOverlay.append(closeButtonElement);
                    // Aggiungo un'immagine, creata tramite funzione, con i dati dell'elemento API corrente
                    //che corrisponde all'elemento card corrente;
                    divOverlay.innerHTML += createImgElement(currentAPIElement);
                    // Ripristino l'overflow hidden del body 
                    bodyElement.classList.add("body-overflow");
                    //Rendo visibile l'overlay
                    divOverlay.classList.remove("d-none");

                    // Richiamo l'evento di ascolto del bottone, per poter nuovamente uscire dall'overlay 
                    buttonFunction();

                })
            }


        })


        .catch(function (error){
            // Creo un h1 e un h2 
            htmlnewH1 = document.createElement("h1");
            htmlnewH2 = document.createElement("h2");
            // Inserisco dei testi all'interno 
            htmlnewH1.innerText = "Ops, Qualcosa è andato storto"
            htmlnewH2.innerHTML = `ERROR ${error.status}` //richiamo il responsive code relativo all'errore

            // Azzero il contenuto del body 
            bodyElement.innerHTML = "";
            // Aggiungo al body l'h1 e l'h2 precedentemente creati 
            bodyElement.append(htmlnewH1, htmlnewH2);
            // Aggiungo la classe error al body, che contiene lo stile del layout di erorre 
            bodyElement.classList.add("error");
        })
}


// Funzione per creare un elemento div HTML, contenente delle immagini e la loro descrizione 
//Come parametro viene passato un oggetto, che corrisponde al JSON dell'API.
function createHTMLElement (obj){
    htmlElement = `
    <div class="photo-card">
                <img src="img/pin.svg" alt="" class="pin">
                <div class="photo-container">
                    <img src="${obj.url}" alt=" ${obj.title}">
                </div>
                 <div class="photo-date">${obj.date}</div>
                <div class="photo-description">
                    ${obj.title}
                </div>
               
            </div>
    `
    return htmlElement;
}


// Funzione per creare un immagine HTML, per essere successivamente visualizzata nell'overlay.
//Come parametro viene passato un oggetto, che corrisponde al JSON dell'API.
function createImgElement (obj){
    imgElement = `
                    <img class="overlay-img" src="${obj.url}" alt=" ${obj.title}">
    `
    return imgElement;
}






