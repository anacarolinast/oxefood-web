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
import { ProtectedRoute } from "./views/util/ProtectedRoute";
import FormLogin from "../src/views/login/FormLogin";

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<FormLogin />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/form-cliente"
        element={
          <ProtectedRoute>
            <FormCliente />
          </ProtectedRoute>
        }
      />
      <Route
        path="/form-endereco-cliente"
        element={
          <ProtectedRoute>
            <FormEnderecoCliente />
          </ProtectedRoute>
        }
      />
      <Route
        path="/form-produto"
        element={
          <ProtectedRoute>
            <FormProduto />
          </ProtectedRoute>
        }
      />
      <Route
        path="/form-categoria"
        element={
          <ProtectedRoute>
            <FormCategoria />
          </ProtectedRoute>
        }
      />
      <Route
        path="/form-entregador"
        element={
          <ProtectedRoute>
            <FormEntregador />
          </ProtectedRoute>
        }
      />
      <Route
        path="/form-pedido"
        element={
          <ProtectedRoute>
            <FormPedido />
          </ProtectedRoute>
        }
      />
      <Route
        path="/form-promocao"
        element={
          <ProtectedRoute>
            <FormPromocao />
          </ProtectedRoute>
        }
      />
      <Route
        path="/list-cliente"
        element={
          <ProtectedRoute>
            <ListCliente />
          </ProtectedRoute>
        }
      />
      <Route
        path="/list-endereco-cliente/:id"
        element={
          <ProtectedRoute>
            <ListEnderecoCliente />
          </ProtectedRoute>
        }
      />
      <Route
        path="/list-produto"
        element={
          <ProtectedRoute>
            <ListProduto />
          </ProtectedRoute>
        }
      />
      <Route
        path="/list-categoria-produto"
        element={
          <ProtectedRoute>
            <ListCategoriaProduto />
          </ProtectedRoute>
        }
      />
      <Route
        path="/list-entregador"
        element={
          <ProtectedRoute>
            <ListEntregador />
          </ProtectedRoute>
        }
      />
      <Route
        path="/list-promocao"
        element={
          <ProtectedRoute>
            <ListPromocao />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Rotas;