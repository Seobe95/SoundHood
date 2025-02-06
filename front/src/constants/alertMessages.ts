const alertMessages = {
  DELETE: {
    TITLE: '정말로 해당 게시글을 삭제하시겠습니까?',
    MESSAGE: '삭제 후 데이터복구는 어려워요 🥺',
    BUTTONS: [
      { text: '삭제하기', style: 'destructive' },
      { text: '취소', style: 'cancel' },
    ],
  },
  POST: {
    TITLE: '작성을 취소하시고 나가시겠습니까?',
    MESSAGE: '이 페이지에서 나가시면 저장이 되지 않아요 🥺',
    BUTTONS: [
      { text: '나가기', style: 'destructive' },
      { text: '취소', style: 'cancel' },
    ],
  },
  EDIT: {
    TITLE: '수정을 취소하시고 나가시겠습니까?',
    MESSAGE: '이 페이지에서 나가시면 반영이 되지 않아요 🥺',
    BUTTONS: [
      { text: '나가기', style: 'destructive' },
      { text: '취소', style: 'cancel' },
    ],
  },
  DETAIL: {
    TITLE: '음악을 찾을 수 없습니다.',
    MESSAGE: '음악이 삭제되었거나, 올바르지 않은 요청이에요.',
    BUTTONS: [{ text: '확인', style: 'default' }],
  },
  LOGIN: {
    TITLE: '로그인이 필요합니다.',
    MESSAGE: '음악을 등록하기 위해선 로그인이 필요해요.',
    BUTTONS: [
      { text: '로그인', style: 'default' },
      { text: '취소', style: 'cancel' },
    ],
  },
  WEBVIEW: {
    TITLE: '외부 링크를 연결하시겠습니까?',
    MESSAGE: '사용하시던 브라우저로 연결됩니다.',
    BUTTONS: [
      { text: '열기', style: 'default' },
      { text: '취소', style: 'cancel' },
    ],
  },
  DELETE_ACCOUNT: {
    TITLE: '회원 탈퇴를 진행하시겠습니까?',
    MESSAGE: '회원 탈퇴 시 데이터 복구는 불가합니다.',
    BUTTONS: [
      { text: '탈퇴', style: 'destructive' },
      { text: '취소', style: 'cancel' },
    ],
  },
} as const;

const permissionAlertMessages = {
  LOCATION: {
    TITLE: '위치권한 허용이 필요한 기능입니다.',
    DESCRIPTION: '설정에서 위치를 허용해주세요.',
  },
  PHOTO: {
    TITLE: '사진첩 접근이 필요합니다.',
    DESCRIPTION: '설정에서 사진첩 접근을 허용해주세요.',
  },
} as const;

export { alertMessages, permissionAlertMessages };
