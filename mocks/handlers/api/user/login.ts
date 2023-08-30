import { rest } from "msw";
import serverApi from "@/mocks/handlers/serverApi";
import serverResponse from "@/mocks/handlers/serverResponse";

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  },
};

type LoginData = {
  username: string;
  password: string;
};

const userLogin = rest.post(serverApi("/login"), async (req, res, ctx) => {
  const type = req.url.searchParams.get("type");
  console.log("login type: " + type);

  const data = await req.json<LoginData>();
  // console.log("login data: ");
  // console.log(data);
  // console.log(data.username);

  if (data.username == "") {
    return res(
      ctx.status(200),
      ctx.json(serverResponse("FAILURE", "Account and password are incorrect.", "")),
      ctx.delay(100)
    );
  }

  switch (data.username) {
    case "admin":
      return res(
        ctx.status(200),
        ctx.json(serverResponse("SUCCESS", "SUCCESS", tokens.admin.token)),
        ctx.delay(100)
      );
    case "editor":
      return res(
        ctx.status(200),
        ctx.json(serverResponse("SUCCESS", "SUCCESS", tokens.editor.token)),
        ctx.delay(100)
      );
    default:
      return res(
        ctx.status(200),
        ctx.json(serverResponse("FAILURE", "Account and password are incorrect.", "")),
        ctx.delay(100)
      );
  }
});


export default userLogin;
