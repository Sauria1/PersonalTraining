import {useState} from "react";
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import CustomerDialogForm from "./CustomerDialogForm.jsx";
import AccessibilityIcon from '@mui/icons-material/Accessibility';

export default function AddCustomers(props) {

    // States
    const [customers, setCustomers] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSave = () => {
        props.addCustomer(customers);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button style={{marginBottom: "10px", marginLeft: "10px"}} color="primary"
                    variant="contained" onClick={handleClickOpen}>Add Customers <AccessibilityIcon/>
            </Button>
            <Dialog open={open}>
                <DialogTitle>Add Customer</DialogTitle>
                <CustomerDialogForm customers={customers} setCustomers={setCustomers}/>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}