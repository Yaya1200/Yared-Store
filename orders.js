function renderOrder() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  console.log(orders);
  const totalItems = orders[0];
  const dateAndPrice = orders[1];

  const dates = dateAndPrice.DateOfOrder;
  const monthNumber = dateAndPrice.orderedMonth; 
  const totalprice = dateAndPrice.totalOrderPrice;

  let addedOrders = '';

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const datesAndTotalPrice = `
    <div class="order-inside">
      <p>Order Placed:<br>
        ${months[monthNumber]} ${dates}</p>
      <p>Total:<br>
        $${totalprice}</p>
      <p>Order ID:<br>
        27cba69d-4c3d-4098-b42d-ac7fa62b7664</p>
    </div>`;

  totalItems.forEach((item) => {
    addedOrders += `
      <div class="orders-other">
        <div class="image-container">
          <img src="${item.ItemsImage}" alt="Product Image">
        </div>
        <div class="text-container">
          <p>
            ${item.ItemsName}<br>
            Arriving on: August 19<br>
            Quantity: ${item.ItemsQuantity}
          </p>
        </div>
        <div">
          <button class="buy-button"
          data-day="${dates}" 
          data-month = "${months[monthNumber]}"
          data-name="${item.ItemsName}" 
          data-quantity="${item.ItemsQuantity}" 
          data-image="${item.ItemsImage}"
          >Track Pakage</button>
        </div>
      </div>`;
  });

  const outputElement = document.querySelector('.order-outside');
  outputElement.innerHTML = datesAndTotalPrice + addedOrders;

const values = document.querySelectorAll('.buy-button');
values.forEach((value)=>{
value.addEventListener('click', ()=>{
  let trackValues = {
    day : value.getAttribute('data-day'),
    month: value.getAttribute('data-month'),
    name1 : value.getAttribute('data-name'),
    quantity : value.getAttribute('data-quantity'),
    image: value.getAttribute('data-image')
  }
  localStorage.setItem('trackvalue', JSON.stringify(trackValues));
  window.location.href = "tracking.html";
})
}
)

}
numberOfItem = JSON.parse(localStorage.getItem('Itemcount'));
document.querySelector('.cart').innerHTML = `${numberOfItem} Cart`;


renderOrder();
