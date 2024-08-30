import Form from "component/form";
import { Checkbox } from "component/ui/checkbox";
import Button from "component/button";
import AuthLayout from "./layout";
import { Link, useNavigate } from "react-router-dom";
import { api } from "utils/api";
import { useAuth } from "hooks/useAuth";

const LecturerLogin = () => {
  const navigate = useNavigate();
  const { mutate, isError, error, isSuccess, data } =
    api.usePost("/auth/login");
  const { login, ensureIsNotAuthenticated } = useAuth();
  const handleSubmit = (data) => {
    data.type = "LECTURER";
    mutate(data);
  };
  if (isError) {
    console.log(error);
  }
  if (isSuccess) {
    login(data);
    navigate("/manage");
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
            <div className="text-red-500 text-center mb-4">
              {error.response?.data?.message}
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
          <Button type="submit" className="w-full h-[70px] mt-5">
            Login
          </Button>
          <div className="w-full h-[70px] mt-0 px-10 flex justify-between items-center">
            <p className="text-[#777777] text-center">Don't have an account?</p>
            <Link
              to="/auth/manage/register"
              className="text-[#FF6501] font-medium"
            >
              Create an Account
            </Link>
          </div>
        </Form.Element>
      </Form>
    </AuthLayout>
  );
};

export default LecturerLogin;
