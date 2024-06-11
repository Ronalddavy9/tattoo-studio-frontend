import React, { useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const ProductForm = ({ product, onSave }) => {
    const nameRef = useRef();
    const descriptionRef = useRef();
    const typeRef = useRef();
    const priceRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dadosDoProduto = {
            nome: nameRef.current.value,
            descricao: descriptionRef.current.value,
            tipo: typeRef.current.value,
            preco: parseFloat(priceRef.current.value)
        };

        try {
            if (product && product.id) {
                await axios.put(`http://localhost:8080/api/v1/produtos/${product.id}`, dadosDoProduto)
                    .then(({ data }) => console.log(data))
                    .catch(({ data }) => console.error(data));
            } else {
                await axios.post(`http://localhost:8080/api/v1/produtos`, dadosDoProduto)
                    .then(({ data }) => console.log(data))
                    .catch(({ data }) => console.error(data));
            }
            onSave();
            nameRef.current.value = '';
            descriptionRef.current.value = '';
            typeRef.current.value = '';
            priceRef.current.value = '';
        } catch (error) {
            console.error("Houve algum erro ao salvar o produto:", error);
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input type="text" ref={nameRef} defaultValue={product ? product.nome : ''} required />
            </InputArea>
            <InputArea>
                <Label>Descrição</Label>
                <Input type="text" ref={descriptionRef} defaultValue={product ? product.descricao : ''} required />
            </InputArea>
            <InputArea>
                <Label>Tipo</Label>
                <Input type="text" ref={typeRef} defaultValue={product ? product.tipo : ''} required />
            </InputArea>
            <InputArea>
                <Label>Quantidade</Label>
                <Input type="number" ref={priceRef} defaultValue={product ? product.preco : ''} step="0.01" required />
            </InputArea>
            <Button type="submit">Salvar</Button>
        </FormContainer>
    );
};

export default ProductForm;
