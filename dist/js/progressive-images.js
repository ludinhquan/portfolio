const css = `
  picture{
    display: inline-block;
    position: relative;
    overflow: hidden;
    outline: none;
  }

  img {
    width: 100%;
    height: auto;
    border: 0 none;
    object-fit: cover;
  }

  img.reveal {
    position: absolute;
    top: 0;
    left: 0;
    will-change: opacity;
    animation: reveal 0.5s ease-out;
  }

  @keyframes reveal {
    0% {opacity: 0;}
    100% {opacity: 1;}
  }
`;

(function progressiveImage() {
  window.addEventListener("load", () => {
    addCss();
    let timeOut = null;
    const pictures = document.getElementsByTagName("picture");
    onPageChange();

    ["scroll"].forEach((event) => {
      window.addEventListener(event, onPageChange);
    });

    function onPageChange() {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        for (let i = 0; i < pictures.length; i++) {
          const image = pictures[i].children[pictures[i].children.length - 1];
          if (!image.dataset.loaded && isInView(image)) getImage(image);
        }
      }, 300);
    }
  });
})();

function isInView(img) {
  const rect = img.getBoundingClientRect();
  return rect.top + rect.height > 0 && rect.top < window.innerHeight;
}

function getImage(img) {
  const picture = img.parentNode;
  const newImage = new Image();
  newImage.src = img.dataset.src;

  newImage.classList.add("reveal");

  newImage.onload = () => {
    picture.insertBefore(newImage, img);
    newImage.dataset.loaded = true;
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
