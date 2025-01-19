export const ROUTES = {
    HOME: "/",
    OFFERS: "/offers",
    APPLICATIONS: "/applications",
    LOGIN: "/login",
	REGISTER: "/register",
	PROFILE: "/profile",
    OFFERSTABLE: "/offers-table",
    NOT_FOUND: "*",
    FORBIDDEN: "/forbidden"
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "BBank",
    OFFERS: "Услуги",
    APPLICATIONS: "Заявки",
    LOGIN: "Вход",
    REGISTER: "Регистрация",
    PROFILE: "Профиль",
    OFFERSTABLE: "Модерация услуг",
    NOT_FOUND: "404",
    FORBIDDEN: "403"
};
