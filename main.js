// User image 
const userImgContainer = document.querySelector('.image-container');
const userImg = document.querySelector('#user-image');

// Options container 
const optionsContainer = document.querySelector('.options-container')
// Filter elements 
const filterDiv = document.querySelector('.filters-container .grid');
const filterOptions = document.querySelectorAll('.filters-container .grid .button');
const grayscaleBtn = document.querySelector('#grayscale-btn');
const saturateBtn = document.querySelector('#saturate-btn');
const inversionBtn = document.querySelector('#inversion-btn');
const sepiaBtn = document.querySelector('#sepia-btn');
const opacityBtn = document.querySelector('#opacity-btn');
const blurBtn = document.querySelector('#blur-btn');
const contrastBtn = document.querySelector('#contrast-btn');
const brightnessBtn = document.querySelector('#brightness-btn');

const rangeDisplay = document.querySelector('#range-value-display');
const range = document.querySelector('#value-range');

// Rotation elements 
const rotateDiv = document.querySelector('.rotate-container .grid');
const rotateOptions = document.querySelectorAll('.rotate-container .grid .button');

//Reset btn
const resetBtn = document.querySelector('#reset-btn');

// Upload image 
const imgUploadLabel = document.querySelector('#image-input-label');
const imgUploadInput = document.querySelector('#image-input');

// Download image 
const downloadImg = document.querySelector('#download-link');

// Global value
let rotateValue = 0,flipX = 1,flipY = 1;

function handleFilterOptions(e){
  let children = e.target;
    if(children.matches('button')){
      filterOptions.forEach((e, i) => {
        if(e === children){
          e.classList.add("active");
        }
        else{
          e.classList.remove("active");
        }
      });
    }

  // update range value 
  filterOptions.forEach((e, i) => {
    if(e.classList.contains('active')) {
      range.value = e.value;
      rangeDisplay.innerText = `${e.innerText} - ${range.value}%`;
    }
  });
  
  updateUserImgStyles();
}

function handleRotateOptions(e){
  let children = e.target;
  if(children.id === "left-rotate"){
    rotateValue -= 90;
  }else if(children.id === "right-rotate"){
    rotateValue += 90;
  }else if(children.id === "flip-x"){
    flipX = flipX === 1 ? -1 : 1 ;
  }else if(children.id === "flip-y"){
    flipY = flipY === 1 ? -1 : 1 ;
  }

  updateUserImgStyles();
}

function updateFilterValues(){
  filterOptions.forEach((e, i) => {
    if (e.classList.contains('active')) {
      e.value = range.value;
      rangeDisplay.innerText = `${e.innerText} - ${range.value}%`;
    }
  });
  updateUserImgStyles();
}

function resetStyles(e){
  e.preventDefault();
  grayscaleBtn.value = 0;
  saturateBtn.value = 100;
  inversionBtn.value = 0;
  sepiaBtn.value = 0;
  opacityBtn.value = 100;
  blurBtn.value = 0;
  contrastBtn.value = 100;
  brightnessBtn.value = 100;
  

  rotateValue = 0,flipX = 1,flipY = 1;

  filterOptions.forEach((e, i) => {
      e.classList.remove("active");
  });

  filterOptions[0].click();
  updateFilterValues();
  updateUserImgStyles();
}

// For changing user image styles
function updateUserImgStyles(){
  let newFilter = `contrast(${contrastBtn.value}%) 
                   saturate(${saturateBtn.value / 100}) 
                   invert(${inversionBtn.value / 100})
                   sepia(${sepiaBtn.value / 100})
                   opacity(${opacityBtn.value / 100}) 
                   blur(${blurBtn.value}px) 
                   brightness(${brightnessBtn.value}%)
                   grayscale(${grayscaleBtn.value}%)`; 
                   
  let newTransform = `rotate(${rotateValue}deg) scale(${flipX},${flipY})`;
  userImg.style.filter = newFilter;
  userImg.style.transform = newTransform;

  return newFilter ;
}


// Filter option event
filterDiv.addEventListener('click',handleFilterOptions);

// Rotate event listeners 
rotateDiv.addEventListener('click',handleRotateOptions);
// Range event 
range.addEventListener('change',updateFilterValues);

resetBtn.addEventListener('click',resetStyles);



function uploadImage(){
  let imgSrc = imgUploadInput.files[0];
  if(!imgSrc) return '';

  userImg.src = URL.createObjectURL(imgSrc);
  
  userImg.addEventListener('load',() => {
    userImg.classList.add('loaded');
    userImgContainer.style.backgroundImage = 'none';
    optionsContainer.classList.remove('disabled');
    downloadImg.classList.remove('disabled');
  });
  
}

function downloadImage(){
  
  if (document.querySelector('body canvas')) {
    const canvasElement = document.querySelector('body canvas');
    document.body.removeChild(canvasElement);
  }

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  canvas.width = userImg.naturalWidth;
  canvas.height = userImg.naturalHeight;
  
  let newFilter  = updateUserImgStyles();
  context.filter = newFilter;
  context.translate(canvas.width / 2 , canvas.height / 2);
  if(rotateValue !== 0){
    context.rotate(rotateValue * Math.PI / 180);
  }
  context.scale(flipX,flipY);
  
  context.drawImage(userImg,-canvas.width / 2, -canvas.height / 2, canvas.width ,canvas.height);

  document.body.appendChild(canvas);
  canvas.style.display = 'none';
 
  downloadImg.href = canvas.toDataURL();
  downloadImg.download = 'image.jpg';
}

// Upload image 
imgUploadLabel.addEventListener('click',() => {
  imgUploadInput.click();
});

imgUploadInput.addEventListener('click',uploadImage);

// Download Image 
downloadImg.addEventListener('click',downloadImage);


// Default 
window.addEventListener('load',() => {
  filterOptions[0].click();
});