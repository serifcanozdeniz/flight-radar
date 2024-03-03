import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constants";

export const getFlights = createAsyncThunk("flights/getFlights", async () => {
    // api isteği at
    const res = await axios.request(options);


    // gelen veriyi formatla dizi içerisindeki dizileri nesnelere çevireceğiz
    const formatted = res.data.aircraft.map((item) => ({
        id: item[0],
        code: item[1],
        lat: item[2],
        lng: item[3],
    }));

    // aksiyonun payloadı olark formatlanan veriyi ekle
    return formatted;
})