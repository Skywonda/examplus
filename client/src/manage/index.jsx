import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "component/ui/card";
import { Button } from "component/ui/button";

const LecturerDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lecturer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Exam</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Create a new examination for your course.</p>
            <Link to="create-exam">
              <Button>Create Exam</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">View and manage your existing exams.</p>
            <Link to="/manage-exams">
              <Button variant="outline">View Exams</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Review Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Review student exam results and performance.</p>
            <Link to="/review-results">
              <Button variant="outline">View Results</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LecturerDashboard;
