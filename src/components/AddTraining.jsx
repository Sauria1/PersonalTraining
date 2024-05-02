import {useState} from "react";
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import TrainingDialogForm from "./TrainingDialogForm.jsx";

export default function AddTraining(props) {

    // States
    const [training, setTraining] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: props.params.data._links.customer.href
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button size="large" onClick={handleClickOpen}>Add Training <SportsTennisIcon/> </Button>
            <Dialog open={open}>
                <DialogTitle>Add Training</DialogTitle>
                <TrainingDialogForm training={training} setTraining={setTraining}/>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}