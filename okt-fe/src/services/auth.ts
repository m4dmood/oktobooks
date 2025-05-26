import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const token = ref(localStorage.getItem("token") || '');
const apiUrl = import.meta.env.VITE_API_URL;

export function auth() {
    const router = useRouter();

    const authenticate = async (username: string, password: string) => {
        try {
            console.debug("Connecting to " + apiUrl);
            const response = await axios.post(`${apiUrl}/auth/login`, { username, password });
            console.log("Response auth:", response);

            if (response.data.access_token) {
                console.log("Auth success");
                token.value = response.data.access_token;
                localStorage.setItem("token", response.data.access_token);
                return true;
            } else {
                return false;
            }       
        } catch (e) {
            console.error("Error while authenticating: ", e);
            return false;
        }
    };

    const logout = () => {
        console.log("Disconnecting...");
        token.value = '';
        localStorage.removeItem('token');
        console.log("Disconnected.");
        router.push('/login');
    };

    const isAuthenticated = () => !!token.value;

    return { authenticate, logout, isAuthenticated, token };
}