/*! fillsize (c) 2012, Rico Sta. Cruz. MIT License.
 *  http://github.com/rstacruz/jquery-stuff/tree/master/fillsize */

// Makes an element fill up its container.
//
//     $(".container").fillsize("> img");
//
// This binds a listener on window resizing to automatically scale down the
// child (`> img` in this example) just so that enough of it will be visible in
// the viewport of the container.
// 
// This assumes that the container has `position: relative` (or any 'position',
// really), and `overflow: hidden`.

(function($) {
  $.fn.fillsize = function(selector) {
    var $parent = this;
    var $img;

    function resize() {
      if (!$img) $img = $parent.find(selector);

      var imageRatio     = $img.width() / $img.height();
      var containerRatio = $parent.width() / $parent.height();

      // If image is wider than the container
      if (imageRatio > containerRatio) {
        $img.css({
          'position': 'absolute',
          'left': Math.round(($parent.width() - imageRatio * $parent.height()) / 2) + 'px',
          'top': '0',
          'right': 'auto',
          'bottom': 'auto',
          'width': 'auto',
          'height': '100%'
        });
      }

      // If the container is wider than the image
      else {
        $img.css({
          'position': 'absolute',
          'top': Math.round(($parent.height() - ($parent.width() / $img.width() * $img.height())) / 2) + 'px',
          'left': '0',
          'right': 'auto',
          'bottom': 'auto',
          'height': 'auto',
          'width': '100%'
        });
      }
    }

    // Make it happen on window resize.
    $(window).on('resize', resize);

    // If the child is an image, fill it up when image's real dimensions are
    // first determined.
    $(selector, $parent).on('load', function() {
      setTimeout(resize, 25);
    });

    // Allow manual invocation by doing `.trigger('fillsize')` on the container.
    $parent.on('fillsize', resize);

    // Resize on first load.
    $(resize);

    return this;
  };
})(jQuery);
