import { Link } from "react-router";

export default function PostSignout() {
  return <div>
    <p>サインアウトしました</p>
    <Link to="/">もう一度サインイン</Link>
  </div>;
}