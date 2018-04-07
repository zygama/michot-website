const sectionAbout = $("section #about");
const sectionContact = $("section #contact");

const buttonHome = $("#link-home")
const buttonAbout = $("#link-about");
const buttonRealisations = $("#link-realisations");
const buttonContact = $("#link-contact");
const downArrowIcon = $("#arrow-down-icon");

const headerHeight = 69; // the height of the header to substract in px (70 - 1)


const sleep = (p_ms) => {
    // let startTime = new Date().getTime();
    // while (new Date().getTime() < startTime + p_ms);

    return new Promise( (resolve) => {
        setTimeout(() => {
            resolve(true);
        }, p_ms);
    });
}

const onClickListeners = () => {
    buttonHome.click(function (e) {
        e.preventDefault(); // The default action of the event will not be triggered (link to #about)
        $("html, body").animate({ scrollTop: 0 }, "slow"); // Go to the top of the page
    });

    buttonAbout.click(function (e) {
        let sectionAboutPositionY = document.querySelector('section#about').offsetTop - headerHeight; // Getting Y of target element

        e.preventDefault(); // The default action of the event will not be triggered (link to #about)
        $("html, body").animate({ scrollTop: sectionAboutPositionY }, "slow");
    });

    buttonRealisations.click(function (e) {
        let sectionRealisationsPositionY = document.querySelector('section#realisations').offsetTop - headerHeight; // Getting Y of target element

        e.preventDefault(); // The default action of the event will not be triggered (link to #....)
        $("html, body").animate({ scrollTop: sectionRealisationsPositionY }, "slow");
    });

    buttonContact.click(function (e) {
        let sectionContactPositionY = document.querySelector('section#contact').offsetTop - headerHeight; // Getting Y of target element

        e.preventDefault(); // The default action of the event will not be triggered (link to #....)
        $("html, body").animate({ scrollTop: sectionContactPositionY }, "slow");
    });

    downArrowIcon.click(function (e) {
        console.log('ooo');
        
        let sectionAboutPositionY = document.querySelector('section#about').offsetTop - headerHeight; // Getting Y of target element

        e.preventDefault(); // The default action of the event will not be triggered (link to #about)
        $("html, body").animate({ scrollTop: sectionAboutPositionY }, "slow");
    });
}

const loadPicturesForSection = (p_placeOfPicture) => {
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
        success: (data) => {
            $("#fileNames").html('<ul>');
            // List all jpg file names in the page
            $(data).find( `a:contains(${fileExt})` )
                .each(function (index) {
                    let filename = this.href.replace(window.location.host, "").replace("http:///", "");
                    picturesFiles[p_placeOfPicture].push(filename);
                    
                    // add the image via background CSS using echoJS (for loading images)
                    picturesPlace.eq(index).attr("data-echo-background", filename); 

                    if (index >= 2) { // break after the 3 pictures are shown for the given place (kitchen, bathroom, etc..)
                        return false; // this is a break; of a each loop in jQuery
                    }
                });
            console.log(picturesFiles);
        }
    });
}

const manageModal = () => {
    
    let $modal = $('.modal'); // Get the modal
    let $imageZoomedInModal = $('.modal img'); // get the image to show zoomed in the modal
    
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    let $picturesToOpenInModal = $('.picture-realisation'); // get all pictures realisation of the section realisation
    let $closeModalButton = $('.modal span');
    
    $picturesToOpenInModal.on('click', function () {
        let pictureUrl = $(this).css("background-image"); // Get picture url from thumbnail CSS
        let indexBegginingRelativeUrl = pictureUrl.indexOf('/src'); // Get index of the beggining of the relative path via /src
        
        // Cut string Url to the well form (/src/.. .jpg)
        pictureUrl = pictureUrl.slice(indexBegginingRelativeUrl, pictureUrl.length).replace(`")`, ``);
        
        $modal.css('display', 'block'); // Show modal
        $imageZoomedInModal.attr('src', pictureUrl); // Set the picture URL in image's src attribute in modal
    });

    // When the user click on close icon, the modal close:
    $closeModalButton.click( async (event) => { 
        event.preventDefault();
        $imageZoomedInModal.css("animation", "zoom-out 0.6s forwards");
        await sleep(550); // sleep 0.6s as the length of the zoom in animation, then...
        $modal.css('display', 'none'); // Hide modal
        $imageZoomedInModal.css("animation", "zoom-in 0.6s forwards"); // Back to inital animation state
    });

}

const loadPicturesForAllSections = () => {
    loadPicturesForSection("kitchen");
    loadPicturesForSection("floor");
    loadPicturesForSection("terrace");
    loadPicturesForSection("bathroom");
}

onClickListeners();
loadPicturesForAllSections();
manageModal();




