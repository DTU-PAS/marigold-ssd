window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE_NYU = "./static/images/nyu-1001";
var INTERP_BASE_KITTI = "./static/images/kitti";
var NUM_INTERP_FRAMES_NYU = 50;
var NUM_INTERP_FRAMES_KITTI = 50;

var interp_images_nyu = [];
var interp_images_kitti = [];

function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES_NYU; i++) {
    var path = INTERP_BASE_NYU + '/' + String(i).padStart(6, '0') + '.png';
    interp_images_nyu[i] = new Image();
    interp_images_nyu[i].src = path;
  }
}

function preloadInterpolationImagesKitti() {
  for (var i = 0; i < NUM_INTERP_FRAMES_KITTI; i++) {
    var path = INTERP_BASE_KITTI + '/' + String(i).padStart(6, '0') + '.png';
    interp_images_kitti[i] = new Image();
    interp_images_kitti[i].src = path;
  }
}

function setInterpolationImage(elem, images, i) {
  var image = images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $(elem).empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();
    
    $('#interpolation-slider-nyu').on('input', function(event) {
      setInterpolationImage('#interpolation-image-wrapper-nyu', interp_images_nyu, this.value);
    });

    setInterpolationImage('#interpolation-image-wrapper-nyu', interp_images_nyu, 0);
    $('#interpolation-slider-nyu').prop('max', NUM_INTERP_FRAMES_NYU - 1);

    preloadInterpolationImagesKitti();

    $('#interpolation-slider-kitti').on('input', function(event) {
      setInterpolationImage('#interpolation-image-wrapper-kitti', interp_images_kitti, this.value);
    });

    setInterpolationImage('#interpolation-image-wrapper-kitti', interp_images_kitti, 0);
    $('#interpolation-slider-kitti').prop('max', NUM_INTERP_FRAMES_KITTI - 1);

    bulmaSlider.attach();

})
