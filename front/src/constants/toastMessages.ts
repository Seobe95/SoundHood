const toastMessages = {
  LOGIN: {
    SUCCESS: '로그인이 완료되었습니다.',
    FAIL: '로그인에 실패했습니다.',
  },
  LOGOUT: {
    SUCCESS: '로그아웃 되었습니다.',
    FAIL: '로그아웃에 실패했습니다.',
  },
  SIGNUP: {
    SUCCESS: '축하합니다! 회원가입이 완료되었습니다.',
    FAIL: '회원가입에 실패했습니다.',
  },
  POST: {
    SUCCESS: '노래가 성공적으로 등록되었습니다.',
    FAIL: '노래 등록에 실패했습니다.',
  },
  LIKE: {
    ERROR: '좋아요 목록을 불러오는데 실패했습니다.',
  },
  EDIT: {
    SUCCESS: '수정이 완료되었습니다.',
    FAIL: '수정이 실패했습니다.',
  },
  DELETE: {
    SUCCESS: '삭제가 완료되었습니다.',
    FAIL: '삭제에 실패했습니다.',
  },
  MAP: {
    ERROR: '음악을 불러오는데 에러가 발생했습니다.',
    FAIL: '삭제에 실패했습니다.',
  },
  PATCH_PROFILE: {
    SUCCESS: '닉네임 변경이 완료되었습니다.',
    FAIL: '닉네임 변경에 실패했습니다.',
  },
  ERROR: {
    UNEXPECT_ERROR: '알 수 없는 에러가 발생했습니다.',
  },
  DELETE_ACCOUNT: {
    SUCCESS: '회원탈퇴가 완료되었습니다.',
    FAIL: '회원탈퇴에 실패하였습니다. 잠시 후 다시 시도해주세요.',
  },
  GET_POST: {
    ERROR: '게시글 조회에 실패했습니다. 잠시 후 다시 시도해주세요.',
  },
} as const;

export { toastMessages };
