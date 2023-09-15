import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const isSideMenuOpenAtom = atomWithStorage('isSideMenuOpen', true);

export const toggleFetchClients = atom(false);
export const toggleFetchWells = atom(false);
export const toggleFetchCategories = atom(false);
export const toggleFetchItems = atom(false);
