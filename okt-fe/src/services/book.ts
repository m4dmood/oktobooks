import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { auth } from "./auth";
import type { BinaryOperatorToken } from "typescript";

const apiUrl = `${import.meta.env.VITE_API_URL}/book`;

export function book() {
    const router = useRouter();

    const retrieve = async () => {
        try {
            const res = await axios.get(`${apiUrl}/all`);

            if (res.data) {
                const [data, count] = res.data;
                return { data, count };
            }
        } catch (e) {
            console.error("Error while retrieving data: ", e);
            return null;
        }
    };

    const searchByStatus = async (status: 'to-read' | 'reading' | 'read') => {
        try {
            const res = await axios.get(`${apiUrl}/status?status=${status}`);

            if (res.data) {
                const [data, count] = res.data;
                return { data, count };
            }
        } catch (e) {
            console.error("Search failed:", e);
            return null;
        }
    }

    const insert = async (
        title: string,
        author: string,
        year: string
    ) => {
        console.log("Payload:\n", typeof title, typeof author, typeof year);
        console.log(title, author, year);
        try {
            await axios.post(`${apiUrl}/new`, { title, author, year });
            return;
        } catch (e) {
            console.error(e);
            return;
        }
    };

    //set-status
    const changeStatus = async (bookId: number, status: 'to-read' | 'reading' | 'read') => {
        try {
            await axios.patch(`${apiUrl}/set-status`, { id: bookId, status: status });
            return true;
        } catch (e) {
            console.error("Err:", e);
            return false;
        }
    };

    //remove
    const remove = async (bookId: number) => {
        try {
            await axios.delete(`${apiUrl}/remove?id=${bookId}`);
        } catch (e) {
            console.error(e);
            return;
        }
    };

    return { retrieve, insert, changeStatus, remove, searchByStatus };
}