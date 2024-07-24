import React, { useEffect, useState } from "react";
import { Button, Container, Form, Icon, Select } from "semantic-ui-react";
import MenuSistema from "../menuSistema/MenuSistema";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function FormEnderecoCliente() {
  const [ufOptions, setUFOptions] = useState([]);
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCEP] = useState("");
  const [uf, setUF] = useState("");
  const [complemento, setComplemento] = useState("");
  const [idCliente, setIdCliente] = useState(null);
  const [idEndereco, setIdEndereco] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { idCliente, idEndereco } = location.state || {};

    if (idCliente) {
      setIdCliente(idCliente);
    }

    if (idEndereco) {
        setIdEndereco(idEndereco);
        console.log("ID do endereço:", idEndereco);
        axios
          .get(`http://localhost:8080/api/cliente/${idCliente}`)
          .then((response) => {
            console.log("Resposta da API do cliente:", response.data);
            if (response.data) {
              const { enderecos } = response.data;
              console.log("Endereços do cliente:", enderecos);
  
              const endereco = enderecos.find(
                (endereco) => endereco.id === idEndereco
              );
  
              if (endereco) {
                console.log("Endereço encontrado:", endereco);
                const { rua, numero, bairro, cidade, cep, uf, complemento } = endereco;
                setRua(rua);
                setNumero(numero);
                setBairro(bairro);
                setCidade(cidade);
                setCEP(cep);
                setUF(uf);
                setComplemento(complemento);
              } else {
                console.warn("Endereço não encontrado para o ID fornecido.");
              }
            }
          })
          .catch((error) => {
            console.error("Erro ao buscar o cliente:", error);
          });
      }
    }, [location]);

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
          value: state.sigla,
        }));
        setUFOptions(options);
      } catch (error) {
        console.error("Erro ao buscar os estados:", error);
      }
    }

    fetchStates();
  }, []);

  const handleUFChange = (e, { value }) => {
    setUF(value);
  };

  const salvar = () => {
    const enderecoClienteRequest = {
      rua,
      numero,
      bairro,
      cidade,
      cep,
      uf,
      complemento,
    };

    if (idEndereco) {
      axios
        .put(`http://localhost:8080/api/cliente/endereco/${idEndereco}`, enderecoClienteRequest)
        .then(() => {
          console.log("Endereço salvo com sucesso.");
          navigate("/list-cliente");
        })
        .catch((error) => {
          console.error("Erro ao salvar o endereço:", error);
        });
    } else if (idCliente) {
      axios
        .post(`http://localhost:8080/api/cliente/endereco/${idCliente}`, enderecoClienteRequest)
        .then(() => {
          console.log("Endereço salvo com sucesso.");
          navigate("/list-cliente");
        })
        .catch((error) => {
          console.error("Erro ao salvar o endereço:", error);
        });
    } else {
      console.error("ID do cliente não encontrado.");
    }
  };

  return (
    <div>
      <MenuSistema />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            <span style={{ color: "darkgray" }}>
              Endereço &nbsp;
              <Icon name="angle double right" size="small" />{" "}
              {idEndereco ? "Alteração" : "Cadastro"}
            </span>
          </h2>

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Rua"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                />
                <Form.Input
                  required
                  fluid
                  label="Número"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
                <Form.Input
                  required
                  fluid
                  label="Cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="CEP"
                  value={cep}
                  onChange={(e) => setCEP(e.target.value)}
                />
                <Form.Field
                  required
                  control={Select}
                  label="UF"
                  options={ufOptions}
                  value={uf}
                  onChange={handleUFChange}
                />
              </Form.Group>

              <Form.Input
                fluid
                label="Complemento"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
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
                onClick={salvar}
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
