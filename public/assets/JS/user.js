// Wait for the DOM to completely load before we run our JS
document.addEventListener("DOMContentLoaded", (e) => {
  if (e) {
    console.log("DOM loaded! 🚀");
  }

  const postContainer = document.querySelector(".post-container");
  const postCategorySelect = document.getElementById("category");

  let posts;

  const deleteBtns = document.querySelectorAll(".delete");

  if (deleteBtns) {
    deleteBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        console.log("click");
        handlePostDelete(e);
      });
    });
  }

  //Function to make DELETE request for a post
  const deletePost = (id) => {
    fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log("Deleted", response);
      window.location.href = "/user";
    });
  };

  const handlePostDelete = (e) => {
    const currentPost = e.target.parentElement.parentElement.dataset.post;
    console.log(e.target.parentElement.parentElement);

    console.log("handlePostDelete -> currentPost", currentPost);
    deletePost(currentPost);
  };

  const editBtns = document.querySelectorAll(".edit");

  if (editBtns) {
    editBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        console.log("click");
        handlePostEdit(e);
      });
    });
  }
  const handlePostEdit = (e) => {
    const currentPost = e.target.parentElement.parentElement.dataset.post;

    console.log("handlePostDelete -> currentPost", currentPost);
    console.log("Whoops, WIP");
    window.location.href = `/user-posts?post_id=${currentPost}`;
  };

  const handleCategoryChange = (e) => {
    const newPostCategory = e.target.value.replaceAll("/", "-");
    console.log("handleCategoryChange -> newPostCategory", newPostCategory);
    window.location.href = "/user/" + newPostCategory.toLowerCase();
  };
  postCategorySelect.addEventListener("change", handleCategoryChange);
});
