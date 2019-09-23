(function(blocks) {
  blocks.registerBlockType('wp-image-carousel-plugin/wp-image-carousel-plugin', {
    title: 'Custom Image Carousel',
    icon: 'format-gallery',
    category: 'common',
    attributes: {
      _imgPairity: { type: 'boolean', default: false },
      img1Index: { type: 'number', default: 0 },
      img2Index: { type: 'number', default: 1 },
      imageUrls: { type: 'array', default: [] },
      imageCaptions: { type: 'array', default: [] },
      autoScroll: { type: 'boolean' },
      autoScrollTime: { type: 'number'},
      backgroundColor: { type: 'string', default: '#ffffff' },
      aspectRatio: { type: 'string', default: '62.5%' }
    },
    edit: function(props) {

      let stepForward = (event) => {
        if (props.attributes.imageUrls.length > 1) {
          if (!props.attributes._imgPairity) {
            props.setAttributes({
              img2Index: (props.attributes.img1Index + 1) % props.attributes.imageUrls.length,
              _imgPairity: !props.attributes._imgPairity
            });
          } else {
            props.setAttributes({
              img1Index: (props.attributes.img2Index + 1) % props.attributes.imageUrls.length,
              _imgPairity: !props.attributes._imgPairity
            });
          }
        }
      }
      let stepBack = (event) => {
        if (props.attributes.imageUrls.length > 1) {
          if (!props.attributes._imgPairity) {
            props.setAttributes({
              img2Index: (props.attributes.img1Index + props.attributes.imageUrls.length - 1) % props.attributes.imageUrls.length,
              _imgPairity: !props.attributes._imgPairity
            });
          } else {
            props.setAttributes({
              img1Index: (props.attributes.img2Index + props.attributes.imageUrls.length - 1) % props.attributes.imageUrls.length,
              _imgPairity: !props.attributes._imgPairity
            });
          }
        }
      }
      let setIndex = (i) => {
        if (props.attributes.imageUrls.length > 1) {
          if (!((!props.attributes._imgPairity && props.attributes.img1Index === i) || (props.attributes._imgPairity && props.attributes.img2Index === i))) {
            if (!props.attributes._imgPairity) {
              props.setAttributes({
                img2Index: i,
                _imgPairity: !props.attributes._imgPairity
              });
            } else {
              props.setAttributes({
                img1Index: i,
                _imgPairity: !props.attributes._imgPairity
              });
            }
          }
        }
      }
      function updateBackgroundColor(value) {
        props.setAttributes({
          backgroundColor: value.hex
        });
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
            //console.log(model.attributes.url);
            ids.push(model.attributes.url);
          });
          props.setAttributes({
            imageUrls: ids,
            _imgPairity: false,
            img1Index: 0,
            img2Index: ids.length? ids.length-1 : 0,
          });
          //console.log(props.attributes);
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
            null,
            React.createElement(
              "div",
              {
                class: "wp-img-carousel-container",
                style: {
                  "background-color": props.attributes.backgroundColor,
                  "padding-top": props.attributes.aspectRatio
                }
              },
              React.createElement("img", {
                class:
                  "wp-img-carousel-img" +
                  (props.attributes._imgPairity
                    ? " wp-img-carousel-img-transparent"
                    : ""),
                src: props.attributes.imageUrls[props.attributes.img1Index]
              }),
              React.createElement("img", {
                class:
                  "wp-img-carousel-img" +
                  (!props.attributes._imgPairity
                    ? " wp-img-carousel-img-transparent"
                    : ""),
                src: props.attributes.imageUrls[props.attributes.img2Index]
              }),
              React.createElement(
                "span",
                {
                  id: "wp-img-carousel-left-arrow",
                  onClick: stepBack
                },
                React.createElement("span", {
                  class: "dashicons dashicons-arrow-left-alt2"
                })
              ),
              React.createElement(
                "span",
                {
                  id: "wp-img-carousel-right-arrow",
                  onClick: stepForward
                },
                React.createElement("span", {
                  class: "dashicons dashicons-arrow-right-alt2"
                })
              ),
              React.createElement(
                "span",
                {
                  id: "wp-img-carousel-dots-container"
                },
                props.attributes.imageUrls.map(function(obj, i) {
                  return React.createElement("div", {
                    class:
                      "wp-img-carousel-dot" +
                      ((i == props.attributes.img1Index &&
                        !props.attributes._imgPairity) ||
                      (i == props.attributes.img2Index &&
                        props.attributes._imgPairity)
                        ? " wp-img-carousel-dot-active"
                        : ""),
                    onClick: function onClick() {
                      return setIndex(i);
                    }
                  });
                })
              )
            ),
            React.createElement(
              "div",
              {
                id: "wp-img-carousel-control-panel"
              },
              React.createElement("h3", null, "Choose a background color"),
              React.createElement(wp.components.ColorPicker, {
                onChangeComplete: updateBackgroundColor,
                color: props.attributes.backgroundColor
              })
            )
          ),
        React.createElement(
          "button",
          {
            class: "wp-img-carousel-button",
            onClick: openMediaModal
          },
          "Select Images"
        )
      );
    },
    save: function(props) {
      let stepForward = (event) => {
        if (props.attributes.imageUrls.length > 1) {
          if (!props.attributes._imgPairity) {
            props.setAttributes({
              img2Index: (props.attributes.img1Index + 1) % props.attributes.imageUrls.length,
              _imgPairity: !props.attributes._imgPairity
            });
          } else {
            props.setAttributes({
              img1Index: (props.attributes.img2Index + 1) % props.attributes.imageUrls.length,
              _imgPairity: !props.attributes._imgPairity
            });
          }
        }
      }
      let stepBack = (event) => {
        if (props.attributes.imageUrls.length > 1) {
          if (!props.attributes._imgPairity) {
            props.setAttributes({
              img2Index: (props.attributes.img1Index + props.attributes.imageUrls.length - 1) % props.attributes.imageUrls.length,
              _imgPairity: !props.attributes._imgPairity
            });
          } else {
            props.setAttributes({
              img1Index: (props.attributes.img2Index + props.attributes.imageUrls.length - 1) % props.attributes.imageUrls.length,
              _imgPairity: !props.attributes._imgPairity
            });
          }
        }
      }
      let setIndex = (i) => {
        if (props.attributes.imageUrls.length > 1) {
          if (!((!props.attributes._imgPairity && props.attributes.img1Index === i) || (props.attributes._imgPairity && props.attributes.img2Index === i))) {
            if (!props.attributes._imgPairity) {
              props.setAttributes({
                img2Index: i,
                _imgPairity: !props.attributes._imgPairity
              });
            } else {
              props.setAttributes({
                img1Index: i,
                _imgPairity: !props.attributes._imgPairity
              });
            }
          }
        }
      }
      return React.createElement(
        "div",
        null,
        props.attributes.imageUrls &&
          props.attributes.imageUrls.length &&
          React.createElement(
            "div",
            {
              class: "wp-img-carousel-container",
              style: {
                "background-color": props.attributes.backgroundColor,
                "padding-top": props.attributes.aspectRatio
              }
            },
            React.createElement("img", {
              class:
                "wp-img-carousel-img" +
                (props.attributes._imgPairity
                  ? " wp-img-carousel-img-transparent"
                  : ""),
              src: props.attributes.imageUrls[props.attributes.img1Index]
            }),
            React.createElement("img", {
              class:
                "wp-img-carousel-img" +
                (!props.attributes._imgPairity
                  ? " wp-img-carousel-img-transparent"
                  : ""),
              src: props.attributes.imageUrls[props.attributes.img2Index]
            }),
            React.createElement(
              "span",
              {
                id: "wp-img-carousel-left-arrow",
                onClick: stepBack
              },
              React.createElement("span", {
                class: "dashicons dashicons-arrow-left-alt2"
              })
            ),
            React.createElement(
              "span",
              {
                id: "wp-img-carousel-right-arrow",
                onClick: stepForward
              },
              React.createElement("span", {
                class: "dashicons dashicons-arrow-right-alt2"
              })
            ),
            React.createElement(
              "span",
              {
                id: "wp-img-carousel-dots-container"
              },
              props.attributes.imageUrls.map(function(obj, i) {
                return React.createElement("div", {
                  class:
                    "wp-img-carousel-dot" +
                    ((i == props.attributes.img1Index &&
                      !props.attributes._imgPairity) ||
                    (i == props.attributes.img2Index && props.attributes._imgPairity)
                      ? " wp-img-carousel-dot-active"
                      : ""),
                  onClick: function onClick() {
                    return setIndex(i);
                  }
                });
              })
            )
          )
      );
    }
  });
})(window.wp.blocks);