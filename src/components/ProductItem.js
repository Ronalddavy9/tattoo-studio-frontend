import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const Title = styled.h3`
  margin-bottom: 10px;
`;


const Description = styled.p``;

const Type = styled.p``;

const Price = styled.p``;

const Button = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
`;
const ProductItem = ({ product, onEdit, onDelete }) => {
    return (
        <ItemContainer>
            <Title>Nome: {product.nome}</Title>
            <Description>Descrição: {product.descricao}</Description>
            <Type>Tipo: {product.tipo}</Type>
            <Price>Quantidade: {product.preco}</Price>
            <Button onClick={() => onEdit(product)}>Editar</Button>
            <Button onClick={() => onDelete(product.id)}>Excluir</Button>
        </ItemContainer>
    );
};

export default ProductItem;
