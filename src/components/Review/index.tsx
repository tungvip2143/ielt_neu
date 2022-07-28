import { Card, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { ieltsApi } from 'api/ieltsResults';
import TableCustom from 'components/Table';
import * as React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const header = ["Section","Band Score","Name","Session Date"]

function TabPanel(props: TabPanelProps) {
  const { children, value, index,...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
<>        {children}
</>      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ReviewAndScore() {
  const [value, setValue] = React.useState(0);
  const [data,setData] = React.useState<any>(null)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

//   !Function

const fetchListeningResult = async ()=>{
    const response = await ieltsApi.getIeltListeningsResult()
    setData(response.data)
}
const fetchReadingResults = async ()=>{
    const response = await ieltsApi.getIeltReadingResult()
    setData(response.data)
}
 
const fetchWritingResults = async ()=>{
    setData(null)
}
const fetchSpeackingResults = async ()=>{
    setData(null)
}

// !Effect

React.useEffect(()=>{
    fetchListeningResult()
},[])

  return (
    <Grid container sx={{ width: '100%' }}>
        <Grid item lg={12} md={12} xl={12}>
            <Card>
                    <Tabs sx={{p:1}} value={value} onChange={handleChange} aria-label="basic tabs example">
                        <ReviewTab onClick={fetchListeningResult}  label="Listenning" {...a11yProps(0)} />                     
                        <ReviewTab onClick={fetchReadingResults} label="Reading" {...a11yProps(1)} />
                        <ReviewTab onClick={fetchWritingResults} label="Writing" {...a11yProps(2)} />
                        <ReviewTab onClick={fetchSpeackingResults} label="Speaking" {...a11yProps(3)} />
                    </Tabs>
                <TabPanel  value={value} index={0}>
                    <TableCustom  header={header} data={data} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TableCustom  header={header} data={data} /> 
               </TabPanel>
                <TabPanel value={value} index={2}>
                    <  TableCustom  header={header} data={data} /> 
               </TabPanel>
                <TabPanel value={value} index={3}>
                    <TableCustom  header={header} data={data} /> 
               </TabPanel>
            </Card>
        </Grid>
      
    </Grid>
  );
}

const ReviewTab = styled(Tab)`
width:25%;
height:40px
`
