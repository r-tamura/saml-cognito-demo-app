import { defineAuth } from '@aws-amplify/backend';
import * as fs from "node:fs";

/**
 *
 * If saml-idp-metadata.xml exists, define an external SAML provider.
 */
function defineSamlProviderIfSamlIdpMetadataExists() {
  let samlIdpMetadata: string | undefined = undefined;
  try {
    samlIdpMetadata = fs.readFileSync("./saml-idp-metadata.xml", "utf-8");
  } catch {
    console.info("SAML IDP Metadata file not found.");
    console.info("Run SAML IdP and get metadata, then save it as 'saml-idp-metadata.xml' at the root of the project.");
    console.info("Read README.md for more information.");
  }

  if (!samlIdpMetadata) {
    return undefined;
  }

  return {
    name: "SAMLCognitoDemoKeycloakIdp",
    metadata: {
      metadataType: "FILE",
      metadataContent: samlIdpMetadata,
    },
    attributeMapping: {
      // [Cognito User Poolの属性名]: [SAML Attribute]
      custom: {
        preferred_username: "username",
        email: "email",
      }
    }
  } as const;
}


export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      // SAML IdPとの連携のセットアップは以下のドキュメントが参考になります
      // https://docs.amplify.aws/react/build-a-backend/auth/examples/microsoft-entra-id-saml/
      // Note: @aws-amplify/backendではHosted UIのドメインは自動生成されたもののみ利用可能
      // 例: 46c5da8fd11c53d8919f.auth.ap-northeast-1.amazoncognito.com
      saml: defineSamlProviderIfSamlIdpMetadataExists(),
      callbackUrls: ["http://localhost:5173/signin-with-redirect/post-signin"],
      logoutUrls: ["http://localhost:5173/"],
    },
  },
  userAttributes: {
    preferredUsername: {
      required: true,
    }
  }
});