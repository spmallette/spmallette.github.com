---
layout: page
title: Posts
permalink: /posts/
---

<h1>All Posts</h1>

<ul id="all-posts" class="post-list">
  {% for post in site.posts %}
  <li>
    <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
    <h3><a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    {% if post.synopsis %}
    <p class="post-synopsis">{{ post.synopsis }}</p>
    {% endif %}
  </li>
  {% endfor %}
</ul>

<noscript>
  <p>JavaScript is disabled; showing all posts without pagination.</p>
</noscript>

<nav id="pager" aria-label="Posts Pagination" style="margin-top:1rem;"></nav>

<script src="{{ '/assets/posts.js' | relative_url }}"></script>
