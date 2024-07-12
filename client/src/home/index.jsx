import { Routes, Route } from "react-router-dom";
import Exam from "../exam";
import Footer from "../component/footer";
import SideBar from "../component/sidebar";
import Header from "../component/header";

function Home() {
  return (
    <>
      <Header />
      <div className="flex w-full">
        <div className="w-full lg:w-[30%] xl:w-[20%]">
          <SideBar />
        </div>
        <div className="flex-grow w-5/6 hidden md:block">
          <div className="px-5">
            <Routes>
              <Route path="/exam" element={<Exam />} />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
