import { serverHttp } from "./http";
import "./webSocket";

serverHttp.listen(process.env.PORT, () => {
  console.log("ta rodando na porta: " + process.env.PORT);
});
