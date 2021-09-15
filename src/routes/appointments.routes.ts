import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment'

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDay = appointments.find((appointmentFind: Appointment) => 
    isEqual(appointmentFind.date, parsedDate)
  )

  if(findAppointmentInSameDay) {
    return res.status(400).json({message : 'This Appointment aready booked'})
  }

  const appointment = new Appointment(provider, parsedDate);
  appointments.push(appointment);

  return res.json(appointment) 
});

export default appointmentsRouter;