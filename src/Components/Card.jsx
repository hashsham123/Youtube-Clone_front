import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import {format} from "timeago.js";
import { useState,useEffect } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
const Container = styled.div`
width: 360px;
margin-bottom: ${(props)=>props.type === "sm" ? "10px" :"45px"};
cursor: pointer;
display: ${(props)=>props.type === "sm" && "flex"};
gap: 10px;
`;

const Image = styled.img`
width: 100%;
border-radius: 10px;
height: ${(props)=>props.type === "sm" ? "120px" :"202px"};
background-color: #999;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props)=>props.type !== "sm" && "16px"};
  gap: 12px;
`
const ChannelImage = styled.img`
  
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props)=>props.type=== "sm" && "none"};
`

const Texts = styled.div``;
const Title = styled.h1`
font-size: 16px;
font-weight: 500;
color: ${({theme})=>theme.text};
`;
const ChannelName = styled.h1`
font-size: 14px;
color: ${({theme})=>theme.textSoft};
margin: 10px 0px;
`;
const Info = styled.div`
font-size: 14px;
color: ${({theme})=>theme.textSoft};
`;

const Card = ({ type, video }) => {

  const [channel,setChannel] = useState([]);
  const {currentUser} = useSelector(state => state.user);
  
  useEffect(()=>{
    const fetchChannel = async()=>{

      const res =await axios.get(`users/find/${video.userId}`);
      setChannel(res.data);
    }
    fetchChannel();
  },[video.userId]);
  return (
    <Link to={currentUser ? `/video/${video._id}` : '/signin'} style={{ textDecoration: "none" }}>
    <Container type={type}>
      <Image
        type={type}
        src={video.imgUrl}
      />
    <Details type={type}>
      <ChannelImage type={type} src={channel.img}/>
      <Texts>
        
          
          <Title> {video.title} </Title>
          <ChannelName>
          {channel.name}
          </ChannelName>
          <ChannelName> <Info> {video.Views} views • {format(video.createdAt)} </Info>  </ChannelName>
        
      </Texts>
    </Details>

    </Container>
    </Link>
  )
}

export default Card