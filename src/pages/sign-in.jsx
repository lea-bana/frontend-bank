import FormLogin from "../components/FormLogin";
import React from "react";

function SignIn() {
    return (
        <main className="main bg-dark">
          <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <FormLogin />
          </section>
        </main>
    )
}

export default SignIn