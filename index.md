---
# This front matter is intentionally left blank.
---
<html>
<head>
  <meta charset="UTF-8">
  <title>AI&DS Projects Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class='header'>
      <h1>AI&DS Projects Dashboard</h1>
      <h2>Tracking all project groups and contributions</h2>
    </header>
    
  <input type="search" id="projectSearch" placeholder="Search by group, project, or member..." onkeyup="filterProjects()" class='search'>
  <main class="container">
    <div id="project-list">
    {% for group in site.data.groups.groups %}
      <details class="project-card"> <summary>
          <span class="group-info">{{ group.name }} - <strong>{{ group.project }}</strong></span> </summary>
        <div class="card-body">
          <strong>Members:</strong>
          <ul class="member-list"> {% for member in group.members %}
              <li><a href="https://github.com/{{ member.github }}" target="_blank">{{ member.name }} ({{ member.github }})</a></li>
            {% endfor %}
          </ul>
          <div id="{{ group.name | slugify }}-contributions"></div>
        </div>
      </details>
    {% endfor %}
    </div>
  </main>
  <footer class="footer">
    <small>Powered by GitHub Pages</small>
  </footer>

  <script src="{{ site.baseurl }}/js/main.js"></script>
  
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      {% for group in site.data.groups.groups %}
        getContributions('{{ group.repo }}', '{{ group.name | slugify }}');
      {% endfor %}
    });
  </script>

  <script>
    function filterProjects() {
      let searchTerm = document.getElementById('projectSearch').value.toLowerCase();
      let projects = document.querySelectorAll('.project-card');

      projects.forEach(card => {
        // We combine all searchable text into one string for an easy check
        const cardContent = card.textContent.toLowerCase();
        
        if (cardContent.includes(searchTerm)) {
          card.style.display = ""; // Show the card if it matches
        } else {
          card.style.display = "none"; // Hide the card if it doesn't match
        }
      });
    }
  </script>
</body>
</html>