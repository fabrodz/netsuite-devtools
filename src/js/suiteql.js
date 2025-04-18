document.getElementById('run-query').addEventListener('click', async () => {
  const query = document.getElementById('query-input').value;

  try {
    const response = await fetch('/services/rest/query/v1/suiteql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Podrías usar Authorization: Bearer <token> si estás autenticado
      },
      body: JSON.stringify({ q: query })
    });

    const data = await response.json();
    document.getElementById('query-output').textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    document.getElementById('query-output').textContent = 'Error: ' + err.message;
  }
});
