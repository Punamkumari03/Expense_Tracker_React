import "./FirstPage.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { Button, Container, Nav, NavLink, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../../store/AuthSlice";
import { expenseActions } from "../../store/ExpenseSlice";
import { saveAs } from "file-saver";

const FirstPageDetails = () => {
  // const authCtx = useContext(AuthContext)
  const isPremium = useSelector((state) => state.expenses.showPremium);
  const receivedData = useSelector((state) => state.expenses.receivedData);
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const downloadExpenses = () => {
    // Create a CSV string from the received data
    const csv =
      "Category,Description,Amount\n" +
      Object.values(receivedData)
        .map(
          ({ category, description, amount }) =>
            `${category},${description},${amount}`
        )
        .join("\n");
    // Create a new blob with the CSV data
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "expenses.csv");
  };

  const premiumClickedHandler = () => {
    localStorage.setItem("twoButtons", true);
    window.location.reload();
  };
  const isPremiumClicked = localStorage.getItem("twoButtons") === "true";
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.setItem("twoButtons", false);
    localStorage.removeItem("dark or not");
  };
  const changeToDark = () => {
    dispatch(expenseActions.toogleDark());
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
          {!isAuthenticated && (
            <>
              <Nav.Link href="/login" className="login">
                Login
              </Nav.Link>

              <Nav.Link href="/signup" className="signup">
                SignUp
              </Nav.Link>
            </>
          )}
          {isAuthenticated && (
            <Nav.Link
              href="/login"
              className="font"
              style={{ color: "Red" }}
              onClick={logout}
            >
              LOGOUT
            </Nav.Link>
          )}
          { isAuthenticated && isPremium && !isPremiumClicked && (
            <NavLink to="/AddExpenseDetails" className="font" onClick={premiumClickedHandler} style={{ color: "Red" }}>
              Activate premium
            </NavLink>
          )}
          {isAuthenticated && isPremium && isPremiumClicked && (
            <NavLink
              className="font"
              to="/AddExpenseDetails"
              onClick={changeToDark}
            >
              Toggle dark/light theme
            </NavLink>
          )}
          {isAuthenticated && isPremium && isPremiumClicked && (
            <Button variant="primary" onClick={downloadExpenses}>
              Download Expenses
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default FirstPageDetails;
