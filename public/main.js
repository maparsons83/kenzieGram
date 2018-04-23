let latest = {timestamp: 0};
let previousImages = [];
let imageDiv = document.getElementById("pictureBox");

function appendBox(imgPath) {
    // uploadFolder.push(imgPath);
    imageDiv.innerHTML +=
      `<img src="./uploads/` + imgPath + `">`
}

function fetchLatest() {
    const optionsObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(latest)
    }
    fetch("/latest", optionsObject)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            const onlyNewestImages = data.images.filter(image => !previousImages.includes(image));

            const hasImages = onlyNewestImages.length;
            const hasNewTimestamp = latest.timestamp !== data.timestamp;
            
            if(hasImages && hasNewTimestamp) {
                onlyNewestImages.forEach(imgPath => {
                    appendBox(imgPath);
                }) 
                previousImages = onlyNewestImages;
                latest.timestamp = data.timestamp;
                //looping through array and adding new images
                //update timestamp object
            };
            setTimeout(fetchLatest, 5000)
        });
};

// function fetchFunction() {
//     fetch("/uploads")
//         .then(response => response.json())
//         .then(data => {
//             console.log(data); // write to DOM

//             // for(let newImage of uploadFolder)
//             //     if(newImage.timestamp > uploadFolder[uploadFolder.length - 1].timestamp) {
//             //         appendBox(img)
//             //     };
//         });
        
// };
// fetchFunction();
fetchLatest();