import {useEffect, useState} from "react";
import {dayjsLocalizer, Calendar as TrainingCalender} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import 'dayjs/locale/fi';

const TrainingsURL = 'https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings';
dayjs.locale('fi')

export default function Calendar() {

    // States
    const localizer = dayjsLocalizer(dayjs);
    const [events, setEvents] = useState([]);

    const fetchTrainings = async () => {
        try {
            const response = await fetch(TrainingsURL);
            const data = await response.json();
            const Events = data.map(training => ({
                title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
                start: dayjs(training.date).toDate(),
                end: dayjs(training.date).add(training.duration, 'minutes').toDate(),
            }));
            setEvents(Events);
        } catch (error) {
            console.error("Error", error);
        }
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    return (
        <div id="Calendar">
            <h1>Calendar Scheduler App</h1>
            <TrainingCalender
                localizer={localizer}
                events={events}
                startAccessor={"start"}
                endAccessor={"end"}
                style={{height: '1000px'}}
            />
        </div>
    );
}