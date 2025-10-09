---
layout: default
title: Home
---

# Class Projects Dashboard

Welcome! Here are all the project groups:

<ul>
{% for group in site.data.groups.groups %}
  <li>
    <a href="{{ group.repo }}" target="_blank">{{ group.name }} - {{ group.project }}</a>
    <button onclick="getContributions('{{ group.repo }}', '{{ group.name | slugify }}')">Show Contributions</button>
    <br>
    Members:
    <ul>
      {% for member in group.members %}
        <li><a href="https://github.com/{{ member.github }}" target="_blank">{{ member.name }}</a></li>
      {% endfor %}
    </ul>
    <div id="{{ group.name | slugify }}-contributions"></div>
  </li>
{% endfor %}
</ul>