/*
Get your genshin UID (Do Not Delete)
*/


var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js';
document.head.appendChild(script);

function generateDs()
{
    const date = new Date();
    const t = Math.floor(date.getTime() / 1000);
    let r = Math.random().toString(36).substring(2, 8);
    const h = createHash("md5").update(`salt=6s25p5ox5y14umn1p61aqyyvbvvl3lrt&t=${t}&r=${r}`).digest("hex");
    return `${t},${r},${h}`;
}



async function doRequest(cookie, uid)
{
    let req = await fetch("https://api-account-os.hoyoverse.com/account/binding/api/getUserGameRolesByCookieToken?lang=en&region=os_euro&game_biz=hk4e_global&sLangKey=en-us", {
        headers: {
            "Cookie": `cookie_token_v2=${cookie}; account_id_v2=${uid};`,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
            "x-rpc-language": "en-us",
            "x-rpc-app_version": "1.5.0",
            "x-rpc-client_type": "4",
            "DS": generateDs()
        }
    });

    let res = await req.json();

    console.log(res);
}
