import { Outlet } from "react-router-dom"
import Navbar from "../../Components/Navbar"
import NavbarAdmin from "../../Components/AdminNavbar"
import {theme} from '../../Theme.js';
import { ThemeProvider } from '@mui/material/styles';

export default function Template() {


    return(
        <ThemeProvider theme={theme}>
            <Navbar/>
            {/* <NavbarAdmin/> */}
            <main>
                <Outlet/>
            </main>
        </ThemeProvider>
    )   
}