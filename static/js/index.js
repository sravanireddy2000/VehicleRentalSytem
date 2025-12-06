  document.getElementById('searchForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            var searchText = document.getElementById('searchText').value;
            var vehicleType = document.getElementById('vehicleType').value;
            var maxPrice = document.getElementById('maxPrice').value;
            
            var url = '/api/vehicles?';
            
            if(searchText) {
                url += 'search=' + searchText + '&';
            }
            if(vehicleType) {
                url += 'vehicleType=' + vehicleType + '&';
            }
            if(maxPrice) {
                url += 'maxPrice=' + maxPrice + '&';
            }
            
            fetch(url)
            .then(response => response.json())
            .then(vehicles => {
                var html = '<tr><th>Name</th><th>Type</th><th>Price</th><th>Status</th><th>Action</th></tr>';
                
                if(vehicles.length > 0) {
                    vehicles.forEach(function(v) {
                        html += '<tr>';
                        html += '<td>' + v.brand + ' ' + v.model + '</td>';
                        html += '<td>' + v.type + '</td>';
                        html += '<td>' + v.pricePerDay + '</td>';
                        html += '<td>' + (v.available ? 'Available' : 'Rented') + '</td>';
                        html += '<td>';
                        if(v.available) {
                            html += '<a href="/booking?id=' + v._id + '">Book</a>';
                        } else {
                            html += 'Not Available';
                        }
                        html += '</td>';
                        html += '</tr>';
                    });
                } else {
                    html += '<tr><td colspan="5">No vehicles found</td></tr>';
                }
                
                document.getElementById('vehicleTable').innerHTML = html;
            });
        })