import Form from "component/form";
import Button from "component/button";
import AuthLayout from "./layout";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <AuthLayout>
      <Form
        enableReinitialize
        initialValues={{
          fullname: "",
          email: "",
          "matric-no": "",
          "user-type": [],
          password: "",
        }}
        onSubmit={(value) => console.log(value)}
      >
        <Form.Element>
          <Form.Field.Input
            name={"fullname"}
            label={"Fullname"}
            placeholder="Ajayi Damilola"
            className="h-[72px]"
          />
          <Form.Field.Input
            name={"email"}
            label={"E-mail"}
            placeholder="johndoe@gmail.com"
            className="h-[72px]"
          />
          <Form.Field.Input
            name={"matric-no"}
            label={"Matric no"}
            className="h-[72px]"
            placeholder="CSC/22/044"
          />
          <Form.Field.Select
            name={"user-type"}
            label="User Type"
            className="h-[72px]"
            options={["Lecturer", "Student"]}
          />
          <Form.Field.Input
            name={"password"}
            label={"Password"}
            className="h-[72px]"
          />
          <Button className="w-full h-[70px] mt-5" type="submit">
            Register
          </Button>
        </Form.Element>
      </Form>
      <div className="w-full h-[70px] mt-0 px-10 flex justify-between items-center">
        <p className="text-[#777777] text-center">Already have an account?</p>
        <Link to="/auth/login" className="text-[#FF6501] font-medium">
          Login to you account
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
