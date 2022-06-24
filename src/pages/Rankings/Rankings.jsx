import './style.css';
import React, {useState, useEffect, Fragment} from 'react';
import GradientBar from '../../components/GradientBar/GradientBar';
import { db } from '../../firebaseconfig';
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom';
const Rankings = (props)=>
{
    
  const [rankingData, setRankingData] = useState([]);
  const [userDataFull, setUserDataFull] = useState([]);
  const [finishedLoadingGames, setFinishedLoadingGames] = useState(false);
  const [gamesData, setGamesData] = useState([]);
  //Get all data users
  useState(()=>
  {
    let arrayUsers = [];
    const getAllDataUsers= async ()=>
    {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc)=>
      {
        arrayUsers[doc.id] = doc.data();
      })
      setUserDataFull(arrayUsers);
    }
    getAllDataUsers();
  })

   //Data Rankings
   useEffect(()=>
   {
     const getDataRankings = async ()=>
     {
       let arrayData = [];
       await gamesData.map(async (item, index)=>{
         const q = await query(collection(db, "rankings", item.id, "users"), orderBy("score"), limit(10));
         const querySnapshot = await getDocs(q);
         let arrayGameData = {id: item.id, name: item.name, playersScores: []};
         await querySnapshot.forEach((doc) => {
           let objData = doc.data();
           objData.id = doc.id;
           arrayGameData.playersScores.push(objData);
         });
         arrayData.push(arrayGameData);
       });
       setRankingData(arrayData);
     }
     if(finishedLoadingGames)getDataRankings();
   }, [finishedLoadingGames]);

   useEffect(() => {
    const getDataGames = async ()=>
    {
      const q = query(collection(db, "games"), orderBy("timestamp"), limit(4));
      const querySnapshot = await getDocs(q);
      let arrayData = [];
      querySnapshot.forEach((doc) => {
        let objData = doc.data();
        objData.id = doc.id;
        arrayData.push(objData);
      });
      setGamesData(arrayData);
      setFinishedLoadingGames(true);
    }
    functionStart(true);
    getDataGames();
  });
     

const {functionStart} = props;
    
  const buildDivRank = (item) => {
    return (
      <div key={item.name} className="cardInfo cardRank">
        <Link to={"/game/"+item.id}>
        <h3>{item.name}</h3>
        <div className="rankList">
          {item.playersScores.map((item, i) => {
            const {pfpUrl, nick} = userDataFull[item.id];
            return (
              <div className="userRank">
                <div className="borderPic">
                  <div></div>
                  <img src={pfpUrl} alt={nick} />
                </div>
                <div className="boxTextsRank">
                  <h4>
                    {i + 1} - {nick}
                  </h4>
                  <p>{item.score}</p>
                </div>
              </div>
            );
          })}
        </div>
        </Link>
      </div>
    );
  };

    useEffect(()=>
    {
        functionStart(true);
    })
    return(
    <Fragment>
        <GradientBar text="Rankings"></GradientBar>
        <div className="listDesign">
            {rankingData.map((item) =>
               buildDivRank(item)
            )}
          </div>
    </Fragment>);
}
export default Rankings;