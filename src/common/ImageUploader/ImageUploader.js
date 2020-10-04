import React, { useState, useRef, memo } from "react";
import "./ImageUploader.css";
import Button from '../../common/Button/Button'
import Error from '../../common/Error/Error'

const ImageUploader = ({
    file = null,
    requiredWidth = 1024,
    requiredHeight = 1024,
    getFile = () => { },
}) => {
    //state
    const [error, setError] = useState(null);

    //input file element reference
    const inputRef = useRef(null);

    const handleFileChange = (e) => {
        const { files } = e.target;
        if (files && files[0]) {
            validateImage(files[0]);
        } else {
            getFile(null);
        }
    };

    // validate image resolution is 1024x1024
    const validateImage = (file) => {
        if (file.type === "image/jpeg" || file.type === "image/png") {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = function () {
                    if (this.width === requiredWidth && this.height === requiredHeight) {
                        getFile(file);
                        setError(null);
                    } else {
                        inputRef.current.value = "";
                        setError(
                            `Image has to be exactly ${requiredWidth} x ${requiredHeight}`
                        );
                    }
                };
            };
        } else {
            inputRef.current.value = "";
            setError("Please Select Image!");
        }
    };

    const handleReset = () => {
        inputRef.current.value = "";
        getFile(null);
    };

    return (
        <div className="image-upload-container">
            <input
                type="file"
                accept="image/jpeg,image/png"
                ref={inputRef}
                onChange={handleFileChange}
            />
            {!file ? (
                <div className="upload-button">
                    <Button styleType={"primary"} onClick={() => inputRef.current.click()} title="Select Image" />
                    <p className="note">

                        <strong> Note: </strong> Image file (.jpeg, .png) only with
                        {requiredWidth} x {requiredHeight} resolution
          </p>
                </div>
            ) : (
                    <Button styleType={"secondary"} onClick={handleReset} title="Reset" />
                )}
            {error && <Error errorMessage={error} />}
        </div>
    );
};

export default memo(ImageUploader);