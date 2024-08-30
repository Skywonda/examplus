import StudentProfile from "component/profile";
import Button from "component/button";
import Form from "component/form";

const Profile = () => {
  const profileData = {
    fullname: "Samuel Ayobami",
    matric_no: "CSC/28/234",
    level: "300 Level",
    course: "Software Engineering",
    department: "CSC",
    faculty: "Software Engineering",
  };
  return (
    <div>
      <h1>Profile</h1>
      <div className="border-2 flex gap-x-20">
        <div className="p-2">
          <img
            className="rounded-full h-[255px]"
            src="https://via.placeholder.com/300"
            alt="profile image"
          />
        </div>
        {/* <div className="p-2 pt-5">
          <div className="flex">
            <span className="w-24">Fullname</span>
            <p className="font-bold">Samuel Ayobami</p>
          </div>
          <div className="flex">
            <span className="w-24">Matric No</span>
            <p className="font-bold">CSC/28/234</p>
          </div>
          <div className="flex">
            <span className="w-24">Level</span>
            <p className="font-bold">300 Level</p>
          </div>
          <div className="flex">
            <span className="w-24">Course</span>
            <p className="font-bold">Software Engineering</p>
          </div>
          <div className="flex">
            <span className="w-24">Department</span>
            <p className="font-bold">Computer Science</p>
          </div>
          <div className="flex">
            <span className="w-24">Faculty</span>
            <p className="font-bold">Faculty of Science</p>
          </div>
        </div> */}
        <StudentProfile data={profileData} />
      </div>
      <BioData />
    </div>
  );
};

const BioData = () => {
  const handleSubmit = (values) => {
    // TODO: Implement actual form submission
    console.log("Form submitted:", values);
  };

  return (
    <div className="border-2 border-t-0">
      <Form
        enableReinitialize
        initialValues={{
          dateOfBirth: "",
          gender: "",
          email: "",
          phone: "",
          maritalStatus: "",
          stateOfOrigin: "",
          nationality: "",
          lgaOfOrigin: "",
          address: "",
          postalCode: "",
          degreeType: "",
          programme: "",
          nextOfKin: "",
          nokPhone: "",
          nokRelationship: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form.Element>
          <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
              Bio-data Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Field.Select
                label="Gender"
                name="gender"
                options={["Male", "Female", "Other"]}
              />
              <Form.Field.Input
                type="date"
                label="Date of Birth"
                name="dateOfBirth"
              />
              <Form.Field.Input label="E-mail" name="email" type="email" />
              <Form.Field.Input label="Phone-no" name="phone" type="tel" />
              <Form.Field.Select
                label="Marital Status"
                name="maritalStatus"
                options={["Single", "Married", "Divorced", "Widowed"]}
              />
              <Form.Field.Input label="Nationality" name="nationality" />
              <Form.Field.Input label="State of Origin" name="stateOfOrigin" />
              <Form.Field.Input label="LGA of Origin" name="lgaOfOrigin" />
              <Form.Field.Input label="Address" name="address" />
              <Form.Field.Input label="Postal Code" name="postalCode" />
              <Form.Field.Select
                label="Degree Type"
                name="degreeType"
                options={["Bachelor", "Master", "PhD"]}
              />
              <Form.Field.Input label="Programme" name="programme" />
              <Form.Field.Input label="Next of Kin" name="nextOfKin" />
              <Form.Field.Input
                label="Next of Kin Phone"
                name="nokPhone"
                type="tel"
              />
              <Form.Field.Input
                label="Relationship with next of kin"
                name="nokRelationship"
              />
            </div>
            <div className="mt-6">
              <Button type="submit" className="w-full">
                Update Profile
              </Button>
            </div>
          </div>
        </Form.Element>
      </Form>
    </div>
  );
};
export default Profile;
