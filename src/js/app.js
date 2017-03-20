var myApp = angular.module('app', []);
myApp.controller('sortList', function($scope) {
      $scope.greeting = "Hello World";
    })
    .directive("sortable", function() {
  return {
    restrict: 'C',
    scope: {
      type: '='
    },
    link: function(scope, elm, attr) {

      $("#groupItems0, #groupItems1, #groupItems2, #groupItems3, #groupItems4, #groupItems5").sortable({
        connectWith: ".itemsList",
        update: function(event, ui) {

          saveListMenu();
        },
        helper: function(event, ui) {
          var $clone = $(ui).clone();
          $clone.css('position', 'absolute');
          return $clone.get(0);
        },
        placeholder: "st-placeholder",
        forcePlaceholderSize: true
      });

      var localStorageName = $("#sortable").prop('type');
      var list = JSON.parse(localStorage.getItem(localStorageName));
      if (list !== null) {
        for (var j = 0; j < list.length; j++) {
          var menuColumn = list[j];
          $.each(menuColumn, function(count, item) {
            jQuery('#'+item).detach().appendTo("#groupItems" + (j));
          });
        }
      }

      function saveListMenu() {
        // put items in sortable into an array
        var theArray = [[],[],[],[],[],[]];
        for (var i = 0; i < theArray.length; i++) {
          $("li", "#groupItems" + i).each(function(count, item) {
            var idList = $(this).prop('id');
            theArray[i].push(idList);
          });
        }
        localStorage[localStorageName] = JSON.stringify(theArray);
      }
    }
  };
});