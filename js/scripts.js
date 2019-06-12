$(document).ready(function () {

    /****************************
     * Gallery
    *****************************/

    // define variables...
    var lightBox = document.querySelector('#light-box');
    var image = $('.image');
    var imageNumber;
    var current;
    var totalImages;

    // on clicking image display the light box and begin a slider for all images...
    $(image).click(displayLightBox);

    // function to display images slider inside light box...
    function displayLightBox() {
        lightBox.style.display = 'block';

        // insert images inside the light box...
        $('#image-set').find(image).each(function () {
            var $src = $(this).attr('src');
            $('#images-slider ul').append(
                '<li>' +
                '<img src="' + $src + '" >' +
                '</li>'
            );
        });

        imageNumber = image.index(this); // image index    
        totalImages = $('#images-slider ul > li').length; // total number of images inside images-slider...
        current = imageNumber;// set current to selected slide

        $('#images-slider ul > li').hide(); // hide all slide...
        $('#images-slider ul > li:eq(' + imageNumber + ')').show(); // show the selected image...

        //Click anywhere on the page to get rid of lightBox window
        $('#light-box').on('click', function () {
            $('#light-box').fadeOut(300);
        });

        // light box image slider navigation
        $('.slide-nav').click(lightBoxNavigation);
    }

    // function to display the next and previous image inside the slider
    function lightBoxNavigation(e) {

        e.preventDefault();//prevent default click event
        e.stopPropagation(); // prevent lightBox from closing

        var targetImage;

        // looking for previous image
        if ($(this).hasClass('prev')) {
            targetImage = current - 1;
            if (targetImage < 0) {
                targetImage = totalImages - 1;
            }
        } else { // look for next image
            targetImage = current + 1;
            if (targetImage > totalImages - 1) {
                targetImage = 0;
            }
        }

        // fadeOut current image, FadeIn next/prev image
        $('#images-slider ul > li:eq(' + current + ')').fadeOut(550);
        $('#images-slider ul > li:eq(' + targetImage + ')').fadeIn(550);

        // update current image
        current = targetImage;

    }//End Gallery

    /******************
      Load more button
    ******************/   
    $("#loadMore").click(loadMore);
    
    function loadMore(e){

        e.preventDefault();

        //Display the first six hidden images elements with a sliding motion.
        $(".hidden-img:hidden").slice(0, 6).slideDown(); 

        //if there are no hidden images hide the load more button
        if ($(".hidden-img:hidden").length == 0) {
            $("#loadMore").fadeOut('slow');
        }
        // scroll down to the new loaded images
        $('html,body').animate({
            scrollTop: $(this).offset().top - 100
        }, 1500);

    }


});