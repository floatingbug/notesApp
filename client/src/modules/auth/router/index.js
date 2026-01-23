import {
  SignUpView,
  SignInView,
  VerifyEmailView,
  VerifyEmailCallbackView,
	ForgotPasswordView,
	ResetPasswordView,
} from "../views";
import { AuthLayout } from "@/layouts/authLayout";

export default [
  {
    path: "/auth",
    component: AuthLayout,
    meta: {
      requiresGuest: true,
    },
    children: [
      {
        path: "signin",
        name: "auth.signin",
        component: SignInView,
      },
      {
        path: "signup",
        name: "auth.signup",
        component: SignUpView,
      },
      {
        path: "forgot-password",
        name: "auth.forgot-password",
        component: ForgotPasswordView,
      },
      {
        path: "reset-password",
        name: "auth.reset-password",
        component: ResetPasswordView,
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
