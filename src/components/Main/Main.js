import React, { useState } from 'react'
import './Main.css'

import Loader from '../../common/Loader/Loader';
import ImageUploader from '../../common/ImageUploader/ImageUploader'
import ImagePreview from "../../common/ImagePreview/ImagePreview";
import { sizes } from "../../utils/sizes"
import { useHistory } from 'react-router-dom';
import axios from '../../config/axios'
import Button from '../../common/Button/Button'
import Error from '../../common/Error/Error'

const Main = () => {
    const [selectedFile, setFile] = useState(null);
    const [files, setFiles] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const history = useHistory();


    const handleFileChange = (file) => {
        setFile(file);
        setError(false);
    }

    const handleSaveImages = async () => {
        setLoading(true);
        let imageArray = []
        const fd = new FormData();
        console.log(files);
        for (let key in files) {
            fd.append("file", files[key]);
            fd.append("upload_preset", 'parthImages');
            await axios.post('/image/upload', fd)
                .then((success) => {
                    setError(false);
                    imageArray.push(success.data)
                    if (imageArray.length === 4) {
                        history.push({
                            pathname: '/uploaded',
                            state: imageArray
                        });
                    }
                }, (error) => {
                    setError(true);
                    setLoading(false)
                })

        }
    }


    return (
        <div className="home-container">
            {isLoading ? <Loader text="Uploading, Please Wait..." /> : ''}
            {error &&
                <div className="main-error">
                    <Error errorMessage="Image Uploading Failed" />
                </div>
            }
            <ImageUploader
                requiredWidth={1024}
                requiredHeight={1024}
                file={selectedFile}
                getFile={handleFileChange}
            />
            <div className="save-button">
                <Button styleType={"primary"} onClick={handleSaveImages} title="upload" disabled={!selectedFile} />
            </div>
            <div className="image-previews">
                {
                    sizes.map((size, key) =>
                        <ImagePreview
                            image={selectedFile}
                            width={size.width}
                            height={size.height}
                            type={size.type}
                            getFile={({ file, key }) => setFiles(f => ({ ...f, [key]: file }))}
                            key={key} />)
                }
            </div>
        </div>
    )
}

export default Main
