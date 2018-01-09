var width = $(window).width();
var height = $(window).height();
var lastScrollVal = 0;
var debounce = false;
if (width<=640) {
    //mobile screen
    $(document).on('scroll', function() {
        var scrollVal = $(this).scrollTop();
        if(scrollVal > lastScrollVal && debounce == false) {
            debounce = true;
            lastScrollVal += height;
            $("html").animate({
                scrollTop: height
            }, 500, function() {
                debounce = false;
            });
        } else if(scrollVal < lastScrollVal && debounce == false) {
            debounce = true;
            lastScrollVal -= height;
            $("html").animate({
                scrollTop: -height
            }, 500, function() {
                debounce = false;
            });   
        }
    });
} else {
    //desktop screen
}