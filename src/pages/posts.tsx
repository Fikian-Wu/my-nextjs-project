import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

// Definir la interfaz para un Post
interface Post {
  id: number;
  title: string;
  body: string;
}

// Función para obtener publicaciones de la API
const fetchPosts = async (page: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=6`
  );
  return response.json();
};

const PostsPage = () => {
  // Estado para la página actual
  const [page, setPage] = useState(1);

  // Estado para el filtro de título y el orden
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Obtener las publicaciones de la API con useQuery, pasando la página como dependencia
  const { data, error, isLoading } = useQuery<Post[]>({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
  });

  // Filtrar y ordenar las publicaciones
  const filteredPosts = data
    ?.filter((post) => post.title.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  // Función para manejar el cambio a la siguiente página
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Función para manejar el cambio a la página anterior
  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <h1 className="my-4">Publicaciones</h1>
      <Form className="mb-4">
        {/* Campo de texto para filtrar por título */}
        <FormControl
          type="text"
          placeholder="Filter by title"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {/* Botón para cambiar el orden */}
        <Button
          className="mt-2"
          variant="secondary"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Ordenar por título ({sortOrder === "asc" ? "Descendente" : "Ascendente"}
          )
        </Button>
      </Form>
      <Row className="card-container">
        {filteredPosts?.map((post) => (
          <Col key={post.id} sm={12} md={6} lg={4}>
            <Card className="card">
              <Card.Body className="card-body">
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
                {/* Botón para ver los detalles de la publicación */}
                <Button variant="secondary" href={`/posts/${post.id}`}>
                  Ver Detalles
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* Controles de paginación */}
      <div className="d-flex justify-content-between">
        <Button
          variant="secondary"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Anterior
        </Button>
        <Button variant="secondary" onClick={handleNextPage}>
          Siguiente
        </Button>
      </div>
    </Container>
  );
};

export default PostsPage;
