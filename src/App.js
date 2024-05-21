import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  //Selector con los tipos y al seleccionar pedir los de ese tipo

  /*
    Tercero:
    Inicialmente debe haber 2 selectores
    - El que ya está
    - Por default deshabilitado a menos que se haya seleccionado algo antes en el 1ero
      - Se llena con los nombres de los pokemon de ese tipo
      - Al elegir uno mostrar tipo, nombre e imagen.
      
  */

  const [types, setTypes] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTypes(data.results);
      });
  }, []);

  const handleSelect = async (e) => {
    const selected = e.target.value;
    const pokeType = types.find((type) => type.name == selected);

    //setTypeSelected(types.find((type) => type.name == selected));

    const result = await fetch(pokeType.url).then((res) => res.json());

    console.log(result.pokemon);
    setPokemons(result.pokemon);
  };

  const handlePokemonSelect = async (e) => {
    const selected = e.target.value;
    const { pokemon } = pokemons.find(
      ({ pokemon }) => pokemon.name == selected
    );
    console.log(selected, pokemon);

    const result = await fetch(pokemon.url).then((res) => res.json());

    console.log(result);
    setPokemon(result);
  };

  return (
    <div className="App">
      <select onChange={handleSelect} style={{ width: "8rem" }}>
        <option>Tipo</option>
        {types.map((type, i) => (
          <option key={type + i}>{type.name}</option>
        ))}
      </select>
      <br />
      <select
        disabled={pokemons.length == 0}
        onChange={handlePokemonSelect}
        style={{ width: "8rem" }}
      >
        <option>Pokemon</option>
        {pokemons.map(({ pokemon }, i) => (
          <option key={"pokemon" + i}>{pokemon.name}</option>
        ))}
      </select>
      {/* <pre>{JSON.stringify(pokemon)}</pre> */}

      <div className="container">
        {pokemon && (
          <div
            className="pokemon"
            style={{
              width: "40%",
            }}
          >
            <p className="header">{pokemon.name}</p>
            <img src={pokemon.sprites.front_default} alt="" />
            <div
              style={{
                display: "flex",
              }}
            >
              {pokemon.types.map(({ type }) => (
                <p
                  style={{
                    border: "2px solid #000",
                    marginRight: "1rem",
                    padding: "2px 8px",
                    borderRadius: "1rem",
                  }}
                >
                  {type.name}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
