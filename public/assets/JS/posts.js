// Wait for the DOM to completely load before we run our JS
document.addEventListener("DOMContentLoaded", (e) => {
  if (e) {
    console.log("DOM loaded! 🚀");
  }

  const postContainer = document.querySelector(".post-container");
  const postCategorySelect = document.getElementById("category");
  const postLocationSelect = document.getElementById("location");

  let posts;

  // const initializeRows = () => {
  //   postContainer.innerHTML = "";
  //   const postsToAdd = [];

  //   posts.forEach((post) => postsToAdd.push(createNewRow(post)));
  //   postsToAdd.forEach((post) => postContainer.appendChild(post));
  // };

  // const createNewRow = (post) => {
  //   // Postcard div
  //   const newPostCard = document.createElement("div");
  //   newPostCard.classList.add("card");

  //   // Heading
  //   const newPostCardHeading = document.createElement("div");
  //   newPostCardHeading.classList.add("card-header");

  //   // New post info

  //   const newPostDate = document.createElement("small");

  //   // New post category
  //   const newPostCategory = document.createElement("h5");
  //   newPostCategory.textContent = post.type;
  //   newPostCategory.style.float = "right";
  //   newPostCategory.style.fontWeight = "700";
  //   newPostCategory.style.marginInlineEnd = "10px";

  //   // New post card body
  //   const newPostCardBody = document.createElement("div");
  //   newPostCardBody.classList.add("card-body");

  //   // New Post
  //   const newPostBody = document.createElement("p");

  //   newPostBody.textContent = post.content;

  //   const formattedDate = new Date(post.createdAt).toLocaleDateString();
  //   newPostDate.textContent = ` (${formattedDate})`;

  //   //newPostTitle.appendChild(newPostDate);

  //   //newPostCardHeading.appendChild(newPostTitle);
  //   newPostCardHeading.appendChild(newPostCategory);
  //   newPostCardBody.appendChild(newPostBody);
  //   newPostCard.appendChild(newPostCardHeading);
  //   newPostCard.appendChild(newPostCardBody);
  //   newPostCard.setAttribute("data-post", JSON.stringify(post));

  //   return newPostCard;
  // };

  // const displayEmpty = () => {
  //   postContainer.innerHTML = "";
  //   const messageH2 = document.createElement("h4");
  //   messageH2.style.textAlign = "center";
  //   messageH2.style.marginTop = "50px";
  //   messageH2.innerHTML = `No posts yet for this category.`;
  //   postContainer.appendChild(messageH2);
  // };

  const handleCategoryChange = (e) => {
    const newPostCategory = e.target.value.replaceAll("/", "-");
    console.log("handleCategoryChange -> newPostCategory", newPostCategory);
    window.location.href = "/home/" + newPostCategory.toLowerCase();
  };
  postCategorySelect.addEventListener("change", handleCategoryChange);

  //createLocation, createCategory
  const createCategorySelect = document.getElementById("createCategory");
  const createLocationSelect = document.getElementById("createLocation");

  const addOptions = (loc) => {
    const option = document.createElement("option");
    option.value = loc.name;
    option.textContent = loc.name;
    return option;
  };

  const locationListHandler = (e) => {
    const type = e.target.value;
    let tmp = type.replaceAll("/", "-");

    fetch(`/api/locations/${tmp}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Got", data);
        createLocationSelect.innerHTML = "";
        const locs = [];
        data.forEach((loc) => locs.push(addOptions(loc)));
        locs.forEach((option) => createLocationSelect.append(option));
      });
  };
  createCategorySelect.addEventListener("change", locationListHandler);

  const locationSelectListner = (e) => {
    const loc = e.target.value;
    console.log(loc);
    console.log(document.title);
    let type = document.title;
    console.log(type);
    //console.log("handleCategoryChange -> newPostCategory", newPostCategory);
    window.location.href = `/home/${type}/${loc.toLowerCase()}`;
  };

  postLocationSelect.addEventListener("change", locationSelectListner);
});
