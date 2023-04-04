var script = document.createElement("script");
script.type = "text/javascript";
script.src =
  "https://cdn.jsdelivr.net/gh/gamersindo1223/genshinautogift@latest/js/getuid.min.js";
await document.head.appendChild(script);

async function run() {
  let uid = await getuid()
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
     if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                var Str = 
'<!DOCTYPE HTML><html><head></head><body style = "text-align:center;">'+
'<h4 >Copy This and follow the next instruction on the github pages!</h4><p>' + JSON.stringify(dataobj, null, 3) + 
                '</p></body>  </html>';
            $('html').html(Str);
}else{
  console.log(dataobj);
}
 }
await run()
