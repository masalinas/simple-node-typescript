import express, { Request, Response } from 'express';
import path from 'path'; //from @types/node

import { from, of } from 'rxjs';
import { map, filter, reduce, groupBy, mergeMap, toArray, scan  } from 'rxjs/operators';

import { Product } from './product';

let products: Product[] = [
  {name: 'Apple', price: 12, active: true},
  {name: 'Banana', price: 8, active: false},
  {name: 'Orange', price: 10, active: true},
];

// -------------------firing express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'client/build')));

// -------------------routes
app.get('/home', (request: Request, response: Response)=>{
  console.log(request.url)
  response.json({ message: `Welcome to the home page!` })
});

app.get('/products', (request: Request, response: Response)=>{
  response.json(products);
});

// --------------------Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`Server running on PORT ${ PORT }`);
})

// list all products
console.log('1) List all products');
from(products)
  .subscribe((product: Product) => {
    console.log(product);
  });
console.log('\n');

// filter active products
console.log('2) Filter active products');
from(products).pipe(filter(product => product.active === true))
  .subscribe((product: Product) => {
    console.log(product);
  });
console.log('\n');

// map products collection
console.log('3) Create format product descriptions');
from(products).pipe(map((product: Product) => product.name + 'with price ' + product.price))
  .subscribe((message: string) => {
    console.log(message);
  });
console.log('\n');

console.log('4) Return array from filtered products');
from(products).pipe(filter(product => product.active === true),
                    reduce((results: Product[], product) => [...results, product], []))
                      .subscribe((products) => {
                        console.log(products);
                      });
console.log('Other way to Return array from filtered products');
from(products).pipe(reduce((results: Product[], product) => product.active === true ? [...results, product] : results, []))
  .subscribe((products) => {
    console.log(products);
  });
console.log('\n');

console.log('5) Group products by active status');
from(products).pipe(groupBy(product => product.active),
                    mergeMap(group => group.pipe(toArray())))
    .subscribe(products => {
      console.log(products);
    });
console.log('\n');

console.log('6) Totalize price of all products');
from(products).pipe(reduce((total, product) => total += product.price, 0))
    .subscribe(total => {
      console.log(total);
    });
console.log('\n');

of(products).pipe(map(product => product.reduce((total, product) => total += product.price, 0)))
    .subscribe(total => {
      console.log(total);
    });
console.log('\n');
