(function(){
  var app = angular.module('clientsData', []);
  app.controller('DataController', function() {
// Деобезличивание таблицы
    this.unhideData = function () {
    var rowName = document.getElementsByClassName('data-name'),
        rowAddress = document.getElementsByClassName('data-address'),
        names = JSON.parse(localStorage.names),
        addresses = JSON.parse(localStorage.addresses);
      for (var i = 0, x = rowName.length; i<x ; i++) {
        rowName[i].textContent = names[rowName[i].textContent.match(/\d+$/)[0]];
        rowAddress[i].textContent = addresses[rowAddress[i].textContent.match(/\d+$/)[0]];
      }
    };
// Загрузка реальных данных
    this.getRealData = function () {
      $('.data-rows').remove();
      if (typeof localStorage.hiddenRecords !== 'undefined') {
        tempRecords = JSON.parse(localStorage.hiddenRecords);
      } else {
        alert('В локальном хранилище нет данных, воспользуйтесь кнопкой "Добавление записи"');
      }

      for (var i = 0, x = tempRecords.length; i < x; i++ ) {
        $('tbody').append('<tr class="data-rows"><td class="data-name">id_name_' + tempRecords[i].name + 
          '</td><td>' + tempRecords[i].year + 
          '</td><td>' + tempRecords[i].sex + 
          '</td><td class="data-address">id_address_' + tempRecords[i].address + 
          '</td></tr>'); 
      }
    };
// Добавление записи
    this.addData = function () {
      var nameId,
          addressId,
          hiddenRecords,
          newName = document.getElementById('formName').value,
          newYear = document.getElementById('formYear').value,
          newSex = document.getElementById('formSex').value,
          newAddress = document.getElementById('formAddress').value;

      nameId = localStorage.nameId || 1;      
      addressId = localStorage.addressId || 10000;

      if (typeof localStorage.hiddenRecords !== 'undefined') {
        hiddenRecords = JSON.parse(localStorage.hiddenRecords);
      } else {
        hiddenRecords = [];
      }

      if (typeof localStorage.names !== 'undefined') {
        names = JSON.parse(localStorage.names);
      } else {
        names = {};
      }

      if (typeof localStorage.addresses !== 'undefined') {
        addresses = JSON.parse(localStorage.addresses);
      } else {
        addresses = {};
      }

      names[nameId] = newName; 
      addresses[addressId] = newAddress; 
      hiddenRecords.push( { name: nameId, year: newYear, sex: newSex, address: addressId } );
      localStorage.names = JSON.stringify(names);
      localStorage.addresses = JSON.stringify(addresses);
      localStorage.hiddenRecords = JSON.stringify(hiddenRecords);

      localStorage.nameId = ++nameId;
      localStorage.addressId = ++addressId;
      console.log(hiddenRecords.length);
    };
  });

// Шаблоны

  app.directive('modal', function () {
    return {
      restrict: 'A',
      templateUrl: 'modal.html'
    };
  });
  app.directive('buttons', function () {
    return {
      restrict: 'A',
      templateUrl: 'buttons.html'
    };
  });
  app.directive('table', function () {
    return {
      restrict: 'A',
      templateUrl: 'table.html'
    };
  });
})();