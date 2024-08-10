const fetchButton = document.getElementById("fetch-button");
const dogImagesContainer = document.getElementById("dog-images");
const statusMessage = document.getElementById("message");
const apiUrl = "https://dog.ceo/api/breeds/image/random";

window.addEventListener("load", () => {
  const getLastImages = () => {
    const lastImages = JSON.parse(localStorage.getItem("lastDogImages"));
    if (lastImages && lastImages.length > 0) {
      showDogImages(lastImages);
    } else {
      showMessage("Click the button to fetch a dog images!", "default");
    }
  };

  const fetchDogImages = async () => {
    try {
      showMessage("Loading...", "loading");
      const imageUrls = [];
      for (let i = 0; i < 3 ; i++) {
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }
        const data = await res.json();
        imageUrls.push(data.message);
      }
      updateDogImages(imageUrls);
    } catch (error) {
      showMessage("Failed to fetch image. Please try again.", "error");
      console.error(error);
    }
  };

  const showMessage = (message, type) => {
    statusMessage.innerText = message;
    statusMessage.className = type;
    statusMessage.style.display = "block";
    dogImagesContainer.style.display = "none";
  };

  const showDogImages = (imageUrls) => {
    dogImagesContainer.innerHTML = ""; 
    imageUrls.forEach((url) => {
      const img = document.createElement("img");
      img.src = url;
      img.alt = "Dog Image";
      img.style.objectFit = "contain";
      dogImagesContainer.appendChild(img);
    });
    dogImagesContainer.style.display = "flex";
    statusMessage.style.display = "none";
  };
  const updateDogImages = (imageUrls) => {
    showDogImages(imageUrls);
    localStorage.setItem("lastDogImages", JSON.stringify(imageUrls));
  };

  fetchButton.addEventListener("click", fetchDogImages);
  getLastImages();
});
