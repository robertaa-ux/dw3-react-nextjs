// Importando os hooks useState e useEffect
import {useState, useEffect} from "react";
import styles from "@/components/HomeContent/HomeContent.module.css";
import Loading from "../Loading";
// Importando biblioteca AXIOS
import axios from "axios";

const HomeContent = () => {
  const [games, setGames] = useState()
  // Estado para constrolar o gif de carregamento
  const [loading, setLoading] = useState(true);

  // useEffect
  // Aqui sera criada a função para pegar os jogos da API
  useEffect(() =>{
    const fetchGames = async () => {
      try{
        const response = await axios.get("http://localhost:4000/games");
        setGames(response.data.games)
        console.log(response)
      }catch{
        console.log(error)
        // Finally é executado no final da  promessa
      }finally{
        // Delay de 3 segundos para mudar o estado para false
        setTimeout(() => setLoading(false), 3000)
      }
    };
    // Invocando a função dentro do useEffect
    fetchGames([]);
  });

  return (
    <>
      <div className={styles.homeContent}>
        {/* CARD LISTA DE JOGOS */}
        <div className={styles.listGamesCard}>
          {/* TITLE */}
          <div className={styles.title}>
            <h2>Lista de jogos</h2>
          </div>
          {/* Ternario para mostrar a lista de jogos ou o gif de carregamento */}
          {loading ? (
            <Loading loading={loading}/> 
          ) : (
            <div className={styles.games} id={styles.games}>
            {/* Lista de jogos irá aqui */}
            {games.map((game) => (
              <ul className={styles.listGames}>
                <div className={styles.gameImg}>
                  <img src="images/game_cd_cover.png" alt="Capa de Jogo" />

                </div>
                <div className={styles.gameInfo}>
                  <h3>{game.title}</h3>
                  <li>Plataforma: {game.descriptions.platform}</li>
                  <li>Gênero: {game.descriptions.genre}</li>
                  <li>Classificação: {game.descriptions.rating}</li>
                  <li>Ano: {game.year}</li>
                  <li>
                    Preço: {game.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL"
                    })}
                  </li>

                </div>
              </ul>
            ))}
            
          </div>
          )}          
        </div>
      </div>
    </>
  );
};

export default HomeContent;
