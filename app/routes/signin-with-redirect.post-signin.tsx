import * as amplify from "aws-amplify/auth";
import outputs from "../../amplify_outputs.json";



function singleSignOut() {
  // TODO! シングルサインアウトはこれだけだとうまくいっていない
  // [シングルサインアウトで SAML ユーザーをサインアウトする](https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/cognito-user-pools-saml-idp-sign-out.html)
  // [The managed login sign-out endpoint: /logout](https://docs.aws.amazon.com/cognito/latest/developerguide/logout-endpoint.html)
  const url = new URL("logout", `https://${outputs.auth.oauth.domain}/logout`);
  url.searchParams.append("client_id", outputs.auth.user_pool_client_id);
  url.searchParams.append("logout_uri", "http://localhost:5173/signin-with-redirect/post-signout");
  window.location.assign(url)
}

export default function PostSignin() {
  return <div>
    <p>ログインできました</p>
    <button onClick={async () => {
      amplify.signOut({ global: true });
    }}>アプリケーションのサインアウト</button>
    <button onClick={async () => {
      // amplify.signOut({ global: true });
      singleSignOut();
    }}>SSOのサインアウト</button>
  </div>;
}