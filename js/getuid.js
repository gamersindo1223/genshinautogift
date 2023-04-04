let dataarray = [];
function getuid() {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === XMLHttpRequest.DONE) {
      if (JSON.parse(this.responseText).retcode === -100) {
        alert(`Please login first!`);
        location.reload();
      } else {
        JSON.parse(this.responseText).data.list.forEach(data=>{
          dataarray.push({ region: data.region, regioname: data.region_name, uid: data.game_uid})
        })
      }
    }
  });
  xhr.open(
    "GET",
    "https://api-account-os.hoyoverse.com/account/binding/api/getUserGameRolesByCookieToken?lang=en&region=os_asia&game_biz=hk4e_global&sLangKey=en-us"
  );
  xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
  xhr.setRequestHeader(
    "Accept-Language",
    "en-US,en;q=0.9,id-ID;q=0.8,id;q=0.7"
  );
  xhr.send();
    return dataarray
}
