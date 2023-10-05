document.addEventListener('DOMContentLoaded', function () {
    // Register the A-Frame component inside DOMContentLoaded
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
            const modelObject = document.getElementById("modelObject");
            
            // Initialize variables
            var played = false;
            
            // Event listener for first target found
            target.addEventListener("targetFound", () => {
                console.log("Video target found");
                this.found = true;
                hideTextAndBackground();
                if (!played) {
                    plane.emit("fadein");
                    video.play();
                    video.addEventListener("ended", function videoend(e) {
                        played = true;
                    }, false);
                }
            });
            
            // Event listener for first target lost
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
            
            // Event listener for second target found
            secondTarget.addEventListener("targetFound", () => {
                console.log("3D Model target found");
                modelObject.setAttribute('visible', true);
                hideTextAndBackground();
            });

            // Event listener for second target lost
            secondTarget.addEventListener("targetLost", () => {
                console.log("3D Model target lost");
                modelObject.setAttribute('visible', false);
                startText.style.display = "block";
                backgroundImage.style.display = "block";
            });

            // Event listener for back button click
            backButton.addEventListener('click', () => {
                window.location.href = 'index.html';
            });

            // Delay the display of start text and background image
            setTimeout(function() {
                startText.style.display = "block";
                backgroundImage.style.display = "block";
            }, 3000);
        }
    });

    // Wait for the A-Frame scene to be fully loaded
    document.querySelector('a-scene').addEventListener('loaded', function () {
        // Code for touch controls
        let modelContainer = document.getElementById("secondTarget"); // assuming the model is within this entity

        let initialScale = { x: 0.004, y: 0.004, z: 0.004 };
        let initialRotation = { x: 0, y: 0, z: 0 };

        let scale = { ...initialScale };
        let rotation = { ...initialRotation };

        modelContainer.addEventListener("touchmove", function(event) {
            if (event.touches.length === 1) {
                let movementX = event.touches[0].clientX - event.touches[0].radiusX;
                let movementY = event.touches[0].clientY - event.touches[0].radiusY;

                rotation.x += movementY * 0.1;
                rotation.y += movementX * 0.1;

                modelContainer.setAttribute("rotation", `${rotation.x} ${rotation.y} ${rotation.z}`);
            }

            if (event.touches.length === 2) {
                let dx = event.touches[0].clientX - event.touches[1].clientX;
                let dy = event.touches[0].clientY - event.touches[1].clientY;
                let distance = Math.sqrt(dx * dx + dy * dy);

                scale.x = initialScale.x * distance * 0.0001;
                scale.y = initialScale.y * distance * 0.0001;
                scale.z = initialScale.z * distance * 0.0001;

                modelContainer.setAttribute("scale", `${scale.x} ${scale.y} ${scale.z}`);
            }
        });
    });
});
