import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import React, { Fragment, useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage'

const CropperCompr = (props) => {
    const {img, aspect, setBool, cropSize, setImg} = props;     
    const [crop, setCrop] = useState({x:0, y:0});
    const [zoom, setZoom] = useState(1);
    const [pixelCrop, setCroppedAreaPixels] = useState(null);
    const [rotation, setRotation] = useState(0);

  const onCropComplete = useCallback((croppedArea, pixelCrop) => {
    setCroppedAreaPixels(pixelCrop);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        img,
        pixelCrop,
        rotation
      )
      setImg(croppedImage);
      setBool(false);
    } catch (e) {
      console.error(e);
    }
  }, [pixelCrop, rotation]);

  return (
    <div className='class-crop'>
      <Cropper
        image={img}
        crop={crop}
        rotation={rotation}
        zoom={zoom}
        aspect={aspect}
        cropSize={cropSize}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onRotationChange={setRotation}
        onZoomChange={setZoom}
      />
      <button onClick={showCroppedImage}>
        Listo
      </button>
    </div>
  )
}


export default CropperCompr;