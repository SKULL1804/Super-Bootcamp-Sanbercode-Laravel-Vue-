import { addSiswa } from "./libs/addSiswa";
import { login } from "./libs/login";
import { register } from "./libs/register";

const args = process.argv;
const command = args[2];
const input = args[3];

switch (command) {
    case 'register':
        register(input);
        break;
    case 'login':
        login(input);
        break;
    case 'addSiswa':
        addSiswa(input);
        break;
    default: 
        break
}