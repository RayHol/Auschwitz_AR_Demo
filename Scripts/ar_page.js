document.addEventListener('DOMContentLoaded', function () {
  AFRAME.registerComponent("ar-controller", {
    init: function () {
        // Function to hide text and background
        function hideTextAndBackground() {
            startText.style.display = "none";
            backgroundImage.style.display = "none";
        }
      
        // Get references to the necessary DOM elements
        const target = document.getElementById("target");
        const secondTarget = document.getElementById("secondTarget");
        const video = document.getElementById("video");
        const plane = document.getElementById("videooverlay");
        const startText = document.getElementById("startText");
        const backgroundImage = document.getElementById("background");
        const backButton = document.getElementById("backButton");
        const dummyObject2 = document.getElementById("dummyObject2");
        const modelObject = document.getElementById("modelObject");
        
        // Initialize variables
        var played = false;
      

        // Event listener for first target found event
        target.addEventListener("targetFound", () => {
            console.log("Video target found");
            this.found = true;
            hideTextAndBackground();
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
            hideTextAndBackground();
            if (!played) {
                video.pause();
                startText.style.display = "block";
                backgroundImage.style.display = "block";
            }
        });

        // Event listener for second target found event
        secondTarget.addEventListener("targetFound", () => {
            console.log("3D Model target found");
            modelObject.setAttribute('visible', true);
            startText.style.display = "none";  // Hide the start text
            backgroundImage.style.display = "none";  // Hide the background image
        });

        // Event listener for second target lost event
        secondTarget.addEventListener("targetLost", () => {
            console.log("3D Model target lost");
            modelObject.setAttribute('visible', false);
            startText.style.display = "block";  // Show the start text
            backgroundImage.style.display = "block";  // Show the background image
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
