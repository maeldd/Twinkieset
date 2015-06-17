TwinkieSetApp.Views.PhotoItemModal = Backbone.View.extend({
  template: JST['public/06_photo_item_modal'],
  className: 'gallery-modal',

  initialize: function () {
    $('body').keydown(this.keyBinds.bind(this));
    this.rendering = false;
  },

  events: {
    'click .next-image': 'displayNextImage',
    'click .prev-image': 'displayPreviousImage',
    'click .close-gallery-modal': 'hideModal'
  },

  keyBinds: function (e) {
    if (e.keyCode === 27) {
      this.hideModal();
    }

    if (e.keyCode === 39) {
        this.displayNextImage();
    } else if (e.keyCode === 37) {
      this.displayPreviousImage();
    }
  },

  hideModal: function (event) {
    this.remove();
  },

  displayNextImage: function (event) {
    if (!this.rendering) {
      this.rendering = true;
      this.displayImage(1);
    }
  },

  displayPreviousImage: function (event) {
    if (!this.rendering) {
      this.rendering = true;
      this.displayImage(-1);
    }
  },

  displayImage: function (difference) {
    if (!this.rendering) {

    }
    // var difference = 0;
    // if (direction === "next") {
    //   difference = 1;
    // } else if (direction === "previous") {
    //   difference = -1;
    // }
    this.rendering = true;
    var currentImage = this.model;
    var nextImage = this.model;
    this.collection.forEach(function(photo, idx, allPhotos) {
      if (currentImage === photo) {
        var newIndex = idx + difference;

        // ensure photos wrap
        if (newIndex > allPhotos.length - 1) {
          newIndex = 0;
        } else if (newIndex < 0) {
          newIndex = allPhotos.length - 1;
        }
        nextImage = allPhotos[newIndex];

        console.log(newIndex);
        return;
      }
    });

    var photoItem = new TwinkieSetApp.Views.PhotoItem({
      model: nextImage, // initialize with a new model
      collection: this.collection
    });

    this.remove();
    this.$el.html("");
    photoItem.displayModal();
  },

  galleryImagePositioning: function () {
    var windowHeight = $(window).height();
    var imageHeight = windowHeight - 100;

    var windowWidth = $(window).width();
    var maxImageWidth = windowWidth - 100;

    this.$el.find('.active-image img').css('height', imageHeight);
    this.$el.find('.active-image img').css('max-width', maxImageWidth);
    // if ( this.$el.find('.active-image img').width() > maxImageWidth ) {
    //   this.$el.find('.active-image img').css('height', "auto");
    //   this.$el.find('.active-image img').css('width', maxImageWidth);
    // } else {
    //   this.$el.find('.active-image img').css('height', imageHeight);
    //   this.$el.find('.active-image img').css('width', 'auto');
    //   var marginTop = (windowHeight - this.$el.find('.active-image img').height())/2;
    //   debugger;
    //   this.$el.find('.active-image img').css('margin-top', marginTop);
    // }
  },

  render: function () {
    console.log('rendering');
    var content = this.template({
      photo: this.model
    });
    this.$el.html(content);

    this.galleryImagePositioning();

    $(window).resize(function () {
      this.galleryImagePositioning();
    }.bind(this));

    this.rendering = false;
    return this;
  }
});
