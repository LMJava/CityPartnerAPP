
import Picker from "react-native-picker";

export default class DatePickerUtils {

    static hide(){
        Picker.hide();
    }
    /**
     *
     * @param callback
     */
    static show(callback) {
        let dates = [];
        for (let i = 1950; i < 2050; i++) {
            let month1 = [];
            for (let j = 1; j < 13; j++) {
                let day1 = [];
                if (j === 2) {
                    for (let k = 1; k < 29; k++) {
                        day1.push(k + "日");
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
                        day1.push(29 + "日");
                    }
                } else if (j in {1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1}) {
                    for (let k = 1; k < 32; k++) {
                        day1.push(k + "日");
                    }
                } else {
                    for (let k = 1; k < 31; k++) {
                        day1.push(k + "日");
                    }
                }
                let _month = {};
                _month[j + "月"] = day1;
                month1.push(_month);
            }
            let _date = {};
            _date[i + "年"] = month1;
            dates.push(_date);
        }

        let date = new Date();
        let selectedValue = [
            [date.getFullYear()] + "年",
            [date.getMonth() + 1] + "月",
            [date.getDate()] + "日"
        ];
        Picker.init({
            pickerData: dates,
            selectedValue,
            pickerConfirmBtnText: "确认",
            pickerCancelBtnText: "取消",
            pickerTitleText: "请选择时间",
            onPickerConfirm: (pickedValue, pickedIndex) => {
                let date = pickedValue.toString().split(",");

                let year = date[0].toString().slice(0, date[0].length - 1);
                let month = date[1].toString().slice(0, date[1].length - 1);
                if (month.length < 2) {
                    month = "0" + month;
                }
                let day = date[2].toString().slice(0, date[2].length - 1);
                if (day.length < 2) {
                    day = "0" + day;
                }
                let dateStr = year + "-" + month + "-" + day;
                callback(dateStr)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Picker.show();
    }
}