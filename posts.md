---
layout: page
title: Posts
permalink: /posts/
---

<style type="text/css">
/* tighten spacing for post list synopses on posts page */
.post-list > li { margin-bottom: 0.8rem; }
.post-list h3 { margin: 0.2rem 0; }
.post-synopsis { margin: 0.15rem 0 0.15rem; color: #555; }
</style>

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
