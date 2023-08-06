import "./FirstPage.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { Container, Nav, NavLink, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/AuthSlice";

const FirstPageDetails = () => {
  // const authCtx = useContext(AuthContext)
  const isPremium = useSelector((state) => state.expenses.showPremium);
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuththenticated = useSelector((state) => state.auth.islogged);

  const logout = () => {
    dispatch(authActions.logout());
  };

  return (
    <Navbar
      bg="white"
      expand="lg"
      variant="light"
      className="border border-white mt-2 "
    >
      <Navbar.Brand style={{ fontSize: "xx-large", marginLeft: "2rem" }}>
        ExpenseTracker App
      </Navbar.Brand>
      <Container className="justify-content-center ">
        <Nav>
          {!isAuththenticated && (
            <>
              <Nav.Link href="/login" className="login">
                Login
              </Nav.Link>

              <Nav.Link href="/signup" className="signup">
                SignUp
              </Nav.Link>
            </>
          )}
          {isAuththenticated && (
            <Nav.Link
              href="/login"
              className="font"
              style={{ color: "Red" }}
              onClick={logout}
            >
              LOGOUT
            </Nav.Link>
          )}
          {isPremium && (
            <NavLink to="/premium" className="font" style={{ color: "Red" }}>
              Activate premium
            </NavLink>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default FirstPageDetails;
