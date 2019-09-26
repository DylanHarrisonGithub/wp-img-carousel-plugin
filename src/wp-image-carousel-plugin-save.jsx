<div>
  {(props.attributes.imageUrls && props.attributes.imageUrls.length) && 
    <div>
      <div class="wp-img-carousel-container" style={{
        "background-color": props.attributes.backgroundColor,
        "padding-top": props.attributes.aspectRatio
      }}>
        <div class="wp-img-carousel-img-urls">
          {JSON.stringify(props.attributes.imageUrls)}
        </div>
        <div class="wp-img-carousel-img-captions">
          {JSON.stringify(props.attributes.imgageCaptions)}
        </div>
        <img class="wp-img-carousel-img" src={props.attributes.imageUrls[0]} />
        <img class="wp-img-carousel-img wp-img-carousel-img-transparent" src={props.attributes.imageUrls[props.attributes.imageUrls.length-1]} />
        <span class="wp-img-carousel-left-arrow">
          <span class="dashicons dashicons-arrow-left-alt2"></span>
        </span>
        <span class="wp-img-carousel-right-arrow">
          <span class="dashicons dashicons-arrow-right-alt2"></span>
        </span>
        <span class="wp-img-carousel-dots-container">
          {props.attributes.imageUrls.map((obj, i) => {
            return (<div class={"wp-img-carousel-dot" + (((i==props.attributes.img1Index && !props.attributes._imgPairity) || (i==props.attributes.img2Index && props.attributes._imgPairity))? " wp-img-carousel-dot-active" : "")}></div>);
          })}
        </span>
        <script></script>
      </div>
    </div>
  }
</div>