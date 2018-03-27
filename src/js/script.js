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

function load(p_placeOfPicture) {
    let fileExt = '.jpg';
    let picturesFiles = {
        "kitchen": [],
        "floor": [],
        "terrace": [],
        "bathroom": []
    };

    // picturesPlace will receive the three div which will contain pictures for a taled place (kitchen, bathroom, etc...)
    let picturesPlace = $(`.${p_placeOfPicture}-picture`);
    console.log(picturesPlace);
    
    $.ajax({
        // This will retrieve the contents of the folder if the folder is configured as 'browsable'
        url: `src/img/photos/${p_placeOfPicture}`,
        success: function (data) {
            $("#fileNames").html('<ul>');
            // List all jpg file names in the page
            $(data).find( `a:contains(${fileExt})` )
                .each(function (index) {
                    let filename = this.href.replace(window.location.host, "").replace("http:///", "");
                    picturesFiles[p_placeOfPicture].push(filename);
                    
                    // add the image via background CSS using echoJS (for loading images)
                    picturesPlace.eq(index).attr("data-echo-background", filename); 

                    if (index >= 2) { // break after the 3 pictures are shown for the given place (kitchen, bathroom, etc..)
                        return false; // this a break; of a each loop in jQuery
                    }
                });
            console.log(picturesFiles);
            
            
        }
    });
}

onClickListeners();
load("kitchen");
load("floor");
load("terrace");
load("bathroom");


