const jwt = require("jsonwebtoken");
const APP_SECRET = "GraphQL-is-aw3some";

//トークンを複合するための関数
function getTokenPayload(token) {
  //トークン化された物の前の情報(user.id)を複合する。
  return jwt.verify(token, APP_SECRET);
}

//ユーザ-IDを取得するための関数
function getUserId(req, authToken) {
  if (req) {
    //ヘッダーを確認します。認証権限があります？確認する。
    const authHeader = req.headers.authorization;
    //権限があるなら
    const token = authHeader.replace("Bearer", "");
    if (!token) {
      throw new Error("トークンが見つかりませんでした");
    }
    //そのトークンを複合する.
    const { userId } = getTokenPayload(token);
    return userId;
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error("認証権限がありません");
}

module.exports = {
  APP_SECRET,
  getUserId,
};
