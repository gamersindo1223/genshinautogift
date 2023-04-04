var script = document.createElement("script");
script.type = "text/javascript";
script.src =
  "https://cdn.jsdelivr.net/gh/gamersindo1223/genshinautogift@latest/js/getuid.min.js";
document.head.appendChild(script);
async function run() {
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
  dataobj[`uid`] = getuid();
  console.log(dataobj);
}
