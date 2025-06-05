import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <div className="w-full min-h-full flex justify-center items-center">
        <div>
          <span className="loading loading-dots loading-xs"></span>
          <span className="loading loading-dots loading-sm"></span>
          <span className="loading loading-dots loading-md"></span>
          <span className="loading loading-dots loading-lg"></span>
          <span className="loading loading-dots loading-xl"></span>
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/auth" />;
  } else {
    return children;
  }
};

export default PrivateRoute;
