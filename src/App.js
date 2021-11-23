import { useState } from "react";
import { useEffect } from "react";
//
const App = () => {
  const [pokemon, setPokemon] = useState("")
  const [error, setError] = useState(
      { 
        error: false, 
        message: ""
      }
    )
//

  const handler = async () => {
    try{
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      console.log(response)
      if(response.status !== 200){
        throw new Error("the error is...its messed up")
      }
      const data = await response.json()
      setPokemon(data.results)
    }catch(e){
      setError({ error: true, message: e.message})
    }
  }


useEffect(() => {
  handler()
},[])


  //
if(!pokemon){
  return <p>loading...</p>
}

  if(error.error){
    return <h1>{error.message}</h1>
  }
  return (
    <div>
      <h1>POKEMON</h1>
      <p>POKEMON: {pokemon.name}</p>
      <button onClick={handler}>get data</button>
      {pokemon.map((item, index) => {
        return <h2 key={index}>{item.name}</h2>
      })}
    </div>
  );
};
export default App