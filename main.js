// User image 
const userImg = document.querySelector('#user-image');

// Filter elements 
const filterDiv = document.querySelector('.filters-container .grid');
const filterOptions = document.querySelectorAll('.filters-container .grid .button');
const grayscaleBtn = document.querySelector('#grayscale-btn');
const saturateBtn = document.querySelector('#saturate-btn');
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
let rotateValue = '0deg';

function handleFilterOptions(e){
  let children = e.target;
    filterStyle = children.value;
    filterOptions.forEach((e, i) => {
      if(e === children){
        e.classList.add("active");
      }
      else{
        e.classList.remove("active");
      }
    });
  // update range value 
  filterOptions.forEach((e, i) => {
    if (e.classList.contains('active')) {
      range.value = e.value;
      rangeDisplay.innerText = range.value + '%';
    }
  });
  
  changeUserImgStyles();
}

function handleRotateOptions(e){
  let children = e.target;
  if (children.matches('input')) {
    rotateValue = children.value;
    rotateOptions.forEach((e, i) => {
      if (e === children) {
        e.classList.add("active");
      } else {
        e.classList.remove("active");
      }
    });
  }
  changeUserImgStyles();
}

function updateFilterValues(){
  filterOptions.forEach((e, i) => {
    if (e.classList.contains('active')) {
      e.value = range.value;
    }
  });
}

// For changing user image styles
function changeUserImgStyles(){
  let newFilter = `grayscale(${grayscaleBtn.value}%)
                   contrast(${contrastBtn.value}%) 
                   saturate(${saturateBtn.value}) 
                   opacity(${opacityBtn.value}) 
                   blur(${blurBtn.value}px) 
                   brightness(${brightnessBtn.value}%)`;
                   
  let newAngle = rotateValue;
  userImg.style.filter = newFilter;
  userImg.style.rotate = newAngle;
}



// Upload image 
imgUploadLabel.addEventListener('click',() => {
  imgUploadInput.click();
});

imgUploadInput.addEventListener('click',uploadImg);

function uploadImg(){
  let imgSrc = imgUploadInput.files[0];
  userImg.src = URL.createObjectURL(imgSrc);
}

// Download Image 
downloadImg.addEventListener('click',downloadImage);

function downloadImage(){
  let imgSrc = userImg.src;
  downloadImg.href = URL.createObjectURL(imgSrc);
}

// Filter option event
filterDiv.addEventListener('click',handleFilterOptions);

// Rotate event listeners 
rotateDiv.addEventListener('click',handleRotateOptions);
// Range event 
range.addEventListener('change',() => {
  rangeDisplay.innerText = range.value + '%';
  updateFilterValues();
  changeUserImgStyles();
});


// Default 
window.addEventListener('load',() => {
  changeUserImgStyles();
  filterOptions[0].classList.add("active");
  rotateOptions[0].classList.add("active");
});