var sectionAbout = $("section #about");
var sectionRealisations = $("section #realisations");
var sectionContact = $("section #contact");

var buttonHome = $("#link-home")
var buttonAbout = $("#link-about");
var buttonRealisations = $("#link-realisations");
var buttonContact = $("#link-contact");
var downArrowIcon = $("#arrow-down-icon");

var headerHeight = 69; // the height of the header to substract in px


function onClickListeners() {
    buttonHome.click(function (e) {
        e.preventDefault(); // The default action of the event will not be triggered (link to #about)
        $("html, body").animate({ scrollTop: 0 }, "slow"); // Go to the top of the page
    });

    buttonAbout.click(function (e) {
        let sectionAboutPositionY = document.querySelector('section#about').offsetTop - headerHeight; //Getting Y of target element

        e.preventDefault(); // The default action of the event will not be triggered (link to #about)
        $("html, body").animate({ scrollTop: sectionAboutPositionY }, "slow");
    });

    buttonRealisations.click(function (e) {
        let sectionRealisationsPositionY = document.querySelector('section#realisations').offsetTop - headerHeight; //Getting Y of target element

        e.preventDefault(); // The default action of the event will not be triggered (link to #....)
        $("html, body").animate({ scrollTop: sectionRealisationsPositionY }, "slow");
    });

    buttonContact.click(function (e) {
        let sectionContactPositionY = document.querySelector('section#contact').offsetTop - headerHeight; //Getting Y of target element

        e.preventDefault(); // The default action of the event will not be triggered (link to #....)
        $("html, body").animate({ scrollTop: sectionContactPositionY }, "slow");
    });

    downArrowIcon.click(function (e) {
        console.log('ooo');
        
        let sectionAboutPositionY = document.querySelector('section#about').offsetTop - headerHeight; //Getting Y of target element

        e.preventDefault(); // The default action of the event will not be triggered (link to #about)
        $("html, body").animate({ scrollTop: sectionAboutPositionY }, "slow");
    });
}

onClickListeners();



