import { Router} from 'express'
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment'

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  /* setar a data como normal e no horário exato */
  const parsedDate = startOfHour(parseISO(date));

 /* achar se existe data igual, e se achar retornar um erro 400  */
  const findAppointmentInSameDate = appointments.find(appointment => 
    isEqual(parsedDate, appointment.date), 
  );

  if(findAppointmentInSameDate) {
    return response
      .status(400)
      .json( { message: 'This appointment is alredy booked' });
  }

  const appointment = new Appointment (provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;