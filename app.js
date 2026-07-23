const students = [
  { id: 1, name: "Rahul", marks: 82 },
  { id: 2, name: "Priya", marks: 91 },
  { id: 3, name: "Anjali", marks: 68 },
  { id: 4, name: "Kiran", marks: 75 },
  { id: 5, name: "Ravi", marks: 55 }
];
const output =students.map(function display(student){
    return student.name;

} );
console.log(output);
//find students with mark above 75
const result= students.filter(function marksAbove75(student){
    if(student.marks>75)
        return student.marks;
  
});
console.log(result);
//find avg 
const total=students.reduce(function AverageMarks(acc,curr){
   return  acc+curr.marks;
   
},0);
 
console.log( total/students.length);

//find id of student with id 4
const findid=students.find(function findid(student){
    if(student.id==4){
        return student;
    }
});

console.log(findid);

// sort student based on mark 
const sort = students.sort(function sortMarks(acc,curr){
    return curr.marks-acc.marks;

});
console.log(sort);

//add new student using spread operator
const addNewStudent= [
    ...students,{id:6,name:"manu",marks:90}

]
console.log(addNewStudent);
//total marks using rest operator
const totalmarks=  function (...students)
{
  return students.reduce((acc, curr) => acc + curr.marks, 0);
};
console.log(totalmarks(...students));


// Task 2
const cart = [
  { id: 1, name: "Laptop", price: 50000, quantity: 1 },
  { id: 2, name: "Mouse", price: 800, quantity: 2 },
  { id: 3, name: "Keyboard", price: 1500, quantity: 1 },
  { id: 4, name: "Monitor", price: 12000, quantity: 1 }
];

const displaycartitems= cart.map(function displayItems(cart){
    return cart.name;
});
console.log(displaycartitems);
//Calculate the total cart value using reduce().
const totalcartValue = cart.reduce(function totalvalue(acc, curr) {
    return acc + curr.price * curr.quantity;
}, 0);
console.log(totalcartValue);

//Find the product with id = 3 using find().
const findProduct =cart.find(function findproduct(cart){
    if(cart.id==3){

        return cart;
    }
});
console.log(findProduct);


//Filter products with a price greater than ₹5,000 using filter().
const filter = cart.filter(function fliterprice(cart){
    if(cart.price>5000){
        return cart;
    }
});
console.log(filter);
//Sort products by price (ascending and descending).
const sortAscending= cart.sort(function(a, b) {
    return a.price - b.price;
});
console.log(sortAscending);

const sortDescending = cart.sort(function(a, b) {
    return b.price - a.price;
});
console.log(sortDescending);
//Create a new cart with an additional product using the spread operator.
const newCart =[
    ...cart,{
        id:5,name:"smart-phone",price:8900,quantity:1
    }
];
console.log(newCart);
//Write a function using the rest operator to calculate the total price of multiple items.
const totalPrize = function(...cart){
    return cart.reduce((acc,curr)=> 
        acc + curr.price * curr.quantity, 
    0);
}
console.log(totalPrize(...cart));
console.log(totalPrize(...newCart));

