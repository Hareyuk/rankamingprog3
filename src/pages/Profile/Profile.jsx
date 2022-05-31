import './style.css';
import React, {useState, useEffect, Fragment} from 'react';
import { useParams } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseconfig';
const Profile = (props)=>
{
    const [editable, setEditable] = useState(false);
    const {id} = useParams();
    const {functionStart, uid} = props;
    const [nick, setNick] = useState("");
    const [pfpUrl, setPfpUrl] = useState("");
    const [phrase, setPhrase] = useState("");
    const [insignias, setInsignias] = useState("");
    
    functionStart(true);
    useEffect(() => {
        const getDataGame = async () => {
          const docRef = doc(db, "users", id);
          const docSnap = await getDoc(docRef);
          const { nick, pfpUrl, phrase } = docSnap.data();
          setNick(nick);
          setPfpUrl(pfpUrl);
          setPhrase(phrase);
        };
        
        getDataGame();
      });

    const updatePageProfile=()=>
    {
        setEditable(false);
    }
    const buildPageUserView=()=>
    {
        return(
        <div>
            <h1>Usuario</h1>
            <div className='infoUser'>
                <div className='boxImg'>
                    <img src={pfpUrl} alt={nick}/>
                </div>
                <div>
                    <h2>{nick}</h2>
                    <p>{phrase}</p>
                </div>
            </div>    
            <div className='rankingsList'><h3>Rankings</h3><div></div></div>
            <div className='insignias'><h3>Insignias</h3><div></div></div>
        </div>)
    }

    const buildPageUserEdit=()=>
    {
        return(<div>
            <form>
                <label>Foto: </label>
                <img src={pfpUrl} alt={nick}/>
                <input type="file" accept="image/png, image/jpeg"/>
                <label>Apodo: </label> <input type="text"/>
                <br/>
                <label>Frase: </label> <input type="text"/>
                <br/>
            </form>
        </div>)
    }
    return(
    <Fragment>
        {buildPageUserView()}
    </Fragment>);
}
export default Profile;