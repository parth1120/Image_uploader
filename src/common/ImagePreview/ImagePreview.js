import React, { useEffect, useRef, memo, useState, useCallback } from 'react';
import ImageCrop from '../ImageCrop/ImageCrop';
import { dataUriToFile } from '../../utils/dataUriToFile';
import './ImagePreview.css';
import Button from '../Button/Button'

const ImagePreview = ({
  image = null,
  width = 380,
  height = 380,
  type = "Gallery",
  getFile = () => { }
}) => {
  const [dataUrlImage, setDataUrlImage] = useState(null);
  const [openCropModal, toggleModal] = useState(false);

  const canvas = useRef(null);

  const setPreview = useCallback((img, x, y, cropWidth, cropHeight, canvas) => {
    const ctx = canvas.current.getContext('2d');
    ctx.drawImage(
      img,
      x,
      y,
      cropWidth,
      cropHeight,
      0,
      0,
      width,
      height
    );
    const dataUri = canvas.current.toDataURL("image/jpeg", 1.0);
    const file = dataUriToFile(dataUri, width, height, type);
    getFile({ file, key: `${width}x${height}` });
    // eslint-disable-next-line
  }, [width, height, type]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        setPreview(img, 0, 0, width, height, canvas);
        setDataUrlImage(img);
      }
    } else {
      const ctx = canvas.current.getContext('2d');
      ctx.clearRect(0, 0, width, height);
    }
    // eslint-disable-next-line
  }, [image, width, height]);

  const handleCropChange = (crop) => {
    setPreview(dataUrlImage, crop.x, crop.y, crop.width, crop.height, canvas);
  }

  return (
    <div className="image-preview-container">
      <span className="image-resolution">{width} x {height}</span>
      <canvas
        width={width}
        height={height}
        ref={canvas}
      />
      {
        openCropModal ?
          <ImageCrop
            width={width}
            height={height}
            onCrop={handleCropChange}
            image={image}
            toggle={() => toggleModal(!openCropModal)} /> : ''
      }
      {
        image ?
          <div className="crop-option-overlay">
            <Button styleType={"primary"} onClick={() => toggleModal(!openCropModal)} title="Resize"/>
          </div> : ''
      }
    </div>
  );
}

export default memo(ImagePreview);