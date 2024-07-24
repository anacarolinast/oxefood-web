import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../menuSistema/MenuSistema";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function FormCliente() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [foneCelular, setFoneCelular] = useState("");
  const [foneFixo, setFoneFixo] = useState("");
  const { state } = useLocation();
  const [idCliente, setIdCliente] = useState();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/cliente/" + state.id)
        .then((response) => {
          setIdCliente(response.data.id);
          setNome(response.data.nome);
          setCpf(response.data.cpf);
          setDataNascimento(response.data.dataNascimento);
          setFoneCelular(response.data.foneCelular);
          setFoneFixo(response.data.foneFixo);
        })
        .catch((error) => console.error("Erro ao buscar o cliente:", error));
    }
  }, [state]);

  function salvar() {
    let clienteRequest = {
      nome: nome,
      cpf: cpf,
      dataNascimento: dataNascimento,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
    };

    if (idCliente != null) {
      axios
        .put("http://localhost:8080/api/cliente/" + idCliente, clienteRequest)
        .then((response) => {
          console.log("Cliente alterado com sucesso.");
        })
        .catch((error) => {
          console.error("Erro ao alterar um cliente:", error);
        });
    } else {
      axios
        .post("http://localhost:8080/api/cliente", clienteRequest)
        .then((response) => {
          console.log("Cliente cadastrado com sucesso.");
          navigate("/form-endereco-cliente", { state: { idCliente: response.data.id } });
        })
        .catch((error) => {
          console.error("Erro ao incluir o cliente:", error);
        });
    }
  }

  return (
    <div>
      <MenuSistema />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign='justified'>
          {idCliente === undefined ? (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Cliente &nbsp;
                <Icon
                  name='angle double right'
                  size='small'
                />{" "}
              </span>{" "}
              Cadastro
            </h2>
          ) : (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Cliente &nbsp;
                <Icon
                  name='angle double right'
                  size='small'
                />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input
                  required
                  fluid
                  label='Nome'
                  maxLength='100'
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label='CPF'
                >
                  <InputMask
                    required
                    mask='999.999.999-99'
                    placeholder='___.___.___-__'
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input
                  fluid
                  label='Fone Celular'
                  width={6}
                >
                  <InputMask
                    mask='(99) 99999.9999'
                    placeholder='(__) ______-____'
                    value={foneCelular}
                    onChange={(e) => setFoneCelular(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  fluid
                  label='Fone Fixo'
                  width={6}
                >
                  <InputMask
                    mask='(99) 9999.9999'
                    placeholder='(__) ____-____'
                    value={foneFixo}
                    onChange={(e) => setFoneFixo(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  fluid
                  label='Data Nascimento'
                  width={6}
                >
                  <InputMask
                    mask='99/99/9999'
                    maskChar={null}
                    placeholder='DD/MM/AAAA'
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Button
                type='button'
                inverted
                circular
                icon
                labelPosition='left'
                color='orange'
                as={Link}
                to='/list-cliente'
              >
                <Icon name='reply' />
                Voltar
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition='left'
                color='blue'
                floated='right'
                onClick={() => salvar()}
              >
                <Icon name='save' />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
