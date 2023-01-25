const getTableData = () => {
    let obj = {
        formatter() { // Make it a `function`
            let i = this.formatter.i = (this.formatter.i || 0) + 1;
            return i;
        }
    };
    const generateStation = () => {
        return {
            "pos_x_on_top": 0,
            "size_z": 6,
            "express_station": 0,
            "size_y": Math.random() * 100,
            "size_x": Math.random() * 100,
            "ID_user_change": 'admin',
            "description": "description",
            "ID_station": obj.formatter(),
            "pos_y_on_top": 0,
            "ID_wh": 18655,
            "pos_y": Math.random() * 100,
            "on_top": 6,
            "pos_x": Math.random() * 100,
            "back_color": `#${Math.floor(Math.random()*16777215).toString(16)}`,
            "text": "Inbound",
            "on_empty_remove_assignment": false,
            "solid": true,
            "enable_background_image": false,
            "border_color": `#${Math.floor(Math.random()*16777215).toString(16)}`,
            "keep_size": true,
            "ID_io_creation": 1,
            "visualization_type": 0,
            "ID_mtm": 1,
            "changed": "2022-11-11 18:10:05"
        }
    }

    return Array.from(new Array(1000), () => generateStation())
}

export default getTableData;