import { getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

export const setupAuth = () => {
  Hub.listen("auth", async ({ payload }) => {
    switch (payload.event) {
      case "signInWithRedirect": {
        const user = await getCurrentUser();
        console.log(user.username);
        break;
      }
      case "signInWithRedirect_failure":
        // handle sign in failure
        break;
      case "customOAuthState": {
        const state = payload.data; // this will be customState provided on signInWithRedirect function
        console.log(state);
        break;
      }
    }
  });
}


