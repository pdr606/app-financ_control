import React from 'react';
import Radio from './Radio';
import Input from './Input';
import './App.css';

function App() {

  let parsedItem;
  const [valueRadio, setValueRadio] = React.useState('Entrada')
  const [descricao, setDescricao] = React.useState('')
  const [valor, setValor] = React.useState('')
  const [historico, setHistorico] = React.useState([])
  const [saldo, setSaldo] = React.useState('')
  const [saida, setSaida] = React.useState('')
  const [entrada, setEntrada] = React.useState('')

  React.useEffect(() =>{
    if(localStorage.length > 0){
      const storedItem = localStorage.getItem('historico');
      parsedItem = JSON.parse(storedItem)
      setHistorico([...parsedItem])
    }
  },[])


 React.useEffect(() =>{
    setEntrada(historico.filter(item => item.tipo === 'Entrada').reduce((a, item) => a + parseFloat(+item.valor), 0 ))
    setSaida(historico.filter(item => item.tipo === 'Saída').reduce((a, item) => a + parseFloat(+item.valor), 0 ))
    setSaldo(entrada - saida)
 },[historico, entrada, saida])


  function handleSubmit(event){
    event.preventDefault()
    const novoObjeto = {
      id : Math.floor(Math.random() * 500),
      descricao,
      valor,
      tipo : valueRadio,
    }

    setHistorico([...historico, novoObjeto])
    localStorage.setItem('historico', JSON.stringify([...historico, novoObjeto]))
    
    const storedItem = localStorage.getItem('historico');
    parsedItem = JSON.parse(storedItem)

    
  }

  function excluirEvento(objeto){
    const novoHistorico = (historico.filter((item) => item !== objeto))
    setHistorico(novoHistorico)
    localStorage.setItem('historico', JSON.stringify(novoHistorico))
  
  }



  return (
    <section>
      <div className='divH1'>
        <h1>Controle Financeiro</h1>
      </div>

      <div className='divContainer'>
        <div className='Containerdiv'>
          <div className='Containertitulo'>
            <p>Entradas + </p>
          </div>
          <div className='Containervalor'>
            <p>+ R$ {entrada}</p>
          </div>
        </div>

        <div className='Containerdiv'>
          <div className='Containertitulo'>
            <p>Saídas - </p>
          </div>
          <div className='Containervalor'>
            <p>- R$ {saida}</p>
          </div>
        </div>

        <div className='Containerdiv'>
          <div className='Containertitulo'>
            <p>Saldo $</p>
          </div>
          <div className='Containervalor'>
            <p>R$ {saldo}</p>
          </div>
        </div>

      </div>

      <form onSubmit={handleSubmit}>
        <Input  type='text' id='descricao' value={descricao} setValue={setDescricao}   label="Descrição" required/>
        <Input  type='number' id='valor' value={valor} setValue={setValor}  label="Valor" required/>
        <Radio  options={['Entrada', 'Saída']} value={valueRadio} setValue={setValueRadio} />
        
    <button>Adicionar</button>
      </form>

      <div>
        {historico.map (objeto =>(
          <div key={objeto.descricao + Math.floor(Math.random() * 100000)}>
            {objeto.descricao}
            {objeto.valor}
            {objeto.tipo}
            <button onClick={() => excluirEvento(objeto)}>Excluir</button>
          </div>
          
        ))}
        
      </div>

    </section>
  )
}

export default App;
