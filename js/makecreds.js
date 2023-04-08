async function getuid() {
    return new Promise((resolve) => {
        let dataarray = [];
        let xhr = new XMLHttpRequest();
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

                    setTimeout(() => {
                        resolve(dataarray);
                    }, 2000);
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
    });
}
async function run() {
    $("html").html(`<h4>Loading JS Parser</h4>`);
    await getuid().then((uid) => {
        let cookie = document.cookie;
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
            var Str =
            '<!DOCTYPE html><html lang="en"><head><link rel="stylesheet" href="style.css" /><title>Copy The cookie</title></head><body><p id="title">' +'This website will parse your mihoyo cookie <br/> Into A Json for' +'<a href="https://github.com/MoonLGH/genshinautogift">genshinautogift</a></p><div id="main" class="main"><p id="Parseresult"> ' + JSON.stringify(dataobj, null, 3) + '</p></div></body></html>' +
            "<style>@import url('https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&display=swap'); .main{margin: 25px;width: 350px;height: 200px;margin: 0 auto;}#title {text-align: center; font-size: 24px; font-family: Jua}</style>"

            console.log(uid.length);
            $("html").html(Str);
        }, 200);
    });
}
