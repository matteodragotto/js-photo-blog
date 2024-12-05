const endpoint = 'https://jsonplaceholder.typicode.com/photos?_limit=6'
const row = document.querySelector('.row')


axios.get(endpoint)
 .then (response => {
  console.log(response.data);  
  row.innerHTML = ''
  response.data.forEach(photo => printCard(photo))
 })





 function printCard(photo) {
  const {title, url} = photo
  console.log(title, url);
  
  row.innerHTML += `
  <div class="col-4">
          <div class="user-card">
            <img src="./assets/img/pin.svg" alt="pin" class="pin">
            <div class="image">
              <img src="${url}" alt="${url}">
            </div>
            <div class="text d-flex justify-content-start">
              <p>${title}</p>
            </div>
          </div>
        </div>    `
 }
