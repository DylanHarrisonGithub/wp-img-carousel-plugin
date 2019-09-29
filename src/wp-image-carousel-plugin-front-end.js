(function() {
  let scripts = document.getElementsByTagName('script');
  let currentScript = scripts[scripts.length - 1];
  let props = {
    imgUrls: null,
    imgCaptions: null,
    imgElement1: null,
    imgElement2: null,
    leftArrowElement: null,
    rightArrowElement: null,
    imgDotElements: null
  };
  function setImg(n) {
    if (props.imgElement1.classList.contains('wp-img-carousel-img-transparent')) {
      props.imgElement1.src = props.imgUrls[n % props.imgUrls.length];
    } else {
      props.imgElement2.src = props.imgUrls[n % props.imgUrls.length];
    }
    props.imgElement1.classList.toggle('wp-img-carousel-img-transparent');
    props.imgElement2.classList.toggle('wp-img-carousel-img-transparent');

    props.imgDotElements.forEach(dot => {
      dot.classList.remove('wp-img-carousel-dot-active');
    });
    props.imgDotElements[n % props.imgUrls.length].classList.add('wp-img-carousel-dot-active');
  }
  [ ... currentScript.parentNode.children].forEach(node => {
    // image urls list
    if (node.classList.contains('wp-img-carousel-img-urls')) {
      props.imgUrls = node.textContent.split(",");
    }
    // image captions list
    if (node.classList.contains('wp-img-carousel-img-captions')) {
      props.imgCaptions = node.textContent.split(",");
    }
    // html image elements
    if (node.classList.contains('wp-img-carousel-img')) {
      if (node.classList.contains('wp-img-carousel-img-transparent')) {
        // image element 2
        props.imgElement2 = node;
      } else {
        // image element 1
        props.imgElement1 = node;
      }
    }
    // step back button
    if (node.classList.contains('wp-img-carousel-left-arrow')) {
      props.leftArrowElement = node; 
      node.addEventListener('click', () => {
        if (props.imgElement1.classList.contains('wp-img-carousel-img-transparent')) {
          setImg(props.imgUrls.indexOf(props.imgElement2.src) + props.imgUrls.length -1);
        } else {
          setImg(props.imgUrls.indexOf(props.imgElement1.src) + props.imgUrls.length -1);
        }
      });
    }
    // step forward button
    if (node.classList.contains('wp-img-carousel-right-arrow')) {
      props.rightArrowElement = node;
      node.addEventListener('click', () => {
        if (props.imgElement1.classList.contains('wp-img-carousel-img-transparent')) {
          setImg(props.imgUrls.indexOf(props.imgElement2.src) + 1);
        } else {
          setImg(props.imgUrls.indexOf(props.imgElement1.src) + 1);
        }
      });
    }
    // image dots container
    if (node.classList.contains('wp-img-carousel-dots-container')) {
      props.imgDotElements = [];
      // image dots
      node.childNodes.forEach((value, key) => {
        props.imgDotElements.push(value);
        value.addEventListener('click', (e) => {
          setImg(key);
        });
      });
    }
  });
})();