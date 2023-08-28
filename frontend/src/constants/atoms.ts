import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const isSideMenuOpenAtom = atomWithStorage('isSideMenuOpen', true);

export const toggleFetchClients = atom(false);
