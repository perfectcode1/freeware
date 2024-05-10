/*
Javascript PHP Date format parser

Author: Godson Tudeme

Email: perfectcode1 [at] gmail [dot] com

URL: http://www.github.com/perfectcode1/jsPhpDate/

Release Date: May 5, 2024.

License: MIT

*/
const PHP_DATE_ATOM = "Y-m-d\\TH:i:sP";
const PHP_DATE_COOKIE = "l, d-M-Y H:i:s T";
const PHP_DATE_ISO8601  = "Y-m-d\\TH:i:sO";
const PHP_DATE_ISO8601_EXPANDED = "X-m-d\\TH:i:sP";
const PHP_DATE_RFC822 = "D, d M y H:i:s O";
const PHP_DATE_RFC850 = "l, d-M-y H:i:s T";
const PHP_DATE_RFC1036 = "D, d M y H:i:s O";
const PHP_DATE_RFC1123 = "D, d M Y H:i:s O";
const PHP_RFC7231 = "D, d M Y H:i:s \\G\\M\\T";
const PHP_DATE_RFC2822 = "D, d M Y H:i:s O";
const PHP_DATE_RFC3339 = "Y-m-d\\TH:i:sP";
const PHP_DATE_RFC3339_EXTENDED = "Y-m-d\\TH:i:s.vP";
const PHP_DATE_RSS = "D, d M Y H:i:s O";
const PHP_DATE_W3C = "Y-m-d\\TH:i:sP";
(function(ob){ob.prototype.toPhp = function(f,mod={dst:true,locale:"en"}){
	let mths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	let mth = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	let wks = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	let wk = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
	let pos = ["st","nd","rd","th"];

    const mdays = [31,28,31,30,31,30,31,31,30,31,30,31];

    const isDST = function(d) {
        let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
        let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
        return Math.max(jan, jul) !== d.getTimezoneOffset();    
    }

	const sel = function(c,d){
        const mm = d.getMinutes();
        const umm = d.getUTCMinutes();
        const h = d.getHours();
        const uh = d.getUTCHours();
        const d_ = d.getDate();
        const ud = d.getUTCDate();
        const m = d.getMonth();
        const um = d.getUTCMonth();
        const y = d.getFullYear();
        const uy = d.getUTCFullYear();
		let r = "";
        let _r;
		switch(c){
			case "d":
				_r = d_;
				r += _r < 10 ? "0" + _r : String(_r);
				break;
			case "D":
				_r = d.getDay();
				r += wk[_r];
				break;
			case "j":
				_r = d_;
				r += _r.toString()
				break;
			case "l":
				_r = d.getDay();
				r += wks[_r];
				break;
			case "N":
				_r = d.getDay();
				_r -= 1;
				_r = _r < 0 ? 6 : _r;
				r += String(_r);
				break;
			case "S":
				let _rd = d_;
				_r = String(_rd);
                _r = _r.substr(-1,1);
				_r = Number(_r);
				_r = (_rd >= 10 && _rd <= 12) || _r == 0 || _r >= pos.length ? pos.length - 1 : _r - 1;
				r =  pos[_r];
				break;
			case "w":
				_r = d.getDay();
				r += String(_r);
				break;
			case "z":
				let m_chk = m;
                let msum = d_-1;
                if(m_chk>0){
                    for(let m=0; m<m_chk;m++){
                        msum += mdays[m];
                        if(m==1&&sel("L",d)){
                            msum += 1;
                        }
                    }
                }
				r = String(msum);
				break;
			case "W":
                let t = new Date(y+"-1-1");
                t = t.getDay();
                let fmon = t > 1 ? 6 - t + 3 : 2 - t;
				let _dc = Number(sel("z",d))+1;
                let _c = _dc > fmon ? (!Number(sel("L",d)) && m > 1 ? _dc - fmon : _dc - fmon + 1)  : (_dc==fmon?7:0);
                _r = Math.ceil((_c / 7));
                _r += t&&t < fmon ? 1 : 0;
                _r = _r < 10 ? "0" + _r : _r;
                if(_r > 52){
                    let t2 = new Date((y+1)+"-1-1");
                    t2 = Number(sel("W",t2));
                    if(t2 && d.getDay() < 4){
                        _r = "0"+t2 ;
                    }
                }
                if(Number(_r) < 1){
                    _r = Number(sel("W",(new Date(y-1,11,31))));
                }                
				r += String(_r);
				break;
			case "F":
				_r = m;
				r += mths[_r];
				break;
			case "m":
				_r = m+1;
				_r = _r < 10 ? "0" + _r : String(_r);
				r += _r;
				break;
			case "M":
				_r = m;
				r += mth[_r];
				break;
			case "n":
				_r = m+1;
				r = String(_r);
				break;
			case "t":
				_r = mdays[m];
                _r = m == 1 && sel("L",d) == 1 ? _r + 1 : _r;
				r += String(_r);
				break;
			case "L":
				_r = y % 4;
				_r = _r == 0 ? "1" : "0" ;
				r += _r;
				break;
			case "o":
                if(m == 0){
                   _r = Number(sel("W",d)) > 5 ? y - 1 : y;
                }else if(m == 11){
                    _r = Number(sel("W",d)) < 45 ? y + 1 : y;
                }else{
                    _r = y;
                }
				r += String(_r);
				break;
			case "X":
                _r = y < 0 ? "-" + y * -1 : "+" + y;
				r += String(_r);
				break;
			case "x":
                _r = y < 0 ? "-" + y * -1 : (y >= 10000 ? "+" + y : y);
				r += String(_r);
				break;
			case "Y":
				_r = y;
				r += _r.toString();
				break;
			case "y":
				_r = y;
				_r =  String(_r);
                _r = _r.substr(-2,2);
				r += _r.toString();
				break;
			case "a":
				_r = h;
				ampm = _r < 12 ? "am" : "pm";
				r += ampm;
				break;
			case "A":
				_r = h;
				AMPM = _r < 12 ? "AM" : "PM";
				r += AMPM;
				break;
			case "g":
				_r = h;
				_r = _r % 12;
				_r = _r ? _r : 12;
				r += String(_r);
				break;
			case "G":
				_r = h;
				r += String(_r);
				break;
			case "h":
				_r = h;
				_r = _r % 12;
                _r = _r ? _r : 12;
				r += _r < 10 ? "0" + _r : String(_r);
				break;
			case "H":
				_r = h;
				r += _r < 10 ? "0" + _r : String(_r);
				break;
			case "i":
				_r = mm;
				_r = _r < 10 ? "0" + _r : String(_r);
				r += _r;
				break;
			case "s":
				_r = d.getSeconds();
				_r = _r < 10 ? "0" + _r : String(_r);
				r += _r;
				break;
            case "u":
                _r = d.getMilliseconds()*1000;
                r += _r;
                break;
            case "v":
                _r = d.getMilliseconds();
                r += _r;
                break;
            case "e":
                _r = Intl.DateTimeFormat().resolvedOptions().timeZone;
                r += _r;
                break;
            case "I":
                _r = isDST(d) && dst != false ? "1" : "0";
                r += _r;
                break;
            case "O":
                r = sel("P",d).split(":").join("");
                break;
            case "P":
                let _tzo = d.getTimezoneOffset() * -1;
                let hoffs = Math.floor(_tzo / 60);
                let moffs = _tzo % 60;
                hoffs = isDST(d) ? hoffs - 1 : hoffs;
                if(hoffs>=0){
                    _r = hoffs < 10 ? "+0" + hoffs : "+" + hoffs;
                }else{
                    _r = hoffs < -9 ? "-" + hoffs * -1 : "-0" + hoffs * -1;
                }
                _r += ":"+(moffs < 10 ? "0" + moffs : moffs);
                r = _r
                break;
            case "p":
                _r = sel("P",d);
                _r = _r == "+00:00" ? "Z" : _r;
                r += _r;
                break;
            case "T":
                _r = d.toString().match(/\(([A-Za-z\s].*)\)/)[1];
                r += _r;
                break;
            case "Z":
                _r = d.getTimezoneOffset() * -60;
                r += String(_r);
                break;
            case "c":
                const c_dt  = ["Y","-","m","-","d"];
                const c_tm = ["H",":","i",":","s","P"];
                let c_r = "";
                c_dt.map((v)=>{c_r += sel(v,d)});
                c_r += "T";
                c_tm.map((v)=>{c_r += sel(v,d)});
                r += c_r;
                break;
            case "r":
                const r_dt  = "D, d M Y H:i:s P";
                let r_r = "";
                r_dt.split("").map((v)=>{r_r += sel(v,d)});
                r += r_r;
                break;
            case "U":
                _r = Math.round(Date.now()/1000);
                r += _r;
                break;
			default:
				r += c;
		}
		return r;
	}
    if(!f) return this.toLocaleString();
    dst = mod.dst==null||mod.dst==undefined ? true : Boolean(mod.dst);
    if(!dst&&isDST(this)){
        this.setHours(this.getHours()-1);
    }
	s=f.split("");
	ret = [];
    for(let i=0; i < s.length; i++){
        if(s.at(i)=="\\"){
            i+=1;
            ret.push(s.at(i));
            continue;
        }
        ret.push(sel(s.at(i),this));
    }
    if(!dst&&isDST(this)){
        this.setHours(this.getHours()+1);
    }
	return ret.join("");
}}(Date));