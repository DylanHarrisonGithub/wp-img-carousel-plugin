(function(blocks) {
  wp.blocks.registerBlockType('wp-image-carousel-plugin/wp-image-carousel-plugin', {
    title: 'Custom Image Carousel',
    icon: 'format-gallery',
    category: 'common',
    attributes: {
      img1Index: { default: [0] },
      img2Index: { default: [1] },
      imageUrls: {
        type: 'array',
        default: []
      },
      imageCaptions: {
        type: 'array',
        default: []
      },
      autoScroll: {
        type: 'boolean'
      },
      autoScrollTime: {
        type: 'number'
      },
      wpImageCarouselData: {
        type: 'object'
      }
    },
    edit: function(props) {
      function stepForward() {
        props.setAttributes({
          img1Index: [(props.attributes.img1Index[0] + 1) % props.attributes.imageUrls.length],
          img2Index: [(props.attributes.img2Index[0] + 1) % props.attributes.imageUrls.length]
        })
      }
      function stepBack() {
        props.setAttributes({
          img1Index: [(props.attributes.img1Index[0] + (props.attributes.imageUrls.length + 1)) % props.attributes.imageUrls.length],
          img2Index: [(props.attributes.img2Index[0] + (props.attributes.imageUrls.length + 1)) % props.attributes.imageUrls.length]
        })
      }
      function openMediaModal() {
        var frame = new wp.media.view.MediaFrame.Select({
          title: 'Select images for this gallery',
          multiple: true,
          library: {
            order: 'ASC',
            orderby: 'title',
            type: 'image',
            search: null,
            uploadedTo: null
          },
          button: {
            text: 'Accept'
          }
        });
        frame.on('select', () => {
          let ids = [];
          frame.state().get('selection').each(model => {
            console.log(model.attributes.url);
            ids.push(model.attributes.url);
          });
          props.setAttributes({
            imageUrls: ids,
            img1Index: [0],
            img2Index: [1],
          });
          console.log(props.attributes);
        });
        frame.open();
      }
      return React.createElement(
        "div",
        null,
        props.attributes.imageUrls &&
          props.attributes.imageUrls.length &&
          React.createElement(
            "div",
            {class: "wp-img-carousel-container-outer"},
            React.createElement(
              "div",
              {class: "wp-img-carousel-container" },
              React.createElement("img", {
                class: "wp-img-carousel-img",
                src: props.attributes.imageUrls[props.attributes.img1Index[0]]
              }),
              React.createElement("img", {
                class: "wp-img-carousel-img",
                src: props.attributes.imageUrls[props.attributes.img2Index[0]]
              }),
              React.createElement("span", {
                  id: "wp-img-carousel-left-arrow",
                  onClick: stepBack
                },
                React.createElement("span", {class:"dashicons dashicons-arrow-left-alt2"})
              ),
              React.createElement("span", {
                  id: "wp-img-carousel-right-arrow",
                  onClick: stepForward
                },
                React.createElement("span", {class:"dashicons dashicons-arrow-right-alt2"})
              )
            )
          ),
        React.createElement(
          "button",
          {
            class: "button aligncenter",
            onClick: openMediaModal
          },
          "Select Images"
        )
      );
    },
    save: function(props) { return null; }
  });
})(window.wp.blocks);