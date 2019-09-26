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
  currentScript.parentNode.children.forEach(node => {
    // image urls list
    if (node.classList.contains('wp-img-carousel-img-urls')) {
      props.imgUrls = JSON.parse(node.innerHTML);
    }
    // image captions list
    if (node.classList.contains('wp-img-carousel-img-captions')) {
      props.imgCaptions = JSON.parse(node.innerHTML);
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
    }
    // step forward button
    if (node.classList.contains('wp-img-carousel-left-arrow')) {
      props.rightArrowElement = node;
    }
    // image dots container
    if (node.classList.contains('wp-img-carousel-dots-container')) {
      props.imgDotElements = [];
      // image dots
      node.childNodes.forEach((value, key) => {
        props.imgDotElements.push(value);
        value.addEventListener('click', (e) => {
  
        });
      });
    }
  });
  console.log(props);
})();
