import {useEffect, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"
import {Button, Snackbar} from "@mui/material";
import AddCustomers from "./AddCustomers.jsx";
import EditCustomers from "./EditCustomers.jsx";
import AddTraining from "./AddTraining.jsx";
import DeleteIcon from '@mui/icons-material/Delete';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {CSVLink} from "react-csv";

const customerURL = "https://customerrestservice-personaltraining.rahtiapp.fi/api/customers"
const TrainingURL = "https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings"

export default function Customers() {

    // States
    const [customers, setCustomers] = useState([]);
    const [msgSnackbar, setMsgSnackbar] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Asiakkaiden haku
    const getCustomers = () => {
        fetch(customerURL)
            .then(res => res.json())
            .then(data => {
                const Customers = data._embedded.customers;
                setCustomers(Customers);
            })
            .catch(err => console.log("Error in uploading customer data:", err));
    }

    // Asiakkaiden lisäys
    const addCustomer = (Customers) => {
        fetch(customerURL, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Customers)
        })
            .then(res => {
                console.log("response" + res);
                if (res.ok) {
                    setMsgSnackbar("Customer added successfully");
                    setOpenSnackbar(true);
                    getCustomers();
                } else {
                    throw new Error("Failed to add customer")
                }
            })
            .then(data => {
                console.log("parsed Json = ", data);
                getCustomers();
            })
            .catch(err => console.log(err))
    };

    // Asiakkaiden päivitys
    const updateCustomer = (customerURL, updatedCustomer) => {
        fetch(customerURL, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
            .then(res => {
                if (res.ok) {
                    setMsgSnackbar("The customer was updated successfully")
                    setOpenSnackbar(true);
                    getCustomers();
                }
            })
            .catch(err => console.log(err))
    };

    // Asiakkaiden poisto
    const deleteCustomers = (params) => {
        if (window.confirm("Are you sure you want to remove it?")) {
            fetch(params.data._links.customer.href, {
                method: "DELETE"
            })
                .then(res => {
                    if (res.ok) {
                        setMsgSnackbar("Customer deleted successfully");
                        setOpenSnackbar(true);
                        getCustomers();
                    } else {
                        throw new Error("Failed to delete customer")
                    }
                })
                .catch(err => console.log(err))
        }
    };

    // Harjoituksen lisäys asiakkaalle
    const addTraining = (training) => {
        fetch(TrainingURL, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(training)
        })
            .then(res => {
                console.log("response" + res);
                if (res.ok) {
                    setMsgSnackbar("Training added successfully");
                    setOpenSnackbar(true);
                    getCustomers();
                } else {
                    throw new Error("Failed to add training to customer")
                }
            })
            .then(data => {
                console.log("parsed Json = ", data);
                getCustomers();
            })
            .catch(err => console.log(err))
    };

    useEffect(() => {
        getCustomers();
    }, []);

    const columns = [
        {headerName: "First name", field: "firstname", sortable: true, filter: true},
        {headerName: "Last name", field: "lastname", sortable: true, filter: true},
        {headerName: "Email", field: "email", sortable: true, filter: true},
        {headerName: "Phone", field: "phone", sortable: true, filter: true},
        {headerName: "Address", field: "streetaddress", sortable: true, filter: true},
        {headerName: "Postal Code", field: "postcode", sortable: true, filter: true},
        {headerName: "City", field: "city", sortable: true, filter: true},
        {
            cellRenderer: params => <EditCustomers updateCustomer={updateCustomer} params={params}>
                Edit
            </EditCustomers>
        },
        {
            cellRenderer: (params) =>
                <Button size="large" color="error" onClick={() => deleteCustomers(params)}>
                    Delete <DeleteIcon/>
                </Button>
        },
        {
            cellRenderer: params =>
                <AddTraining addTraining={addTraining} params={params}>
                    Add Training <SportsTennisIcon/>
                </AddTraining>
        }
    ];

    const csvdata = customers.map(customer => ({
        "First name": customer.firstname,
        "Last name": customer.lastname,
        "Email": customer.email,
        "Phone": customer.phone,
        "Address": customer.streetaddress,
        "Postal Code": customer.postcode,
        "City": customer.city
    }));

    return (
        <>
            <div>
                <AddCustomers addCustomer={addCustomer}/>
                <CSVLink data={csvdata} filename={"customers.csv"}>
                    <Button style={{marginBottom: "10px", marginLeft: "10px"}} color="primary"
                            variant="contained">Export to CSV <FileDownloadIcon/></Button>
                </CSVLink>
                <h2>Customer Lists</h2>
                <div className="ag-theme-material" style={{height: "600px", width: "80%", margin: "auto"}}>
                    <AgGridReact
                        rowData={customers}
                        columnDefs={columns}
                        pagination={true}
                        paginationAutoPageSize={true}>
                    </AgGridReact>
                </div>
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