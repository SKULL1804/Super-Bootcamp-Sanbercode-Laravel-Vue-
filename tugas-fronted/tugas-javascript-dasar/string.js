// Soal No.1 (Membuat Kalimat)
var word = 'JavaScript'; 
var second = 'is'; 
var third = 'awesome'; 
var fourth = 'and'; 
var fifth = 'I'; 
var sixth = 'love'; 
var seventh = 'it!';

// Jawaban No.1 
var kumpulanKata = word + ' ' + second + ' ' + third + ' ' + fourth + ' ' + fifth + ' ' + sixth + ' ' + seventh;

// Output
console.log(kumpulanKata);

// Soal No.2 Mengurai kalimat (Akses karakter dalam string)
var sentence = "I am going to be Web Developer"; 

// Jawaban No.2
var exampleFirstWord = sentence[0]; 
var secondWord = sentence[2] + sentence[3]; 
var thirdWord = sentence[5] + sentence[6] + sentence[7] + sentence[8] + sentence[9];
var fourthWord = sentence[11] + sentence[12];
var fifthWord = sentence[14] + sentence[15];
var sixthWord = sentence[17] + sentence[18] + sentence[19];
var seventhWord = sentence[21] + sentence[22] + sentence[23] + sentence[24] + sentence[25] + sentence[26] + sentence[27] + sentence[28] + sentence[29];

// Output
console.log('First Word: ' + exampleFirstWord); 
console.log('Second Word: ' + secondWord); 
console.log('Third Word: ' + thirdWord); 
console.log('Fourth Word: ' + fourthWord); 
console.log('Fifth Word: ' + fifthWord); 
console.log('Sixth Word: ' + sixthWord); 
console.log('Seventh Word: ' + seventhWord); 

// Soal No.3  Mengurai Kalimat dan Menentukan Panjang String
var sentence3 = 'wow JavaScript is so cool'; 

// Jawaban No.3
var exampleFirstWord3 = sentence3.substring(0, 3); 
var secondWord3 = sentence3.substring(4,14);
var thirdWord3 = sentence3.substring(15, 17)
var fourthWord3 = sentence3.substring(18, 20)
var fifthWord3 = sentence3.substring(21, 25)

var firstWordLength = exampleFirstWord3.length  
var secondWordLength = secondWord3.length
var thirdWordLength = thirdWord3.length
var fourthWordLength = fourthWord3.length
var fifthWordLength = fifthWord3.length

// Output
console.log('First Word: ' + exampleFirstWord3 + ', with length: ' + firstWordLength); 
console.log('Second Word: ' + secondWord3 + ', with length: ' + secondWordLength); 
console.log('Third Word: ' + thirdWord3 + ', with length: ' + thirdWordLength); 
console.log('Fourth Word: ' + fourthWord3 + ', with length: ' + fourthWordLength); 
console.log('Fifth Word: ' + fifthWord3 + ', with length: ' + fifthWordLength); 
