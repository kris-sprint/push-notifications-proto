self.addEventListener("push", (e) => {
  self.console.log("push sw event", e);
  let parsedData;
  if (e.data) {
    parsedData = e.data.json();
    self.console.log("parsedData", parsedData);
  }

  let options = {
    body: parsedData.body || "local data body",
    icon: parsedData.icon || "images/example.png",
    vibrate: parsedData.vibrate || [100, 50, 100],
    data: parsedData.data || {
      dateOfArrival: Date.now(),
      primaryKey: "2",
    },
    actions: parsedData.actions || [
      { action: "explore", title: "local", icon: "images/checkmark.png" },
      { action: "close", title: "local close", icon: "images/xmark.png" },
    ],
  };

  e.waitUntil(self.registration.showNotification(parsedData.title, options));
});

self.addEventListener("notificationclick", (event) => {
  self.console.log("notificationclick event", event);
  event.notification.close(); // Close the notification when clicked

  // Handle action based on the action identifier
  switch (event.action) {
    case "explore":
      // Here you would typically open a URL or perform some action
      clients.openWindow("/");
      break;

    case "close":
      // Optionally handle close action, but the notification is already closed
      self.console.log("Notification closed.");
      break;

    default:
      // If no action is defined, you can specify what happens by default
      clients.openWindow("/");
      break;
  }
});
