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
            <p>Entradas</p>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 96 960 960" width="48"><path d="M450 896V370L202 618l-42-42 320-320 320 320-42 42-248-248v526h-60Z"/></svg>
          </div>
          <div className='Containervalor'>
            <p>+ R$ {entrada}</p>
          </div>
        </div>

        <div className='Containerdiv'>
          <div className='Containertitulo'>
            <p>Saídas</p>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 96 960 960" width="48"><path d="M480 896 160 576l42-42 248 248V256h60v526l248-248 42 42-320 320Z"/></svg>
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
        <Input  type='text' id='descricao' value={descricao} setValue={setDescricao}   label="Descrição" />
        <Input  type='number' id='valor' value={valor} setValue={setValor}  label="Valor" required/>
        <Radio  options={['Entrada', 'Saída']} value={valueRadio} setValue={setValueRadio} />
        
    <button><svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 96 960 960" width="48"><path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"/></svg></button>
      </form>

      <div className='containerResultado'>
        <div className='resultado resultado1'>
          <p className='primeiro'>Descrição</p>
          <p className='segundo'>Valor</p>
          <p className='terceiro'>Tipo</p>
        </div>
        <div className='resultado2'>
        {historico.map (objeto =>(
          <div className='resultado' key={objeto.descricao + Math.floor(Math.random() * 100000)}>
          <p className='primeiro'>{objeto.descricao}</p>
          <p className='segundo'> R$ {objeto.valor}</p>
          <p className='terceiro'>{objeto.tipo === 'Entrada' ? <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 96 960 960" width="48"><path d="M450 896V370L202 618l-42-42 320-320 320 320-42 42-248-248v526h-60Z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 96 960 960" width="48"><path d="M480 896 160 576l42-42 248 248V256h60v526l248-248 42 42-320 320Z"/></svg>}</p>
          <button className='quarto' onClick={() => excluirEvento(objeto)}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 96 960 960" width="48"><path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/></svg></button>
          </div>
          
        ))}
        </div>
        
      </div>

    </section>
  )
}

export default App;
