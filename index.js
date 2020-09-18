let blobURL;

const image = document.getElementById("image");

const photoInfo = document.getElementById("info");

let currentURL = "";

function getRandomSize (max) {
    //return String(Math.floor(Math.random() * 100.0) + max);
    return max;
}

function getRandomImageURL () {
    return "https://picsum.photos/" + window.innerWidth + "/" + window.innerHeight;
}

function getSpecificImageURL (imageId, width, height) {
    return "https://picsum.photos/id/" + imageId + "/" + width + "/" + height;
}

function getImageInfoURL (id) {
    return "https://picsum.photos/id/" + id + "/info";
}

function errorPopup(response) {
    stopProgress();
    alert("Unable to retrieve the image. Error " + response.status);
}

function startProgress() {
    document.body.style.backgroundImage = "url(loading.gif)"
}

function stopProgress() {
    document.body.style.backgroundImage = "url()"
}

async function loadSpecificImage (id) {

    try {

        startProgress();

        const response = await fetch(getImageInfoURL(id));

        if (response && response.ok) {
            const imgInfo = await response.json();

            if (imgInfo) {
                loadImage(id, imgInfo);
            }
        }
        else {
            errorPopup(response);

            return null;
        }
    }
    catch (err) {
        console.log(err);
        stopProgress();
    }
}

function loadImage (id, imgInfo) {

    const url = getSpecificImageURL(id, imgInfo.width, imgInfo.height);

    image.style.display = "none";
    photoInfo.style.display = "none";

    fetch(url)
        .then(response => {

            //console.log(response);

            if (response.ok) {
                return response.blob();
            }
            else {
                errorPopup(response);

                return null;
            }
        })
        .then(blob => {

            if (blob) {

                if (blobURL) {
                    URL.revokeObjectURL(blobURL);
                }

                // Then create a local URL for that image
                blobURL = URL.createObjectURL(blob);
                image.src = blobURL;

                setPhotoInfo(imgInfo);

            }

            stopProgress();

        }).catch(e => console.error(e));
}

function setPhotoInfo (info) {

    let values = "<p><a href='" + info.url + "'>" + info.author + "</a></p>";

    values += "<p>Photo Id " + info.id + "</p>";

    if (blobURL) {
        values += "<p><a download='" + info.author + info.id + ".jpg' href='" + blobURL + "'>" + "Download" + "</a></p>";
    }

    photoInfo.innerHTML = values;
}

/**
 * Get the URL parameters
 * 
 * @param  {String} url The URL
 * 
 * @return {Object}     The URL parameters
 */
function getParams (url) {
    const params = {};

    const properURL = new URL(url);

    properURL.searchParams.forEach((value, key) => { params[ key ] = value; });

    return params;
};

function randomIntFromInterval (min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomId () {
    return randomIntFromInterval(0, 1029);
}

function redirect (id) {
    const url = new URL(window.location.href);
    url.searchParams.delete("imageId");
    url.searchParams.append("imageId", id);
    const urlString = url.toString();

    //console.log(urlString);

    window.location.href = urlString;
}

const pageURL = window.location.href;

//console.log(pageURL);

const params = getParams(pageURL);

//console.log(params);

if (!params.imageId) {

    redirect(randomId());

} else {
    loadSpecificImage(params.imageId);
}

image.onclick = function () {
    if (image) {
        //console.log("Clicked");
        redirect(randomId());
    }
};

image.onloadstart = function () {
    //console.log("Load started");
};

image.onload = function () {
    image.style.display = "block";
    photoInfo.style.display = "block";
    //console.log("Loaded");
};

