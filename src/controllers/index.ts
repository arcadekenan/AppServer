import {Express} from 'express';
import MenuController from './MenuController';

export default (app: Express) => {
    MenuController(app);
};