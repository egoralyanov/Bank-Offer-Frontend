export const ROUTES = {
    HOME: "/",
    OFFERS: "/offers",
    APPLICATIONS: "/applications",
    LOGIN: "/login",
	REGISTER: "/register",
	PROFILE: "/profile",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "BBank",
    OFFERS: "Услуги",
    APPLICATIONS: "Заявки",
    LOGIN: "Вход",
    REGISTER: "Регистрация",
    PROFILE: "Профиль",
};
