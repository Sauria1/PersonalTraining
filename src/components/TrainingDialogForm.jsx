import {DialogContent, TextField} from "@mui/material";
import {DateTimePicker} from "@mui/x-date-pickers";
import {renderTimeViewClock} from '@mui/x-date-pickers/timeViewRenderers';

export default function TrainingDialogForm({training, setTraining}) {

    const handleDateChange = (date) => {
        setTraining({...training, date: date.toISOString()});
    }

    return (
        <DialogContent>
            <TextField
                required
                margin="dense"
                label="Activity"
                value={training.activity}
                onChange={(e) => setTraining({...training, activity: e.target.value})}
                variant="outlined"
                sx={{mb: 1}}
            />
            <TextField
                required
                margin="dense"
                label="Duration"
                type="number"
                value={training.duration}
                onChange={(e) => setTraining({...training, duration: e.target.value})}
                variant="outlined"
                sx={{ml: 1}}
            />
            <DateTimePicker
                margin="dense"
                label="Date and Time"
                onChange={handleDateChange}
                viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                }}
                ampm={false}
                sx={{width: "40.5%"}}
            />
        </DialogContent>

    );
}