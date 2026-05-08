function renderCart() {
  const cart = JSON.parse(localStorage.getItem('carts')) || [];
  const order = [];
  const orderItems = []; 
  let added_orders = '';
  let sum_of_prices = 0;
  let sum_of_shipping = 0;
  let totalBeforeTax = 0;
  let EstimatedTax = 0;
  let TotalOrder = 0;
  const today = new Date();
  const now = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  const dayOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const DayOfTheWeek = dayOfTheWeek[today.getDay()];
  localStorage.setItem('day_of_the_week', JSON.stringify(DayOfTheWeek));


  cart.forEach((item, index) => {
    added_orders += `
      <div class="grid-page">
        <div class="cart-item" data-index="${index}">
          <div class="delivery-text">Delivery date: ${DayOfTheWeek}, ${now}</div>
          <img src="${item.image}" alt="${item.name}">
          <div>
            ${item.name} <br>Pairs<br>
            $${(item.priceCents / 100).toFixed(2)}<br>
            Quantity: ${item.quantity}
            <button class="delete-button" data-index="${index}">Delete</button>
          </div>
          <div>
            Delivery time: ${DayOfTheWeek}
            <form>
              <label>
                ${now}<br>$4.99 Shipping
              </label>
            </form>
          </div>
        </div>
      </div>
    `;
    sum_of_prices += item.priceCents * item.quantity;
    sum_of_shipping += 4.99;
  });
  

  document.querySelector('.delivery-itmes').innerHTML = added_orders;

  const totalPriceFixed = (sum_of_prices / 100).toFixed(2);
  totalBeforeTax = (parseFloat(totalPriceFixed) + sum_of_shipping).toFixed(2);
  EstimatedTax = (totalBeforeTax / 10).toFixed(2);
  TotalOrder = (parseFloat(EstimatedTax)+  parseFloat(totalBeforeTax)).toFixed(2);




  localStorage.setItem('Shipping', JSON.stringify(sum_of_shipping));
  localStorage.setItem('total_price', JSON.stringify(totalPriceFixed));
  localStorage.setItem('total1', JSON.stringify(totalBeforeTax));
  localStorage.setItem('EstimatedTax1', JSON.stringify(EstimatedTax));
  localStorage.setItem('TotalOrder1', JSON.stringify(TotalOrder));
  
 

  const SumOfShipping = JSON.parse(localStorage.getItem('Shipping'));
  const totalPrice = JSON.parse(localStorage.getItem('total_price'));
  const number_of_item = JSON.parse(localStorage.getItem('Itemcount')) || 0;
  const totalBeforeTask1 = JSON.parse(localStorage.getItem('total1'));
  const total_order = JSON.parse(localStorage.getItem('TotalOrder1'));
  const Estimated_Tax = JSON.parse(localStorage.getItem('EstimatedTax1'));

  document.querySelector('.price').innerHTML = `$${totalPrice}`;
  document.querySelector('.Shippingprice').innerHTML = `$${SumOfShipping.toFixed(2)}`;
  document.querySelector('.cart').innerHTML = `${number_of_item} Cart`;
  document.querySelector('.Items3').innerHTML = `${number_of_item} Items`;
  document.querySelector('.totalprice1').innerHTML = `$${totalBeforeTask1}`;
  document.querySelector('.Estimated_tax1').innerHTML = `$${Estimated_Tax}`;
  document.querySelector('.total_order1').innerHTML = `$${total_order}`;


  const delete_buttons = document.querySelectorAll('.delete-button');
  delete_buttons.forEach((delete_button) => {
    delete_button.addEventListener('click', (event) => {
      const index_value = event.target.dataset.index;

      const updated_cart = cart.filter((_, i) => i != index_value);
      localStorage.setItem('carts', JSON.stringify(updated_cart));

      let count_items = JSON.parse(localStorage.getItem('Itemcount')) || 0;
      count_items = Math.max(0, count_items - 1);
      localStorage.setItem('Itemcount', JSON.stringify(count_items));

      renderCart(); 
    });
  });
 function addedOrders() {
   

  cart.forEach((item) => {
    orderItems.push({
      ItemsImage: item.image,
      ItemsName: item.name,
      ItemsQuantity: item.quantity,
      ItemsDeliveryMonth: new Date().getMonth(),
      ItemsDeliveryDate: new Date().getDate(),
    });
  });

  const orderDate = new Date();
  const orderMonth = orderDate.getMonth();
  const orderedDate = orderDate.getDate();

  const OrderTotalPriceAndDate = {
    totalOrderPrice: total_order,  
    DateOfOrder: orderedDate,
    orderedMonth: orderMonth
  };
  order.push(orderItems);
  order.push(OrderTotalPriceAndDate);

  localStorage.setItem('orders', JSON.stringify(order));
}

document.querySelector('.placeorder').addEventListener('click', () => {
  addedOrders();
  alert("your orders are placed");
});

}

renderCart();
