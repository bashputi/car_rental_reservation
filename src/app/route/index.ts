import { AuthRoute } from './../modules/Auth/auth.route';
import { Router } from "express";



const router = Router();
const modulesRoute = [
    {
        path: "/auth",
        route: AuthRoute
    }
];

modulesRoute.forEach((route) => router.use(route.path, route.route));
export default router;