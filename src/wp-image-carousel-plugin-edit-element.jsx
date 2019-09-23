<div>
  {(props.attributes.imageUrls && props.attributes.imageUrls.length) && 
    <div class="wp-img-carousel-container">
      <img class={
          "wp-img-carousel-img" + (props.attributes._imgPairity ? " wp-img-carousel-img-transparent" : "")
        } src={props.attributes.imageUrls[props.attributes.img1Index]} />
      <img class={
          "wp-img-carousel-img" + (!(props.attributes._imgPairity) ? " wp-img-carousel-img-transparent" : "")
        } src={props.attributes.imageUrls[props.attributes.img2Index]} />
      <span id="wp-img-carousel-left-arrow" onClick={stepBack}>
        <span class="dashicons dashicons-arrow-left-alt2"></span>
      </span>
      <span id="wp-img-carousel-right-arrow" onClick={stepForward}>
        <span class="dashicons dashicons-arrow-right-alt2"></span>
      </span>
      <span id="wp-img-carousel-dots-container">
        {props.attributes.imageUrls.map((obj, i) => {
          return (<div class={"wp-img-carousel-dot" + (((i==props.attributes.img1Index && !props.attributes._imgPairity) || (i==props.attributes.img2Index && props.attributes._imgPairity))? " wp-img-carousel-dot-active" : "")} onClick={() => setIndex(i)}></div>);
        })}
      </span>
    </div>
  } 
  <button class="button aligncenter" onClick={openMediaModal}>Select Images</button>
</div>