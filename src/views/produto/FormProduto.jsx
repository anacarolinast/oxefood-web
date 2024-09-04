import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import {
  Button,
  Container,
  Divider,
  Form,
  Icon,
  Select,
} from "semantic-ui-react";
import MenuSistema from "../menuSistema/MenuSistema";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function FormProduto() {
  const [titulo, setTitulo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState("");
  const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState("");
  const { state } = useLocation();
  const [idProduto, setIdProduto] = useState();

  const handleCategoryChange = (e, { value }) => {
    setCategoria(value);
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/categoriaproduto"
        );
        const categoryOptions = response.data.map((categoria) => ({
          key: categoria.id,
          value: categoria.id,
          text: categoria.descricao,
        }));
        setCategorias(categoryOptions);
      } catch (error) {
        console.error("Erro ao buscar as categorias de produtos.", error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8081/api/produto/" + state.id)
        .then((response) => {
          console.log("Dados do produto carregados:", response.data);
          setIdProduto(response.data.id);
          setTitulo(response.data.titulo);
          setCodigo(response.data.codigo);
          setCategoria(response.data.idCategoria);
          setDescricao(response.data.descricao);
          setValorUnitario(response.data.valorUnitario);
          setTempoEntregaMinimo(response.data.tempoEntregaMinimo);
          setTempoEntregaMaximo(response.data.tempoEntregaMaximo);
        });
    }
  }, [state]);

  function salvar() {
    let produtoRequest = {
      titulo: titulo,
      codigo: codigo,
      idCategoria: categoria,
      descricao: descricao,
      valorUnitario: valorUnitario,
      tempoEntregaMinimo: tempoEntregaMinimo,
      tempoEntregaMaximo: tempoEntregaMaximo,
    };

    if (idProduto != null) {
      axios
        .put("http://localhost:8081/api/produto/" + idProduto, produtoRequest)
        .then((response) => {
          notifySuccess("Produto alterado com sucesso.");
        })
        .catch((error) => {
          notifyError("Erro ao alterar o produto. Tente novamente.");
        });
    } else {
      axios
        .post("http://localhost:8081/api/produto", produtoRequest)
        .then((response) => {
          notifySuccess("Produto cadastrado com sucesso.");
        })
        .catch((error) => {
          notifyError("Erro ao incluir o produto. Tente novamente.");
        });
    }
  }

  return (
    <div>
      <MenuSistema />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idProduto === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Produto &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro{" "}
            </h2>
          )}
          {idProduto != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Produto &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
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
                  label="Título"
                  maxLength="100"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />

                <Form.Input required fluid label="Código do Produto">
                  <InputMask
                    required
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Field width={16}>
                  <label>Categoria</label>
                  <Select
                    required
                    placeholder="Selecione a categoria"
                    options={categorias}
                    value={categoria}
                    onChange={handleCategoryChange}
                  />
                </Form.Field>
              </Form.Group>

              <Form.TextArea
                label="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              ></Form.TextArea>

              <Form.Group>
                <Form.Input
                  fluid
                  label="Valor Unitário"
                  width={6}
                  value={valorUnitario}
                  onChange={(e) => setValorUnitario(e.target.value)}
                ></Form.Input>

                <Form.Input
                  fluid
                  label="Tempo de Entrega Mínimo em Minutos"
                  width={6}
                  value={tempoEntregaMinimo}
                  onChange={(e) => setTempoEntregaMinimo(e.target.value)}
                ></Form.Input>
                <Form.Input
                  fluid
                  label="Tempo de Entrega Máximo em Minutos"
                  width={6}
                  value={tempoEntregaMaximo}
                  onChange={(e) => setTempoEntregaMaximo(e.target.value)}
                ></Form.Input>
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
                to="/list-produto"
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
