function main() {
  get('/api/whoami', {}, function(user) {
    renderNewNavbar(user);
    // renderStories(user);

    // const socket = io();

    // socket.on('post', function(msg) {
    //     const storiesDiv = document.getElementById('stories');
    //     storiesDiv.prepend(storyDOMObject(msg,user));
    // });

    // socket.on('comment', function(msg) {
    //   const commentDiv = document.getElementById(msg.parent + '-comments');
    //   commentDiv.appendChild(commentDOMObject(msg));
    // });
  });
}

main();
