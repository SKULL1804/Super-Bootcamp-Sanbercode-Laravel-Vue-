import fsPromises from 'fs/promises';

const path = 'data.json';

export const addSiswa = async (inputSiswa) => {
    let [siswaName, trainerName] = inputSiswa.split(',');

    await fsPromises.readFile(path)
        .then((data) => {
            let dataSiswa = JSON.parse(data);

            let indexAdmin = dataSiswa.findIndex((Admin) => Admin.role === "admin" && Admin.isLogin === true);
            if (indexAdmin == -1) {
                console.log("Admin belum login");
                return;
            }

            let indexTrainer = dataSiswa.findIndex((Trainer) => Trainer.name === trainerName && Trainer.role === "trainer");
            if (indexTrainer == -1) {
                console.log("Trainer tidak ditemukan");
                return;
            }
            
            if (!dataSiswa[indexTrainer].students) {
                dataSiswa[indexTrainer].students = [];
            }

            dataSiswa[indexTrainer].students.push({ name: siswaName });

            console.log('Berhasil add siswa');

            return fsPromises.writeFile(path, JSON.stringify(dataSiswa), 'utf8');
        })

}