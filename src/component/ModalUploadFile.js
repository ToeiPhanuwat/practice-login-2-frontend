import { useState } from 'react';
import './ModalUploadFile.css';
import axios from 'axios';

function ModalUploadFile() {
    const token = localStorage.getItem('jwtToken');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [alertColor, setAlertColor] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setAlertColor('alert alert-warning');
            setUploadStatus('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.put('http://localhost:1150/api/v1/auth/file', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setAlertColor('alert alert-success');
            setUploadStatus('File uploaded successfully!.')

        } catch (error) {
            console.error(error);
            setAlertColor('alert alert-danger');
            setUploadStatus('File upload failed.')
        }
    };

    return (
        <div>
            <button type="button" className="btn-item btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#UploadProfileModal">
                Upload profile
            </button>

            <div className="modal fade" id="UploadProfileModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-upload-file-content modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Upload profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-column justify-content-between">

                            <form onSubmit={handleUpload}>
                                <div className="input-group">
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleFileChange}
                                        id="inputGroupFile04"
                                        aria-describedby="inputGroupFileAddon04"
                                        aria-label="Upload"
                                    />
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        id="inputGroupFileAddon04"
                                    >
                                        Upload
                                    </button>
                                </div>
                            </form>

                            <div>
                                {uploadStatus && 
                                <div className={alertColor} role="alert">
                                    {uploadStatus}
                                </div>
                                }
                            </div>

                        </div>
                        <div className="modal-footer">
                            <div className='text-left text-danger'>รองรับเฉพาะไฟล์นามสกุล .jpeg และขนาดไม่เกิน 5MB</div>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalUploadFile;