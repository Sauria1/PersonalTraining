import {Link, Outlet} from "react-router-dom";
import './App.css';
import {AppBar, Toolbar, Typography} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function App() {

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="App">
        <AppBar position="static">
            <Toolbar className="toolbar">
                <Typography variant="h6">Personal Training</Typography>
            </Toolbar>
        </AppBar>
        <nav>
            <Link to={"/PersonalTraining/"}>Customers <AccountBoxIcon fontSize="small"/></Link>
            <Link to={"/PersonalTraining/trainings"}>Trainings <SportsTennisIcon fontSize="small"/></Link>
            <Link to={"/PersonalTraining/calendar"}>Calendar <DateRangeRoundedIcon fontSize="small"/></Link>
        </nav>
        <Outlet />
    </div>
      </LocalizationProvider>
  )
}

export default App
