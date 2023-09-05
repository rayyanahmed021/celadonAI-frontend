import React, { useEffect, useState } from 'react';
import styles from '../../styles/Dashboard.module.css';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuthContext } from "/utils/AuthContext";
import axios from 'axios';

const Dashboard = () => {
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [bots, setBots] = useState([]);

    const fetchBots = async () => {
        axios.get(`https://celadon-ai-flask-1194b43609af.herokuapp.com/dashboard/${user.uid}`).then(doc => {
            setBots(doc.data);
            console.log(doc.data);
            setLoading(false);
        }).catch(e => {
            console.log(e);
            setLoading(false);
        });
    }

    useEffect(() => {
        setLoading(true);

        if (user) {
            fetchBots();
        } else {
            window.location = "/auth/login";
        }
    }, []);

    return (
        <div style={{backgroundColor: "rgb(245, 245, 245)", minHeight: "100vh", width: "100%"}}>
            <Head>
                <title>Dashboard | Personalised ChatGPT for your brand</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Navbar />
            <div className={styles.dashboard}>
                {
                    loading ?
                        <div style={{
                            width: "100%",
                            height: "100vh"
                        }}>
                            <img style={{
                                display: "block",
                                margin: "auto",
                                marginTop: "25vh"
                            }} src="https://i.pinimg.com/originals/49/23/29/492329d446c422b0483677d0318ab4fa.gif" width={150} />
                        </div>
                        :
                        <div className={styles.container}>
                            <h3>Your Chat Bots <Link href="/"><button className={styles.button}>Add new</button></Link></h3>
                            <br />
                            {bots.map(bot => {
                                return (
                                    <Link href={
                                        {
                                            pathname: '/chat',
                                            query: { id: bot.document_id, name: bot.name }
                                        }
                                    } className={styles.item}>
                                        <h3>{bot.name}</h3>
                                    </Link>
                                )
                            })}
                        </div>
                }
            </div>
        </div>
    );
};

export default Dashboard;