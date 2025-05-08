export interface Notice {
  noticeId: number;
  title: string;
  content: string;
  uploadTime: string;
  isPin: boolean;
}

export interface NoticeStore {
  mainNoticeData: Notice[];
  noticeData: Notice | null;
  pinNotices: Notice[];
  notices: Notice[];
  allNotices: Notice[];

  getMainNotice: () => Promise<void>;
  getNotice: (noticeId: string) => Promise<void>;
  getAllNotice: () => Promise<void>;
}

export interface NoticeDetail {
  noticeId: number;
  title: string;
  content: string;
  uploadTime: string;
  isPin: boolean;
  imageUrl?: string[];
}