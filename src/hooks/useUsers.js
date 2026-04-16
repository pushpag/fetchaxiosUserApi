import { useEffect, useState } from "react";
import { fetchUsers } from '../api/userApi';

export const useUsers = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getData = async() =>{
            try {
            setLoading(true);
            const result = await fetchUsers();
            setData(result);
            setError("");
            } catch (err) {
            setError(err.message || "Something went wrong");
            } finally {
            setLoading(false);
            }
        }
        getData();
    }, []);

    return { data, loading, error};

}