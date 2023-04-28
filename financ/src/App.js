import React from 'react';
import Radio from './Radio';
import Input from './Input';


/* Próximos passos

- Somar os valores e mostrar no saldo ( de todos os itens da minha array)
- Definir uma constante com o valor de entrada
- Definir uma constante com os valores de saida

- Finalizar com o botao que deleta o item, e refaz o calculamento dos itens acima
*/

function App() {


  let parsedItem;
  const [valueRadio, setValueRadio] = React.useState('Entrada')
  const [descricao, setDescricao] = React.useState('')
  const [valor, setValor] = React.useState('')
  const [error, setError] = React.useState(null)
  const [ativar, seAtivar] = React.useState(true)
  const [historico, setHistorico] = React.useState([])
  const [saldo, setSaldo] = React.useState('')
  const [saida, setSaida] = React.useState('')
  let totalEntradas; 

  React.useEffect(() =>{
    if(localStorage.length > 0){
      const storedItem = localStorage.getItem('historico');
      parsedItem = JSON.parse(storedItem)
      setHistorico([...parsedItem])
    }
  },[])


 
  if(ativar){
    totalEntradas = historico.filter(item => Number(item.valor)).reduce((a, item) => a + parseFloat(item.valor), 0 )
  }


  function handleSubmit(event){
    event.preventDefault()
    const novoObjeto = {
      descricao,
      valor,
      tipo : valueRadio
    }


    setHistorico([...historico, novoObjeto])
    localStorage.setItem('historico', JSON.stringify([...historico, novoObjeto]))
    
    const storedItem = localStorage.getItem('historico');
    parsedItem = JSON.parse(storedItem)

    
  }


  function validate(value){
    if(value.length === 0){
      setError(true)
    } else{
      setError(null)
    }
  }

  function handleBlur({target}){
    validate(target.value)
    
  }

  function excluirEvento(event){
    event.preventDefault()
    console.log(event.target)
  }



  return (
    <section>
      <h1>Controle Financeiro</h1>
      <div>

      <div>
        <p>Entradas {totalEntradas} </p>
      </div>
      <div>
        <p>Saídas</p>
      </div>
      <div>
        <p>Saldo {saldo}</p>
      </div>
      </div>
      <form onSubmit={handleSubmit}>
        <Input type='text' id='descricao' value={descricao} setValue={setDescricao} onBlur={handleBlur}  label="Descrição"/>
        <Input type='number' id='valor' value={valor} setValue={setValor} onBlur={handleBlur} label="Valor"/>


        <Radio options={['Entrada', 'Saída']} value={valueRadio} setValue={setValueRadio} />
        
    <button>Adicionar</button>
      </form>
      <div>
        {historico.map (r =>(
          <div key={r.valor}>
            {r.descricao}
            {r.valor}
            {r.tipo}
            <button descricao={r.descricao} onClick={excluirEvento}>Excluir</button>
          </div>
          
        ))}
        
      </div>

    </section>
  )
}

export default App;
