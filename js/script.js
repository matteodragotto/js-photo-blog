const endpoint = 'https://jsonplaceholder.typicode.com/photos?_limit=6'
const row = document.querySelector('.row')
const overlay = document.querySelector('.overlay')
const btnClose = document.getElementById('close')
const userPhoto = document.querySelector('.user-photo')

btnClose.addEventListener('click', () => {
  overlay.classList.add('d-none')
  
})

row.addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('user-photo')) {
    overlay.classList.remove('d-none');
  }
});

axios.get(endpoint)
 .then (response => {
  console.log(response.data);  
  row.innerHTML = ''
  response.data.forEach(photo =>printCard(photo))
 })
 
 .catch (error => {
  console.log(error);
  
 })
 
 function printCard(photo) {
  const {title, url} = photo
  
  row.innerHTML += `
  <div class="col-lg-4 col-md-6 col-sm-12">
          <div class="user-card">
            <img src="./assets/img/pin.svg" alt="pin" class="pin">
            <div class="image">
              <img src="${url}" alt="${url}" class="user-photo">
            </div>
            <div class="text d-flex justify-content-start">
              <p>${titleFormatting(title)}</p>
            </div>
          </div>
        </div>   `
 }
 

 function titleFormatting (title) {
  let titleWords = title.split(" ")
  for (let i = 0; i < titleWords.length; i++) {
    titleWords[i] = titleWords[i][0].toUpperCase() + titleWords[i].substring(1).toLowerCase()
  }
  return titleWords.join(" ")
 }

 

 
