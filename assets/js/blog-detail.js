/* ===================================================
   MEDICOZ — blog-detail.js
   Reads ?post_id from URL, fetches blogs.json,
   renders single post + sets dynamic SEO tags
   =================================================== */
(function () {
  'use strict';

  const SIDEBAR_INSTA = [
    'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=150&h=150&fit=crop&q=70',
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=150&h=150&fit=crop&q=70',
    'https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=150&h=150&fit=crop&q=70',
    'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&h=150&fit=crop&q=70',
    'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=150&h=150&fit=crop&q=70',
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=150&h=150&fit=crop&q=70',
    'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&q=70',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&q=70',
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=150&h=150&fit=crop&q=70'
  ];

  async function initBlogDetail() {
    const params = new URLSearchParams(window.location.search);
    const postId = parseInt(params.get('post_id'), 10);

    try {
      const res = await fetch('assets/data/blogs.json');
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const blogs = await res.json();
      const post  = blogs.find(b => b.id === postId);

      if (!post) {
        showError('Post not found.');
        return;
      }

      /* ── Dynamic SEO ── */
      document.title = post.title + ' - Medicoz Hospital';
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.name = 'description'; document.head.appendChild(metaDesc); }
      metaDesc.content = post.excerpt.substring(0, 160);

      /* ── Inject post content ── */
      setEl('blogFeaturedImg', null, el => { el.src = post.image; el.alt = post.title; });
      setEl('blogCategory', post.category);
      setEl('blogDate', post.date);
      setEl('blogAuthor', 'By ' + post.author);
      setEl('blogComments', post.comments + ' Comments');
      setEl('blogTitle', post.title);
      setEl('blogContent', null, el => { el.innerHTML = post.body; });

      /* Tags */
      const tagsEl = document.getElementById('blogTags');
      if (tagsEl && post.tags) {
        tagsEl.innerHTML = post.tags.map(t => `<span class="tag">${t}</span>`).join('');
      }

      /* Update page banner title */
      const bannerH1 = document.querySelector('.page-banner-content h1');
      if (bannerH1) bannerH1.textContent = post.title.substring(0, 40) + (post.title.length > 40 ? '...' : '');

      /* ── Related posts ── */
      const related = blogs.filter(b => b.id !== post.id).slice(0, 2);
      const relatedEl = document.getElementById('relatedPosts');
      if (relatedEl) {
        relatedEl.innerHTML = related.map(r => `
          <article class="blog-card">
            <div class="blog-card-img">
              <a href="blog-detail.html?post_id=${r.id}">
                <img src="${r.thumbnail}" alt="${r.title}" loading="lazy">
              </a>
              <span class="blog-category-badge">${r.category}</span>
            </div>
            <div class="blog-card-body">
              <div class="blog-meta">
                <span><i class="fas fa-user"></i> ${r.author}</span>
                <span><i class="fas fa-calendar-alt"></i> ${r.date}</span>
              </div>
              <h3><a href="blog-detail.html?post_id=${r.id}">${r.title}</a></h3>
              <p>${r.excerpt.substring(0, 100)}...</p>
              <a href="blog-detail.html?post_id=${r.id}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
          </article>`).join('');
      }

      /* ── Sidebar ── */
      renderSidebar(blogs, post);

    } catch (err) {
      console.error(err);
      showError('Unable to load blog post. Please try again later.');
    }
  }

  function renderSidebar(blogs, currentPost) {
    /* Popular posts */
    const popularEl = document.getElementById('popularPosts');
    if (popularEl) {
      popularEl.innerHTML = blogs.slice(0, 3).map(b => `
        <div class="popular-post">
          <div class="popular-post-img">
            <img src="${b.thumbnail}" alt="${b.title}" loading="lazy">
          </div>
          <div class="popular-post-text">
            <a href="blog-detail.html?post_id=${b.id}">${b.title}</a>
            <span class="popular-post-date">${b.date}</span>
          </div>
        </div>`).join('');
    }

    /* Instagram grid */
    const instaEl = document.getElementById('instaGrid');
    if (instaEl) {
      instaEl.innerHTML = SIDEBAR_INSTA.map((url, i) => `
        <div class="instagram-item">
          <img src="${url}" alt="Instagram post ${i+1}" loading="lazy">
        </div>`).join('');
    }
  }

  function setEl(id, text, callback) {
    const el = document.getElementById(id);
    if (!el) return;
    if (callback) callback(el);
    else el.textContent = text || '';
  }

  function showError(msg) {
    const main = document.querySelector('.blog-detail-body') || document.querySelector('main');
    if (main) main.innerHTML = `<div style="text-align:center;padding:80px 20px;"><h2 style="color:#777">${msg}</h2><a href="blog.html" class="btn btn-primary" style="margin-top:20px">Back to Blog</a></div>`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogDetail);
  } else {
    initBlogDetail();
  }
})();
