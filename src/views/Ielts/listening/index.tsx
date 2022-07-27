import * as React from 'react';
import {Container,Box,Button,Card} from "@mui/material";
import { makeStyles } from '@mui/styles';
import KeyboardArrowLeftIcon  from '@mui/icons-material/KeyboardArrowLeft';

const useStyle = makeStyles((theme?:any)=>{
root:{};
header:{}
})


export interface IeltsListeningProps {
}

export default function IeltsListening (props: IeltsListeningProps) {
// !Style
const classes = useStyle()

// TODO : chinh height động cho header
  return (
    <>
        <Container sx={{height:"60px",background:"#36373b",display:"flex",alignItem:"center",justifyContent:"space-between"}} maxWidth="xl">
        <Button variant="outlined" startIcon={<KeyboardArrowLeftIcon/>} size="medium" >EXIT</Button>
        <Button variant="outlined" >SUBMIT</Button>
        </Container>    
        <Container maxWidth="xl" sx={{height:`calc(100vh - 60px)`}}>
            <Card sx={{height:"100%"}}>abc</Card>
        </Container>
    </>
    
  );
}
