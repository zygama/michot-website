const sectionAbout = $("section #about");
const sectionContact = $("section #contact");

const buttonHome = $("#link-home");
const buttonAbout = $("#link-about");
const buttonRealisations = $("#link-realisations");
const buttonContact = $("#link-contact");
const downArrowIcon = $("#arrow-down-icon");

const headerHeight = 69; // the height of the header to substract in px (70 - 1)

let realisationsPlace = window.location.pathname; // Returns path of the html page (eg. /cuisines.html)
realisationsPlace = realisationsPlace.slice(1).replace(".html", ""); // /cuisines.html -> cuisines 


const sleep = (p_ms) => {
    return new Promise( (resolve) => {
        setTimeout( () => {
            resolve(true);
        }, p_ms);
    });
}

const onClickListeners = () => {

    buttonAbout.click(function (e) {
        e.preventDefault();
        location.href='/#about';
    });

    buttonRealisations.click(function (e) {
        e.preventDefault();
        location.href = '/#realisations';
    });

    buttonContact.click(function (e) {
        e.preventDefault();
        location.href = '/#contact';
    });

    downArrowIcon.click(function (e) {
        console.log('ooo');
        
        let sectionAboutPositionY = document.querySelector('section#about').offsetTop - headerHeight; // Getting Y of target element

        e.preventDefault(); // The default action of the event will not be triggered (link to #about)
        $("html, body").animate({ scrollTop: sectionAboutPositionY }, "slow");
    });
}

const loadPageTitle = () => {
    const titlePage = $('.photos-realisations h1');

    titlePage.text(`Nos réalisations de ${realisationsPlace}`); // set the value of h1
    console.log(titlePage);
    
}

const loadPictures = () => {
    /**
     * Generic function that will be called for each realisation pictures place (eg. bathroom, kitchen, etc...)
     */
    let fileExt = '.jpg';
    let picturesFiles = {
        "cuisines": [],
        "sols": [],
        "terrasses": [],
        "salles-de-bain": []
    };
    // picturesPlace will receive the three div which will contain pictures for a taled place (kitchen, bathroom, etc...)
    let picturesPlace = $(`.${realisationsPlace}-picture`);

    let $picturesContainer = $('.photos-realisations .pictures-container.row');

    
    $.ajax({
        // This will retrieve the contents of the folder if the folder is configured as 'browsable'
        url: `src/img/photos/${realisationsPlace}`,
        success: (data) => {
            // List all jpg file names in the page
            $(data).find( `a:contains(${fileExt})` )
                .each(function (index) {
                    let filepath = "../" + this.href.replace(window.location.host, "").replace("http:///", "");
                    picturesFiles[realisationsPlace].push(filepath);
                    $picturesContainer.append(`<div class="col-lg-4 col-sm-6"><div class="picture-realisation" data-echo-placeholder="./src/img/loading-placeholder.gif" style="background-image: url('${filepath}');"></div></div>`);
                    
                    // add the image via background CSS using echoJS (for loading images)
                    picturesPlace.eq(index).attr("data-echo-background", filepath);
                    // TODO: mettre div avec data-echo-background ici

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

    console.log($picturesToOpenInModal);
    
    
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

onClickListeners();
loadPageTitle();
loadPictures();

$(window).on("load", function () {
    manageModal(); // Have to wait that JS load all element before listening on them to open in modal
});





