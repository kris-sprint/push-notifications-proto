let push = require("web-push");

// NOTE insert your keys here
let vapidKeys = {
  publickKey: "your-public-key-here",
  privateKey: "your-private-key-here",
};

push.setVapidDetails("mailto:test@code.co.uk", vapidKeys.publickKey, vapidKeys.privateKey);

// NOTE paste your actual subscription
// the subscriptions (vapidDetails in the types) of users that we want to recieve the notification, saved in a db
let subscription = {
  endpoint:'',
  expirationTime: null,
  keys: {
    p256dh: "",
    auth: "",
  },
};

// Payload can be anything
let payload = JSON.stringify({
  title: "Another title test!",
  body: "different body",
  icon: "images/example.png",
  vibrate: [100, 50, 100],
  data: {
    dateOfArrival: Date.now(),
    primaryKey: "2",
  },
  actions: [
    { action: "explore", title: "Open", icon: "images/checkmark.png" },
    { action: "close", title: "Close", icon: "images/xmark.png" },
  ],
});

push
  .sendNotification(subscription, payload)
  .then(() => console.log("Notification sent successfully"))
  .catch((err) => console.error("Error sending notification", err));