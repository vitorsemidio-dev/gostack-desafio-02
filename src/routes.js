import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import GymPlanController from './app/controllers/GymPlanController';
import RegistrationController from './app/controllers/RegistrationController';
import NotificationController from './app/controllers/NotificationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);

routes.put('/students/:id', authMiddleware, StudentController.update);

routes.delete('/students', (req, res) => {
  return res.json({ msg: 'Hello students delete' });
});

routes.post('/students', StudentController.store);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:student_id/help-orders', HelpOrderController.index);
routes.post('/students/:student_id/help-orders', HelpOrderController.store);

routes.post('/admin', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/help-orders/:help_id/answer', AnswerController.store);

routes.get('/gymplans', GymPlanController.index);
routes.get('/gymplans/:planId', GymPlanController.show);
routes.post('/gymplans', GymPlanController.store);
routes.delete('/gymplans/:planId', GymPlanController.delete);
routes.put('/gymplans/:planId', GymPlanController.update);

routes.get('/registrations', RegistrationController.index);
routes.get('/registrations/:regId', RegistrationController.show);
routes.post('/registrations', RegistrationController.store);
routes.delete('/registrations/:regId', RegistrationController.delete);
routes.put('/registrations/:regId', RegistrationController.update);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:notifId', NotificationController.update);

export default routes;
