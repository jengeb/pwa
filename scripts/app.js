+function() {
  'use strict';
  var isOnline;
  var stat = document.getElementById('status');
  var amIOnline = function() {
    stat.textContent = navigator.online ? 'online' : 'offline';
  }
  window.addEventListener('online', amIOnline);
  window.addEventListener('offline', amIOnline);
  amIOnline();
}();


// register JS file containing access to Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(function() {
      console.log('Service Worker registered');
    })
    .catch(function(err) {
      console.log('Service Worker not registered', err);
    });
}
