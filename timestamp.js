const moment = require('moment');
const moment_tz = require('moment-timezone');

const getDate= () => {
    const a = new Date();
    const getNum = (a) => {
        if(a<9){
            return "0"+a.toString();
        }
        else {
            return a.toString()
        }
    };
    const date = a.getFullYear().toString()
        +getNum(a.getMonth()+1)
        +getNum(a.getDate())
        +getNum(a.getHours())
        +getNum(a.getMinutes())
        +getNum(a.getSeconds());

    const now = moment(date,"YYYYMMDDHHmmss").tz("Asia/Kolkata").format("YYYYMMDDHHmmss");
    // console.log(now);
    return now;
};

exports.checkTime = (then) => {
    const now = getDate();
    let ms = moment(now,"YYYYMMDDHHmmss").diff(moment(then,"YYYYMMDDHHmmss"));
    //let ms = moment(then,"YYYYMMDDHHmmss").diff(moment(now,"YYYYMMDDHHmmss"));
    let hr = Math.floor(moment.duration(ms).asHours());
    console.log("hr",hr);
    if(hr!==0)
        return false;
    else {
        const min = Math.floor(moment.duration(ms).asMinutes());
        console.log("min",min);
        if(min!==0)
            return false;
        else {
            const sec = moment.duration(ms).asSeconds();
            console.log("sec",sec);
            return sec < 60;
        }
    }
    // return true;
};

// console.log(checkTime("20190123212920"));