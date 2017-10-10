// register JS file containing access to Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(
    (serviceWorkerRegistration) => {
      serviceWorkerRegistration.pushManager.subscribe().then(
        (pushSubscription) => {
          // TODO
          // endpoint to send push notifications
          console.log(pushSubscription.subscriptionId);
          console.log(pushSubscription.endpoint);
        }).catch(err => {
          console.log(err);
        })
    }).catch((err) => {
      console.log('Service Worker not registered', err);
    });
}
