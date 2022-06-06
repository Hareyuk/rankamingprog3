import './style.css';
import React, {useState, useEffect, Fragment} from 'react';
import GradientBar from '../../components/GradientBar/GradientBar';
import { doc, getDoc, updateDoc} from "firebase/firestore";
import { db } from "../../firebaseconfig";
const Surprise = (props)=>
{
    const {functionStart, uid} = props;
    const [countClicks, setCountClicks] = useState(0);
    const [updateData, setUpdateData] = useState(false);
    const [syncingData, setSyncingData] = useState(false);

    const addClick = async()=>
    {
        if(updateData) //To make sure that isn't updating without sync before
        {
            setCountClicks(countClicks+1);
            if(!syncingData)
            {
                setSyncingData(true);
                const userNewData = doc(db, "users", uid);
                await updateDoc(userNewData, {
                    clicks: countClicks
                });
                setSyncingData(false);
            }
        }
    }
    useEffect(()=>
    {
        const getData =async()=>
        {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            const { clicks } = docSnap.data();
            setCountClicks(clicks);
            setUpdateData(true);
        }
        if(uid)
        {
            getData();
            functionStart(false);
        }
        else functionStart(true);
    }, [uid]);
    const buildPageHtml=()=>
    {
        return(
            <div>
                <h1>¡Extras!</h1>
                <section className='clicker'>
                    <GradientBar text="Clicker Button"/>
                        <p>Clicks realizados: {countClicks}</p>
                        <button className='button-19' onClick={addClick}>Click me!</button>
                </section>
                <section>
                    <GradientBar text="Segundo extra"/>
                </section>
            </div>
        )
    }
    return(
    <Fragment>
        {uid ? buildPageHtml() : <h2 className='warningNotLogged'>Lo sentimos, es un espacio para los usuarios del sitio web, le rogamos que inicie sesión o se haga una cuenta nueva para ver esta página de sorpresa.</h2>}
    </Fragment>);
}
export default Surprise;