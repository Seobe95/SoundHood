import { TrackItems } from '@/api/spotify';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SearchSpotifySlice {
  searchParams: string;
  searchResult: TrackItems[] | null;
  selectedSong: TrackItems | null;
  setSearchSongs: (songs: TrackItems[] | null) => void;
  setSearchParams: (p: string) => void;
  setSelectedSong: (song: TrackItems) => void;
  reset: () => void;
}

export const useSearchSpotifyStore = create<SearchSpotifySlice>()(
  devtools(
    set => ({
      searchParams: '',
      searchResult: null,
      selectedSong: null,
      setSearchSongs: songs => {
        set({ searchResult: songs }, undefined, 'SEARCH/SET_SEARCH_RESULT');
      },
      setSearchParams: params => {
        set({ searchParams: params }, undefined, 'SEARCH/SET_SEARCH');
      },
      setSelectedSong: (song: TrackItems | null) => {
        set(
          { selectedSong: song, searchParams: '', searchResult: null },
          undefined,
          'SEARCH/SELECT_SONG',
        );
      },
      reset: () => {
        set(
          { searchParams: '', searchResult: null, selectedSong: null },
          undefined,
          'SEARCH/RESET',
        );
      },
    }),
    { name: 'SEARCH' },
  ),
);
