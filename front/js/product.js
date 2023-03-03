const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("")


fetch("http://localhost:3000/api/products/" + id)
.then(response => response.json())
.then((result) => recuperationDonnees(result))


function recuperationDonnees(canape){
    const colors = canape.colors
    const name = canape.name
    const description = canape.description
    const price = canape.price
    const imageUrl = canape.imageUrl
    const altTxt = canape.altTxt
    const_id = canape._id

    const image = constructionImage(imageUrl, altTxt)

    const item__img=document.querySelector(".item__img")
    item__img.appendChild(image)

    ajoutTitle(name)
    ajoutPrix(price)
    ajoutDescription(description)
    ajoutListeCouleur(colors)

}

function constructionImage(imageUrl, altTxt) {
    const image = document.createElement("img");
    image.src = imageUrl
    image.innerText = altTxt
    return image
 }

 function ajoutTitle(name) {
    const h1 =document.querySelector("#title")
    h1.innerText = name
    return h1
 }

 function ajoutPrix(price) {
    const span =document.querySelector("#price")
    span.innerText = price
    return span
 }

 function ajoutDescription(description) {
    const p =document.querySelector("#description")
    p.innerText = description
    return p
 }

 function ajoutListeCouleur(colors) {
    const select =document.getElementById("colors")
    
    colors.forEach(element => {
        const option = document.createElement("option")
        option.text =  element
        option.value = element
        select.appendChild(option)
    });
  return select
    }

const button = document.querySelector("#addToCart")
button.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    if ((color == null || color ==="") & (quantity == null || quantity == 0)){
        alert("Sélectionner une couleur et une quantité")  
        return;
    }
    if (color == null || color ==="") {
        alert("Sélectionner une couleur")
        return;
    } else if (quantity == null || quantity == 0) {
        alert("Sélectionner une quantité")
        return;
    }

    const data = {
        id: id,
        color:color,
        quantity: Number(quantity),
    }

    const key = `${id}-${color}`

    localStorage.setItem(key,JSON.stringify(data));
    window.location.href = "cart.html"
})





 
