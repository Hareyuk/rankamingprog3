import "./style.css";
import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import CropperCompr from "../../components/CropperComp/CropperComp";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const Profile = (props) => {
    const { functionStart, uid } = props;
    const [editable, setEditable] = useState(false);
    const { id } = useParams();
    const [nick, setNick] = useState("");
    const [pfpUrl, setPfpUrl] = useState("");
    const [originalPfp, setOriginalPfp] = useState("");
    const [phrase, setPhrase] = useState("");
    //const [insignias, setInsignias] = useState("");
    const [boolUpdate, setBoolUpt] = useState(false);
    const [fileUpload, setFileToUpload] = useState("");
    const [imgFile, setImgFile] = useState("");
    const [boolCrop, setBoolCrop] = useState(false);
    functionStart(true);
    useEffect(() => {
        const getDataGame = async () => {
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);
            const { nick, pfpUrl, phrase } = docSnap.data();
            setNick(nick);
            setPfpUrl(pfpUrl);
            setOriginalPfp(pfpUrl);
            setPhrase(phrase);
        };

        getDataGame();
    }, []);

    useEffect(() => {
        if (!boolCrop) //Se pone esto en falso después de croppear
        {
            if (imgFile) //SI hay archivo recibido... actualizar la imagen de usuario para subirla
            {
                setPfpUrl(imgFile);
            }
        }
    }, [boolCrop]);

    useEffect(() => {
        const updtData = async () => {
            setBoolUpt(false);
        };
        if (boolUpdate) updtData();
    }, [boolUpdate]);

    const handleUploadFile = (e) => {
        const url = window.URL.createObjectURL(e.target.files[0]);
        setFileToUpload(url);
        setBoolCrop(true);
    };

    const storage = getStorage();
    const storageRef = ref(storage, "avatars/" + uid + ".jpg");
    const updatePageProfile = async (e) => {
        e.preventDefault();
        let pathPic = "";
        //This will be used for the urlPfp of the user, so, if is there new image, this new link will be put in this var to replace the pfpUrl in user firestore
        let urlPfpToUpload = originalPfp;
        
        //Only if has a diffferent pic from original
        if (pfpUrl != originalPfp) {
            //convert blob to something uploable to Firebase
            const blob = await fetch(pfpUrl).then(res => res.blob())
            await uploadBytes(storageRef, blob).then((snapshot) => {
                pathPic = snapshot.metadata.fullPath;
            });
        }
        if(pathPic)
        {
            await getDownloadURL(ref(storage, pathPic)).then(
                (url) => {
                    urlPfpToUpload = url;
                    console.log(urlPfpToUpload);
                }
            );
        }
        const userNewData = doc(db, "users", uid);
        await updateDoc(userNewData, {
            nick: nick,
            phrase: phrase,
            pfpUrl: urlPfpToUpload
        });
        setEditable(false);
    };
    const buildPageUserView = () => {
        return (
            <div>
                <h1>Usuario</h1>
                <div className="infoUser">
                    <div>
                        <div className="boxImg">
                            <img src={pfpUrl} alt={nick} />
                        </div>
                        {uid === id ? (
                            <button onClick={() => setEditable(true)}>Editar perfil</button>
                        ) : (
                            ""
                        )}
                    </div>
                    <div>
                        <h2>{nick}</h2>
                        <p>{phrase}</p>
                    </div>
                </div>
                <div className="rankingsList">
                    <h3>Rankings</h3>
                    <div></div>
                </div>
                {/* <div className="insignias">
                    <h3>Insignias</h3>
                    <div></div>
                </div> */}
            </div>
        );
    };

    const buildPageUserEdit = () => {
        return (
            <div>
                <form
                    className="editProfile"
                    onSubmit={(e) => {
                        updatePageProfile(e);
                    }}
                >
                    <div>
                        <label>Foto: </label>
                        <img className="pfpUser" src={pfpUrl} alt={nick} />
                        <input
                            onChange={handleUploadFile}
                            type="file"
                            accept="image/png, image/jpeg"
                        />
                    </div>
                    <div>
                        <label>Apodo: </label>{" "}
                        <input
                            type="text"
                            value={nick}
                            onChange={(e) => setNick(e.target.value)}
                        />
                        <br />
                        <label>Frase: </label>{" "}
                        <input
                            value={phrase}
                            onChange={(e) => setPhrase(e.target.value)}
                            type="text"
                        />
                        <br />
                        <button type="submit">Actualizar perfil</button>
                    </div>
                </form>
                {boolCrop ? (
                    <CropperCompr
                        setImg={(v) => setImgFile(v)}
                        cropSize={{ width: 500, height: 500 }}
                        setBool={(v) => setBoolCrop(v)}
                        aspect={1 / 1}
                        img={fileUpload}
                    ></CropperCompr>
                ) : (
                    ""
                )}
            </div>
        );
    };
    return (
        <Fragment>{editable ? buildPageUserEdit() : buildPageUserView()}</Fragment>
    );
};
export default Profile;
