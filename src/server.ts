import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log(`🛢 Server is connect successfully`);

        app.listen(config.port, () => {
            console.log(`Application listening on port ${config.port},( http://localhost:5000/ )`);
        });
    } catch (error) {
        console.log(`Connection failed`, error);
    }
}

main();