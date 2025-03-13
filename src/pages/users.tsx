import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Container, Row, Col, Card, Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
};

const UsersPage = () => {
  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  const [filter, setFilter] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredUsers = data?.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase()) ||
    user.username.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <h1 className="my-4">Usuarios</h1>
      <Form className="mb-4">
        <FormControl
          type="text"
          placeholder="Filtrar por nombre o nombre de usuario"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Form>
      <Row>
        {filteredUsers?.map(user => (
          <Col key={user.id} sm={6} md={4} lg={3}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{user.username}</Card.Subtitle>
                <Card.Text>{user.email}</Card.Text>
                <Button variant="secondary" href={`/users/${user.id}`}>
                  Ver Detalles
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UsersPage;
