
//nécessaire d'afficher les données récupérés du local storage et du back-end

let cart = [];
console.log(cart)

// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //

recuperationDonneesProduitsChoisis();


function recuperationDonneesProduitsChoisis() {
    for (let i = 0; i < localStorage.length; i++) {
        console.log(i)
        const item = localStorage.getItem(localStorage.key(i))
        console.log("objet à la position", i, "est : ", item)
        const itemObjects = JSON.parse(item)
        console.log(itemObjects)


        fetch("http://localhost:3000/api/products/" + itemObjects.id)
            .then((result) => result.json())
            .then(data => {
                const itemObject = {
                    price: data.price,
                    name: data.name,
                    imageUrl: data.imageUrl,
                    altTxt: data.altTxt,
                    color: itemObjects.color,
                    quantity: itemObjects.quantity,
                    id: itemObjects.id
                }

                cart.push(itemObject)
                console.log(itemObject)

                afficherItems(itemObject);
            })
    };
}

// Affichage des éléments créés et rattachement au bon parent //

function afficherItems(item) {
    const article = constructionArticle(item);
    const div = constructionDivItemImg(item);
    const image = constructionImage(item);
    const cartItemContent = constructionItemContent(item);
    document.querySelector("#cart__items").appendChild(article);
    article.appendChild(div);
    div.appendChild(image);
    article.appendChild(cartItemContent);
    const totalQuantity = afficherTotalQuantity(item);
    const totalPrice = afficherTotalPrice(item);
}

// Création de l'Article   //

function constructionArticle(item) {
    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.dataset.id = item.id;
    article.dataset.color = item.color;
    return article;
}

// Création de la Div Image  //

function constructionDivItemImg(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    return div
}

// Création de l'Image //

function constructionImage(item) {
    const image = document.createElement("img");
    image.src = item.imageUrl
    image.innerText = item.altTxt
    return image
}

// Création de la div Item Content qui contiendra les div description et construction settings //

function constructionItemContent(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content")

    const description = constructionDescription(item)
    const settings = constructionSettings(item)

    div.appendChild(description)
    div.appendChild(settings)
    return div
}

// Création de la Div Description et des éléments qui lui sont rattachés //

function constructionDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.innerText = item.name;

    const p = document.createElement("p");
    p.innerText = item.color;

    const p2 = document.createElement("p");
    p2.innerText = item.price + " €";

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

// Création de la Div Settings et des éléments qui lui sont rattachés avec possibilité de mettre à jour la quantité d'un produit mais également de le supprimer //

function constructionSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    const div1 = document.createElement("div")
    div1.classList.add("cart__item__content__settings__quantity")
    settings.appendChild(div1)

    const p = document.createElement("p")
    p.innerText = "Qté : "
    div1.appendChild(p)

    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updatePanier(item.id, input.value, item))
    div1.appendChild(input)

    const div2 = document.createElement("div");
    div2.classList.add("cart__item__content__settings__delete")
    div2.addEventListener("click", () => deleteItem(item))
    settings.appendChild(div2)

    const p2 = document.createElement("p")
    p.classList.add("deleteItem")
    p2.innerText = "Supprimer"
    div2.appendChild(p2)


    return settings
}

// Afficher la quantité totale de l'ensemble des produits //

function afficherTotalQuantity(item) {
    let total = 0
    const totalQuantity = document.querySelector("#totalQuantity")
    if (cart.length < 1) {
        totalQuantity.innerText = ""
    }else{
    cart.forEach(item => {
        const totalUnitQuantity = item.quantity
        total = total + totalUnitQuantity
        totalQuantity.innerText = total
    })}
}

// Afficher le prix total de l'ensemble des produits //

function afficherTotalPrice(item) {
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    if (cart.length < 1) {
        totalPrice.innerText = ""
    }else{
    cart.forEach(item => {
        const totalUnitPrice = item.quantity * item.price
        total = total + totalUnitPrice
        totalPrice.innerText = total
    })}
}

// Mettre à jour le panier lorsque l'on change la quantité avec la mise à jour du local storage //

function updatePanier(id, newValue, item) {
    //const updateQuantity = cart.find((item) => item.id === id & item.color)
    const updateQuantity = cart.find((element) => element.id === item.id & element.color === item.color)
    updateQuantity.quantity = Number(newValue)
    item.quantity = updateQuantity.quantity
    console.log(cart)
    afficherTotalQuantity()
    afficherTotalPrice()
    updateDataLocalStorage(item)
}

// Mise à jour du locagl storage lors de la mise à jour de la quantité d'un produit // 

function updateDataLocalStorage(item) {
    const newDataLocalStorage = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, newDataLocalStorage)
}

// Supppresssion d'un produit du panier grace à la fonction filter, celui ci est supprimer dans local storage et à l'affichage // 
function deleteItem(item) {
    cart = cart.filter((element) => {
        
        return !(element.id === item.id && element.color === item.color);
    } 
    );
    supprimerDuLocalStorage(item);
    supprimerArticleDuPanier(item);
    afficherTotalQuantity()
    afficherTotalPrice()
}

