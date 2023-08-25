import { rest } from "msw";
import serverApi from "@/mocks/handlers/serverApi";
import serverResponse from "@/mocks/handlers/serverResponse";

const userLogout = rest.post(serverApi("/logout"), async (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json(serverResponse("SUCCESS", "SUCCESS", "")),
    ctx.delay(100)
  );
});


export default userLogout;
