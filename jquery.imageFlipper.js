/*! imageFlipper - a jquery plugin
 * really preliminary
 * Copyright (c) 2014 Antti Stenvall; Licensed MIT */

(function($, undefined) {


  $.fn.imageFlipper = function(images, opts) {
    var obj = new imageFlipper(this, images, opts);
    $(this).data('imageFlipperObj', obj);
  };

  // If no element is supplied, we'll attach to body
  $.imageFlipper = function(images, opts) {
    $('body').imageFlipper(images, opts);
  }

  // Class definition
  var imageFlipper = function(container, images, opts) {

    this.images = [];
    this.container = container;
    this.visible = null;

    if (arguments.length < 3 || opts === undefined) {
      opts = {};
    }

    // default parameters
    if (!'path' in opts) {
      opts.path = '';
    }

    for (var k = 0; k < images.length; k++) {
      var img = document.createElement('img');
      $(img).attr('src', opts.path + images[k])
              .css({visibility: 'hidden',
                position: 'absolute'
              });
      if ('imageCss' in opts) {
        opts.imageCss(img, k);
      }
      //console.log(img);
      $(img).appendTo(this.container);
      this.images.push(img);
    }
    // save data
    $(this.container).data('imageFlipper', this.images);
    setMouseMoves(this, images, opts);
  }

  function setMouseMoves(that, images, opts) {
    var w = parseInt($(that.container).width());    
    $(that.container).mousemove(function(e) {
      var x = e.pageX - this.offsetLeft;
      var y = e.pageY - this.offsetTop;
      var num = Math.ceil(x / w * (images.length)) - 1;
      if (num < 0) {
        num = 0;
      }
      if (num >= images.length) {
        num = images.length - 1;
      }
      if ('onChange' in opts) {
        // give to be shown (based on computation of numbers), hidden, index of new, x coordinate, y coordinate
        that.visible = opts.onChange(that.images[num], that.visible, num, x, y);
      }
      else {
        if (that.visible !== null) {
          $(that.visible).css({'visibility': 'hidden'});
        }
        $(that.images[num]).css({'visibility': 'visible'});
        that.visible = that.images[num];
      }
    });
  }

}(jQuery));