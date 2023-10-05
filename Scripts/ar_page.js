document.addEventListener('DOMContentLoaded', function () {
  AFRAME.registerComponent("ar-controller", {
    init: function () {
        // Get references to the necessary DOM elements
        const target = document.getElementById("target");
        const secondTarget = document.getElementById("secondTarget");
        const video = document.getElementById("video");
        const plane = document.getElementById("videooverlay");
        const startText = document.getElementById("startText");
        const backgroundImage = document.getElementById("background");
        const backButton = document.getElementById("backButton");
        const dummyObject2 = document.getElementById("dummyObject2");
        
        // Initialize variables
        var played = false;

        // Event listener for first target found event
        target.addEventListener("targetFound", () => {
            console.log("Video target found");
            this.found = true;
            if (!played) {
                startText.style.display = "none";
                backgroundImage.style.display = "none";
                plane.emit("fadein");
                video.play();
                video.addEventListener("ended", function videoend(e) {
                    played = true;
                }, false);
            }
        });

        // Event listener for first target lost event
        target.addEventListener("targetLost", () => {
            console.log("Video target lost");
            this.found = false;
            if (!played) {
                video.pause();
                startText.style.display = "block";
                backgroundImage.style.display = "block";
            }
        });

        // Event listener for second target found event
        secondTarget.addEventListener("targetFound", () => {
            console.log("3D Model target found");
            dummyObject2.object3D.visible = true;
        });

        // Event listener for second target lost event
        secondTarget.addEventListener("targetLost", () => {
            console.log("3D Model target lost");
            dummyObject2.object3D.visible = false;
        });

        // Event listener for back button click
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        // Delay the display of start text and background image
        setTimeout(function() {
            startText.style.display = "block";
            backgroundImage.style.display = "block";
        }, 3000);  // Delay of 3000ms (3 seconds)
    },
  });
});
