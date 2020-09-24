let blobURL;
let currentBlob;

const image = document.getElementById("image");

const photoInfo = document.getElementById("info");

const loadingImg = document.getElementById("loading");

let timerId = null;
let currentInfo = null;
let slideShowActive = false;
let firstSlide = false;
let hearted = false;

loadList();

function errorPopup (response) {
    stopProgress();
    alert("Unable to retrieve the image. Error " + response.status);
}

function exceptionPopup (err) {
    stopProgress();
    alert("Unable to retrieve the image. Error " + err);
}

function startProgress () {
    //console.log("starting progress")
    //document.body.style.backgroundImage = "url(public/image/loading-clear.gif)";
    loadingImg.style.display = "block";
}

function stopProgress () {
    //console.log("stopping progress")
    //document.body.style.backgroundImage = "url()";
    loadingImg.style.display = "none";
}

function loadImage (id, imgInfo) {

    startProgress();

    const url = imgInfo.download_url;

    if(!slideShowActive || firstSlide) {
        //image.style.display = "none";
        //photoInfo.style.display = "none";

        firstSlide = false;
    }

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

                // delete the old blobURL
                if (blobURL) {
                    URL.revokeObjectURL(blobURL);
                }

                // Then create a local URL for that image
                blobURL = URL.createObjectURL(blob);
                image.src = blobURL;

                currentBlob = blob;
                setPhotoInfo(imgInfo,blob);

                visitedPhoto(Number(id));
            }

            stopProgress();

        }).catch(e => {
            console.log(e);
            stopProgress();
            //exceptionPopup(e);
        });

}

function readList (listName) {
    let listArray = [];
    let listData = localStorage.getItem(listName);

    if (listData && listData.length > 0) {
        try {
            listArray = JSON.parse(listData);
        }
        catch {
            console.log("Unable to parse data for "+listName);
        }
    }

    return listArray;
}

function writeList(listName, list) {
    try {
        if(list) {
            localStorage.setItem(listName, JSON.stringify(list));
        }
    }
    catch {
        console.log("Unable to set data into storage for "+listName);
    }
}

function visitedPhoto (imageId) {

    const id = Number(imageId);

    sessionStorage.setItem("imageId", `${id}`);

    removeAvailable(id);

    hearted = false;
}

// remove the specified photo id from the available list
function removeAvailable(id) {
    let available = readList('available');

    if (available) {
        const newAvailable = available.filter(item => id != item);

        console.log("available size=", newAvailable.length);

        // if we have run out of photos, need to start over again
        if (newAvailable.length === 0) {
            resetAvailable();
        }
        else {
            writeList('available', newAvailable);
        }
    }
}

function replaceAll (str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function setPhotoInfo (info,blob) {

    currentInfo = info;

    const heart = !hearted ? "♡" : "❤️";

    let values = `<p><button><a href='${info.url}'>${info.author} on Unsplash</a></button><button onclick="setHeart()">${heart}</button></p>`;
    
    if (blobURL) {
        let filename = info.author+"-"+info.id+".jpg";

        filename = replaceAll(filename," ","-");

        values += `<button><a download='${filename}' href='${blobURL}'>Download ↓</a></button>`;
    }

    if (timerId == null) {
        values += `<button onclick="nextPhoto()">Next ⇥</button>`;

        values += `<button onclick="startSlideShow()">Play ►</button>`;
    } else {
        values += `<button onclick="stopSlideShow()">Stop ◼︎</button>`;
    }

    let megaPixel = getFriendlySize(info.width * info.height,"P");

    let dimensions = "(" + info.width + " x " + info.height + ") Pixels="+megaPixel;

    values+= `<p>ID=${info.id}`;
    if(blob) {
        values += `  Size=${getFriendlySize(blob.size,"B")}`;
    }
    values += `  ${dimensions}</p>`

    photoInfo.innerHTML = values;
    document.title = info.author;
}

function getFriendlySize(size,suffix) {

    let sizeString = String(size)+suffix;

    if(size >= (1024*1024)) {
        sizeString = String((size/(1024*1024)).toFixed(1)) + "M"+suffix;
    } else if (size >= 1024) {
        sizeString = String((size / (1024)).toFixed(1)) + "K"+suffix;
    }

    return sizeString;
}

function nextPhoto () {
    selectFromList();
}

function startSlideShow () {
    firstSlide = true;
    nextPhoto();
    timerId = window.setInterval(nextPhoto, 10000);
    slideShowActive = true;
}

function stopSlideShow () {
    window.clearInterval(timerId);
    timerId = null;
    setPhotoInfo(currentInfo,currentBlob);
    slideShowActive = false;
}

function setHeart() {
    hearted = !hearted;
    setPhotoInfo(currentInfo, currentBlob);
}


function randomIntFromInterval (min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function loadList () {

    const imageId = sessionStorage.getItem("imageId");

    console.log("get imageId = ", imageId);

    if (imageId) {

        const imagesLoaded = (list) => {
            let loaded = false;

            if (list) {
                const foundItem = list.findIndex(item => item.id === imageId);

                if (foundItem > -1) {
                    console.log(`Loading original image ${imageId}`);

                    loadImage(imageId, list[ foundItem ]);
                    loaded = true;
                }
            }

            return loaded;
        };

        getEntireList(imagesLoaded);

    } else {

        let loaded = false;

        const imagesLoaded = (list) => {

            if (list && !loaded) {
                const selection = list[ randomIntFromInterval(0, list.length - 1) ];

                const id = selection.id;

                console.log(`Loading image ${id}`);

                loadImage(id, selection);
                loaded = true;
            }

            return loaded;
        };

        getEntireList(imagesLoaded);

    }
}

function getImageIds(list) {
    return list.map((item)=>{
        return Number(item.id);
    })
}

async function getEntireList (cb) {

    let entireList = [];

    let list = readList("list");

    if (list && (list.length > 0)) {

        if (cb) {
            cb(list);
        }

        const available = readList('available'); 

        if(available.length === 0) {
            initAvailable(list);
        }

        initAllIds(list);

        return list;
    }

    list = await getImageList(1, 100);

    while (list && list.next) {

        if (cb) {
            cb(list.list);
        }

        entireList = [ ...entireList, ...list.list ];

        //console.log(entireList);

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

    writeList('list', entireList);

    initLists(entireList);

    return entireList;
}

function initLists(list) {

    const imageIds = getImageIds(list);

    writeList('available', imageIds);
    writeList('allIds', imageIds);

    console.log("available", imageIds);
}

function initAvailable(list) {
    const imageIds = getImageIds(list);

    writeList('available', imageIds);
}

function initAllIds (list) {
    const imageIds = getImageIds(list);

    writeList('allIds', imageIds);
}

function resetAvailable() {

    const list = readList('allIds');

    if(list) {
        writeList('available', list);
    }
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

        let available = readList('available');

        const randomId = available[randomIntFromInterval(0, available.length - 1)];

        const foundIndex = list.findIndex(item=>randomId == item.id)

        if(foundIndex != -1) {
            const selection = list[ foundIndex ];

            loadImage(selection.id, selection);

            available = available.filter(item => item.id != randomId);

            writeList('available', available);
        }
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
