import { signInWithRedirect } from "aws-amplify/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Index(): React.ReactNode {
  const navigate = useNavigate();
  useEffect(() => {
    async function signin() {
      try {
        await signInWithRedirect({ provider: { custom: "SAMLCognitoDemoKeycloakIdp"}});
      } catch (error) {
        console.warn("[WARN] error signing in:", error);
        navigate("/signin-with-redirect/post-signin");
      }
    }
    signin();
  }, [navigate])
  return null;
};