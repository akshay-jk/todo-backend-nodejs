import express from 'express';

import auth from './modules/authModule.js'
import ctrl from './modules/to-do/controller.js'

const router = express.Router();

router.post('/sign-up', ctrl.userSignup);
router.post('/log-in', ctrl.userLogin);

router.get('/view-todo-list', auth.AuthUser, ctrl.viewTodoList);
router.post('/add-todo',auth.AuthUser, ctrl.addTodoList);

export default router;