import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import axios from 'axios';
import { IUser } from './types/types';
import UserRow from './components/UserRow';
import UserHeader from './components/UserHeader';
import { InView } from 'react-intersection-observer';
import UserModal from './components/UserModal';



function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [maxPage, setmaxPage] = useState(0);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [])

  const loadMore = (e: boolean) => {
    if (e) {
      setCurrentPage(currentPage + 1);
      fetchUsers();
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }


  async function fetchUsers(toFirstPage?: boolean) {
    try {
      const response = await axios.get<IUser[]>(`http://localhost:3000/users?_page=${toFirstPage ? 1 : currentPage}&_limit=20`);

      if (toFirstPage) {
        setUsers([...response.data])
        parseInt(response.headers['x-total-count'], 10) > 20 ? setCurrentPage(2) : setCurrentPage(1)
      }
      else {
        setUsers([...users, ...response.data])
        setCurrentPage(currentPage + 1)
      }

      setmaxPage(parseInt(response.headers['x-total-count'], 10))

    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="App">
      <Container className={showModal ? '_fixed' : ''}>
        <Row>
          <Col xs={12} >
            <h1 className="my-3 text-center">User Table</h1>
          </Col>
          <Col className='d-flex justify-content-center' xs={12}>
            <Button onClick={() => setShowModal(true)} className='my-3' variant="outline-primary">Add user</Button>
          </Col>
          <Table striped bordered hover responsive="lg">
            <thead>
              <UserHeader users={users} />
            </thead>
            <tbody>
              {users.map((user: IUser) => {
                return <UserRow key={user.id} user={user} />
              })}
            </tbody>
          </Table>
          {users.length < maxPage ?
            <InView className='mt-2' rootMargin="88px" onChange={loadMore} threshold={1}>
              <div className="loader"></div>
            </InView>
            :
            <></>
          }
        </Row>
      </Container>
      {showModal && <UserModal updateUserList={(toFirstPage) => fetchUsers(toFirstPage)} closeModal={closeModal} users={users} />}
    </div>
  );
}

export default App;
