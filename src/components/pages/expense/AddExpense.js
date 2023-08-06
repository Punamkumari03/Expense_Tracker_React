import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import "./AddExpense.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../../store/ExpenseSlice";

const AddExpense = () => {
  const dispatch = useDispatch();
  let totalAmount = 0;
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const [expenses, setExpenses] = useState([]);
  const [passExpense, setPassExpense] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  // const emailStoredInLocalStorage = localStorage.getItem("email");
  // const userEmail = emailStoredInLocalStorage
  //   ? emailStoredInLocalStorage.replace(/[^\w\s]/gi, "")
  //   : "";
const LoggedInEmail = useSelector((state)=> state.auth.userEmail);
const userEmail = LoggedInEmail.replace(/[@.]/g, "");
  const handleEditedUpdation = () => {
    const key = localStorage.getItem("keyToEdit");

    const editedExpense = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };
    axios
      .post(
        `https://expensetracker-c60cf-default-rtdb.firebaseio.com/${userEmail}.json`,
        editedExpense
      )
      .then((res) => {
        console.log(res.data);
        setExpenses([...expenses, editedExpense]);
        setIsEditing(false);
      })
      .catch((err) => {
        console.log("error updating:", err);
      });
    amountRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();

    const expenseList = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };
    // setExpenses([...expenses, expenseList]);

    axios
      .post(
        `https://expensetracker-c60cf-default-rtdb.firebaseio.com/${userEmail}.json`,
        expenseList
      )
      .then((res) => {
        console.log(res);
        setExpenses([...expenses, expenseList]);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(expenseList);
    amountRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  };
  const handleDelete = (key) => {
    axios
      .delete(
        `https://expensetracker-c60cf-default-rtdb.firebaseio.com/${userEmail}/${key}.json`
      )
      .then((res) => {
        console.log("expense successfully deleted");
        const updateExpense = { ...passExpense };
        delete updateExpense[key];
        setPassExpense(updateExpense);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEdit = (key) => {
    localStorage.setItem("keyToEdit", key);
    setIsEditing(true);
    axios
      .get(
        `https://expensetracker-c60cf-default-rtdb.firebaseio.com/${userEmail}/${key}.json`
      )
      .then((res) => {
        amountRef.current.value = res.data.amount;
        descriptionRef.current.value = res.data.description;
        categoryRef.current.value = res.data.category;
        handleDelete(key);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(
        `https://expensetracker-c60cf-default-rtdb.firebaseio.com/${userEmail}.json`
      )
      .then((res) => {
        if (res.data) {
          // setExpenses(Object.values(res.data));
          setPassExpense(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [expenses]);
  {
    Object.keys(passExpense).forEach((key) =>{
      totalAmount += passExpense[key].amount
    })
  }
  if(totalAmount>10000){
    dispatch(expenseActions.premium());
  }else{
    dispatch(expenseActions.notPremium());
  }
  return (
    <div>
      <div className="expense">
        <h2 className="text-center">Daily Expense Tracker</h2>
        <Form onSubmit={handleSubmit} className="container">
          <Form.Group controlId="amount">
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              type="number"
              placeholder="amount"
              ref={amountRef}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              placeholder="description"
              ref={descriptionRef}
              required
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category:</Form.Label>
            <Form.Select as="select" ref={categoryRef} required>
              <option value="">--Choose Category--</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
            </Form.Select>
          </Form.Group>
          <div className="text-center">
            {!isEditing && (
              <Button variant="primary" type="submit" className="mt-3">
                Add Expense
              </Button>
            )}
            {isEditing && (
              <Button variant="primary" type="submit" className="mt-3" onClick={handleEditedUpdation}>
                update Expense
              </Button>
            )}
          </div>{" "}
        </Form>{" "}
      </div>
      <h3 className="text-center mt-1 text-white">Expenses</h3>
      <Table striped bordered hover variant="light" className="container">
        <thead>
          <tr>
          <th>S.No</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Modification</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(passExpense).map((key, index) => (
            <tr key={key}>
            <td>{index +1}</td>
              <td>{passExpense[key].amount}</td>
              <td>{passExpense[key].description}</td>
              <td>{passExpense[key].category}</td>
              <td>
                <Button className="m-3" onClick={()=> handleEdit(key)}>Edit</Button>
                <Button variant="danger" onClick={()=>handleDelete(key)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h1 className="text-black">total Amount:{totalAmount}.00</h1>
    </div>
  );
};

export default AddExpense;
