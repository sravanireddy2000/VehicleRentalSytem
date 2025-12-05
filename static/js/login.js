   document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username,password})
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    document.getElementById('messageBox').innerHTML = '<span style="color: green;">Login successful! Redirecting...</span>';
                    setTimeout(function() {
                        window.location.href = '/admin';
                    }, 1000);
                } else {
                    document.getElementById('messageBox').innerHTML = '<span style="color: red;">' + data.error + '</span>';
                }
            });
        });