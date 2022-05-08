const mineflayer = require('mineflayer');

const botArgs = {
    host: 'pika-network.net',
    username: "Gothamtestsalt",
    version: '1.18.2'
};

const initBot = () => {

    // Setup bot connection
    let bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        let botSocket = bot._client.socket;
        console.log(`Logged in to ${botSocket.server ? botSocket.server : botSocket._host}`);
    });

    bot.on('end', () => {
        console.log(`Disconnected`);

        // Attempt to reconnect
        setTimeout(initBot, 5000);
    });

    bot.on('spawn', async () => {
        console.log("Spawned in");
        bot.chat("/login Test123");

        await bot.waitForTicks(40);
        bot.activateItem(offHand=false);

        await bot.waitForTicks(20);
        bot.clickWindow(23, 0, 0)

        await bot.waitForTicks(100);
        var loop = setInterval(() => {
            bot.chat("Join mc gotham-network net for a newer rising survival and bed wars server");
            console.log("advertised");
        }, 20000)
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log(`Failed to connect to ${err.address}:${err.port}`)
        }
        else {
            console.log(`Unhandled error: ${err}`);
        }
    });
};

initBot();