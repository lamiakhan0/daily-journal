function renderEntries() {
  const container = document.getElementById("entries-container");

  entries.forEach(function(entry) {
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

renderEntries();
