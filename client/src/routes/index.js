// src/routes/index.js
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import Layout from 'component/layout';
import DashboardSvg from 'asset/svgs/dashboard';
import ExamSvg from 'asset/svgs/exam';
import ProfileSvg from 'asset/svgs/profile';
import ResultSvg from 'asset/svgs/result';
import ExamQuestions from 'exam/take-exam';
import LecturerLogin from 'manage/auth/login';
import LecturerRegister from 'manage/auth/signup';
import RootAuth from 'auth';
import StudentResult from 'result';
import StudentHomePage from 'dashboard';
import Loading from 'component/loading';
// import ExamQuestions from 'exam/questions';

const Profile = lazy(() => import('profile'));
const Exam = lazy(() => import('exam'));
const LecturerDashboard = lazy(() => import('manage/index'));
const CreateExam = lazy(() => import('manage/createExam'));
const Login = lazy(() => import('auth/login'));
const Register = lazy(() => import('auth/signup'));

const studentSidebarItems = [
  { name: 'Dashboard', icon: DashboardSvg, link: '/' },
  { name: 'Exam', icon: ExamSvg, link: '/exam' },
  { name: 'Results', icon: ResultSvg, link: '/results' },
  { name: 'Profile', icon: ProfileSvg, link: '/profile' },
];

const lecturerSidebarItems = [
  { name: 'Dashboard', icon: DashboardSvg, link: '/manage' },
  { name: 'Create Exam', icon: ExamSvg, link: '/manage/create-exam' },
  { name: 'Manage Exams', icon: ExamSvg, link: '/manage/exams' },
  { name: 'Profile', icon: ProfileSvg, link: '/manage/profile' },
];

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading message="component loading..." />}>
      <Routes>
        <Route path="/auth" element={<RootAuth />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/manage/login" element={<LecturerLogin />} />
        <Route path="/auth/manage/register" element={<LecturerRegister />} />

        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path='/exam/:id/questions' element={<ExamQuestions />} />
          <Route element={<Layout sidebarItems={studentSidebarItems} />}>
            <Route path="/" element={<StudentHomePage />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/results" element={<StudentResult />} />

          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['lecturer']} />}>
          <Route element={<Layout sidebarItems={lecturerSidebarItems} />}>
            <Route path="/manage" element={<LecturerDashboard />} />
            <Route path="/manage/create-exam" element={<CreateExam />} />
            {/* Add more lecturer routes as needed */}
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;