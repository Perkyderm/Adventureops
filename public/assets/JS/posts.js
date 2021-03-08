// Wait for the DOM to completely load before we run our JS
document.addEventListener("DOMContentLoaded", (e) => {
  if (e) {
    console.log("DOM loaded! 🚀");
  }

  const postContainer = document.querySelector(".post-container");
  const postCategorySelect = document.getElementById("category");

  let posts;

  // Function to grab posts from the database
  const getPosts = (category) => {
    let categoryString = category || "";
    if (categoryString) {
      categoryString = categoryString.replace(" ", "");
      categoryString = `type/${categoryString}`;
    }

    fetch(`/api/posts/${categoryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success in getting posts:", data);
        posts = data;

        if (!posts.length) {
          displayEmpty();
        } else {
          initializeRows();
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // Getting initial list of posts
  getPosts();

  // Function to help construct the post HTML content inside blogContainer
  const initializeRows = () => {
    postContainer.innerHTML = "";
    const postsToAdd = [];

    posts.forEach((post) => postsToAdd.push(createNewRow(post)));
    postsToAdd.forEach((post) => postContainer.appendChild(post));
  };

  const createNewRow = (post) => {
    // Postcard div
    const newPostCard = document.createElement("div");
    newPostCard.classList.add("card");

    // Heading
    const newPostCardHeading = document.createElement("div");
    newPostCardHeading.classList.add("card-header");

    // New post info

    const newPostDate = document.createElement("small");

    // New post category
    const newPostCategory = document.createElement("h5");
    newPostCategory.textContent = post.type;
    newPostCategory.style.float = "right";
    newPostCategory.style.fontWeight = "700";
    newPostCategory.style.marginInlineEnd = "10px";

    // New post card body
    const newPostCardBody = document.createElement("div");
    newPostCardBody.classList.add("card-body");

    // New Post
    const newPostBody = document.createElement("p");

    newPostBody.textContent = post.content;

    const formattedDate = new Date(post.createdAt).toLocaleDateString();
    newPostDate.textContent = ` (${formattedDate})`;

    //newPostTitle.appendChild(newPostDate);

    //newPostCardHeading.appendChild(newPostTitle);
    newPostCardHeading.appendChild(newPostCategory);
    newPostCardBody.appendChild(newPostBody);
    newPostCard.appendChild(newPostCardHeading);
    newPostCard.appendChild(newPostCardBody);
    newPostCard.setAttribute("data-post", JSON.stringify(post));

    return newPostCard;
  };

  const displayEmpty = () => {
    postContainer.innerHTML = "";
    const messageH2 = document.createElement("h4");
    messageH2.style.textAlign = "center";
    messageH2.style.marginTop = "50px";
    messageH2.innerHTML = `No posts yet for this category.`;
    postContainer.appendChild(messageH2);
  };

  const handleCategoryChange = (e) => {
    const newPostCategory = e.target.value;
    console.log("handleCategoryChange -> newPostCategory", newPostCategory);
    getPosts(newPostCategory.toLowerCase());
  };
  postCategorySelect.addEventListener("change", handleCategoryChange);
});
