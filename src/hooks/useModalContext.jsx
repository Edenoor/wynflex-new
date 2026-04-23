import { useContext } from "react";
import ModalContext from "../context/ModalContext";

export default function useModalContext() {
    return useContext(ModalContext);
}