import React from "react";
import Posts from "./Posts";
import Users from "./Users";

const Home = () =>{

    return <main style={{ display: "flex" }}>
        <Posts/>
        <Users/>
    </main>
}

export default Home