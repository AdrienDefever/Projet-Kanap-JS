const orderId = getOrderId();
console.log(orderId);
afficherOrderId(orderId);

function getOrderId(){
const urlParams = new URLSearchParams(window.location.search);
return urlParams.get("orderId")}


function afficherOrderId(orderId){
const orderIdElement = document.getElementById("orderId")
console.log(orderIdElement)
orderIdElement.innerText = orderId
}


removeAll()
function removeAll(){
const cache = window.localStorage
cache.clear()
}

