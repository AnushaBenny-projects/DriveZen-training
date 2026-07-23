//callback function

function greet(name) {
    console.log("hello"+ " " +name);

}
function welcome(callback){
   callback("Anusha"); 
}
welcome(greet);

function add(a, b) {
    return a + b;
}
function substract(a,b){
    return a-b;
}

function calculator(a, b, operation) {
    return operation(a, b);
}

console.log(calculator(5, 3, add));
console.log(calculator(5, 3, substract));



const cart = ["Shoes", "Shirt", "Pants"];

function createOrder(cart, callback) {
    const orderId = 101;
    callback(orderId);
}

function payment(orderId) {
    console.log("Payment done for Order ID:", orderId);
}

createOrder(cart, payment);



function createOrder(cart) {
    return new Promise((resolve) => {
        const orderId = 101;
        resolve(orderId);
    });
}

function payment(orderId) {
    console.log("Payment done for Order ID:", orderId);
}

createOrder(cart).then(payment);

//fetch data
fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });