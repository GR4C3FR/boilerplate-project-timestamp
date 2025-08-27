document.getElementById('submitBtn').addEventListener('click', function() {
    const dateInput = document.getElementById('dateInput').value;
    fetch(`/api/${dateInput}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            if (data.error) {
                resultDiv.innerHTML = `<p class="error">${data.error}</p>`;
            } else {
                resultDiv.innerHTML = `
                    <p>Unix Timestamp: <strong>${data.unix}</strong></p>
                    <p>UTC Date: <strong>${data.utc}</strong></p>
                `;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});