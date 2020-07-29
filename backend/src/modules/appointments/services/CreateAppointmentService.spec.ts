import AppError from '@shared/errors/AppError';

import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123654',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123654');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 7, 20, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123654',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123654',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
