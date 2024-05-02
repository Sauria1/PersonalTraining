import {DialogContent, TextField} from "@mui/material";

export default function CustomerDialogForm({customers, setCustomers}) {
    return (
        <DialogContent>
            <TextField
                required
                margin="dense"
                label="First Name"
                value={customers.firstname}
                onChange={(e) => setCustomers({...customers, firstname: e.target.value})}
                variant="outlined"
                sx={{mb: 1}}
            />
            <TextField
                required
                margin="dense"
                label="Last Name"
                value={customers.lastname}
                onChange={(e) => setCustomers({...customers, lastname: e.target.value})}
                variant="outlined"
                sx={{ml: 1}}
            />
            <TextField
                required
                margin="dense"
                label="Address"
                value={customers.streetaddress}
                onChange={(e) => setCustomers({...customers, streetaddress: e.target.value})}
                variant="outlined"
                sx={{mb: 1}}
            />
            <TextField
                required
                margin="dense"
                label="Postal Code"
                value={customers.postcode}
                onChange={(e) => setCustomers({...customers, postcode: e.target.value})}
                variant="outlined"
                sx={{ml: 1}}
            />
            <TextField
                required
                margin="dense"
                label="City"
                value={customers.city}
                onChange={(e) => setCustomers({...customers, city: e.target.value})}
                variant="outlined"
                sx={{mb: 1}}
            />
            <TextField
                required
                margin="dense"
                label="Email"
                value={customers.email}
                onChange={(e) => setCustomers({...customers, email: e.target.value})}
                variant="outlined"
                sx={{ml: 1}}
            />
            <TextField
                required
                margin="dense"
                label="Phone"
                value={customers.phone}
                onChange={(e) => setCustomers({...customers, phone: e.target.value})}
                variant="outlined"
            />
        </DialogContent>
    );
}