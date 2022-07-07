import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button, Col, Container, Placeholder, Row, Table } from 'react-bootstrap';
import axios from 'axios';
import { IUser } from './types/types';
import UserRow from './components/UserRow';
import UserHeader from './components/UserHeader';
import { InView } from 'react-intersection-observer';



function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    fetchUsers();
  }, [])

  const loadMore = (e: boolean) => {
    if (e) {
      setCurrentPage(currentPage + 1);
      fetchUsers();
    }
  }


  async function fetchUsers() {
    try {
      const response = await axios.get<IUser[]>(`http://localhost:3000/users?_page=${currentPage}&_limit=20`);
      setUsers([...users, ...response.data]);

    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <h1 className="my-3 text-center">Таблица пользователей</h1>
          </Col>
          <Col xs={12} md={6}>
            <Button className='my-3' variant="outline-primary">Добавить пользователя</Button>
          </Col>
          <Table striped bordered hover responsive="lg">
            <thead>
              <UserHeader users={users} />
            </thead>
            <tbody>
              {users.map((user: IUser) => {
                return <UserRow user={user} />
              })}
            </tbody>
          </Table>
          <InView rootMargin="88px" onChange={loadMore} threshold={1}>
            <div className="loader">Loading...</div>
          </InView>
        </Row>
      </Container>

    </div>
  );
}

export default App;
