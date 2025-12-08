        const pricePerDay = parseInt(document.getElementById('priceValue').value);
        
        document.getElementById('startDate').addEventListener('change', calculateTotal);
        document.getElementById('endDate').addEventListener('change', calculateTotal);
        
        function calculateTotal() {
            var startDate = document.getElementById('startDate').value;
            var endDate = document.getElementById('endDate').value;
            
            if(startDate && endDate) {
                var start = new Date(startDate);
                var end = new Date(endDate);
                
                var timeDifference = end - start;
                var daysDifference = timeDifference / (1000 * 3600 * 24);
                
                if(daysDifference > 0) {
                    document.getElementById('totalDays').value = daysDifference;
                    document.getElementById('totalPrice').value = daysDifference * pricePerDay;
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
                } else {
                    document.getElementById('message').innerHTML = '<span style="color: red;">' + data.error + '</span>';
                }
            });
        });