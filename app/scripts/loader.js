let overlayLoader = document.querySelector('.loader-overlay-wrapper');

function hideLoader() {
   overlayLoader.style.zIndex = -1;
}

function showLoader() {
   overlayLoader.style.zIndex = 100;
}