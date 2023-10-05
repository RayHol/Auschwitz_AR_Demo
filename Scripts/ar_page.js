document.addEventListener('DOMContentLoaded', function () {
  AFRAME.registerComponent("ar-controller", {
    init: function () {
        // Get references to the necessary DOM elements
        const target = document.getElementById("target");
        const video = document.getElementById("video");
        const plane = document.getElementById("videooverlay");
        const startText = document.getElementById("startText");
        const backgroundImage = document.getElementById("background");
        const backButton = document.getElementById("backButton");
        const secondTarget = document.getElementById("secondTarget");
        const dummyObject2 = document.getElementById("dummyObject2");
        const mainGateModel = document.getElementById("mainGateModel");

        // Initialize variables
        var played = false;
        var modelEntity;

        // Event listener for the first target found event
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
                plane.object3D.position.copy(plane.object3D.position);
            }
        });

        // Event listener for the first target lost event
        target.addEventListener("targetLost", () => {
            console.log("Video target lost");
            this.found = false;
            if (!played) {
                video.pause();
                startText.style.display = "block";
                backgroundImage.style.display = "block";
            }
        });

        // Event listener for the second target found event
        secondTarget.addEventListener("targetFound", () => {
            console.log("3D Model target found");
            if (!modelEntity) {
                let dummyWorldPos2 = new AFRAME.THREE.Vector3();
                dummyObject2.object3D.getWorldPosition(dummyWorldPos2);

                modelEntity = document.createElement("a-gltf-model");
                modelEntity.setAttribute('src', mainGateModel.getAttribute('src'));
                modelEntity.setAttribute("scale", "0.005 0.005 0.005");

                modelEntity.object3D.position.copy(dummyWorldPos2);
                modelEntity.object3D.quaternion.copy(dummyObject2.object3D.getWorldQuaternion(new AFRAME.THREE.Quaternion()));

                this.el.sceneEl.appendChild(modelEntity);
            }
        });

        // Event listener for the second target lost event
        secondTarget.addEventListener("targetLost", () => {
            console.log("3D Model target lost");
            // Logic for unloading the 3D model can be added here if needed
        });

        // Event listener for arframe event
        this.el.addEventListener("arframe", () => {
            if (!this.found && played) {
                plane.object3D.position.copy(plane.object3D.position);
            }
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
