import fsPromises from 'fs/promises';

const path = 'data.json';

export const login = (inputLogin) => {
    let [name, password] = inputLogin.split(',');

    fsPromises.readFile(path)
        .then((data) => {
            let dataLogin = JSON.parse(data);
 
            let indexLogin = dataLogin.findIndex((login) => login.name === name);

            if (indexLogin === -1) {
                console.log("name tidak ditemukan");
                return;
            } else {
                let objectLogin = dataLogin[indexLogin];

                if (objectLogin.password == password) {
                    objectLogin.isLogin = true; 
                    
                    console.log("Login berhasil");

                    dataLogin.splice(indexLogin, 1, objectLogin);

                    return fsPromises.writeFile(path, JSON.stringify(dataLogin));
                }
            }
        }).catch((err) => {
            console.log(err);
        });
}