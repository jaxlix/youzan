const IP = "http://localhost:8000"

const API = {
  currentUser: IP + "/api/currentUser",
  queryReadPacks: IP + "/api/config/coupon/search",   //?shopId=${param.shopId}`
  queryActives: IP + "/api/config/search",  // ?shopId=${param.shopId}&pageNo=${param.pageNo}&pageNum=${param.pageNum}`
  updateActive: IP + "/api/config/update",  // post
  insertActive: IP + "/api/config/insert",  // post
  deleteActive: IP + "/api/config/delete",  // ?id=${id}
  reqUpload: IP + "/api/file/upload"        // post
}

export default API
// export async function reqUpload(params) {
//   return get('/api/file/upload', {
//     method: 'POST',
//     body: params.formData,
//   });
// }
