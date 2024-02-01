import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

type props = {
  component: any;
  path: string;
  exact: boolean;
};

const AuthRoute: React.FC<props> = ({
  component: Component,
  exact,
  ...rest
}) => {
  // Redux State
  const { user_detail } = useSelector((state: any) => state.user);

  return (
    <Route
      {...rest}
      exact
      render={(props) =>
        user_detail !== null ? (
          user_detail.role === "Admin" ? (
            <Redirect to="/admin/dashboard" />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
