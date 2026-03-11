self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Message Received.');

  // 1. Default payload
  let pushData = { 
    title: '⚡ Flash Deal!', 
    body: 'A new deal just dropped. Click to view.',
    image: 'https://cdn-icons-png.flaticon.com/512/1163/1163337.png'
  };

  // 2. Extract JSON payload if server sends data
  if (event.data) {
    try {
      pushData = event.data.json();
    } catch (e) {
      console.log("Push data is not JSON");
    }
  }

  // 3. Notification options
  const options = {
    body: pushData.body,
    icon: pushData.image,
    badge: 'https://cdn-icons-png.flaticon.com/512/1163/1163337.png',
    data: { url: 'http://localhost:5173/' }
  };

  // 4. Show notification
  event.waitUntil(
    self.registration.showNotification(pushData.title, options)
  );
});

// 5. Handle notification click
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});