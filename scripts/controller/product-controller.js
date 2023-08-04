// product controller -it is a glue between views and model
// controller - i/o views layer
// data exchange between view and model

import productOperations from '../services/product-operations.js';

async function loadPizzas(){
    const pizzas = await productOperations.loadProducts();
    console.log('Pizzas are ', pizzas);
    for(let pizza of pizzas){
        preparePizzaCard(pizza);
    }
}
loadPizzas();

function addToCart(){
    const pizzaId=this.getAttribute('product-id');
    const product=productOperations.search(pizzaId);
    product.isAddedInCart=true;
    product.pizzaNum+=1;
    console.log(product);
    printBasket();
}
function printBasket(){
    const cartProducts = productOperations.getProductInCart();
    const basket = document.querySelector('#basket');
    basket.innerHTML = '';
    for(let product of cartProducts){
        const cDiv=document.createElement('div');
        cDiv.className='container';
        cDiv.style.display='flex';
        cDiv.style.justifyContent = 'space-between';
        const li = document.createElement('li');
        const button=document.createElement('button');
        button.className='btn btn-primary btn-sm mt-1';
        button.innerText='remove';
        button.addEventListener('click',removeFromCart);
        button.setAttribute('product-id',product.id);
        li.innerText = `${product.name} - $${product.price} × ${product.pizzaNum}`;
        basket.appendChild(cDiv)
        cDiv.appendChild(li);
        cDiv.appendChild(button);
    }
    const total=document.createElement('p');
    total.className="text";
    total.innerText=`Total Bill:$${Math.round(cartProducts.reduce(((a,b)=>a+b.price*b.pizzaNum),0)*1.18*1000)/1000}`;
    basket.appendChild(total);


}
function removeFromCart(){
    const pizzaId=this.getAttribute('product-id');
    const product=productOperations.search(pizzaId);
    if (product.pizzaNum==1){
        product.isAddedInCart=false;
    }
    else{
        product.pizzaNum-=1;
    }
    console.log(product);
    printBasket();
}


function preparePizzaCard(pizza){
    const outputDiv=document.getElementById('output');
    const colDiv =document.createElement('div');
    colDiv.className='col-4';
    const cardDiv=document.createElement('div');
    cardDiv.className='card';
    cardDiv.style = "width: 18rem;";
    colDiv.appendChild(cardDiv);
    const img=document.createElement('img');
    img.src=pizza.url;
    img.className='card-img-top';
    cardDiv.appendChild(img);
    const cardBody= document.createElement('div');
    cardBody.className='card-body';
    cardDiv.appendChild(cardBody);
    const h5= document.createElement('h5');
    h5.className='card-title';
    h5.innerText = pizza.name;
    const pTag= document.createElement('p');
    pTag.className='card-text';
    pTag.innerText=pizza.desc;
    const button= document.createElement('button');
    button.innerText = 'Add to Cart';
    button.className = 'btn btn-primary';
    button.addEventListener('click',addToCart);
    button.setAttribute('product-id',pizza.id);
    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    cardBody.appendChild(button);
    outputDiv.appendChild(colDiv);
}