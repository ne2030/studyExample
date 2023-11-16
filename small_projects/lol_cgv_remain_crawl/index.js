const xml2js = require('xml2js');
const { exec } = require('child_process');
const notifier = require('node-notifier');


const { map, go, mapC, filter, pick, flat } = require('fxjs');


// Your provided XML string
function parse(xmlString) {
    return new Promise((res, rej) => {
// Parse XML string
        xml2js.parseString(xmlString, (err, result) => {
            if (err) return rej(err);
            return res(result.NewDataSet.Table);
        });
    });
}

const theaters = [
    'iQMupWDRjNniY/qm8Ob/Xw==',
    'yYFGJXVcARk5M5ItFh3Ayg==',
    'LWJTd4+tToc0x+RSu1DieA==',
    'EUya2J0wUyuCvXV/PdA/7A==',
    'jeUsfsKaeG1aEpiU1c1z6w==',
    'byuCbaWWC/4+YP7Axx6dSQ==',
    'fFiXGvRT14xg3QT6zc6vPQ==',
    'OPYsV4UgcgjskHorFEUfaA==',
    'Y5qC4mHnqFvPnE5/3487AQ==',
    '2ziBKjUqqpsaZ8ii0eHHyg==',
    'LMP+XuzWskJLFG41YQ7HGA==',
    '6aDDlJejhjtD/Hm2T4Axyw==',
    'it/t7PAOUEOWIOik80giyg==',
];

const makeCurl = theater => `curl 'http://ticket.cgv.co.kr/CGV2011/RIA/CJ000.aspx/CJ_TICKET_TIME_TABLE' \
  -H 'Accept: application/json, text/javascript, */*; q=0.01' \
  -H 'Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: _gid=GA1.3.155928710.1700119143; ASP.NET_SessionId=xtp42xzjy2jp2eu5kprlzkj2; WMONID=ZR8PuuFGfU7; _ga=GA1.1.1605854943.1700119143; _ga_559DE9WSKZ=GS1.1.1700119143.1.1.1700120504.60.0.0; _ga_SSGE1ZCJKG=GS1.3.1700119143.1.1.1700120504.60.0.0' \
  -H 'Origin: http://ticket.cgv.co.kr' \
  -H 'Referer: http://ticket.cgv.co.kr/Reservation/Reservation.aspx?MOVIE_CD=20034786&MOVIE_CD_GROUP=20034684&PLAY_YMD=&THEATER_CD=&PLAY_NUM=&PLAY_START_TM=&AREA_CD=&SCREEN_CD=&THIRD_ITEM=&SCREEN_RATING_CD=' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36' \
  -H 'X-Requested-With: XMLHttpRequest' \
  --data-raw '{"REQSITE":"x02PG4EcdFrHKluSEQQh4A==","MovieGroupCd":"E8UEZNNYRpIRTCTLgTbN6Q==","TheaterCd": "${theater}","PlayYMD":"JuZzdHmJ7Y3jItUO9ci4ZQ==","MovieType_Cd":"nG6tVgEQPGU2GvOIdnwTjg==","Subtitle_CD":"nG6tVgEQPGU2GvOIdnwTjg==","SOUNDX_YN":"nG6tVgEQPGU2GvOIdnwTjg==","Third_Attr_CD":"nG6tVgEQPGU2GvOIdnwTjg==","IS_NORMAL":"nG6tVgEQPGU2GvOIdnwTjg==","Language":"zqWM417GS6dxQ7CIf65+iA=="}' \
  --compressed \
  --insecure`;

const loop = () => {
    go(
      theaters,
      mapC(theater => new Promise((res, rej) => {
          exec(makeCurl(theater), (error, stdout, stderr) => {
              if (error) {
                  console.error(`exec error: ${error}`);
                  return rej(error);
              }

              const data = JSON.parse(stdout).d.DATA;

              go(
                parse(data),
                map(pick(['THEATER_NM', 'SEAT_REMAIN_CNT', 'SCREEN_NM'])),
                filter(info => +info.SEAT_REMAIN_CNT > 2),
                res,
              );
          });
      })),
      flat,
      (theater_infos) => {
          if ([...theater_infos].length == 0) {
              return console.log(`No seat - ${new Date()}`);
          }

          theater_infos.map((info) => {
              // Send the notification
              notifier.notify({ title: `${info.THEATER_NM} - ${info.SCREEN_NM}`, });
          });
      }
    ).catch(err => console.log(`ERROR:::: ${err.message}`));
};

setInterval(() => {
    loop();
}, 1000);

