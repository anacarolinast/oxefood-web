import React, { useState } from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../menuSistema/MenuSistema";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FormCategoria() {
    const [descricao, setDescricao] = useState("");

    function salvar() {
        let categoriaRequest = {
            descricao: descricao
        };

        axios.post("http://localhost:8080/api/categoriaproduto", categoriaRequest)
            .then((response) => {
                console.log("Categoria cadastrada com sucesso.");
            })
            .catch((error) => {
                console.error("Erro ao incluir a categoria:", error);
            });
    }

    return (
        <div>
            <MenuSistema />
            <div style={{ marginTop: "3%" }}>
                <Container textAlign='justified'>
                    <h2>
                        <span style={{ color: "darkgray" }}>
                            Categoria &nbsp;
                            <Icon
                                name='angle double right'
                                size='small'
                            />
                        </span>
                        Cadastro
                    </h2>
                    <Divider />
                    <div style={{ marginTop: "4%" }}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Descrição'
                                    maxLength='100'
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                />
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
