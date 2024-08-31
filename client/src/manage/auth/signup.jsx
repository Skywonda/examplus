import Form from "component/form";
import Button from "component/button";
import AuthLayout from "./layout";
import { Link, useNavigate } from "react-router-dom";
import { api } from "utils/api";
import { useAuth } from "hooks/useAuth";

const LecturerRegister = () => {
  const navigate = useNavigate();
  const { mutateAsync, isError, error, isSuccess, data, isLoading } =
    api.usePost("/auth/register");
  const { login } = useAuth();

  const handleSubmit = async (data) => {
    data.type = "LECTURER";
    await mutateAsync(data);
  };

  if (isError) {
    console.log(error);
  }
  if (isSuccess) {
    login(data);
    navigate("/manage");
  }
  return (
    <AuthLayout
      title={"Create an account"}
      description={"Fill the details below to create an account"}
    >
      <Form
        enableReinitialize
        initialValues={{
          name: "",
          email: "",
          lecturerId: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form.Element>
          <Form.Field.Input
            name={"name"}
            label={"Fullname"}
            placeholder="John Doe"
            className="h-[72px]"
          />
          <Form.Field.Input
            name={"email"}
            label={"E-mail"}
            placeholder="johndoe@gmail.com"
            className="h-[72px]"
          />
          <Form.Field.Input
            name={"lecturerId"}
            label={"Matric no/Lecturer ID"}
            className="h-[72px]"
            placeholder="CSC/22/044"
          />
          <Form.Field.Input
            name={"password"}
            label={"Password"}
            className="h-[72px]"
          />
          <Button
            className="w-full h-[70px] mt-5"
            type="submit"
            isWorking={isLoading}
          >
            Register
          </Button>
        </Form.Element>
      </Form>
      <div className="w-full h-[70px] mt-0 px-10 flex justify-between items-center">
        <p className="text-[#777777] text-center">Already have an account?</p>
        <Link to="/auth/manage/login" className="text-[#FF6501] font-medium">
          Login to you account
        </Link>
      </div>
    </AuthLayout>
  );
};

export default LecturerRegister;
