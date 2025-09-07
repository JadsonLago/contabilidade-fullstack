import React from 'react'

export default function ListaDeCompras() {
    const itens =['Carne','Leite','Ovos','Tomate','Cenoura','Pimentao','Sal','Acucar']
  return (
    <>
    <h1>ListaDeCompras</h1>

    <ul>
        {itens.map(item => <li>{item}</li>)}
    </ul>
    </>
  )
}
