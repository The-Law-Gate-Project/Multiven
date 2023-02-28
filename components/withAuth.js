import React, { useEffect } from "react";
import Router from "next/router";
import cookies from "next-cookies";

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { token } = cookies(props);
    useEffect(() => {
      if (!token) {
        Router.push("/");
      }
    }, [token]);

    return <Component {...props} />;
  };
}
