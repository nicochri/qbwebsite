function main() {
  get('/api/whoami', {}, function(user) {
    renderNewNavbar(user);
  });
}

main();
