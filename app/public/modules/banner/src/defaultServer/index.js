import Tpl from '../index.hbs';
import Data from '../data/data.json';

let templateTpl = Tpl(Data);


document.getElementById('modsWrap').innerHTML = templateTpl;