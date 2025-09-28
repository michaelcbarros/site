
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
    excerpt: "Essays on games, film, and the sacred."
    url: "{{ site.baseurl }}/essays/"
    icon: "fas fa-pen-nib"
  - title: "Books in Progress"
    excerpt: "Forthcoming and published works."
    url: "{{ site.baseurl }}/books/"
    icon: "fas fa-book"
  - title: "Media & Talks"
    excerpt: "Podcasts, interviews, and appearances."
    url: "{{ site.baseurl }}/media/"
    icon: "fas fa-microphone"
  - title: "Get in Touch"
    excerpt: "Contact for speaking, writing, or collaboration."
    url: "{{ site.baseurl }}/contact/"
---

{% include feature_row %}

<section style="margin:2rem 0">
  <div style="display:flex;align-items:center;gap:2rem;flex-wrap:wrap;">
    <img src="{{ site.baseurl }}/assets/images/hero/portrait.jpg" alt="Michael C. Barros portrait" width="160" height="160" style="border-radius:50%;box-shadow:0 2px 8px #bba"/>
    <div>
      <h2 style="margin-top:0;">About</h2>
      <p>
        <b>Michael C. Barros</b> is a scholar of religion and popular culture, exploring the intersections of myth, meaning, and sacred experience within games, film, and speculative fiction. His research weaves together theology, cultural studies, and media analysis to illuminate how imaginative worlds shape our understanding of the transcendent.
      </p>
      <ul class="social-icons" style="list-style:none;display:flex;gap:1rem;padding:0;">
        <li><a href="mailto:you@example.com" title="Email"><i class="fas fa-envelope"></i> Email</a></li>
        <li><a href="https://substack.com/@michaelcbarros" title="Substack"><i class="fas fa-envelope-open-text"></i> Substack</a></li>
        <li><a href="{{ site.baseurl }}/media/" title="Media"><i class="fas fa-microphone"></i> Media</a></li>
      </ul>
    </div>
  </div>
</section>

<hr>

<section>
  <h2>Recent Essays</h2>
  <ul>
    {% assign sorted_essays = site.essays | sort: 'date' | reverse %}
    {% for post in sorted_essays limit:3 %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <span style="color:#888;">({{ post.date | date: "%Y-%m-%d" }})</span>
        <br>
        <small>{{ post.summary | default: post.excerpt | strip_html | truncate: 110 }}</small>
      </li>
    {% endfor %}
  </ul>
</section>

<section>
  <h2>Books</h2>
  <ul>
    {% for book in site.books %}
      <li>
        <a href="{{ book.url | relative_url }}">{{ book.title }}</a>
        {% if book.status %} <span style="color:#888;">({{ book.status }})</span>{% endif %}
        <br>
        <small>{{ book.summary | strip_html | truncate: 110 }}</small>
      </li>
    {% endfor %}
  </ul>
</section>

<section>
  <h2>Media & Interviews</h2>
  <ul>
    {% assign sorted_media = site.media | sort: 'date' | reverse %}
    {% for item in sorted_media limit:2 %}
      <li>
        <a href="{{ item.external_url | default:item.url | relative_url }}">{{ item.title }}</a>
        <span style="color:#888;">({{ item.date | date: "%Y-%m-%d" }})</span>
        <br>
        <small>{{ item.summary | strip_html | truncate: 110 }}</small>
      </li>
    {% endfor %}
  </ul>
</section>

<hr>

<section style="margin:2rem 0">
  <h2>Search & Discover</h2>
  {% if site.search %}
    {% include search.html %}
  {% else %}
    <p>Use the navigation bar above to explore essays, books, and media.</p>
  {% endif %}
</section>

<footer style="margin-top:2rem;text-align:center;font-size:0.9em;color:#888;">
  &copy; {{ site.time | date: '%Y' }} Michael C. Barros &middot; <a href="{{ site.baseurl }}/feed.xml">RSS</a>
</footer>
