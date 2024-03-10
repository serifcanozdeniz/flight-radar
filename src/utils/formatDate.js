import moment from "moment/moment";
import "moment/locale/tr";

//   unix formatındaki veriyi normal formata çeviren bir fonksiyon yaz
const formatDate = (unix_time) => {
    // unix formatındaki saniye verisini date ile kullanabilmek için 1000 ile çarpıp milisaniyeye çevirdik
    const date = new Date(unix_time * 1000);

    // arihi moment ile formatla
    return moment(date).calendar();
};
export default formatDate;