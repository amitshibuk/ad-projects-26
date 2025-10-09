// This is the updated content for js/main.js

function getContributions(repoUrl, containerId) {
  const urlParts = repoUrl.split('/');
  const owner = urlParts[3];
  const repo = urlParts[4];
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/stats/contributors`;
  const container = document.getElementById(`${containerId}-contributions`);

  // Clear previous results and show a loading message
  container.innerHTML = '<p>Loading contributions...</p>';
  console.log("Fetching contributions from:", apiUrl);

  fetch(apiUrl)
    .then(response => {
      if (response.status === 202) {
        // Status 202 means GitHub is still calculating the stats.
        throw new Error("GitHub is still compiling contributor statistics. Please try again in a moment.");
      }
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Repository not found. Check the URL in groups.yml.");
        } else if (response.status === 403) {
          throw new Error("API rate limit exceeded or repository is private. Please wait a bit and try again.");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // **THE CRUCIAL FIX IS HERE**
      // We must check if the returned data is an array before using it.
      if (Array.isArray(data) && data.length > 0) {
        let html = '<h4>Contributions:</h4><ul>';
        // Sort contributors by total commits, descending
        data.sort((a, b) => b.total - a.total);
        data.forEach(contributor => {
          html += `
            <li>
              <img src="${contributor.author.avatar_url}" alt="${contributor.author.login}" width="32" height="32" style="border-radius: 50%;">
              <a href="${contributor.author.html_url}" target="_blank">${contributor.author.login}</a>:
              ${contributor.total} commits
            </li>
          `;
        });
        html += '</ul>';
        container.innerHTML = html;
      } else {
        // This case now correctly handles empty repos or when stats are being compiled.
        throw new Error("No contribution data found. This repository may be empty or new.");
      }
    })
    .catch(error => {
      console.error('Error fetching contributions:', error);
      container.innerHTML = `<p style="color: red;"><strong>Error:</strong> ${error.message}</p>`;
    });
}