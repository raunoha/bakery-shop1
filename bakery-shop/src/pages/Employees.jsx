import { useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import config from '../data/config.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const idRef = useRef();
  const emailRef = useRef();
  const first_nameRef = useRef();
  const last_nameRef = useRef();
  const avatarRef = useRef();

  useEffect(() => {
    fetch(config.employeesDbUrl)
      .then((res) => res.json())
      .then((json) => {
        setEmployees(json.data || []);
      })
      
  }, []);

  const addEmployee = () => {
    const newEmployee = {
      id: idRef.current.value,
      first_name: first_nameRef.current.value,
      last_name: last_nameRef.current.value,
      email: emailRef.current.value,
      avatar: avatarRef.current.value,
    };
    
    if (!newEmployee.id) {
      toast.warning("ID is required.");
      return;
    }

    if (!newEmployee.first_name) {
      toast.error("First Name is required.");
      return;
    }

    if (!newEmployee.last_name) {
      toast.error("Last Name is required.");
      return;
    }

    if (!newEmployee.email) {
      toast.warning("Email is required.");
      return;
    }

    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    
  };

  const deleteEmployee = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
  };

  

  return (
    <div>
      <ToastContainer className={"toasty"} position="top-right" />
      <div className="container">
        <h2 className="mb-4">Employees</h2>
        <Table className="table table-hover table-bordered table-sortable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Avatar</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.email}</td>
                <td><img src={employee.avatar} alt="avatar" className="avatar-img" /></td>
                <td>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            <tr className="input-row">
              <td>
                <input type="text" placeholder="ID" className="form-control" ref={idRef} />
              </td>
              <td>
                <input type="text" placeholder="First Name" className="form-control" ref={first_nameRef} />
              </td>
              <td>
                <input type="text" placeholder="Last Name" className="form-control" ref={last_nameRef} />
              </td>
              <td>
                <input type="text" placeholder="Email" className="form-control" ref={emailRef} />
              </td>
              <td><input type="text" placeholder="Avatar" className="form-control" ref={avatarRef}  /></td>
              <td>
                <Button type="submit" variant="success" onClick={addEmployee}>
                  Add
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Employees;
