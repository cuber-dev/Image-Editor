// User image 
const userImg = document.querySelector('#user-image');

// Options container 
const optionsContainer = document.querySelector('.options-container')
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
      rangeDisplay.innerText = range.value + '%';
    }
  });
  
  changeUserImgStyles();
}

function handleRotateOptions(e){
  let children = e.target;
  if (children.matches('button')) {
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
  changeUserImgStyles();
}

// For changing user image styles
function changeUserImgStyles(){
  let opacityValue = (opacityBtn.value / 100);
  let newFilter = `grayscale(${grayscaleBtn.value}%)
                   contrast(${contrastBtn.value}%) 
                   saturate(${saturateBtn.value}) 
                   opacity(${opacityValue}) 
                   blur(${blurBtn.value}px) 
                   brightness(${brightnessBtn.value}%)`;
                   
  let newAngle = rotateValue;
  userImg.style.filter = newFilter;
  userImg.style.rotate = newAngle;
  
  return { newFilter , newAngle };
}


// Filter option event
filterDiv.addEventListener('click',handleFilterOptions);

// Rotate event listeners 
rotateDiv.addEventListener('click',handleRotateOptions);
// Range event 
range.addEventListener('change',() => {
  rangeDisplay.innerText = range.value + '%';
  updateFilterValues();
});

resetBtn.addEventListener('click',(e) => {
  e.preventDefault();
  grayscaleBtn.value = 0;
  saturateBtn.value = 0;
  opacityBtn.value = 100;
  blurBtn.value = 0;
  contrastBtn.value = 100;
  brightnessBtn.value = 100;
  
  filterOptions.forEach((e, i) => {
      e.classList.remove("active");
  });
  rotateOptions.forEach((e, i) => {
      e.classList.remove("active");
  });
  
  filterOptions[0].click();
  rotateOptions[0].click();
  
  updateFilterValues();
});



function uploadImg(){
  let imgSrc = imgUploadInput.files[0];
  if(!imgSrc) return '';
  userImg.src = URL.createObjectURL(imgSrc);
  optionsContainer.classList.remove('disabled');
  downloadImg.classList.remove('disabled');
  
  document.remove('canvas');
}

async function downloadImage(){
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  canvas.width = userImg.naturalWidth;
  canvas.height = userImg.naturalHeight;
  
  let { newFilter , newAngle } = changeUserImgStyles();
  context.filter = newFilter;
  context.rotate(newAngle);
  
  context.translate(canvas.width / 2 , canvas.height / 2);
  context.drawImage(userImg,-canvas.width / 2, -canvas.height / 2, canvas.width ,canvas.height);

  document.body.appendChild(canvas);
  canvas.style.display = 'none';
 
  downloadImg.download = `${userImg.src}01.jpg`;
  downloadImg.href = canvas.toDataURL();
  
}

// Upload image 
imgUploadLabel.addEventListener('click', () => {
  imgUploadInput.click();
});

imgUploadInput.addEventListener('click',uploadImg);

// Download Image 
downloadImg.addEventListener('click',downloadImage);


// Default 
window.addEventListener('load',() => {
  filterOptions[0].click();
  rotateOptions[0].click();
});