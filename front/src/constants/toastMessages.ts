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
  EDIT: {
    SUCCESS: '수정이 완료되었습니다.',
    FAIL: '수정이 실패했습니다.',
  },
  DELETE: {
    SUCCESS: '삭제가 완료되었습니다.',
    FAIL: '삭제에 실패했습니다.',
  },
} as const;

export { toastMessages };
