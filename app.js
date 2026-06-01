let activeTag = null;

function renderTags() {
  const allTags = [...new Set(entries.flatMap(e => e.tags))];
  const container = document.getElementById("tag-filter");

  allTags.forEach(function(tag) {
    const btn = document.createElement("button");
    btn.textContent = tag;
    btn.className = "tag-btn";
    btn.addEventListener("click", function() {
      if (activeTag === tag) {
        activeTag = null;
        document.querySelectorAll(".tag-btn").forEach(b => b.classList.remove("active"));
      } else {
        activeTag = tag;
        document.querySelectorAll(".tag-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      }
      renderEntries(document.getElementById("search").value);
    });
    container.appendChild(btn);
  });
}

function renderEntries(filter) {
  const container = document.getElementById("entries-container");
  container.innerHTML = "";

  let filtered = activeTag
    ? entries.filter(e => e.tags.includes(activeTag))
    : entries;

  if (filter) {
    const keyword = filter.toLowerCase();
    filtered = filtered.filter(e =>
      e.title.toLowerCase().includes(keyword) ||
      e.body.toLowerCase().includes(keyword)
    );
  }

  document.getElementById("entry-count").textContent =
    filtered.length + " " + (filtered.length === 1 ? "entry" : "entries");

  if (filtered.length === 0) {
    container.innerHTML = "<p style='color:#999;'>No entries found.</p>";
    return;
  }

  filtered.forEach(function(entry) {
    const article = document.createElement("article");
    article.className = "entry";
    const tagHTML = entry.tags.map(t => `<span class="tag">${t}</span>`).join("");
    article.innerHTML = `
      <p class="date">${entry.date}</p>
      <h2>${entry.title}</h2>
      <p>${entry.body}</p>
      <div class="tags">${tagHTML}</div>
    `;
    container.appendChild(article);
  });
}

document.getElementById("search").addEventListener("input", function() {
  renderEntries(this.value);
});

renderTags();
renderEntries();
