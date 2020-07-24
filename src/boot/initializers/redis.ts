/*
* On successful initialization invoke resolve
* Resolve will trigger next initializer
*
* On fail initialization you can invoke reject
* Reject will stop the booting up of express app. In case you don't want to stop booting process if initialization fails invoke resolve
 */

import { config, Connections, constant, logger, redis } from "../../utils";

const init = async function (): Promise<void> {
    try {
        logger.info(`BOOT :: Connecting redis at : ${JSON.stringify(config.databases.redis.host)}`);
        const redisClient = await redis.initialize(constant.REDIS_SERVER_TYPE.REDIS, {
            host: config.databases.redis.host
        });
        Connections.set(constant.connections.REDIS, redisClient);
        logger.info(`BOOT :: Connected redis at : ${JSON.stringify(config.databases.redis.host)}`);
    }  catch (err) {
        logger.error(`BOOT :: Error connecting to redis server at ${config.databases.redis.host} :: message: ${err.message} :: stack : ${err.stack}`);
    }
};

export default init;
