export const ROUTES = {
    HOME: "/",
    OFFERS: "/offers",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "BBank",
    OFFERS: "Услуги",
};
