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

        })