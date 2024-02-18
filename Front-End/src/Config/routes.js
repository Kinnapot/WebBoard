import LoginPage from "../Page/LoginPage";
import RegisterPage from "../Page/RegisterPage";
import HomePage from "../Page/HomePage";
import ProfilePage from "../Page/ProfilePage";
import HistoryPage from "../Page/HistoryPage";

const components = {
  LoginPage: {
    url: "/login",
    component: LoginPage,
  },
  RegisterPage: {
    url: "/register",
    component: RegisterPage,
  },
  HomePage: {
    url: "/home",
    component: HomePage,
  },
  ProfilePage: {
    url: "/profile",
    component: ProfilePage,
  },
  HistoryPage: {
    url: "/history",
    component: HistoryPage,
  },
};

export default {
  guest: {
    allowedRoutes: [
      { url: components.LoginPage.url, component: components.LoginPage.component },
      { url: components.RegisterPage.url, component: components.RegisterPage.component }
    ],
    redirecRoutes: "/login",
  },
  user: {
    allowedRoutes: [
      { url: components.HomePage.url, component: components.HomePage.component },
      { url: components.ProfilePage.url, component: components.ProfilePage.component },
      { url: components.HistoryPage.url, component: components.HistoryPage.component }
    ],
    redirecRoutes: "/home"
  },
};