function supprimerDuLocalStorage(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}

function supprimerArticleDuPanier(item) {
    const articleToDelete = document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`)
    articleToDelete.remove(item)
}

//

//----------------------------------------------------------------PARTIE FORMULAIRE / Récupération des données / envoi au serveur-----------------------------------------------------------------------------------------------------

// 
function postForm() {
    const order = document.querySelector("#order") //selection du bouton envoie formulaire
    order.addEventListener('click', (event) => {
        event.preventDefault(); //empeche le rechargement de la console au clic

        // je récupère les données du formulaire dans un objet
        const contact = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            email: document.getElementById('email').value
        };

        // je mets les valeurs du formulaire et les produits sélectionnés dans un objet

        const sendFormData = {
            contact,
            products : getIdsFromCache()
        }
        console.log(sendFormData)

    
        function getIdsFromCache(){
            const ids = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i)
                const id = key.split("-")[0]
                ids.push(id)
            }
            return ids
        }

         // j'envoie au serveur le formulaire + localStorage (sendFormData) 

        const options = {
            method: 'POST',
            body: JSON.stringify(sendFormData),
            headers: { 
              'Content-Type': 'application/json',
            }
          };
        
          fetch("http://localhost:3000/api/products/order", options)
            .then(response => response.json())
            .then((data) => {
                if((validControl() & controlPanierNonVide())){
                    const orderId = data.orderId
                    window.location.href = "confirmation.html" + "?orderId=" + orderId
                }else{
                    return
                }
            }) 
            
            
            
        // --- vérifier la validation des entrées saisies (inputs) dans le form --- //

        //Déclarations des variables pour procécer au controle Regex    
        let checkName = /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/;
        let checkAddress = /^[(A-Za-z0-9\s)]{5,50}$/;
        let checkCity = /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,}$/;4
        let checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i;


        //Endroit ou charger les messages d'erreur
        let prenomMsgErreur = document.querySelector("#firstNameErrorMsg");
        let nomMsgErreur = document.querySelector("#lastNameErrorMsg");
        let adresseMsgErreur = document.querySelector("#addressErrorMsg");
        let villeMsgErreur = document.querySelector("#cityErrorMsg");
        let emailMsgErreur = document.querySelector("#emailErrorMsg");

        //Test si panier est vide
        function controlPanierNonVide() {
            if (cart.length > 0) {
                return true;
            } else {
                alert("Aucun Produits sélectionnés dans le Panier")
            }
        }

        //Test du prénom

        function controlFirstName() {
            const validFirstName = contact.firstName;
            if (checkName.test(validFirstName)) {
                prenomMsgErreur.innerText = "Saisie Conforme";
                return true;
            } else {
                prenomMsgErreur.innerText = "Vérifier/Compléter votre prénom. Celui-ci doit comporter entre 3 et 20 lettres. Exemple : Charles";
            }
        }

        //Test nom

        function controlLastName() {
            const validLastName = contact.lastName;
            if (checkName.test(validLastName)) {
                nomMsgErreur.innerText = "Saisie Conforme";
                return true;
            } else {
                nomMsgErreur.innerText = "Vérifier/Compléter votre nom. Celui-ci doit comporter entre 3 et 20 lettres. Exemple : Dupont";
            }
        }

        //Test de l'adresse

        function controlAddress() {
            const validAddress = contact.address;
            if (checkAddress.test(validAddress)) {
                adresseMsgErreur.innerText = "Saisie Conforme";
                return true;
            } else {
                adresseMsgErreur.innerText = "Vérifier/Compléter votre adresse. L'adresse ne doit contenir que des lettres sans ponctuation et des chiffres. Exemple : 10 rue de Paris";}

        }



        //Test de la ville

        function controlCity() {
            const validCity = contact.city;
            if (checkCity.test(validCity)) {
                villeMsgErreur.innerText = "Saisie Conforme";
                return true;
            } else {
                villeMsgErreur.innerText = "Vérifier/Compléter votre ville. Celle-ci doit comporter à minima 3 lettres. Exemple : Paris";
            }
        }

        //Test du mail

        function controlMail() {
            const validMail = contact.email;
            if (checkMail.test(validMail)) {
                emailMsgErreur.innerText = "Saisie Conforme";
                return true;
            } else {
                emailMsgErreur.innerText = "Vérifier/Compléter votre email. Celui-ci doit contenir un @ et une extension de domaine (exemple : .com ou .fr). Exemple : charles.dupont@gmail.com";
            }
        }
        
        controlPanierNonVide();
        controlFirstName();
        controlLastName();
        controlAddress();
        controlCity();
        controlMail();
        validControl()
        

        // Après vérification des entrées, j'envoie l'objet contact dans le localStorage //
  
        function validControl() {
            if ((controlFirstName && controlLastName() && controlAddress() && controlCity() && controlMail()) ){
                //localStorage.setItem('contact', JSON.stringify(contact));
                return true;
            } else {
                alert('Merci de revérifier les données du formulaire')
            }
        }

        }
    )
}

postForm();


// ------------- FIN vérification validation des entrées -------- //
