import React from "react";
import { Link } from "react-router-dom";
import { Icon, Menu, MenuItem, Search } from "semantic-ui-react";

class MenuSistema extends React.Component {
  state = {
    activeItem: "home",
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <>
        <Menu icon='labeled' style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
          <Menu>
            <MenuItem
              name='home'
              active={this.state.activeItem === 'home'}
              onClick={this.handleItemClick}
              as={Link}
              to="/"
            >
              <Icon name='home' />
              Home
            </MenuItem>

            <MenuItem
              name='cliente'
              active={this.state.activeItem === "cliente"}
              onClick={this.handleItemClick}
              as={Link}
              to="/form-cliente"
            >
              <Icon name='user' />
              Cliente
            </MenuItem>

            <MenuItem
              name='produto'
              active={this.state.activeItem === "produto"}
              onClick={this.handleItemClick}
              as={Link}
              to="/form-produto"
            >
              <Icon name='box' />
              Produto
            </MenuItem>

            <MenuItem
              name='entregador'
              active={this.state.activeItem === "entregador"}
              onClick={this.handleItemClick}
              as={Link}
              to="/form-entregador"
            >
              <Icon name='shipping fast' />
              Entregador
            </MenuItem>

            <MenuItem
              name='pedido'
              active={this.state.activeItem === "pedido"}
              onClick={this.handleItemClick}
              as={Link}
              to="/form-pedido"
            >
              <Icon name='box' />
              Pedido
            </MenuItem>

            <MenuItem
              name='list-cliente'
              active={this.state.activeItem === "list-cliente"}
              onClick={this.handleItemClick}
              as={Link}
              to="/list-cliente"
            >
              <Icon name='users' />
              Clientes
            </MenuItem>

            <MenuItem
              name='list-produto'
              active={this.state.activeItem === "list-produto"}
              onClick={this.handleItemClick}
              as={Link}
              to="/list-produto"
            >
              <Icon name='clipboard list' />
              Produtos
            </MenuItem>

            <MenuItem
              name='list-entregador'
              active={this.state.activeItem === "list-entregador"}
              onClick={this.handleItemClick}
              as={Link}
              to="/list-entregador"
            >
              <Icon name='truck' />
              Entregadores
            </MenuItem>

          </Menu>

          <Search
            fluid
            size={"large"}
          />
          
        </Menu>
      </>
    );
  }
}

export default MenuSistema;
