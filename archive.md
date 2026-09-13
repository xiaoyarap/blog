---
layout: minimal
title: 文章归档
permalink: /archive.html
type: CollectionPage
excerpt: 小亚说全部文章归档。
---

# 文章归档

共 {{ site.posts.size }} 篇。

<ul class="blog-list">
{% for post in site.posts %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span class="blog-date">{{ post.date | date: "%Y年%-m月%-d日" }}</span>
  </li>
{% endfor %}
</ul>
