// app/hooks.ts hoặc useAppDispatch.ts

import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
