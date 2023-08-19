const firebaseConfig = {
    apiKey: "AIzaSyA4KabgOJDAysjjae50YWz2wq73x1qXuoY",
    authDomain: "thread-app-9283d.firebaseapp.com",
    databaseURL: "https://thread-app-9283d-default-rtdb.firebaseio.com",
    projectId: "thread-app-9283d",
    storageBucket: "thread-app-9283d.appspot.com",
    messagingSenderId: "1088213115429",
    appId: "1:1088213115429:web:71ca33175d6cae5379d5cc",
    measurementId: "G-N0HFZW1L6K"
  };
  
  
  
  
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  
  function renderPosts(posts) {
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = "";

    for (const key in posts) {
        const post = posts[key];
        const postDiv = document.createElement("div");
        postDiv.classList.add("post-card"); // Add the post-card class

        // Get the timestamp from the post (assuming it's stored as a Unix timestamp)
        const timestamp = new Date(post.timestamp); // Convert the timestamp to a Date object

        postDiv.innerHTML = `
            <p class="post-author"><strong>${post.author}</strong></p>
            <p>${post.text}</p>
            <p class="post-timestamp">${timestamp.toLocaleString()}</p>
            <button class="edit-button" data-key="${key}">Edit</button>
            <button class="delete-button" data-key="${key}">Delete</button>
        `;
          // Add event listener for the edit button
          const editButton = postDiv.querySelector(".edit-button");
          editButton.addEventListener("click", () => {
              const newText = prompt("Edit your blog post:", post.text);
              if (newText !== null) {
                  database.ref("posts/" + key + "/text").set(newText);
              }
          });
  
          // Add event listener for the delete button
          const deleteButton = postDiv.querySelector(".delete-button");
          deleteButton.addEventListener("click", () => {
              // Remove the post from the DOM
              postDiv.remove();
              // Delete the post from the database
              database.ref("posts/" + key).remove();
          });
  
          postContainer.appendChild(postDiv);
      }
  }
  
  // ... Your other code ...
  
  
  // Listen for changes in the database
  database.ref("posts").on("value", snapshot => {
    const posts = snapshot.val();
    if (posts) {
        renderPosts(posts);
    }
});

  
  // Form submission to add a new post
  // Form submission to add a new post
  
  document.getElementById("post-form").addEventListener("submit", event => {
    event.preventDefault();
    const authorName = document.getElementById("author-name").value;
    const postText = document.getElementById("post-text").value;

    if (postText && authorName) {
        const newPostRef = database.ref("posts").push();
        const timestamp = Date.now(); // Get the current timestamp in milliseconds
        newPostRef.set({
            author: authorName,
            text: postText,
            timestamp: timestamp // Save the timestamp along with the post
        });
        document.getElementById("author-name").value = "";
        document.getElementById("post-text").value = "";
    }
});
  
  
  
  const auth = firebase.auth();
  
  // Listen for changes in user authentication state
  auth.onAuthStateChanged(user => {
      const userDisplay = document.getElementById("user-display-name");
      const userInfo = document.getElementById("user-info");
  
      if (user) {
          userInfo.style.display = "";
          userDisplay.textContent = user.displayName || "User";
      } else {
          userInfo.style.display = "";
      }
  });
  
  // Log out user
  document.getElementById("logout").addEventListener("click", () => {
      auth.signOut();
  });













  