const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "ap2",
  useTLS: true,
});

async function triggerEvent(channel, event, message) {
  await pusher.trigger("my-channel", "my-event", {
    message: "hello world",
  });
}

module.exports = { triggerEvent };
