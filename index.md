---
layout: splash
title: "Michael C. Barros"
excerpt: "Scholar of religion and popular culture. Exploring myth, meaning, and the sacred in games, film, and fiction."
header:
  overlay_color: "#f6efe7"
  overlay_filter: "0.1"
  overlay_image: "{{ site.baseurl }}/assets/images/hero/hero.jpg"
  actions:
    - label: "Read Essays"
      url: "{{ site.baseurl }}/essays/"
    - label: "Current Book"
      url: "{{ site.baseurl }}/books/"
    - label: "Media"
      url: "{{ site.baseurl }}/media/"
    - label: "Contact"
      url: "{{ site.baseurl }}/contact/"
feature_row:
  - title: "Recent Essays"
    excerpt: "Games, film, theology of culture."
    url: "{{ site.baseurl }}/essays/"
  - title: "Books in Progress"
    excerpt: "Forthcoming + published."
    url: "{{ site.baseurl }}/books/"
  - title: "Media & Talks"
    excerpt: "Podcasts, interviews, lectures."
    url: "{{ site.baseurl }}/media/"
  - title: "Get in Touch"
    excerpt: "Speaking, writing, collaboration."
    url: "{{ site.baseurl }}/contact/"
---

{% include feature_row %}

<div class="feature__wrapper" style="margin-top:1.5rem">
  <div class="feature__item">
    <div class="archive__item">
      <div class="archive__item-teaser" style="max-width:160px;margin:0 auto;border-radius:50%;overflow:hidden">
        <img src="{{ site.baseurl }}/assets/images/hero/portrait.jpg" alt="Michael C. Barros portrait" loading="lazy">
      </div>
      <h2 class="archive__item-title" style="text-align:center;margin-top:.75rem">About</h2>
      <p class="archive__item-excerpt">
        <strong>Michael C. Barros</strong> studies how imaginative worlds shape religious understanding—how games, film, and speculative fiction become sites of ritual, presence, and metaphysical sense-making.
      </p>
      <ul class="social-icons" style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;list-style:none;padding:0;margin:0">
        <li><a href="mailto:you@example.com">Email</a></li>
        <li><a href="https://substack.com/@michaelcbarros">Substack</a></li>
        <li><a href="{{ site.baseurl }}/media/">Media</a></li>
      </ul>
    </div>
  </div>
</div>

<hr>

## Recent Essays
{% assign essays_sorted = site.essays | sort: "date" | reverse %}
{% assign essays_featured = essays_sorted | where_exp: "e","e.featured == true" %}
{% if essays_featured.size == 0 %}
  {% assign essays_featured = essays_sorted %}
{% endif %}

<div class="grid__wrapper">
{% for post in essays_featured limit:4 %}
  <article class="archive__item">
    <h3 class="archive__item-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    <p class="page__meta"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time></p>
    <p class="archive__item-excerpt">{{ post.summary | default: post.excerpt | strip_html | truncate: 140 }}</p>
  </article>
{% endfor %}
</div>

<p class="text-right"><a class="btn" href="{{ site.baseurl }}/essays/">All essays →</a></p>

## Books
{% assign books_all = site.books %}
{% assign books_featured = books_all | where_exp: "b","b.featured == true" %}
{% if books_featured.size == 0 %}
  {% assign books_featured = books_all %}
{% endif %}

<div class="grid__wrapper">
{% for book in books_featured limit:3 %}
  <article class="archive__item">
    <h3 class="archive__item-title">
      <a href="{{ book.url | relative_url }}">{{ book.title }}</a>
      {% if book.status %}<span class="page__meta"> · {{ book.status }}</span>{% endif %}
    </h3>
    {% if book.publisher %}<p class="page__meta">{{ book.publisher }}</p>{% endif %}
    <p class="archive__item-excerpt">{{ book.summary | strip_html | truncate: 140 }}</p>
  </article>
{% endfor %}
</div>

<p class="text-right"><a class="btn" href="{{ site.baseurl }}/books/">Books & projects →</a></p>

## Media & Interviews
{% assign media_sorted = site.media | sort: "date" | reverse %}
{% assign media_featured = media_sorted | where_exp: "m","m.featured == true" %}
{% if media_featured.size == 0 %}
  {% assign media_featured = media_sorted %}
{% endif %}

<div class="grid__wrapper">
{% for item in media_featured limit:4 %}
  <article class="archive__item">
    <h3 class="archive__item-title">
      <a href="{{ item.external_url | default: item.url | relative_url }}">{{ item.title }}</a>
    </h3>
    <p class="page__meta"><time datetime="{{ item.date | date_to_xmlschema }}">{{ item.date | date: "%Y-%m-%d" }}</time></p>
    <p class="archive__item-excerpt">{{ item.summary | strip_html | truncate: 140 }}</p>
  </article>
{% endfor %}
</div>

<p class="text-right"><a class="btn" href="{{ site.baseurl }}/media/">More media →</a></p>

<hr>

## Search & Discover
{% if site.search %}
  {% include search.html %}
{% else %}
  Use the navigation to explore essays, books, and media.
{% endif %}

<footer class="page__footer" style="text-align:center;margin-top:1rem">
  &copy; {{ site.time | date: '%Y' }} Michael C. Barros · <a href="{{ site.baseurl }}/feed.xml">RSS</a>
</footer>
