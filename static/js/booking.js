        var pricePerDay = parseInt(document.getElementById('priceValue').value);
        
        document.getElementById('startDate').addEventListener('change', calculateTotal);
        document.getElementById('endDate').addEventListener('change', calculateTotal);
        
        function calculateTotal() {
            var startDate = document.getElementById('startDate').value;
            var endDate = document.getElementById('endDate').value;
            
            if(startDate && endDate) {
                var start = new Date(startDate);
                var end = new Date(endDate);
                
                var timeDiff = end - start;
                var daysDiff = timeDiff / (1000 * 3600 * 24);
                
                if(daysDiff > 0) {
                    document.getElementById('totalDays').value = daysDiff;
                    document.getElementById('totalPrice').value = daysDiff * pricePerDay;
                } else {
                    document.getElementById('totalDays').value = 0;
                    document.getElementById('totalPrice').value = 0;
                    alert('End date must be after start date');
                }
            }
        }
        
        document.getElementById('bookingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            var bookingData = {
                vehicleId: document.getElementById('vehicleId').value,
                customerName: document.getElementById('customerName').value,
                customerEmail: document.getElementById('customerEmail').value,
                customerPhone: document.getElementById('customerPhone').value,
                startDate: document.getElementById('startDate').value,
                endDate: document.getElementById('endDate').value,
                totalDays: document.getElementById('totalDays').value,
                totalPrice: document.getElementById('totalPrice').value
            };
            
            if(bookingData.totalDays <= 0) {
                alert('Please select valid dates');
                return;
            }
            
            fetch('/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    document.getElementById('message').innerHTML = '<span style="color: green;">Booking successful!</span>';
                    setTimeout(function() {
                        window.location.href = '/';
                    }, 1500);
                } else {
                    document.getElementById('message').innerHTML = '<span style="color: red;">' + data.error + '</span>';
                }
            });
        });