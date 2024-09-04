import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Divider,
  Icon,
  Table,
  Modal,
  Header,
} from "semantic-ui-react";
import MenuSistema from "../menuSistema/MenuSistema";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListCategoriaProduto() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios
      .get("http://localhost:8081/api/categoriaproduto")
      .then((response) => {
        setLista(response.data);
      })
      .catch((error) => {
        console.log("Erro ao carregar a lista de categorias.");
      });
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  async function remover() {
    await axios
      .delete("http://localhost:8081/api/categoriaproduto/" + idRemover)
      .then((response) => {
        console.log("Categoria removida com sucesso.");
        axios.get("http://localhost:8081/api/categoriaproduto").then((response) => {
          setLista(response.data);
        });
      })
      .catch((error) => {
        console.log("Erro ao remover uma categoria.");
      });
    setOpenModal(false);
  }

  return (
    <div>
      <MenuSistema />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Categorias </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-categoria"
            />
            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Descrição</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {lista.map((categoria) => (
                  <Table.Row key={categoria.descricao}>
                    <Table.Cell>{categoria.descricao}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste produto"
                        icon
                      >
                        <Link
                          to="/form-categoria"
                          state={{ idCategoria: categoria.id }}
                          style={{ color: "green" }}
                        >
                          <Icon name="edit" />
                        </Link>
                      </Button>{" "}
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover este produto"
                        icon
                        onClick={() => confirmaRemover(categoria.id)}
                      >
                        <Icon name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <Modal
            basic
            onClose={() => setOpenModal(false)}
            onOpen={() => setOpenModal(true)}
            open={openModal}
          >
            <Header icon>
              <Icon name="trash" />
              <div style={{ marginTop: "5%" }}>
                Tem certeza que deseja remover esse registro?
              </div>
            </Header>
            <Modal.Actions>
              <Button basic color="red" inverted onClick={() => setOpenModal(false)}>
                <Icon name="remove" /> Não
              </Button>
              <Button color="green" inverted onClick={() => remover()}>
                <Icon name="checkmark" /> Sim
              </Button>
            </Modal.Actions>
          </Modal>
        </Container>
      </div>
    </div>
  );
}
