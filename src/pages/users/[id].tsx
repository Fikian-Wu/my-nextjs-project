import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

const fetchUser = async (id: string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return response.json();
};

const UserDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = useQuery<User>({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id as string),
  });

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <h1 className="my-4">{data?.name}</h1>
      <p>Nombre de usuario: {data?.username}</p>
      <p>Correo electronico: {data?.email}</p>
      <p>Telefono: {data?.phone}</p>
      <p>Sitio web: {data?.website}</p>
      <p>Direccion: {data?.address.street}, {data?.address.city}</p>
      <Button variant="secondary" onClick={() => router.push('/users')}>
        Volver a Usuarios
      </Button>
    </Container>
  );
};

export default UserDetailPage;
