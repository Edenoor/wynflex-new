import {
    defer,
} from "react-router-dom";

export default function AboutUsLoader() {
    let data = fetch(`${import.meta.env.VITE_BACKEND_URL}/members`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    }).then((res) => {
        return res.json();
    });

    return defer({ data });
}