import './style.css';
import React, {useState, useEffect, Fragment} from 'react';
import { useParams } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
const Profile = (props)=>
{
    const [editable, setEditable] = useState(false);
    const {id} = useParams();
    const {functionStart, uid} = props;
    useEffect(()=>
    {
        functionStart(true);
    })

    const updatePageProfile=()=>
    {
        setEditable(false);
    }
    const buildPageUserLogged=()=>
    {
        return(<div>
            {editable ? <button onClick={()=>{setEditable(true)}}>Editar perfil</button> : <button onClick={()=>{updateProfile()}}>Editar perfil</button>}
        </div>)
    }

    const buildPageUserView=()=>
    {
        return(<div>
            {editable ? <button onClick={()=>{setEditable(true)}}>Editar perfil</button> : <button onClick={()=>{updateProfile()}}>Editar perfil</button>}
        </div>)
    }

    const buildPageUserEdit=()=>
    {
        return(<div>
            {editable ? <button onClick={()=>{setEditable(true)}}>Editar perfil</button> : <button onClick={()=>{updateProfile()}}>Editar perfil</button>}
        </div>)
    }
    return(
    <Fragment>
        
    </Fragment>);
}
export default Profile;