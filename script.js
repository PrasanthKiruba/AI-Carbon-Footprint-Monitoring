document.getElementById('emissionForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const response = await fetch('/predict', {
    method: 'POST',
    body: formData
  });
  const data = await response.json();
  document.getElementById('result').innerHTML =
    `Predicted Emission: <strong>${data.predicted_emission} Tons CO₂</strong>`;

  const ctx = document.getElementById('emissionChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Predicted Emission'],
      datasets: [{
        label: 'CO₂ (tons)',
        data: [data.predicted_emission],
        backgroundColor: 'rgba(13, 110, 253, 0.6)'
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
