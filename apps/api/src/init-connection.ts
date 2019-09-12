import { Connection, createConnection, getConnectionOptions } from 'typeorm';

/**
 * TypeORM quick hack to select transpiled
 * entities directory (dist) instead of typescript files
 * which will produce errors in dev mode
 *
 * @todo for real world usage, this needs to be cleanup up.
 */
export async function initConnection(): Promise<Connection> {
    const connectOpts = await getConnectionOptions();
    Object.assign(connectOpts, {
        entities: ['**/*.entity.js'],
    });
    console.log('ENTITY', connectOpts);
    return createConnection(connectOpts);
}
