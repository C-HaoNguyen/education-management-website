export function isLoggedIn() {
        const accessToken = localStorage.getItem("accessToken");
        // todo: verify token validity later
        return accessToken !== null;
}