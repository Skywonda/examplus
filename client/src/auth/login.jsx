import Form from "component/form";
import { Checkbox } from "component/ui/checkbox";
import Button from "component/button";
import AuthLayout from "./layout";
import { Link, useNavigate } from "react-router-dom";
import { api } from "utils/api";
import { useAuth } from "hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { mutate, isError, error, isSuccess, data, isLoading } =
    api.usePost("/auth/login");
  const { login, ensureIsNotAuthenticated } = useAuth();
  const urlParams = new URLSearchParams(window.location.search);
  const userType = urlParams.get("userType") || "STUDENT";
  const handleSubmit = (data) => {
    data.type = userType.toUpperCase();
    mutate(data);
  };
  if (isError) {
    console.log(error);
  }
  if (isSuccess) {
    login(data);
    if (userType === "lecturer") {
      navigate("/manage");
    } else {
      navigate("/");
    }
  }
  ensureIsNotAuthenticated();
  return (
    <AuthLayout
      title={"Welcome back!"}
      description={"Please enter your matric no and password"}
    >
      <Form
        enableReinitialize
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form.Element>
          {isError && (
            <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">
                {error.response?.data?.message}
              </span>
            </div>
          )}
          <Form.Field.Input
            name={"email"}
            label={"Matric no/E-mail"}
            className="h-[72px]"
          />
          <Form.Field.Input
            name={"password"}
            label={"Password"}
            className="h-[72px]"
            // type="password"
          />
          <div className="flex justify-between text-xs mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember-me" />
              <label
                htmlFor="remember-me"
                className="font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <label>Forgot password?</label>
          </div>
          <Button
            type="submit"
            className="w-full h-[70px] mt-5"
            isWorking={isLoading}
          >
            Login
          </Button>
          <div className="w-full h-[70px] mt-0 px-10 flex justify-between items-center">
            <p className="text-[#777777] text-center">Don't have an account?</p>
            <Link to="/auth/register" className="text-[#FF6501] font-medium">
              Create an Account
            </Link>
          </div>
        </Form.Element>
      </Form>
    </AuthLayout>
  );
};

export default Login;
