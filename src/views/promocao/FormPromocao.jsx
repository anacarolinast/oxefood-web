import React, { useEffect, useState } from "react"
import InputMask from "react-input-mask"
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react"
import MenuSistema from "../menuSistema/MenuSistema"
import axios from "axios"
import { Link, useLocation } from "react-router-dom"
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function FormPromocao() {
  const [titulo, setTitulo] = useState()
  const [dataInicio, setDataInicio] = useState()
  const [dataFim, setDataFim] = useState()
  const [regra, setRegra] = useState()
  const [valorDesconto, setValorDesconto] = useState()
  const { state } = useLocation()
  const [idPromocao, setIdPromocao] = useState()

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/promocao/" + state.id)
        .then((response) => {
          setIdPromocao(response.data.id)
          setTitulo(response.data.titulo)
          setDataInicio(response.data.dataInicio)
          setDataFim(response.data.dataFim)
          setRegra(response.data.regra)
          setValorDesconto(response.data.valorDesconto)
        })
    }
  }, [state])

  function salvar() {
    let promocaoRequest = {
      titulo: titulo,
      dataInicio: dataInicio,
      dataFim: dataFim,
      regra: regra,
      valorDesconto: valorDesconto
    }

    if (idPromocao != null) {
      axios
        .put("http://localhost:8080/api/promocao/" + idPromocao, promocaoRequest)
        .then((response) => {
          notifySuccess("Promoção alterada com sucesso.");
        })
        .catch((error) => {
          notifyError("Erro ao alterar a promoção. Tente novamente.");
        })
    } else {
      axios
        .post("http://localhost:8080/api/promocao", promocaoRequest)
        .then((response) => {
          notifySuccess("Promoção cadastrada com sucesso.")
        })
        .catch((error) => {
          notifyError("Erro ao incluir uma promoção.")
        })
    }
  }

  return (
    <div>
      <MenuSistema />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign='justified'>
          {idPromocao === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Promocao &nbsp;
                <Icon
                  name='angle double right'
                  size='small'
                />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idPromocao != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Promocao &nbsp;
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
                  label='Título'
                  maxLength='100'
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </Form.Group>

              <Form.TextArea
                label="Regra"
                value={regra}
                onChange={(e) => setRegra(e.target.value)}
              ></Form.TextArea>

              <Form.Group>

              <Form.Input
                  fluid
                  label="Valor Desconto (R$)"
                  width={6}
                  value={valorDesconto}
                  onChange={(e) => setValorDesconto(e.target.value)}
                >
                </Form.Input>
              <Form.Input
              required
                  fluid
                  label='A partir de'
                  width={6}
                >
                  <InputMask
                    mask='99/99/9999'
                    maskChar={null}
                    placeholder='DD/MM/AAAA'
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                required
                  fluid
                  label='Terminando em'
                  width={6}
                >
                  <InputMask
                    mask='99/99/9999'
                    maskChar={null}
                    placeholder='DD/MM/AAAA'
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
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
                to='/list-promocao'
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
  )
}
