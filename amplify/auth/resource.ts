import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      // https://docs.amplify.aws/react/build-a-backend/auth/examples/microsoft-entra-id-saml/
      // Note: @aws-amplify/backendではHosted UIのドメインは自動生成されたもののみ利用可能
      // 例: 46c5da8fd11c53d8919f.auth.ap-northeast-1.amazoncognito.com
      //
      // metadataContentが必要なので、SAML IDPからMetadataを取得してから設定する
      // saml: {
      //   name: "DemoSAMLIdp",
      //   metadata: {
      //     metadataType: "FILE",
      //     metadataContent: "",
      //   }
      // },
      callbackUrls: ["http://localhost:5173/saml/response"],
      logoutUrls: ["http://localhost:5173/"],
    },
  },
  userAttributes: {
    preferredUsername: {
      required: true,
    }
  }
});