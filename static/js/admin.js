document.getElementById('addForm').addEventListener('submit', function(e) {
            e.preventDefault();
             var data = {
                brand: document.getElementById('brand').value,
                model: document.getElementById('model').value,
                type: document.getElementById('type').value,
                year: document.getElementById('year').value,
                pricePerDay: document.getElementById('pricePerDay').value
            };
            
            fetch('/admin/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if(result.success) {
                    document.getElementById('message').innerHTML = 'Vehicle added!';
                    document.getElementById('addForm').reset();
                    loadVehicles();
                }
            });
        });
        
        
