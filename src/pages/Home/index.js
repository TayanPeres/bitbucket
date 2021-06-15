import React, { useState, useCallback } from 'react'
import { FaSistrix, FaSpinner } from 'react-icons/fa'
import { Container, Form, SubmitButton, List, suges, SugestionList   } from  './styled'
import api from '../Services/api'



export default function Home () {
  const [newProduct, setNewProduct] = useState('')
  const [ produtos, setProdutos] = useState([])
  const [ suggestions, setSuggestions ] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    async function submit() {
      setLoading(true)
      try {
        const response = await api.get(`autocomplete?content=${newProduct}&source=nanook`)
       console.log(response )
      const data = response.data.products
 

    setProdutos( data)
  
    setNewProduct('')
      } catch(error) {
        console.log(error)
      }finally {
        setLoading(false)
      }
    
  }
  submit() 
 }, [newProduct, produtos])
  
  async function handleinputChange(e) {
    setNewProduct(e.target.value)
    if (newProduct.length > 3) {
      try {
        const { data } = await api.get(
          `autocomplete?content=${newProduct}&source=nanook`
        );
        setProdutos(data.products)
        setSuggestions(data.suggestions)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }
  function select(term) {
    setNewProduct(term)
  }

  return (
    <Container>
        <h1>Produtos</h1>
   

      <Form onSubmit={handleSubmit}>
        <input
         type="text" 
         placeholder="Buscar Produtos"
        value={ newProduct }
        onChange={handleinputChange} />
      
      <SubmitButton Loading={ loading ? 1 : 0}>
        {loading ? (
          <FaSpinner color="#FFF" size={ 14} />
        ): (
        <FaSistrix color="#FFF" size={15} />
         )}
      </SubmitButton>
   
       </Form>

       <SugestionList>
      {
          suggestions.map(item => (<suges onClick={()=> select(item.term)} key={item.term}>{item.term}</suges>))
      }
      </SugestionList>

      <List>
        {produtos.map(prod => (
          <li key={prod.id}>
          {console.log(prod)}
            <span>
             {prod.name}
            </span>
          </li>
        ))}
      </List>
    </Container>
  )
}