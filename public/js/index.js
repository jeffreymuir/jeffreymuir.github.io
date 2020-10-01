import quotes from "./quotes.js";
'use strict';

let blobURL;
let currentBlob;
let imageList = [];

const image = document.getElementById("image");
const photoInfo = document.getElementById("info");
const loadingImg = document.getElementById("loading");
const quote = document.getElementById("quote");
const podcastAudio = document.getElementById("podcastAudio");
const countdownDiv = document.getElementById("countdown");
const unsplashURL = document.getElementById("unsplashURL");
const start = document.getElementById("startSlideshow");
const stop = document.getElementById("stopSlideshow");
const next = document.getElementById("nextPhoto");
const download = document.getElementById("downloadPhoto");
const imageDetails = document.getElementById("imageDetails");
const infoButton = document.getElementById("infoButton");

let currentInfo = null;
let hearted = false;
let hidden = false;

const COUNTDOWN_TIME = 30;
let countdown = COUNTDOWN_TIME;
let countdownActive = false;
let countdownTimer = null;

let quoteIndex = 0;
let showInfo = false;

let podcastPlaying = false;

if (podcastAudio) {
    podcastAudio.onplay = () => {
        console.log("Play pressed");
        podcastPlaying = true;
        writeAtomic("podcastPlaying", podcastPlaying);
    };

    podcastAudio.onpause = () => {
        console.log("Pause pressed");
        podcastPlaying = false;
        writeAtomic("podcastPlaying", podcastPlaying);
    };
}

loadList();

function setCountdownDiv (time) {
    if (countdownDiv) {
        if (isCountdownActive()) {
            showInline(countdownDiv);
            countdownDiv.innerHTML = time;
        }
        else {
            hide(countdownDiv);
            countdownDiv.innerHTML = "";
        }
    }
}

function showCountdown () {
    const time = countdown;

    setCountdownDiv(time);

    countdown -= 1;

    if (countdown == 0) {
        countdown = COUNTDOWN_TIME;
        nextPhoto();
    }
}


function errorPopup (response) {
    stopProgress();
    alert("Unable to retrieve the image. Error " + response.status);
}

function exceptionPopup (err) {
    stopProgress();
    alert("Unable to retrieve the image. Error " + err);
}

function startProgress () {
    loadingImg.style.display = "block";
}

function stopProgress () {
    loadingImg.style.display = "none";
}

function loadImage (id, imgInfo) {

    startProgress();

    //const url = imgInfo.download_url;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const url = `https://picsum.photos/id/${id}/${width}/${height}`;

    console.log(url);

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

                hearted = false;
                currentBlob = blob;
                setPhotoInfo(imgInfo, blob);

                visitedPhoto(Number(id));
            }

            stopProgress();

        }).catch(e => {
            console.log(e);
            stopProgress();
            removeAvailable(id);
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
            console.log("Unable to parse data for " + listName);
        }
    }

    return listArray;
}

function writeList (listName, list) {
    try {
        if (list) {
            localStorage.setItem(listName, JSON.stringify(list));
        }
    }
    catch {
        console.log("Unable to set data into storage for " + listName);
    }
}

function writeAtomic (key, value) {
    try {
        console.log("Writing " + key + "=" + value);
        localStorage.setItem(key, value);
    }
    catch {
        console.log("Unable to set data into storage for " + key);
    }
}

function readAtomic (key) {
    try {
        const value = localStorage.getItem(key);

        console.log("Reading " + key + "=" + value);

        return value;
    }
    catch {
        console.log("Unable to get data into storage for " + key);
        return null;
    }
}

function visitedPhoto (imageId) {

    const id = Number(imageId);

    sessionStorage.setItem("imageId", `${id}`);

    removeAvailable(id);

}

