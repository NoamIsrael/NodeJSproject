async function resetPassword() {
    const token = document.getElementById('token').value;
    const newPassword = document.getElementById('newPassword').value;

    const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();
    const messageElement = document.getElementById('message');

    if (response.ok) {
        messageElement.innerText = data.message;
        messageElement.style.color = 'green';
    } else {
        messageElement.innerText = data.error;
        messageElement.style.color = 'red';
    }
}