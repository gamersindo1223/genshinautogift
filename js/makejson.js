async function getuid() {
  let dataarray = [];

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === XMLHttpRequest.DONE) {
      if (JSON.parse(this.responseText).retcode === -100) {
        alert(`Please login first!`);
        location.reload();
      } else {
        JSON.parse(this.responseText).data.list.forEach((data) => {
          dataarray.push({
            region: data.region,
            regioname: data.region_name,
            uid: data.game_uid,
          });
        });
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
  return dataarray;
}
async function run() {
  let uid = await getuid();
  let cookie = document.cookie;
  let data = [];
  let dataobj = {};
  if (!cookie.includes(`account_id`) && !cookie.includes(`cookie_token`)) {
    alert(`Login First!`);
    location.reload();
  }
  cookie = cookie.split("; ");
  cookie.forEach((docdata) => {
    if (
      docdata.startsWith(`account_id`) ||
      docdata.startsWith("cookie_token")
    ) {
      docdata = docdata.split("=");
      dataobj[docdata[0]] = docdata[1];
    }
  });
  dataobj[`uid`] = uid;
  setTimeout(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      var Str =
        '<!DOCTYPE HTML><html><head></head><body style = "text-align:center;">' +
        "<h4 >Copy This and follow the next instruction on the github pages!</h4><p>" +
        JSON.stringify(dataobj, null, 3) +
        "</p></body>  </html>";
      console.log(uid.length);
      $("html").html(Str);
    } else {
      console.log(dataobj);
    }
  }, 0);
}
