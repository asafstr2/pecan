const rq = require("amqplib/callback_api");
function sendValueInQueue1(req) {
  rq.connect("amqp://localhost", (err, connection) => {
    if (err) process.exit();
    const queueName = "Queue1";
    connection.createChannel((error, channel) => {
      if (error) {
        console.log(error);
        process.exit();
      } else {
        const msg = JSON.stringify(req);
        channel.assertQueue(queueName, { durable: false });
        channel.sendToQueue(queueName, Buffer.from(msg));
        console.log(`Queue Name is - ${queueName}`);
      }
    });
  });
}

module.exports = sendValueInQueue1;
