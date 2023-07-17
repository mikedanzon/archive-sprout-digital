import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const pokeLimit = useState(8); // set how many pokemon to show
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${pokeLimit}`;
  const [pokeData, setPokeData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [whichPoke, setWhichPoke] = useState(0);
  const [modalMenu, setModalMenu] = useState("about");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const pokeName = await axios.get(url);
    for (const e of pokeName.data.results) {
      const results = await axios.get(e.url);
      setPokeData((pokeData) => [...pokeData, results.data]);
    }
  };

  const showPokemon = () => {
    return pokeData.map((val, index) => {
      return (
        <div
          className="data-pokemon-wrap"
          key={index}
          onClick={() => clickPokemon(index)}
        >
          <div className="data-pokemon-left">
            <div className="poke-name">{val.forms[0].name}</div>
            {val.types.map((val) => {
              return <div className="poke-type">{val.type.name}</div>;
            })}
          </div>
          <div className="data-pokemon-right">
            <div className="poke-photo">
              <img
                src={val.sprites.other.dream_world.front_default}
                alt="pokemon"
              />
            </div>
          </div>
        </div>
      );
    });
  };

  const clickPokemon = (value) => {
    setOpenModal(true);
    setWhichPoke(value);
  };

  const clickMenuModal = (value) => {
    setModalMenu(value);
  };

  const modal = () => {
    const data = pokeData[whichPoke];
    return (
      <div className="modal-bg" onClick={() => setOpenModal(false)}>
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-header-top">
              <div className="modal-header-left">
                <div className="modal-header-name">{data.forms[0].name}</div>
                <div className="modal-header-types">
                  {data.types.map((val) => {
                    return (
                      <div className="modal-header-type">{val.type.name}</div>
                    );
                  })}
                </div>
              </div>
              <div className="modal-header-right">
                <div className="modal-header-id">#00{data.id}</div>
              </div>
            </div>
            <div className="modal-header-image">
              <img
                src={data.sprites.other.dream_world.front_default}
                alt="pokemon"
              />
            </div>
          </div>
          <div className="modal-body">
            <div className="modal-body-header">
              <div className="modal-body-header-about">
                <div
                  className="modal-body-header-about-text"
                  style={modalMenu === "about" ? { color: "black" } : null}
                >
                  About
                </div>
                <div
                  className="modal-body-header-line"
                  style={
                    modalMenu === "about" ? { border: "1px solid black" } : null
                  }
                ></div>
              </div>
              <div
                className="modal-body-header-base"
                onClick={() => clickMenuModal("base")}
              >
                <div
                  className="modal-body-header-base-text"
                  style={modalMenu === "base" ? { color: "black" } : null}
                >
                  Base Stats
                </div>
                <div
                  className="modal-body-header-line"
                  style={
                    modalMenu === "base" ? { border: "1px solid black" } : null
                  }
                ></div>
              </div>
              <div
                className="modal-body-header-evolution"
                onClick={() => clickMenuModal("evolution")}
              >
                <div
                  className="modal-body-header-evolution-text"
                  style={modalMenu === "evolution" ? { color: "black" } : null}
                >
                  Evolution
                </div>
                <div
                  className="modal-body-header-line"
                  style={
                    modalMenu === "evolution"
                      ? { border: "1px solid black" }
                      : null
                  }
                ></div>
              </div>
              <div
                className="modal-body-header-moves"
                onClick={() => clickMenuModal("moves")}
              >
                <div
                  className="modal-body-header-moves-text"
                  style={modalMenu === "moves" ? { color: "black" } : null}
                >
                  Moves
                </div>
                <div
                  className="modal-body-header-line"
                  style={
                    modalMenu === "moves" ? { border: "1px solid black" } : null
                  }
                ></div>
              </div>
            </div>
            <div className="modal-body-main">
              <div className="modal-body-main-species" style={{display: 'flex'}}>
                <div className="modal-body-main-text" style={{color: 'grey', width: '35%'}}>Species</div>
                <div className="modal-body-main-text-2">{data.species.name}</div>
              </div>
              <div className="modal-body-main-height" style={{display: 'flex'}}>
                <div className="modal-body-main-text" style={{color: 'grey', width: '35%'}}>Height</div>
                <div className="modal-body-main-text-2">{data.height}</div>
              </div>
              <div className="modal-body-main-weight" style={{display: 'flex'}}>
                <div className="modal-body-main-text" style={{color: 'grey', width: '35%'}}>Weight</div>
                <div className="modal-body-main-text-2">{data.weight}</div>
              </div>
              <div className="modal-body-main-abilities" style={{display: 'flex'}}>
                <div className="modal-body-main-text" style={{color: 'grey', width: '35%'}}>Abilities</div>
                <div className="modal-body-main-text-2">{data.abilities[0].ability.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {openModal ? (
        modal()
      ) : (
        <div className="main">
          <div className="header">Pokedex</div>
          <div className="content">{showPokemon()}</div>
        </div>
      )}
    </>
  );
}

export default App;
