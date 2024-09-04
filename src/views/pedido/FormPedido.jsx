import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Button, Container, Divider, Form, Icon, Select } from "semantic-ui-react";
import MenuSistema from "../menuSistema/MenuSistema";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function FormPedido() {
  const [dataPedido, setDataPedido] = useState("");
  const [cliente, setCliente] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidadeProdutos, setQuantidadeProdutos] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCEP] = useState("");
  const [uf, setUF] = useState("");
  const [complemento, setComplemento] = useState("");
  const [ufOptions, setUFOptions] = useState([]);
  const { state } = useLocation();
  const [idPedido, setIdPedido] = useState(null);

  const handleUFChange = (e, { value }) => {
    setUF(value);
  };

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        );
        const data = await response.json();
        const options = data.map((state) => ({
          key: state.sigla,
          text: state.nome,
          value: state.sigla
        }));
        setUFOptions(options);
      } catch (error) {
        console.error("Erro ao buscar os estados:", error);
      }
    }

    fetchStates();
  }, []);

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get(`http://localhost:8081/api/pedido/${state.id}`)
        .then((response) => {
          const {
            id,
            dataPedido,
            cliente,
            produto,
            quantidadeProdutos,
            rua,
            numero,
            bairro,
            cidade,
            cep,
            uf,
            complemento
          } = response.data;
          setIdPedido(id);
          setDataPedido(dataPedido);
          setCliente(cliente);
          setProduto(produto);
          setQuantidadeProdutos(quantidadeProdutos);
          setRua(rua);
          setNumero(numero);
          setBairro(bairro);
          setCidade(cidade);
          setCEP(cep);
          setUF(uf);
          setComplemento(complemento);
        })
        .catch((error) => {
          console.error("Erro ao buscar o pedido:", error);
        });
    }
  }, [state]);

  const salvar = () => {
    const pedidoRequest = {
      dataPedido,
      cliente,
      produto,
      quantidadeProdutos,
      rua,
      numero,
      bairro,
      cidade,
      cep,
      uf,
      complemento
    };

    if (idPedido != null) {
      axios
        .put(`http://localhost:8081/api/pedido/${idPedido}`, pedidoRequest)
        .then(() => {
          notifySuccess("Pedido alterado com sucesso.");
        })
        .catch((error) => {
          notifyError("Erro ao alterar o pedido. Tente novamente.");
        });
    } else {
      axios
        .post("http://localhost:8081/api/pedido", pedidoRequest)
        .then(() => {
          notifySuccess("Pedido cadastrado com sucesso.");
        })
        .catch((error) => {
          notifyError("Erro ao incluir o pedido. Tente novamente.");
        });
    }
  };

  return (
    <div>
      <MenuSistema />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idPedido === null ? (
            <h2>
              <span style={{ color: "darkgray" }}>
                Pedido <Icon name="angle double right" size="small" /> Cadastro
              </span>
            </h2>
          ) : (
            <h2>
              <span style={{ color: "darkgray" }}>
                Pedido <Icon name="angle double right" size="small" /> Alteração
              </span>
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Field width={6}>
                  <label>Data do Pedido</label>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="DD/MM/AAAA"
                    value={dataPedido}
                    onChange={(e) => setDataPedido(e.target.value)}
                  />
                </Form.Field>

                <Form.Input
                  required
                  fluid
                  label="Cliente"
                  maxLength="100"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Produto"
                  maxLength="100"
                  value={produto}
                  onChange={(e) => setProduto(e.target.value)}
                />
                <Form.Input
                  required
                  fluid
                  label="Quantidade dos Produtos"
                  maxLength="100"
                  value={quantidadeProdutos}
                  onChange={(e) => setQuantidadeProdutos(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  fluid
                  label="Rua"
                  width={15}
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Número"
                  width={2}
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="CEP"
                  value={cep}
                  onChange={(e) => setCEP(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field>
                  <label>UF</label>
                  <Select
                    placeholder="Selecione o estado"
                    options={ufOptions}
                    value={uf}
                    onChange={handleUFChange}
                    fluid
                  />
                </Form.Field>
                <Form.Input
                  fluid
                  label="Complemento"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </Form.Group>

              <div style={{ marginTop: "4%" }}>
                <Button
                  type="button"
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="orange"
                  as={Link}
                  to="/list-pedido"
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
                  onClick={salvar}
                >
                  <Icon name="save" />
                  Salvar
                </Button>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
}
