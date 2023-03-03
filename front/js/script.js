/*"colors": [
   "Blue",
   "White",
   "Black"
   ],
   "_id": "107fb5b75607497b96722bda5b504926",
   "name": "Kanap Sinopé",
   "price": 1849,
   "imageUrl": "http://localhost:3000/images/kanap01.jpeg",
   "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
   "altTxt": "Photo d'un canapé bleu, deux places"*/

   

fetch ("http://localhost:3000/api/products")
    .then(response => response.json())
    .then((result) => addProducts(result))
    .catch ((error) => console.log(error))


function addProducts(products){

for (let i = 0; i < products.length; i++){

   const id = products[i]._id
   const imageUrl = products[i].imageUrl
   const altTxt = products[i].altTxt
   const name = products[i].name
   const description = products[i].description

  
   const lien = constructionLien(id)
   const article = constructionArticle()
   const h3 = constructionTitreH3(name)
   const image = constructionImage(imageUrl, altTxt)
   const p = constructionParagraphe(description)
   const items =document.querySelector("#items")

   items.appendChild(lien)
   lien.appendChild(article)
   article.appendChild(image)
   article.appendChild(h3)
   article.appendChild(p)
}
}

function constructionLien(id) {
   const lien = document.createElement("a")
   lien.href = "./product.html?=" + id
   return lien
}

function constructionArticle(){
   const article = document.createElement("article")
   return article
}

function constructionTitreH3(name){
   const h3 = document.createElement("h3")
   h3.innerText = name;
   h3.classList.add("productName")
   return h3
}

function constructionImage(imageUrl, altTxt) {
   const image = document.createElement("img");
   image.src = imageUrl
   image.innerText = altTxt
   return image
}

function constructionParagraphe(description) {
   const p = document.createElement("p");
   p.innerText = description;
   p.classList.add("productDescription")
   return p
}



