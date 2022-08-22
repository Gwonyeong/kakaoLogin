const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID, //REST API 키를 넣으면 됨.
        callbackURL: "/auth/kakao/callback", //요청을 보내고 나서 반환값을 받을 URI
      },
      /*
      clientId에 카카오 앱 아이디 추가.
      callbackURL 카카오 로그인 후 카카오가 결과를 전송해줄 URL
      accessToken refreshToken 로그인 성공 후 카카오가 보내준 토큰
      profile 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입.
      */

      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile)
          const exUser = await User.findOne({
            //카카오 플랫폼에서 로그인 했고 snsId필드에 카카오 아이디가 일치할 경우
            where: { snsId: profile.id, provider: "kakao" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            //exUser가 없다는 것은 가입되지 않은 것이고 그러한 유저라면 회원가입을 시키고 로그인을 시킨다.            
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account_email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
