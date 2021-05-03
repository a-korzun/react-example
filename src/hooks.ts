import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { RootStore, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
