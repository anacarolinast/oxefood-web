import React from "react";
import { Route, Routes } from "react-router-dom";

import FormCliente from "./views/cliente/FormCliente";
import FormEntregador from "./views/entregador/FormEntregador";
import Home from "./views/home/Home";
import FormProduto from "./views/produto/FormProduto";
import ListProduto from "./views/produto/ListProduto";
import ListEntregador from "./views/entregador/ListEntregador";
import FormPedido from "./views/pedido/FormPedido";
import FormPromocao from "./views/promocao/FormPromocao";
import ListPromocao from "./views/promocao/ListPromocao";
import FormEnderecoCliente from "./views/enderecoCliente/FormEnderecoCliente";
import ListCliente from "./views/cliente/ListCliente";
import FormCategoria from "./views/categoria/FormCategoria";
import ListEnderecoCliente from "./views/enderecoCliente/ListEnderecoCliente";
import ListCategoriaProduto from "./views/categoria/ListCategoria";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form-cliente" element={<FormCliente />} />
        <Route path="form-endereco-cliente" element={<FormEnderecoCliente />} />
        <Route path="form-produto" element={<FormProduto />} />
        <Route path="form-categoria" element={<FormCategoria />} />
        <Route path="form-entregador" element={<FormEntregador />} />
        <Route path="form-pedido" element={<FormPedido />} />
        <Route path="form-promocao" element={<FormPromocao />} />
        <Route path="list-cliente" element={<ListCliente />} />
        <Route path="/list-endereco-cliente/:id" element={<ListEnderecoCliente />} />
        <Route path="list-produto" element={<ListProduto />} />
        <Route path="list-categoria-produto" element={<ListCategoriaProduto />} />
        <Route path="list-entregador" element={<ListEntregador />} />
        <Route path="list-promocao" element={<ListPromocao />} />
      </Routes>
    </>
  );
}

export default Rotas;
