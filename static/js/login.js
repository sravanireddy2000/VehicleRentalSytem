        function showAdminLogin() {
            document.getElementById('adminLoginForm').style.display = 'block';
            document.getElementById('customerLoginForm').style.display = 'none';
            document.getElementById('adminTab').style.backgroundColor = '#2196F3';
            document.getElementById('customerTab').style.backgroundColor = '#ddd';
        }
        
        function showCustomerLogin() {
            document.getElementById('adminLoginForm').style.display = 'none';
            document.getElementById('customerLoginForm').style.display = 'block';
            document.getElementById('adminTab').style.backgroundColor = '#ddd';
            document.getElementById('customerTab').style.backgroundColor = '#2196F3';
        }
        
        document.getElementById('adminForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            var username = document.getElementById('adminUsername').value;
            var password = document.getElementById('adminPassword').value;
            
            var loginData = {
                username: username,
                password: password
            };
            
            fetch('/login/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    document.getElementById('messageBox').innerHTML = '<span style="color: green;">Login successful!</span>';
                    setTimeout(function() {
                        window.location.href = '/admin';
                    }, 1000);
                } else {
                    document.getElementById('messageBox').innerHTML = '<span style="color: red;">Invalid credentials</span>';
                }
            });
        });
        
        document.getElementById('customerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            var email = document.getElementById('customerEmail').value;
            var phone = document.getElementById('customerPhone').value;
            
            var loginData = {
                email: email,
                phone: phone
            };
            
            fetch('/login/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    document.getElementById('messageBox').innerHTML = '<span style="color: green;">Login successful!</span>';
                    setTimeout(function() {
                        window.location.href = '/bookings';
                    }, 1000);
                } else {
                    document.getElementById('messageBox').innerHTML = '<span style="color: red;">' + data.error + '</span>';
                }
            });
        });