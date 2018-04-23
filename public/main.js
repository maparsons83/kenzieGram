let timestamp = {timestamp: 0};
let imageDiv = document.getElementById("pictureBox");

function appendBox(img) {
    uploadFolder.push(img);
    imageDiv.innerHTML +=
      `<img src="` + img + `">`
}

function fetchLatest() {
    const optionsObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(timestamp)
    }
    fetch("/latest", optionsObject)
        .then(response => response.json())
        .then(data => {
            if(data.images.length > 0) {
                //looping through array and adding new images
                //update timestamp object
            };
            setTimeout(fetchLatest, 5000)
        });
};

function fetchFunction() {
    fetch("/uploads")
        .then(response => response.json())
        .then(data => {
            console.log(data); // write to DOM

            // for(let newImage of uploadFolder)
            //     if(newImage.timestamp > uploadFolder[uploadFolder.length - 1].timestamp) {
            //         appendBox(img)
            //     };
        });
        
};
// fetchFunction();
fetchLatest();