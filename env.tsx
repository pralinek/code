import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

const runtimeConfig = `
window.runtime_config = ${JSON.stringify(envConfig, null, 2)};
`;

const outputPath = path.resolve(__dirname, '../public/runtime-config.js');
fs.writeFileSync(outputPath, runtimeConfig);

console.log("✅ Runtime config generated in public/runtime-config.js");