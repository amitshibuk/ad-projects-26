// This is the content for js/main.js

function getContributions(repoUrl, containerId) {
  const urlParts = repoUrl.split('/');
  const owner = urlParts[3];
  const repo = urlParts[4];
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/stats/contributors`;
  const container = document.getElementById(`${containerId}-contributions`);
  container.innerHTML = 'Loading contributions...';

  console.log("Fetching contributions from:", apiUrl);

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Repository not found. Check the URL in groups.yml.");
        } else if (response.status === 403) {
          throw new Error("API rate limit exceeded. Please wait a bit and try again.");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        let html = '<h4>Contributions:</h4><ul>';
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
        container.innerHTML = '<p>No contribution data found. This can happen for new/empty repositories or if GitHub is still compiling the stats. Please try again in a moment.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching contributions:', error);
      container.innerHTML = `<p style="color: red;"><strong>Error:</strong> ${error.message}</p>`;
    });
}