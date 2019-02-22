angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
    function($scope, Listings) {
        /* Get all the listings, then bind it to the scope */
        Listings.getAll().then(function(response) {
            $scope.listings = response.data;
            $scope.listings.sort(function(a, b) {
                return a.code.toLowerCase() >= b.code.toLowerCase();
            });
    }, function(error) {
        console.log('Unable to retrieve listings:', error);
    });

        $scope.detailedInfo = undefined;

        $scope.addListing = function() {
          /**TODO 
          *Save the article using the Listings factory. If the object is successfully 
          saved redirect back to the list page. Otherwise, display the error
         */
            obj = {
                "code": $scope.newListing.code,
                "name": $scope.newListing.name,
                "address": $scope.newListing.address
            };

            Listings.create(obj).then(function(response) {
                Listings.getAll().then(function(response) {
                    $scope.listings = response.data;
                    $scope.listings.sort(function(a, b) {
                        return a.code.toLowerCase() >= b.code.toLowerCase();
                    });
                }, function(error) {
                    console.log('Unable to retrieve listings:', error);
                });
            }, function(error) {
                console.log('Unable to add listing:', error);
            });
        };

        $scope.deleteListing = function(id) {
           /**TODO
            Delete the article using the Listings factory. If the removal is successful, 
            navigate back to 'listing.list'. Otherwise, display the error. 
           */
            Listings.delete(id).then(function(response) {
                Listings.getAll().then(function(response) {
                    $scope.listings = response.data;
                    $scope.listings.sort(function(a, b) {
                        return a.code.toLowerCase() >= b.code.toLowerCase();
                    });
                }, function(error) {
                    console.log('Unable to retrieve listings:', error);
                });

            }, function(error) {
                console.log('Unable to delete listing:', error);
            });
        };

        $scope.showDetails = function(index) {
          $scope.detailedInfo = $scope.listings[index];
        };
    }
]);
