import React from 'react'
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import styled from "styled-components";


const FooterContainer = styled.div`
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100% !important;
  height: 60px !important ;
  padding: 25px;
  color:white;
  background: #3f50b5;
  bottom: 0;
`;

export default function Footer() {
    return (
        <FooterContainer>
            <Typography variant="title">© 2021 COVID-19 Tracker</Typography>
        </FooterContainer>

    )
}