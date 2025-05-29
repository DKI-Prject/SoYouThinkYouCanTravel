/* show results */
(function() {
  const params   = new URLSearchParams(window.location.search);
  const score    = parseInt(params.get('score'));
  const total    = parseInt(params.get('total'));
  const category = params.get('category');
  const container= document.getElementById('results-container');

  // set best
  const key = 'scores';
  const all = JSON.parse(localStorage.getItem(key) || '{}');
  if (!all[category] || score > all[category]) {
    all[category] = score;
    localStorage.setItem(key, JSON.stringify(all));
  }

  // title
  const title = document.createElement('h2');
  if (score > 10) {
    title.textContent = `GREAT JOB! YOU KNOW ALL ABOUT ${category.toUpperCase()}`;
  } else {
    title.textContent = `THATS OKAY! LETS EXPLORE ${category.toUpperCase()} A BIT MORE BEFORE YOU TRY AGAIN!`;
  }
  container.appendChild(title);

  if (score > 10) {
    const img = document.createElement('img');
    img.src       = `images/${category}.jpg`;
    img.alt       = category;
    img.className = 'result-img';
    container.appendChild(img);
  } else {
    const search = document.createElement('div');
    search.id = 'search-container';
    const iframe = document.createElement('iframe');
    iframe.src    = `https://www.google.com/search?q=${category}+near+me`;
    iframe.width  = '100%';
    iframe.height = '400';
    search.appendChild(iframe);
    container.appendChild(search);
  }

  // actions
  const actions = document.createElement('div');
  actions.id = 'actions';

  const home = document.createElement('button');
  home.className = 'btn-round';
  home.textContent = 'THINK YOU CAN BEAT OUR OTHER QUIZES?';
  home.addEventListener('click', () => window.location.href = 'index.html');
  actions.appendChild(home);

  const retry = document.createElement('button');
  retry.className = 'btn-round';
  retry.textContent = 'TRY AGAIN';
  retry.addEventListener('click', () => {
    const stored = JSON.parse(localStorage.getItem(key) || '{}');
    delete stored[category];
    localStorage.setItem(key, JSON.stringify(stored));
    window.location.href = `quiz.html?category=${category}`;
  });
  actions.appendChild(retry);

  container.appendChild(actions);
})();
