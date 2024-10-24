import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form, Table } from "react-bootstrap";

const Users = () => {
  const { users, addUser, deleteUser, updateUser } = useContext(UserContext);

  const [update, setUpdate] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [currentName, setCurrentName] = useState(null);
  const [currentAge, setCurrentAge] = useState(null);

  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);

  const nameRef = useRef(null);
  const ageRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = Date.now();
    const user = {
      id,
      name,
      age,
    };

    addUser(user);
    nameRef.current.value = "";
    ageRef.current.value = "";
  };

  const handleEdit = (user) => {
    setUpdate(true);
    setCurrentId(user.id);
    setCurrentName(user.name);
    setCurrentAge(user.age);
    nameRef.current.value = user.name;
    ageRef.current.value = user.age;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser(currentId, currentName, currentAge);
    setCurrentId(null);
    setCurrentName(null);
    setCurrentAge(null);
    setName(null);
    setAge(null);
    setUpdate(false);

    nameRef.current.value = "";
    ageRef.current.value = "";
  };

  return (
    <Container>
      <h1 className="text-center mt-5 fw-bold">React.js Context API CRUD</h1>

      {update ? (
        <Form onSubmit={handleUpdate}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setCurrentName(e.target.value)}
              ref={nameRef}
              type="text"
              value={currentName}
              placeholder="Enter Name"
              required
            />

            <Form.Label>Age</Form.Label>
            <Form.Control
              onChange={(e) => setCurrentAge(e.target.value)}
              ref={ageRef}
              type="number"
              value={currentAge}
              placeholder="Enter Age"
              required
            />
          </Form.Group>
          <br />
          <Button type="submit">Update User</Button>
        </Form>
      ) : (
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="mt-3">Name</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                ref={nameRef}
                type="text"
                placeholder="Enter Name"
                required
              />

              <Form.Label className="mt-3">Age</Form.Label>
              <Form.Control
                onChange={(e) => setAge(e.target.value)}
                ref={ageRef}
                type="number"
                placeholder="Enter Age"
                required
              />
            </Form.Group>
            <br />
            <Button type="submit">Add User</Button>
          </Form>
          <Table className="mt-5" striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Update User</th>
                <th>Delete User</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>
                      <Button onClick={() => handleEdit(user)}>Edit</Button>
                    </td>
                    <td>
                      <Button onClick={() => deleteUser(user.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default Users;
