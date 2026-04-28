import { useContext } from "react";
import DeviceContext from "../context/DeviceContext";

export default function useDeviceContext() {
  return useContext(DeviceContext);
}