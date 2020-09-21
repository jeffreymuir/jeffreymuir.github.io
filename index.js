let blobURL;

const image = document.getElementById("image");

const photoInfo = document.getElementById("info");

loadList();

function errorPopup (response) {
    stopProgress();
    alert("Unable to retrieve the image. Error " + response.status);
}

function startProgress () {
    console.log("starting progress")
    document.body.style.backgroundImage = "url(loading.gif)";
}

function stopProgress () {
    console.log("stopping progress")
    document.body.style.backgroundImage = "url()";
}

function loadImage (id, imgInfo) {

    startProgress();

    const url = imgInfo.download_url;

    image.style.display = "none";
    photoInfo.style.display = "none";

    fetch(url)
        .then(response => {

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

                sessionStorage.setItem("imageId", `${id}`);
            }

            stopProgress();

        }).catch(e => {
            console.error(e)
            stopProgress();
        });

}

function setPhotoInfo (info) {

    let values = "<p><a href='" + info.url + "'>" + info.author + "</a></p>";

    values += "<p>Photo Id " + info.id + "</p>";

    if (blobURL) {
        values += "<p><a download='" + info.author + info.id + ".jpg' href='" + blobURL + "'>" + "Download" + "</a></p>";
    }

    values += `<button onclick="nextPhoto()">Next</button>`

    photoInfo.innerHTML = values;
    document.title = info.author;
}

function nextPhoto() {
    selectFromList();
}


function randomIntFromInterval (min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function loadList() {

    const imageId = sessionStorage.getItem("imageId");
    if (!imageId) {

        selectFromList();

    } else {

        const imageList = await getEntireList();

        console.log(`Loading original image ${imageId}`);

        if (imageId <= imageList.length) {
            const imgInfo = imageList[ imageId ];

            loadImage(imageId, imgInfo);
        }
        else {
            console.log("Image id is out of range");
        }

    }

}

async function getEntireList () {

    let entireList = [];

    const storedList = localStorage.getItem("list");

    if (storedList) {

        const jsonList = JSON.parse(storedList);

        console.log("Using the stored list", jsonList);

        return jsonList;
    }

    let list = await getImageList(1, 100);

    while (list && list.next) {

        entireList = [ ...entireList, ...list.list ];

        console.log(entireList);

        const regex = RegExp('<(.*?)>; rel="(.*?)"', 'g');
        const listNext = list.next;

        let found;
        let url = "";
        let rel = "";
        list = null;

        while ((found = regex.exec(listNext))) {

            console.log("found", found);

            if (found.length == 3) {
                url = found[ 1 ];
                rel = found[ 2 ];
            }
            else {
                console.log("Could not find next link");
                list = null;
                break;
            }

            console.log(rel, url);

            if (rel === "next" && url) {
                list = await getImageListByURL(url);
                break;
            }
            else if (rel === "prev") {
                console.log("Previous entry skipped");
            }
            else {
                console.log("rel not recognised");
                list = null;
                break;
            }
        }

    }

    entireList.sort((a, b) => {
        return a.id - b.id;
    });

    console.log(entireList);

    const listStorage = JSON.stringify(entireList);

    localStorage.setItem("list", listStorage);

    return entireList;
}

image.onclick = function () {
    if (image) {
        selectFromList();
    }
};

image.onload = function () {
    image.style.display = "block";
    photoInfo.style.display = "block";
};

async function selectFromList () {

    const list = await getEntireList();

    if (list) {
        const selection = list[ randomIntFromInterval(0, list.length) ];

        loadImage(selection.id, selection);
    }
}

async function getImageListByURL (url) {

    const response = await fetch(url);

    if (response && response.ok) {
        const list = await response.json();

        next = response.headers.get("link");

        console.log(next);

        if (list) {
            return { list: list, next: next };
        }
        else {
            errorPopup(response);

            return null;
        }
    }
    else {
        errorPopup(response);

        return null;
    }
}


async function getImageList (page, limit) {

    let url = "https://picsum.photos/v2/list/";

    if (page || limit) {
        url += "?";
    }

    if (page) {
        url += "page=" + page;
    }

    if (limit) {
        if (page) {
            url += "&";
        }

        url += "limit=" + limit;
    }

    return getImageListByURL(url);
}
