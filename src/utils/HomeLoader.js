import {
    defer,
} from "react-router-dom";

export default function HomeLoader() {
    let data = fetch(`${import.meta.env.VITE_BACKEND_URL}/clients`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    }).then((res) => {
        return res.json();
    });

    return defer({ data });
}