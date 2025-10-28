import {products} from './products.js'
function homePage(){
  let added_products = '';
  products.forEach((product) => {
    added_products += `
      <div class="gird-content">
        <img class="images" src="${product.image}" >
        <p>${product.name}</p>
        <div class="container">
          <img src="Rating/rating ${product.rating.stars}.jpg" class="ratings">
          ${product.rating.count}
        </div>
        <p>$${(product.priceCents / 100).toFixed(2)}</p>
        <form>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </form>
        <button 
          class="add-to-cart-button"
          data-name="${product.name}"
          data-price="${product.priceCents}"
          data-image="${product.image}">
          Add to cart
        </button>
      </div>
    `;
  });
  document.querySelector('.div2').innerHTML = added_products;

  const cart = JSON.parse(localStorage.getItem('carts') || '[]');
  let number_of_item = JSON.parse(localStorage.getItem('Itemcount')) || 0;
  document.querySelector('.cart').innerHTML = `${number_of_item} Cart`;

  const Buttons = document.querySelectorAll('.add-to-cart-button');
  Buttons.forEach(button => {
    button.addEventListener('click', function () {
      const productCard = this.closest('.gird-content');
      const quantity = parseInt(productCard.querySelector('select').value);

      const productx = {
        name: this.dataset.name,
        priceCents: parseInt(this.dataset.price),
        image: this.dataset.image,
        quantity: quantity
      };

      cart.push(productx);
      localStorage.setItem('carts', JSON.stringify(cart));
      if(number_of_item < 0){
        number_of_item = 1;
      }
      else{
      number_of_item += 1;}
      localStorage.setItem('Itemcount', JSON.stringify(number_of_item));
      document.querySelector('.cart').innerHTML = `${number_of_item} Cart`;
    });
  });
}

homePage();
