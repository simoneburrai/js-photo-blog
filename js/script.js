const uri = "https://lanciweb.github.io/demo/api/pictures/"


axiosCall(uri);



// functions 

function axiosCall (apiLink){
    axios.get(apiLink)
        .then (function (response) {
            const elements = response.data;
            console.log(elements)
        })
}


