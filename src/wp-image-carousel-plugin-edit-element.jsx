<div>
  {(props.attributes.imageUrls && props.attributes.imageUrls.length) && 
    <div>
      <div class="wp-img-carousel-container" style={{
        "background-color": props.attributes.backgroundColor,
        "padding-top": props.attributes.aspectRatio
      }}>
        <img class={
            "wp-img-carousel-img" + (props.attributes._imgPairity ? " wp-img-carousel-img-transparent" : "")
          } src={props.attributes.imageUrls[props.attributes.img1Index]} />
        <img class={
            "wp-img-carousel-img" + (!(props.attributes._imgPairity) ? " wp-img-carousel-img-transparent" : "")
          } src={props.attributes.imageUrls[props.attributes.img2Index]} />
        <span class="wp-img-carousel-left-arrow" onClick={stepBack}>
          <span class="dashicons dashicons-arrow-left-alt2"></span>
        </span>
        <span class="wp-img-carousel-right-arrow" onClick={stepForward}>
          <span class="dashicons dashicons-arrow-right-alt2"></span>
        </span>
        <span class="wp-img-carousel-dots-container">
          {props.attributes.imageUrls.map((obj, i) => {
            return (<div class={"wp-img-carousel-dot" + (((i==props.attributes.img1Index && !props.attributes._imgPairity) || (i==props.attributes.img2Index && props.attributes._imgPairity))? " wp-img-carousel-dot-active" : "")} onClick={() => setIndex(i)}></div>);
          })}
        </span>
      </div>
      <div class="wp-img-carousel-control-panel">
        <h3>Choose a background color</h3>
        <wp.components.ColorPicker onChangeComplete={updateBackgroundColor} color={props.attributes.backgroundColor}/> 
      </div>
    </div>
  }
  <button class="wp-img-carousel-button" onClick={openMediaModal}>Select Images</button>
</div>