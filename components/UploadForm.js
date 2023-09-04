import React from 'react'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import { useAuthContext } from "/utils/AuthContext";

export default function UploadForm() {
    const { user } = useAuthContext()
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);
        
        if (user) {
            if (selectedFile) {
                const formData = new FormData();
                formData.append("file", selectedFile);
                
                await fetch(`https://celadon-ai-flask-1194b43609af.herokuapp.com/upload/${user.uid}`, {
                    method: 'POST',
                    body: formData
                }).then(doc => {
                    setLoading(false);
                    window.location = "/dashboard";
                }).catch(e => {
                    console.log(e);
                });
            } else {
                console.log('Please select a file.');
                setLoading(false);
            }
        } else {
            window.location = "/auth/login";
        }
    }

    return (
        <div className={styles.inner}>
            <form onSubmit={handleSubmit} className={styles.uploadForm}>
                <input type="file" onChange={handleFileUpload} className={styles.fileInput} accept=".ppt, .pptx" />
                <button type="submit" disabled={loading} className={loading ? styles.disabled : styles.uploadButton}>{loading ?  "Processing..." : "Upload"}</button>
            </form>
        </div>
    )
}