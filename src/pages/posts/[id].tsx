import { useRouter } from "next/router";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

const fetchPost = async (id: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return response.json();
};

const fetchComments = async (postId: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  return response.json();
};

const addComment = async (comment: Comment): Promise<Comment> => {
  return new Promise<Comment>((resolve) => {
    setTimeout(() => {
      resolve(comment);
    }, 1000);
  });
};

const PostDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const {
    data: post,
    error: postError,
    isLoading: postLoading,
  } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id as string),
  });

  const {
    data: comments,
    error: commentsError,
    isLoading: commentsLoading,
  } = useQuery<Comment[]>({
    queryKey: ["comments", id],
    queryFn: () => fetchComments(id as string),
  });

  const mutation = useMutation<Comment, Error, Comment>({
    mutationFn: addComment,
    onSuccess: (newComment) => {
      // Actualizar la lista de comentarios localmente
      queryClient.setQueryData<Comment[]>(
        ["comments", id],
        (oldComments = []) => [...oldComments, newComment]
      );
    },
  });

  if (postLoading || commentsLoading) return <div>Cargando...</div>;
  if (postError) return <div>Error: {postError.message}</div>;
  if (commentsError) return <div>Error: {commentsError.message}</div>;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newComment = {
      id: Math.random(), // Simulando ID único
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      body: formData.get("body") as string,
    };
    mutation.mutate(newComment);
  };

  return (
    <Container className="container">
      <h1 className="my-4">{post?.title}</h1>
      <p>{post?.body}</p>
      <h2>Comentarios</h2>
      {comments?.map((comment) => (
        <div key={comment.id} className="mb-3 container">
          <h5>{comment.name}</h5>
          <p>{comment.body}</p>
          <small>{comment.email}</small>
        </div>
      ))}
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group controlId="name">
          <Form.Label>Nombre</Form.Label>
          <FormControl type="text" name="name" required />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Correo electronico</Form.Label>
          <FormControl type="email" name="email" required />
        </Form.Group>
        <Form.Group controlId="body">
          <Form.Label>Comentario</Form.Label>
          <FormControl as="textarea" name="body" rows={3} required />
        </Form.Group>
        <Button variant="secondary" type="submit" className="mt-3">
          Agregar Comentario
        </Button>
      </Form>
      <Button
        variant="secondary"
        onClick={() => router.push("/posts")}
        className="mt-4"
      >
        Volver a Publicaciones
      </Button>
    </Container>
  );
};

export default PostDetailPage;
