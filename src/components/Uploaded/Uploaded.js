import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '../../common/Button/Button'
import './Uploader.css'

const Uploaded = () => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (!location.state) {
            history.push('/');
        }
    }, [history, location]);

    return (
        <div className="success-container">
            <div className="heading">
                <h4>Images uploaded successfully!</h4>
                <span className="go-back" >
                    <Button styleType={"secondary"} onClick={() => history.push('/')} title="back" />
                </span>
            </div>
            <div className="previews">
                {
                    location.state && location.state.map((image, key) => {
                        return <a
                            key={key}
                            href={image.secure_url}
                            title={image.public_id}
                            target="_blank"
                            rel="noopener noreferrer">
                            <img key={key} src={image.secure_url} alt={image.public_id} />
                        </a>
                    })
                }
            </div>
        </div>
    );
}

export default Uploaded
