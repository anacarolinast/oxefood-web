import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import {
  Button,
  Container,
  Divider,
  Form,
  FormField,
  Icon,
  Radio,
  Select,
} from "semantic-ui-react";

export default function FormEntregador() {
  const [ativo, setAtivo] = useState(true);
  const [ufOptions, setUFOptions] = useState([]);
  const [uf, setUF] = useState("");

  const handleRadioChange = (e, { value }) => {
    setAtivo(value === "sim");
  };

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
          value: state.sigla,
        }));
        setUFOptions(options);
      } catch (error) {
        console.error("Erro ao buscar os estados:", error);
      }
    }

    fetchStates();
  }, []);

  return (
    <div>
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            <span style={{ color: "darkgray" }}>
              Entregador &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro{" "}
          </h2>

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input required fluid label="Nome" maxLength="100" />
                <Form.Input required fluid label="CPF">
                  <InputMask
                    mask="999.999.999-99"
                    placeholder="___.___.___-__"
                  />
                </Form.Input>
                <Form.Input required fluid label="RG">
                  <InputMask mask="99.999.999-9" placeholder="__.___.___-_" />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="Data Nascimento" width={3}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="DD/MM/AAAA"
                  />
                </Form.Input>

                <Form.Input fluid label="Fone Celular" width={6}>
                  <InputMask
                    mask="(99) 99999-9999"
                    placeholder="(__) _____-____"
                  />
                </Form.Input>

                <Form.Input fluid label="Fone Fixo" width={6}>
                  <InputMask
                    mask="(99) 9999-9999"
                    placeholder="(__) ____-____"
                  />
                </Form.Input>

                <Form.Input
                  fluid
                  label="QTD Entregas Realizadas"
                  width={4}
                ></Form.Input>

                <Form.Input
                  fluid
                  label="Valor Por Frete"
                  width={4}
                ></Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="Rua" width={15}></Form.Input>
                <Form.Input fluid label="Número" width={2}></Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="Bairro" width={8}></Form.Input>
                <Form.Input fluid label="Cidade" width={8}></Form.Input>
                <Form.Input fluid label="CEP" width={4}></Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Field width={16}>
                  <label>UF</label>
                  <Select
                    placeholder="Selecione o estado"
                    options={ufOptions}
                    value={uf}
                    onChange={handleUFChange}
                    fluid
                  />
                </Form.Field>
              </Form.Group>

              <Form.Input fluid label="Complemento" width={"100%"}></Form.Input>

              <Container style={{ marginTop: "2% ", display: "flex" }}>
                <FormField style={{ fontWeight: "700", marginRight: "12px" }}>
                  Ativo:
                </FormField>
                <Form.Group inline>
                  <Form.Field>
                    <Radio
                      label="Sim"
                      name="ativo"
                      value="sim"
                      checked={ativo}
                      onChange={handleRadioChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="Não"
                      name="ativo"
                      value="nao"
                      checked={!ativo}
                      onChange={handleRadioChange}
                    />
                  </Form.Field>
                </Form.Group>
              </Container>

              <div style={{ marginTop: "4%" }}>
                <Button
                  type="button"
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="orange"
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
