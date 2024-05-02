import {useState} from "react";
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import CustomerDialogForm from "./CustomerDialogForm.jsx";
import EditIcon from "@mui/icons-material/Edit";

export default function EditCustomers(props) {

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
        setCustomers({
            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
            email: props.params.data.email,
            phone: props.params.data.phone
        })
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.updateCustomer(props.params.data._links.customer.href, customers);
        setOpen(false);
    }

    return (
        <div>
            <Button size="large" color="warning" onClick={handleClickOpen}>Edit <EditIcon/></Button>
            <Dialog open={open}>
                <DialogTitle>Update Customer</DialogTitle>
                <CustomerDialogForm customers={customers} setCustomers={setCustomers}/>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}