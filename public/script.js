let line=document.querySelector('.lines');
let navcontainer=document.querySelector('.navcontainer');

let nav=document.querySelector('.nav');
let opac=document.querySelector('.opac');
   

  






line.addEventListener('click',(e)=>{


navcontainer.classList.add('sidenav')

nav.style.opacity='0.4';
opac.style.opacity='0.4';
navcontainer.style.opacity='1';

})

navcontainer.addEventListener('click',(e)=>{
    navcontainer.classList.remove('sidenav')
    navcontainer.classList.add('sidenav2')
    nav.style.opacity='1'
    opac.style.opacity='1'
})
