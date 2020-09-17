let blob;
const image = document.getElementById("image");
const photoInfo = document.getElementById("info");
let currentURL = "";

function getRandomSize (max) {
    //return String(Math.floor(Math.random() * 100.0) + max);
    return max;
}

function getRandomImageURL() {
    return "https://picsum.photos/" + getRandomSize(screen.width) + "/" + getRandomSize(screen.height);
}

function getSpecificImageURL(imageId) {
    return "https://picsum.photos/id/"+imageId+ "/" + getRandomSize(screen.width) + "/" + getRandomSize(screen.height);
}

function getImageInfoURL (id) {
    return "https://picsum.photos/id/" + id + "/info";
}

function loadSpecificImage(id) {
    loadImage(getSpecificImageURL(id));
}

function loadImage(url) {

    image.style.display = "none";
    photoInfo.style.display = "none";

    fetch(url)
        .then(response => {

            if(response.ok) {
                const picsumId = response.headers.get("picsum-id");
                //console.log("Picsum id", picsumId);
                getPhotoInfo(picsumId);
            }

            if(response.ok) {
                return response.blob();
            }
            else {
                alert("Unable to retrieve the image. Redirecting to another image. Error "+response.status);
                redirect(randomId());
                return null;
            }
        })
        .then(data => {

            if(data) {
                // Then create a local URL for that image
                blob = URL.createObjectURL(data);
                image.src = blob;
            }

        }).catch( e => console.error(e));
}

function getPhotoInfo(id) {
    fetch(getImageInfoURL(id))
        .then(response => {
            return response.json();
        })
        .then(info => {

            let values = "<p>" + info.author + "</p>";
            values += "<p><a href='" + info.url + "'>Photo Id " + info.id + "</a></p>";

            photoInfo.innerHTML = values;
        });
}

/**
 * Get the URL parameters
 * 
 * @param  {String} url The URL
 * 
 * @return {Object}     The URL parameters
 */
function getParams(url) {
    const params = {};

    const properURL = new URL(url);

    properURL.searchParams.forEach((value,key) => {params[key] = value;})

    return params;
};

function randomIntFromInterval (min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomId() {
    return randomIntFromInterval(0,1029);
}

function redirect(id) {
    const url = new URL(window.location.href);
    url.searchParams.delete("imageId");
    url.searchParams.append("imageId", id);
    const urlString = url.toString();

    console.log(urlString);

    window.location.href = urlString;
}

const pageURL = window.location.href;

console.log(pageURL);

const params = getParams(pageURL);

console.log(params);

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

// const events = [
//     "pagehide", "pageshow",
//     "unload", "load"
// ];

// const eventLogger = event => {
//     switch (event.type) {
//         case "pagehide":
//         case "pageshow":
//             let isPersisted = event.persisted ? "persisted" : "not persisted";
//             console.log('Event:', event.type, '-', isPersisted);
//             break;
//         default:
//             console.log('Event:', event.type);
//             break;
//     }
// };

// events.forEach(eventName =>
//     window.addEventListener(eventName, eventLogger)
// );

