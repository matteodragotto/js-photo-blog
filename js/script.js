const endpoint = 'https://jsonplaceholder.typicode.com/photos?_limit=144'
const row = document.querySelector('.row')
const overlay = document.querySelector('.overlay')
const overImage = document.querySelector('.over-image')
const btnClose = document.getElementById('close')
const userPhoto = document.querySelector('.user-photo')
const loader = document.querySelector('.loading')

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
  loader.classList.remove('d-none')
  axios.get(endpoint)
  .then (response => {
   console.log(response.data);  
   
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

  .finally(() => { loader.classList.add('d-none'); }); 
  
  function printCard(photo) {
   const {title, url} = photo

   const newCards = `
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
   </div>
   `
   
   row.insertAdjacentHTML ('afterbegin', newCards ) 
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
    const loadPosition = document.body.offsetHeight - 100
    
    loader.classList.remove('d-none')
    if (scrollingPosition >= loadPosition) {     
      setTimeout(() => { 
        photoPerPage += 6
        photoNumber = 0
        loadCard()
        loader.classList.add('d-none')
      }, 3000)
    }
    
}

window.addEventListener('scroll', scrolling)



loadCard();

 
