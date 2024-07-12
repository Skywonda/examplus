import React from "react";
import logo from "../asset/logo.png";
import { Card, CardContent } from "component/ui/card";

const AuthLayout = ({ children, title, description }) => {
  return (
    <div>
      <div className="h-[95px] border-b"></div>
      <div className="flex items-center justify-center p-5">
        <img src={logo} alt="logo" className="w-[67px] h-[44px]" />
        <span to={""}>
          <h1 className="text-3xl font-bold">Examplus</h1>
        </span>
      </div>
      <div className="flex h-auto mt-5 w-screen items-center justify-center">
        <div>
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <div className="flex items-center justify-center p-2 text-xs">
            <p>{description}</p>
          </div>
          <Card className="w-full md:w-[700px] border-2 py-4">
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
