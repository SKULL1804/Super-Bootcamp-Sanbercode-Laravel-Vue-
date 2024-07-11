import fs from 'fs';

const path = 'data.json';

export const register = (inputRegister) => {
    let [name, password, role] = inputRegister.split(',');

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
        };

        let dataJson = JSON.parse(data);
        dataJson.push({
            name: name,
            password: password,
            role: role,
            isLogin: false
        });

        fs.writeFile(path, JSON.stringify(dataJson), (err) => {
            if (err) {
                console.log(err);
            }else{
                console.log("Berhasil register");
            }
        });

    });
}