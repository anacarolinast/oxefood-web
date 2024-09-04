import React, { useState, useEffect } from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../menuSistema/MenuSistema";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function FormCategoria() {
    const location = useLocation();
    const { idCategoria } = location.state || {}; 
    const [descricao, setDescricao] = useState('');
  
    useEffect(() => {
      if (idCategoria) {
        axios
          .get("http://localhost:8081/api/categoriaproduto")
          .then((response) => {
            const categoria = response.data.find(cat => cat.id === idCategoria);
            if (categoria) {
              console.log("Dados de categorias de produtos carregados:", categoria);
              setDescricao(categoria.descricao);
            } else {
              console.log("Categoria não encontrada.");
            }
          })
          .catch((error) => {
            console.log("Erro ao carregar dados da categoria.", error);
          });
      }
    }, [idCategoria]);

  function salvar() {
    let categoriaRequest = {
      descricao: descricao,
    };

    if (idCategoria != null) {
      axios
        .put("http://localhost:8081/api/categoriaproduto/" + idCategoria, categoriaRequest)
        .then((response) => {
          console.log("Categoria alterada com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alterar uma categoria.", error);
        });
    } else {
      axios
        .post("http://localhost:8081/api/categoriaproduto", categoriaRequest)
        .then((response) => {
          console.log("Categoria cadastrada com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir a categoria.", error);
        });
    }
  }

  return (
    <div>
      <MenuSistema />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idCategoria === undefined ? (
            <h2>
              <span style={{ color: "darkgray" }}>
                Categoria &nbsp;
                <Icon name="angle double right" size="small" />
              </span>
              Cadastro
            </h2>
          ) : (
            <h2>
              <span style={{ color: "darkgray" }}>
                Categoria &nbsp;
                <Icon name="angle double right" size="small" />
              </span>
              Alteração
            </h2>
          )}
          <Divider />
          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Descrição"
                  maxLength="100"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Form.Group>
            </Form>
            <div style={{ marginTop: "4%" }}>
              <Button
                type="button"
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
                as={Link}
                to="/list-cliente"
              >
                <Icon name="reply" />
                Voltar
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
