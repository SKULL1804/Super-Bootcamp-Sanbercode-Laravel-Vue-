var nama = "Dika";
var peran = "Hero";

if (nama === "" && peran === "") {
    // Output apabila nama dan peran tidak diisi
   console.log("Nama dan Peran harus diisi") 
} else if(peran === "") {
    // Output apabila peran tidak diisi
    console.log("Halo " + nama + ", Pilih peranmu untuk memulai game!")
} else if(peran === "Penyihir") {
    // Output apabila peran adalah Penyihir
    console.log("Selamat datang di Dunia Werewolf, " + nama)
    console.log("Halo " + peran + " " + nama + ", kamu dapat melihat siapa yang menjadi werewolf!")
} else if(peran === "Guard") {
    // Output apabila peran adalah Guard
    console.log("Selamat datang di Dunia Werewolf, " + nama)
    console.log("Halo " + peran + " "  + nama + ", kamu akan membantu melindungi temanmu dari serangan werewolf.")
} else if(peran === "Werewolf") {
    // Output apabila peran Werewolf
    console.log("Selamat datang di Dunia Werewolf, " + nama)
    console.log("Halo " + peran + " "  + nama + ",  Kamu akan memakan mangsa setiap malam!")
} else if(peran !== "Penyihir" && peran !== "Guard" && peran !== "Werewolf") {
    console.log("Peran tidak ada")
}