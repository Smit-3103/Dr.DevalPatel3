/* ===================================================
   MEDICOZ — blog.js
   Dynamically renders blog listing from blogs.json
   =================================================== */
(function () {
  'use strict';

  async function initBlog() {
    const container = document.getElementById('blogListContainer');
    if (!container) return;

    try {
      const res = await fetch('assets/data/blogs.json');
      if (!res.ok) throw new Error('Network response was not ok');
      const blogs = await res.json();
      container.innerHTML = '';
      blogs.forEach(post => {
        container.insertAdjacentHTML('beforeend', renderBlogListItem(post));
      });
    } catch (err) {
      /* Fallback: static content already in HTML */
      console.warn('Blog JSON fetch failed, using static content.', err);
    }
  }

  function renderBlogListItem(post) {
    return `
      <article class="blog-list-item animate-on-scroll">
        <div class="blog-list-img">
          <a href="blog-detail.html?post_id=${post.id}">
            <img src="${post.thumbnail}" alt="${post.title}" loading="lazy">
          </a>
        </div>
        <div class="blog-list-body">
          <div class="blog-list-meta">
            <span><i class="fas fa-user"></i> ${post.author}</span>
            <span><i class="fas fa-comment"></i> ${post.comments} Comments</span>
            <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
          </div>
          <h2><a href="blog-detail.html?post_id=${post.id}">${post.title}</a></h2>
          <p>${post.excerpt}</p>
          <a href="blog-detail.html?post_id=${post.id}" class="read-more btn btn-sm btn-primary">Read More <i class="fas fa-arrow-right"></i></a>
        </div>
      </article>`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlog);
  } else {
    initBlog();
  }
})();
