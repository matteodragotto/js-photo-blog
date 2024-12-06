const endpoint = 'https://jsonplaceholder.typicode.com/photos?_limit=144'
const row = document.querySelector('.row')
const overlay = document.querySelector('.overlay')
const overImage = document.querySelector('.over-image')
const btnClose = document.getElementById('close')
const userPhoto = document.querySelector('.user-photo')

btnClose.addEventListener('click', () => {
  overlay.classList.add('d-none')
  
})

/* Event Delegation alla row dato che aggiungiamo dinamicamente gli elementi */
row.addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('user-photo')) {
    overImage.innerHTML = ''
    overlay.classList.remove('d-none');
    overImage.innerHTML = `<img src="${event.target.src}" alt="${event.target.src}" class="user-photo">`
  }
});


let photoPerPage = 6;
let photoNumber = 0;


function loadCard () {
  axios.get(endpoint)
  .then (response => {
   console.log(response.data);  
   row.innerHTML = ''  
   response.data.forEach(photo => {
    if (photoNumber < photoPerPage) {
      printCard(photo)
      photoNumber++
    }
   })
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
}

function scrolling () {
    const scrollingPosition = window.innerHeight + window.scrollY;
    const loadPosition = document.body.offsetHeight - 30

    if (scrollingPosition >= loadPosition) {
      photoPerPage += 6
      photoNumber = 0
      loadCard()
    }
}

window.addEventListener('scroll', scrolling)



loadCard();

 
