function renderEntries(filter) {
  const container = document.getElementById("entries-container");
  container.innerHTML = "";

  const filtered = filter
    ? entries.filter(function(entry) {
        const keyword = filter.toLowerCase();
        return entry.title.toLowerCase().includes(keyword) ||
               entry.body.toLowerCase().includes(keyword);
      })
    : entries;

  if (filtered.length === 0) {
    container.innerHTML = "<p style='color:#999;'>No entries found.</p>";
    return;
  }

  filtered.forEach(function(entry) {
    const article = document.createElement("article");
    article.className = "entry";
    article.innerHTML = `
      <p class="date">${entry.date}</p>
      <h2>${entry.title}</h2>
      <p>${entry.body}</p>
    `;
    container.appendChild(article);
  });
}

document.getElementById("search").addEventListener("input", function() {
  renderEntries(this.value);
});

renderEntries();
