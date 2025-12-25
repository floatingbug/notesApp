import {SignUpView, SignInView, VerifyEmailView, VerifyEmailCallbackView} from "../views";
import {AuthLayout} from "../layouts";

export default [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "signin",
        component: SignInView,
      },
      {
        path: "signup",
        component: SignUpView,
      },
      {
        path: "verify-email",
        name: "verify-email",
        component: VerifyEmailView,
      },
      {
        path: "verify-email/callback",
        name: "verify-email-callback",
        component: VerifyEmailCallbackView,
      },
    ],
  },
];
