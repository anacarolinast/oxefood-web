import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from "semantic-ui-react";
import MenuSistema from "../menuSistema/MenuSistema";

export default function ListEnderecoCliente() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    carregarLista();
  }, [id]);

  function carregarLista() {
    axios.get(`http://localhost:8080/api/cliente/${id}`)
      .then((response) => {
        setLista(response.data.enderecos || []);
      })
      .catch(error => {
        console.error("Erro ao carregar a lista de endereços:", error);
        setLista([]);
      });
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  async function remover() {
    try {
      await axios.delete(`http://localhost:8080/api/cliente/endereco/${idRemover}`);
      console.log('Endereço removido com sucesso.');
      carregarLista(); 
    } catch (error) {
      console.error('Erro ao remover o endereço:', error);
    } finally {
      setOpenModal(false);
    }
  }

  return (
    <div>
      <MenuSistema />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign='justified'>
          <h2>Endereços</h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label='Novo'
              circular
              color='orange'
              icon='clipboard outline'
              floated='right'
              as={Link}
              to={`/form-endereco-cliente`}
            />
            <br />
            <br />
            <br />

            <Table color='orange' sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Rua</Table.HeaderCell>
                  <Table.HeaderCell>Número</Table.HeaderCell>
                  <Table.HeaderCell>Bairro</Table.HeaderCell>
                  <Table.HeaderCell>CEP</Table.HeaderCell>
                  <Table.HeaderCell>Cidade</Table.HeaderCell>
                  <Table.HeaderCell>UF</Table.HeaderCell>
                  <Table.HeaderCell>Complemento</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((endereco) => (
                  <Table.Row key={endereco.id}>
                    <Table.Cell>{endereco.rua}</Table.Cell>
                    <Table.Cell>{endereco.numero}</Table.Cell>
                    <Table.Cell>{endereco.bairro}</Table.Cell>
                    <Table.Cell>{endereco.cep}</Table.Cell>
                    <Table.Cell>{endereco.cidade}</Table.Cell>
                    <Table.Cell>{endereco.uf}</Table.Cell>
                    <Table.Cell>{endereco.complemento}</Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Button
                        inverted
                        circular
                        color='green'
                        title='Clique aqui para editar os dados deste endereço'
                        icon
                      >
                        <Link to={`/form-endereco-cliente`} state={{ idEndereco: endereco.id, idCliente: id }} style={{ color: "green" }}>
                          <Icon name='edit' />
                        </Link>
                      </Button>{" "}
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color='red'
                        title='Clique aqui para remover este endereço'
                        icon
                        onClick={() => confirmaRemover(endereco.id)}
                      >
                        <Icon name='trash' />
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
              <Icon name='trash' />
              <div style={{ marginTop: '5%' }}>Tem certeza que deseja remover esse registro?</div>
            </Header>
            <Modal.Actions>
              <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                <Icon name='remove' /> Não
              </Button>
              <Button color='green' inverted onClick={remover}>
                <Icon name='checkmark' /> Sim
              </Button>
            </Modal.Actions>
          </Modal>
        </Container>
      </div>
    </div>
  );
}
