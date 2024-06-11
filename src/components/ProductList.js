import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getProducts, deleteProduct } from '../services/productService';
import ProductItem from './ProductItem';
import ProductForm from './ProductForm';

const Container = styled.div`
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const NoProductsMessage = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
`;

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
            console.log('Produtos retornados:', response.data);
        } catch (error) {
            console.error('Erro ao trazer os produtos:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSave = () => {
        fetchProducts();
        setEditingProduct(null);
       
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            fetchProducts();
        } catch (error) {
            console.error('Erro ao deletar o produto:', error);
        }
    };

    return (
        <Container>
            <Title>Cadastro de Produtos</Title>
            <ProductForm product={editingProduct} onSave={handleSave} />
            {products.length === 0 ? (
                <NoProductsMessage>
                    Não existem produtos cadastrados.
                </NoProductsMessage>
            ) : (
                products.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))
            )}
        </Container>
    );
};

export default ProductList;
