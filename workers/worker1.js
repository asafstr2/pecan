require("dotenv").config();
const amqp = require("amqplib");
const fabObj = require("../fibonacci");
require("../models/dbConnection");
const db = require("../models");
const queue = async () => {
  const queueName = "Queue1";
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();
  const q = await channel.assertQueue(queueName, { durable: false });
  channel.consume(
    queueName,
    async (message) => {
      try {
        console.log(`Waiting for messages`);
        console.log(`${queueName} - ${message.content}`);
        // i have asynced the function but no need for await on this case since we dont have data dependency
        //also we would normaly call a heavy duty function or maybe a class here instead of just the DB operation
        const body=JSON.parse(message.content);
        db.Prediction.create({ ...body });
        //some random function to take some time to jam the worker
        let fabNum = fabObj.calculateFibonacciValue(40);
        console.log({ fabNum });
      } catch (error) {
        console.log(error);
      }
    },
    { noAck: true }
  );
};
queue();
