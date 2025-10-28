function renderTrack(){
const trackPakages= JSON.parse(localStorage.getItem('trackvalue'));
const dayOfTheWeek = JSON.parse(localStorage.getItem('day_of_the_week'));
const { day, month, name1, quantity, image} = trackPakages;
const track = `<h1> Arriving on ${dayOfTheWeek}, ${month}  ${day}</h1>
  <p class="name1">  ${name1}<br>
Quantity: ${quantity}</p>
  <img class="product-image" src="${image}">
  <div class="progress-labels-container ">
  <p class="paragraph1">preparing</p>
  <p class="paragraph2">shipped</p>
  <p class="paragraph3">Delivered</p>`
 document.querySelector('.tracking1').innerHTML = track;
 let number_of_item = JSON.parse(localStorage.getItem('Itemcount')) || 0;
document.querySelector('.cart').innerHTML = `${number_of_item} Cart`;
}
  renderTrack();
 