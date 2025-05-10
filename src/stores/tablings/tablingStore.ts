import { api } from "@/utils/api";
import { create } from "zustand";
import { BoothInfo } from "@/types/Booth.types";
import { ReservationStore } from "@/types/Tabling.types";

export const useReservationStore = create<ReservationStore>((set, get) => {
  return {
    recentName: '',
    recentPhoneNum: '',
    reservationInfo: null,
    userName: '',
    nightBoothInfo: null,
    openNightBoothInfo: null,
    openNightBoothInfoLength: 0,
    selectedNightBoothInfo: null,
    prevReserveBoothName: '',
    reserveInfo: {
      userName: '',
      phoneNum: '',
      personCount: 0,
      boothId: '',
    },

    setUserName: (name: string) => set({ userName: name }),

    setRecentPhoneNum: (phone: string) => set({ recentPhoneNum: phone }),

    setRecentName: (name: string) => set({ recentName: name }),

    setSelectedNightBoothInfo: (booth) => {
      set({ selectedNightBoothInfo: booth ? { ...booth } : null });
    },

    saveReservation: async (payload, { openModal, closeModal, navigate }) => {
      openModal('loadingModal');
      try {
        const res = await api.post('/main/reservation', payload);
        closeModal();

        if (res.data.success) {
          const msgStatus = res.data.reservationInfo.messageStatus;
          if (msgStatus === 'SEND_FAIL') openModal('messageFailModal');
          if (msgStatus === 'SEND_SUCCESS') openModal('completeReserveModal');
        } else {
          openModal('failReservationModal');
        }

        await get().getAllNightBooth();
      } catch (err) {
        closeModal();
        navigate(`/error/main`);
        console.error(err);
      }
    },

    getReservation: async (payload, { openModal, closeModal, navigate }) => {
      try {
        const res = await api.get('/main/reservation', { params: payload });
        set({ reservationInfo: res.data.reservationInfo });

        if (res.data.success) {
          const info = res.data.reservationInfo;
          if (info.totalTeamCount === 1) {
            openModal('enterBoothModal');
          } else {
            openModal('searchReservationModal');
          }
        } else {
          openModal('noReserveModal');
        }
      } catch (err) {
        closeModal();
        navigate(`/error/main`);
        console.error(err);
      }
    },

    getAllNightBooth: async () => {
      const res = await api.get('/main/booth/night/reservation/all');
      const boothList = res.data.boothList;
      const openList = boothList.filter((booth: BoothInfo) => booth.isOpen);

      set({
        nightBoothInfo: boothList,
        openNightBoothInfo: openList,
        openNightBoothInfoLength: openList.length,
      });
    },

    checkDuplicateReserve: async (phoneNum, { openModal, closeModal, navigate }) => {
      try {
        const res = await api.get(`/main/reservation/duplication?phoneNum=${phoneNum}`);
        if (res.data.success) {
          set({ prevReserveBoothName: res.data.adminName });
          openModal('duplicateModal');
        } else {
          openModal('loadingModal');
          await get().saveReservation(get().reserveInfo, { openModal, closeModal, navigate });
        }
      } catch (err) {
        closeModal();
        navigate(`/error/main`);
        console.error(err);
      }
    },
  };
});
