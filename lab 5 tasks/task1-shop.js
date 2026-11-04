const products = [
    { id: 1, name: "Notebook", category: "Stationery", price: 250 },
    { id: 2, name: "Pen Pack", category: "Stationery", price: 120 },
    { id: 3, name: "Backpack", category: "Bags", price: 3200 },
    { id: 4, name: "Lunch Box", category: "Bags", price: 900 },
    { id: 5, name: "Calculator", category: "Electronics", price: 1800 },
    { id: 6, name: "USB Drive", category: "Electronics", price: 1100 }
];
// Task 1: Print first and last product
console.log("First Product:", products[0].name);
console.log("Last Product:", products[products.length - 1].name);


// Task 2: Use map() to print product names
const names = products.map(p => p.name);
console.log("Product Names:", names);


// Task 3: Use filter() to find products under 1000
const cheap = products.filter(p => p.price < 1000);
console.log("Cheap Products:", cheap);
console.log("Number of Cheap Products:", cheap.length);


// Task 4: Use find() to find product with ID 5
const found = products.find(p => p.id === 5);
console.log("Found Product:", found.name);
console.log("Price:", found.price);


// Task 5: Calculate total prices using a loop
let total = 0;

for (const p of products) {
    total += p.price;
}

console.log("Total Price:", total);


// Task 6: Sort a copy without changing original array
const sorted = [...products].sort((a, b) => a.price - b.price);

console.log("Sorted Products:", sorted.map(p => p.name));
console.log("Original First Product:", products[0].name);


// Task 7: Chain filter() and map()
const result = products
    .filter(p =>
        (p.category === "Bags" || p.category === "Electronics")
        && p.price > 1000
    )
    .map(p => p.name);

console.log("Filtered Product Names:", result);