/* load quiz */
(async function() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');

  const res       = await fetch(`http://localhost:3000/${category}`);
  const questions = await res.json();
  const container = document.getElementById('quiz-container');

  questions.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `
      <p>${i + 1}. ${q.question}</p>
      <ul class="options">
        ${q.options.map(opt => `
          <li>
            <label>
              <input type="radio" name="q${i}" value="${opt}" />
              ${opt}
            </label>
          </li>
        `).join('')}
      </ul>
    `;
    container.appendChild(div);

    // feedback
    div.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', e => {
        const alert = document.createElement('div');
        alert.className = e.target.value === q.answer ? 'alert green' : 'alert red';
        alert.textContent = e.target.value === q.answer ? 'Correct!' : 'Incorrect';
        div.appendChild(alert);

        // disable rest
        div.querySelectorAll('input').forEach(i => i.disabled = true);
      });
    });
  });

  // submit btn
  const btn = document.createElement('button');
  btn.className = 'btn-round';
  btn.textContent = 'Submit';
  container.appendChild(btn);

  btn.addEventListener('click', () => {
    let score = 0;
    questions.forEach((q, i) => {
      const sel = document.querySelector(`input[name="q${i}"]:checked`);
      if (sel && sel.value === q.answer) score++;
    });
    window.location.href = `results.html?score=${score}&total=${questions.length}&category=${category}`;
  });
})();
