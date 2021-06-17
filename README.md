# passport-kakao-session
about passport-kakao login

카카오 dev에 가서 웹 등록 후 rest api 키를 가져다 넣음

email: profile._json && profile._json.kakao_account_email,
nick: profile.displayName,
snsId: profile.id,
provider: "kakao"

email은 받을 수 없을 수도 있음. 참고하기
callback 공식문서에서 권장하는 건 /oauth
