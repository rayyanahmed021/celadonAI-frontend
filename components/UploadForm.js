import React from 'react'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import { useAuthContext } from "/utils/AuthContext";

export default function UploadForm() {
    const { user } = useAuthContext()
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (user) {

            if (selectedFile) {
                // Perform file upload logic here
                console.log('Uploading file:', selectedFile);
                window.location = "/chat";
            } else {
                console.log('Please select a file.');
            }
        } else {
            window.location = "/auth/login";
        }   
    }

    return (
        <div className={styles.inner}>
            <form onSubmit={handleSubmit} className={styles.uploadForm}>
                <input type="file" onChange={handleFileUpload} className={styles.fileInput} accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf"/>
                <button type="submit" className={styles.uploadButton}>Upload</button>
            </form>
        </div>
    )
}