// remove the specified photo id from the available list
function removeAvailable (id) {
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

function getAvailableCount () {
    const available = readList('available');
    let count = 0;

    if (available) {
        count = available.length;
    }

    return count;
}

function replaceAll (str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function hide (el) {
    el.style.display = "none";
}

function showBlock (el) {
    el.style.display = "block";
}

function showInline (el) {
    el.style.display = "inline";
}

function readjustInfoButtons () {

    if (!isCountdownActive()) {
        console.log("No countdown");
        showInline(start);
        showInline(next);
        hide(stop);
        hide(countdownDiv);
    } else {
        hide(start);
        hide(next);
        showInline(stop);
        showInline(countdownDiv);
        console.log("Countdown active");
    }
}

function setPhotoInfo (info, blob) {

    currentInfo = info;

    //const heart = !hearted ? "♡" : "❤️";

    unsplashURL.innerHTML = `${info.author} on Unsplash`;
    unsplashURL.href = `${info.url}`;

    readjustInfoButtons();

    let filename = info.author + "-" + info.id + ".jpg";

    filename = replaceAll(filename, " ", "-");

    const checkedInfo = showInfo ? "☒" : "☐";

    download.download = `${filename}`;
    download.href = `${info.download_url}`;

    if (showInfo) {

        infoButton.innerHTML = `${checkedInfo} Info`;
        let megaPixel = getFriendlySize(info.width * info.height, "P");

        let dimensions = "Pixels=" + megaPixel + " (" + info.width + " x " + info.height + ")";

        let details = `<p>ID=${info.id}`;

        if (blob) {
            details += `  Size=${getFriendlySize(blob.size, "B")}</p>`;
        }
        else {
            details += "</p>";
        }

        details += `<p>${dimensions}</p>`;

        details += `<p>Images=${imageList.length} Quotes=${quotes.length}</p>`;
        details += `<p>Availalble=${getAvailableCount()}</p>`;
        details += `<p>QuoteId=${quoteIndex}</p>`;

        imageDetails.innerHTML = details;
    }
    else {
        infoButton.innerHTML = `${checkedInfo} Info`;
        imageDetails.innerHTML = "";
    }

    document.title = info.author;

    setQuote();
}

function setQuote () {
    if (quotes.length > 0) {

        const currentquote = quotes[ quoteIndex ];

        const quoteText = `${currentquote.content}<br><em class="author">${currentquote.author}</em>`;

        quote.innerHTML = quoteText;
    }
}

function toggleShowInfo () {
    showInfo = !showInfo;
    setPhotoInfo(currentInfo, currentBlob);
}

window.toggleShowInfo = toggleShowInfo;

function getFriendlySize (size, suffix) {

    let sizeString = String(size) + suffix;

    if (size >= (1024 * 1024)) {
        sizeString = String((size / (1024 * 1024)).toFixed(1)) + "M" + suffix;
    } else if (size >= 1024) {
        sizeString = String((size / (1024)).toFixed(1)) + "K" + suffix;
    }

    return sizeString;
}

function nextPhoto () {
    selectFromList();
}
window.nextPhoto = nextPhoto;

function startSlideShow () {
    startTimer();

    readjustInfoButtons();

    setCountdownDiv(COUNTDOWN_TIME);

    nextPhoto();
}

window.startSlideShow = startSlideShow;

function startTimer () {
    countdown = COUNTDOWN_TIME;
    setCountdownActive(true);
    countdownTimer = setInterval(showCountdown, 1000);
}

function isCountdownActive () {
    return countdownActive;
}

function setCountdownActive (value) {
    countdownActive = value;
    writeAtomic("countdownActive", value);
}


function stopSlideShow () {
    stopTimer();
    setPhotoInfo(currentInfo, currentBlob);
}

window.stopSlideShow = stopSlideShow;

function stopTimer () {
    setCountdownActive(false);
    window.clearInterval(countdownTimer);
    countdownTimer = null;
}

function setHeart () {
    hearted = !hearted;
    setPhotoInfo(currentInfo, currentBlob);
}

window.setHeart = setHeart;

function randomInt (min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function loadList () {

    const imageId = sessionStorage.getItem("imageId");

    quoteIndex = sessionStorage.getItem("quoteId");

    const active = readAtomic("countdownActive");

    if (!quoteIndex) {
        quoteIndex = 0;
    }

    setQuote();

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

        try {
            imageList = await getEntireList(imagesLoaded);

            if (active != null) {

                if (active === "true") {
                    startSlideShow();
                }
            }

        }
        catch (err) {
            console.log(err);
        }

    } else {

        let loaded = false;

        const imagesLoaded = (list) => {

            if (list && !loaded) {
                const selection = list[ randomInt(0, list.length - 1) ];

                const id = selection.id;

                quoteIndex = randomInt(0, quotes.length - 1);

                sessionStorage.setItem("quoteId", quoteIndex);

                console.log(`Loading image ${id}`);

                loadImage(id, selection);
                loaded = true;
            }

            return loaded;
        };

        try {
            imageList = await getEntireList(imagesLoaded);

            if (active != null) {

                if (active === "true") {
                    startSlideShow();
                }
            }
        }
        catch (err) {
            console.log(err);
        }

    }
}

function getImageIds (list) {
    return list.map((item) => {
        return Number(item.id);
    });
}

async function getEntireList (cb) {

    let entireList = [];

    let list = readList("list");

    if (list && (list.length > 0)) {

        if (cb) {
            cb(list);
        }

        const available = readList('available');

        if (available.length === 0) {
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

function initLists (list) {

    const imageIds = getImageIds(list);

    writeList('available', imageIds);
    writeList('allIds', imageIds);

    console.log("available", imageIds);
}

function initAvailable (list) {
    const imageIds = getImageIds(list);

    writeList('available', imageIds);
}

function initAllIds (list) {
    const imageIds = getImageIds(list);

    writeList('allIds', imageIds);
}

function resetAvailable () {

    const list = readList('allIds');

    if (list) {
        writeList('available', list);
    }
}


image.onclick = function () {
    if (image) {
        hidden = !hidden;

        if (hidden) {
            hide(photoInfo);
            hide(quote);
        }
        else {
            showBlock(photoInfo);
            showBlock(quote);
        }
    }
};

image.onload = function () {
    image.style.display = "block";
    photoInfo.style.display = "block";
};

async function selectFromList () {

    const list = imageList;

    if (list) {

        let available = readList('available');

        const randomId = available[ randomInt(0, available.length - 1) ];

        quoteIndex = randomInt(0, quotes.length - 1);

        sessionStorage.setItem("quoteId", quoteIndex);

        const foundIndex = list.findIndex(item => randomId == item.id);

        if (foundIndex != -1) {
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

        const next = response.headers.get("link");

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

let lastAudioTimeWrite = 0;
const audioWriteInterval = 5.0;

function audioTimeUpdate (event) {
    const currentTime = podcastAudio.currentTime;

    if (currentTime) {
        if (lastAudioTimeWrite == 0) {
            writeAtomic('audioTime', currentTime);
            lastAudioTimeWrite = currentTime;
        }
        else if (currentTime > (lastAudioTimeWrite + audioWriteInterval)) {
            writeAtomic('audioTime', currentTime);
            lastAudioTimeWrite = currentTime;
        }
        else {
            // skipping this notification
        }
    }

}

window.audioTimeUpdate = audioTimeUpdate;

function canPlay() {
    const audioTime = readAtomic('audioTime');
    const playing = readAtomic('podcastPlaying');

    if (audioTime && podcastAudio.currentTime === 0) {
        podcastAudio.currentTime = audioTime;
        console.log("Adjusting time to " + audioTime);
    }

    if(playing && playing === "true") {
        podcastAudio.play();
    }
}

window.canPlay = canPlay;