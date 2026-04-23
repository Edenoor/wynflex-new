import { useContext } from "react";
import DeviceContext from "../Context/DeviceContext";

export default function useDeviceContext() {
    return useContext(DeviceContext);
}