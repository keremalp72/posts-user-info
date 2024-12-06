// const postsContainer = document.querySelector(".posts-container");

// async function init() {
//   const data = await fetch("https://dummyjson.com/posts").then((response) =>
//     response.json()
//   );

//   const users = await fetch("https://dummyjson.com/users?limit=208")
//     .then((response) => response.json())
//     .then((data) => data.users);

//   const comments = await fetch("https://dummyjson.com/comments?limit=340").then(
//     (response) => response.json())
//     .then((data) => data.comments);

//   for (const post of data.posts) {
//     const user = findUser(post.userId, users);
//     const comment = getComments(comments, userId);
//     postsContainer.innerHTML += `
//          <div class="post">
//                 <h1>${post.title}</h1>
//                 <h3>${post.body}</h3>
//                 <div class="reactions">
//                     <p>like:${post.reactions.likes} -<span> dislike:${post.reactions.dislikes}</span></p>

//                 </div>
//                 <div class="user-container">
//                     <p>${user.firstName} <span>${user.lastName}</span></p>
//                     <p>${user.username}</p>
//                     <p>${user.email}</p>
//                 </div>
//                 <div class="comment-container">
//                     <p>yorumcu adi <span>yorumcu soyadı</span></p>
//                     <p>yapılan yorum</p>
//                 </div>
//             </div>
//         `;
//   }

// }
// init();

// function findUser(userId, users) {
//   for (const user of users) {
//     if (userId === user.id) {
//       return user;
//     }
//   }
// }

// function getComments(comments, userId) {
//   for (const comment of comments) {
//     if(userId === post.id) {
//       return comment;
//     }
//   }
// }

const postsContainer = document.querySelector(".posts-container");

async function init() {
  const data = await fetch("https://dummyjson.com/posts").then((response) =>
    response.json()
  );

  const users = await fetch("https://dummyjson.com/users?limit=208")
    .then((response) => response.json())
    .then((data) => data.users);

  const comments = await fetch("https://dummyjson.com/comments?limit=340")
    .then((response) => response.json())
    .then((data) => data.comments);

  for (const post of data.posts) {
    const user = findUser(post.userId, users);

    const postComments = getComments(post.id, comments);

    for (const comment of postComments) {
      const commentUser = findUser(comment.user.id, users);

      postsContainer.innerHTML += `
      <div class="post">
        <h1>${post.title}</h1>
        <h3>${post.body}</h3>
        <div class="reactions">
          <p>like:${post.reactions.likes} -<span> dislike:${post.reactions.dislikes}</span></p>
        </div>
        <div class="user-container">
          <p>kullanıcının adı: ${user.firstName} <span>${user.lastName}</span></p>
          <p>username: ${user.username}</p>
          <p>kullanıcı e-postası: ${user.email}</p>
        </div>
        <div class="comment-container">
          <p>yorum yapan kişinin adı: ${commentUser.firstName} <span>${commentUser.lastName}</span></p>
          <p>yorum: ${comment.body}</p>
        </div>
      </div>
    `;
    }
  }
}

init();

function findUser(userId, users) {
  for (const user of users) {
    if (userId === user.id) {
      return user;
    }
  }
}

function getComments(postId, comments) {
  const postComments = [];
  for (const comment of comments) {
    if (comment.postId === postId) {
      postComments.push(comment);
    }
  }
  return postComments;
}
