import { Server } from "http";
import app from "./app";
import { config } from "./app/config";

let server: Server;

const main = async () => {
  server = app.listen(config.port, () => {
    console.log("CRM Server Running on port: ", config.port);
  });
};

main();
