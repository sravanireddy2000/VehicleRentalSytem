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
        
        function deleteVehicle(id) {
            if(!window.confirm('Are you sure you want to delete this vehicle!'))
                return;
            fetch('/admin/delete/' + id, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(result => {
                if(result.success) {
                    loadVehicles();
                }
            });
        }
         function loadVehicles() {
            fetch('/api/vehicles')
            .then(response => response.json())
            .then(vehicles => {
                var html = '<tr><th>Brand</th><th>Model</th><th>Type</th><th>Year</th><th>Price</th><th>Actions</th></tr>';
                
                vehicles.forEach(function(v) {
                    html += '<tr>';
                    html += '<td>' + v.brand + '</td>';
                    html += '<td>' + v.model + '</td>';
                    html += '<td>' + v.type + '</td>';
                    html += '<td>' + v.year + '</td>';
                    html += '<td>' + v.pricePerDay + '</td>';
                    html += '<td><a href="#" onclick="deleteVehicle(\'' + v._id + '\')">Delete</a></td>';
                    html += '</tr>';
                });
                
                document.getElementById('vehicleTable').innerHTML = html;
            });
        }
       
