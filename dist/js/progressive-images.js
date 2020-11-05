const css = `
  .img-wrapper{
    position: relative;
    display: block;
    overflow: hidden;
    outline: none;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    border: 0 none;
    object-fit: cover;
  }

  img.reveal {
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform, opacity;
    animation: reveal 0.5s ease-out;
  }

  @keyframes reveal {
    0% {transform: scale(1.05); opacity: 0;}
    100% {transform: scale(1); opacity: 1;}
  }
`;

(function progressiveImage() {
  window.addEventListener("load", () => {
    addCss();
    const images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
      updateImgSrc(images[i]);
    }
  });
})();

function updateImgSrc(img) {
  const imgWrapper = img.parentNode;
  const newImage = new Image();
  newImage.src = img.dataset.src;

  newImage.className = "reveal";
  imgWrapper.classList.add("img-wrapper");
  newImage.onload = () => {
    imgWrapper.insertBefore(newImage, img);
    newImage.onanimationend = () => {
      img.remove();
      newImage.className = "";
    };
  };
}

function addCss() {
  const style = document.createElement("style");
  const head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(style);

  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
