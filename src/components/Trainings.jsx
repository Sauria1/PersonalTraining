import {useEffect, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"
import dayjs from "dayjs";
import {Button, Snackbar} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TrainingsURL = 'https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings';

export default function Trainings() {

    // States
    const [trainings, setTrainings] = useState([]);
    const [msgSnackbar, setMsgSnackbar] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Harjoituksen haku
    const getTrainings = () => {
        fetch(TrainingsURL)
            .then(res => res.json())
            .then(data => {
                const Trainings = data.map(training => ({
                    ...training,
                    date: dayjs(training.date).format('DD.MM.YY HH:mm'),
                }));
                setTrainings(Trainings);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getTrainings();
    }, []);

    // Harjoituksen poisto
    const deleteTraining = (params) => {
        if (window.confirm("Are you sure you want to remove it?")) {
            fetch(`https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/${params.data.id}`, {
                method: "DELETE"
            })
                .then(res => {
                    if (res.ok) {
                        setMsgSnackbar("Trainings deleted successfully");
                        setOpenSnackbar(true);
                        getTrainings();
                    } else {
                        throw new Error("Failed to delete trainings")
                    }
                })
                .catch(err => console.log(err))
        }
    };

    // Etu- ja sukunimi
    const CustomerName = ({data}) => {
        const {firstname, lastname} = data.customer
        return `${firstname} ${lastname}`;
    };

    const columns = [
        {headerName: "Date", field: "date", sortable: true, filter: true},
        {headerName: "Duration", field: "duration", sortable: true, filter: true},
        {headerName: "Activity", field: "activity", sortable: true, filter: true},
        {headerName: "Customer", field: "customer", sortable: true, filter: true, valueFormatter: CustomerName},
        {
            cellRenderer: (params) =>
                <Button size="large" color="error" onClick={() => deleteTraining(params)}>
                    Delete <DeleteIcon/>
                </Button>
        }
    ];

    return (
        <>
            <h2>Trainings Lists</h2>
            <div className="ag-theme-material" style={{height: "460px", width: "40%", margin: "auto"}}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationAutoPageSize={true}>
                </AgGridReact>
            </div>
            <Snackbar
                open={openSnackbar}
                message={msgSnackbar}
                autoHideDuration={3000}
                onClose={() => {
                    setOpenSnackbar(false);
                    setMsgSnackbar("")
                }}>
            </Snackbar>
        </>
    );
}