"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const child_process_1 = require("child_process");
const restore = (0, child_process_1.spawnSync)('psql', [
    `--dbname=${process.env.POSTGRES_DB}`,
    `--port=${process.env.POSTGRES_PORT ?? '5432'}`,
    `--host=${process.env.POSTGRES_HOST ?? 'localhost'}`,
    `--username=${process.env.POSTGRES_USER}`,
    `--file=data.sql`,
], {
    stdio: 'inherit',
    env: {
        ...process.env,
        PGPASSWORD: process.env.POSTGRES_PASSWORD,
    },
});
if (restore.error) {
    console.error(restore.error);
    process.exit(1);
}
//# sourceMappingURL=restore.js.map