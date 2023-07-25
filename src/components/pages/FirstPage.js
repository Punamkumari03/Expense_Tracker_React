
import './FirstPage.css'
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { Container, Nav, NavLink, Navbar } from 'react-bootstrap';




const FirstPageDetails = () => {
  const authCtx = useContext(AuthContext)

  const logout = () => {
    authCtx.logout();
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
          {!authCtx.isLoggedIn && (
            <>
              <Nav.Link href='/login' className='login'>
                Login
              </Nav.Link>

              <Nav.Link href="/signup" className='signup'>
                SignUp
              </Nav.Link>
            </>
          )}
          {authCtx.isLoggedIn && (
            <Nav.Link
              href="/login"
              className='font'
              style={{ color: "Red" }}
              onClick={logout}
            >
              LOGOUT
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default FirstPageDetails;