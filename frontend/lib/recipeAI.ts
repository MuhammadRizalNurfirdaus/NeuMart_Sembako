interface Recipe {
  name: string
  description: string
  ingredients: string[]
  instructions: string[]
  cookingTime: string
  difficulty: string
  servings?: string
  tips?: string[]
}

// Database resep berdasarkan kombinasi produk
export const recipeDatabase: { [key: string]: Recipe[] } = {
  // Kombinasi Beras + Telur
  'beras-telur': [
    {
      name: 'Nasi Goreng Telur',
      description: 'Nasi goreng klasik Indonesia dengan telur orak-arik yang gurih dan lezat. Dimasak dengan bumbu sederhana namun menghasilkan cita rasa yang kaya. Cocok untuk sarapan, makan siang, atau makan malam. Mudah dibuat dan bisa disesuaikan dengan selera keluarga.',
      ingredients: [
        '2 piring nasi putih (sekitar 400 gram, lebih baik nasi dingin atau sisa kemarin)',
        '2 butir telur ayam',
        '3 siung bawang putih, cincang halus',
        '5 siung bawang merah, iris tipis',
        '2 sendok makan kecap manis',
        '1 sendok teh garam (sesuaikan dengan selera)',
        '1/2 sendok teh merica bubuk',
        '1/4 sendok teh kaldu bubuk (opsional)',
        '3 sendok makan minyak goreng',
        '2 batang daun bawang, iris tipis (opsional)',
        '1 buah cabai rawit, iris (opsional, untuk yang suka pedas)'
      ],
      instructions: [
        'PERSIAPAN BAHAN: Pastikan nasi sudah dingin atau suhu ruang. Kocok 2 butir telur dalam mangkuk kecil, tambahkan sedikit garam dan merica. Siapkan semua bumbu yang sudah dipotong.',
        'PANASKAN WAJAN: Panaskan wajan atau penggorengan dengan api sedang-besar. Tuang 3 sendok makan minyak goreng, tunggu hingga minyak benar-benar panas (sekitar 1 menit).',
        'MASAK TELUR ORAK-ARIK: Tuang telur yang sudah dikocok ke dalam wajan panas. Aduk-aduk dengan spatula hingga telur setengah matang dan bergerindil (sekitar 30 detik). Sisihkan telur ke pinggir wajan atau angkat sementara.',
        'TUMIS BUMBU AROMATIK: Di wajan yang sama, tumis bawang putih cincang hingga harum (sekitar 20 detik), lalu masukkan bawang merah iris. Tumis hingga bawang merah layu dan harum (sekitar 1 menit). Jika menggunakan cabai, masukkan bersamaan dengan bawang.',
        'MASUKKAN NASI: Masukkan nasi putih ke dalam wajan. Pecah-pecah gumpalan nasi dengan spatula. Aduk-aduk nasi dengan bumbu hingga tercampur rata dan nasi terpisah-pisah (sekitar 2-3 menit). Gunakan api besar agar nasi tidak lembek.',
        'BUMBUI NASI: Tuang kecap manis secara merata ke seluruh permukaan nasi. Aduk cepat hingga warna nasi berubah kecoklatan merata. Tambahkan garam, merica, dan kaldu bubuk. Aduk rata lagi selama 1-2 menit.',
        'CAMPURKAN TELUR: Masukkan kembali telur orak-arik yang sudah dimasak tadi. Aduk rata dengan nasi hingga telur menyebar merata (sekitar 1 menit).',
        'SENTUHAN AKHIR: Masukkan irisan daun bawang (jika menggunakan). Aduk sebentar sekitar 30 detik. Cicipi rasanya, sesuaikan garam atau kecap manis jika perlu.',
        'SAJIKAN: Matikan api. Angkat dan pindahkan nasi goreng ke piring saji. Sajikan selagi hangat. Bisa ditambahkan kerupuk, acar, atau telur mata sapi sebagai pelengkap.'
      ],
      cookingTime: '15-20 menit',
      difficulty: 'Mudah',
      servings: '2 porsi',
      tips: [
        'RAHASIA NASI TIDAK LEMBEK: Gunakan nasi yang sudah dingin minimal 4 jam di kulkas. Nasi dingin lebih kering sehingga tidak akan lembek saat digoreng.',
        'API YANG TEPAT: Gunakan api sedang-besar saat menggoreng nasi. Api terlalu kecil akan membuat nasi lembek dan basah.',
        'JANGAN TERLALU BANYAK MINYAK: Minyak berlebih akan membuat nasi goreng berminyak. 3 sendok makan sudah cukup untuk 2 piring nasi.',
        'VARIASI PROTEIN: Bisa ditambahkan ayam suwir, sosis iris, atau udang untuk variasi protein.',
        'TAMBAHAN SAYURAN: Bisa ditambahkan wortel parut, kol iris, atau sawi hijau untuk nutrisi lebih.',
        'PENYIMPANAN: Nasi goreng bisa disimpan di kulkas hingga 2 hari dalam wadah tertutup rapat.'
      ]
    }
  ],
  
  // Kombinasi Tepung + Telur
  'tepung-telur': [
    {
      name: 'Pancake Sederhana',
      description: 'Pancake lembut dan fluffy ala Amerika yang sempurna untuk sarapan spesial atau camilan sore. Teksturnya empuk di dalam dan sedikit crispy di luar. Bisa disajikan dengan madu, sirup maple, selai, atau buah-buahan segar. Resep ini sangat mudah dan cocok untuk pemula.',
      ingredients: [
        '200 gram tepung terigu protein sedang (sekitar 16 sendok makan)',
        '2 butir telur ayam ukuran sedang',
        '3 sendok makan gula pasir (bisa ditambah jika suka manis)',
        '250 ml susu cair (atau bisa diganti air putih)',
        '1/2 sendok teh garam',
        '1 sendok teh baking powder (pengembang kue)',
        '2 sendok makan margarin/butter, lelehkan',
        '1/2 sendok teh vanilla essence (opsional)',
        'Margarin secukupnya untuk olesan wajan'
      ],
      instructions: [
        'PERSIAPAN BAHAN KERING: Dalam mangkuk besar, ayak 200 gram tepung terigu bersama 1 sendok teh baking powder dan 1/2 sendok teh garam. Pengayakan penting agar tidak ada gumpalan dan pancake mengembang sempurna. Tambahkan 3 sendok makan gula pasir, aduk rata.',
        'PERSIAPAN BAHAN BASAH: Dalam mangkuk terpisah, kocok 2 butir telur menggunakan whisk atau garpu hingga berbusa sedikit (sekitar 1 menit). Tambahkan 250 ml susu cair sedikit demi sedikit sambil terus diaduk. Masukkan 2 sendok makan margarin leleh dan vanilla essence (jika pakai), aduk rata.',
        'CAMPURKAN ADONAN: Tuang campuran bahan basah (telur+susu) ke dalam campuran bahan kering (tepung) sedikit demi sedikit sambil diaduk perlahan. Jangan over-mixing, cukup aduk hingga tercampur (boleh ada sedikit gumpalan kecil). Adonan yang terlalu diaduk akan membuat pancake keras. Diamkan adonan selama 5-10 menit agar mengembang.',
        'CEK KEKENTALAN ADONAN: Adonan yang baik adalah kental tapi masih bisa dituang, seperti kekentalan yogurt. Jika terlalu kental, tambahkan 1-2 sendok makan susu. Jika terlalu encer, tambahkan sedikit tepung.',
        'PANASKAN WAJAN: Panaskan wajan anti lengket atau teflon dengan api kecil-sedang. Oles tipis dengan margarin menggunakan tisu dapur. Jangan terlalu banyak margarin agar pancake tidak berminyak. Biarkan wajan panas selama 1-2 menit.',
        'TES SUHU WAJAN: Untuk mengetes, teteskan sedikit adonan. Jika langsung berbusa dan mengeras, wajan sudah siap. Jika adonan menyebar terlalu cepat, wajan terlalu panas. Kecilkan api.',
        'TUANG ADONAN: Tuang 1 sendok sayur adonan (sekitar 60-80ml) ke tengah wajan. Biarkan adonan menyebar sendiri membentuk lingkaran. Jangan diratakan dengan sendok. Masak dengan api kecil.',
        'MASAK SISI PERTAMA: Masak hingga permukaan pancake muncul gelembung-gelembung kecil dan pinggiran mulai kering (sekitar 2-3 menit). Ini tanda pancake siap dibalik. Jika gelembung belum muncul, tunggu lebih lama.',
        'BALIK PANCAKE: Gunakan spatula lebar, angkat pancake dengan hati-hati dan balik dengan cepat. Masak sisi kedua hingga berwarna kecoklatan (sekitar 1-2 menit). Sisi kedua lebih cepat matang dari sisi pertama.',
        'ANGKAT DAN ULANGI: Angkat pancake yang sudah matang, tata di piring. Oles wajan lagi dengan sedikit margarin sebelum menuang adonan berikutnya. Ulangi proses hingga adonan habis (akan menghasilkan sekitar 6-8 pancake).',
        'SAJIKAN: Susun pancake di piring. Sajikan hangat dengan topping pilihan: madu, sirup maple, selai, coklat leleh, buah segar (pisang, strawberry), atau taburan gula halus. Bisa juga dengan butter leleh.'
      ],
      cookingTime: '30-35 menit',
      difficulty: 'Mudah',
      servings: '3-4 porsi (6-8 keping)',
      tips: [
        'JANGAN OVER-MIXING: Adonan yang terlalu banyak diaduk akan membuat pancake bantat dan keras. Cukup aduk hingga tepung tidak terlihat, boleh ada sedikit gumpalan.',
        'GUNAKAN API KECIL-SEDANG: Api terlalu besar akan membuat pancake gosong di luar tapi mentah di dalam. Sabar adalah kunci pancake empuk.',
        'WAJAN HARUS PANAS MERATA: Panaskan wajan minimal 1-2 menit agar panas merata. Ini membuat pancake matang sempurna.',
        'JANGAN TEKAN PANCAKE: Saat memasak, jangan menekan pancake dengan spatula karena akan membuat tekstur jadi padat.',
        'DIAMKAN ADONAN: Membiarkan adonan istirahat 5-10 menit membuat baking powder bekerja optimal dan pancake lebih mengembang.',
        'VARIASI RASA: Bisa ditambahkan coklat chip, kismis, atau pisang iris ke dalam adonan untuk variasi.',
        'PENYIMPANAN: Pancake bisa disimpan di kulkas 2-3 hari atau freezer hingga 1 bulan. Panaskan di microwave atau toaster sebelum dimakan.'
      ]
    }
  ],

  // Kombinasi Mie + Telur
  'mie-telur': [
    {
      name: 'Mie Goreng Telur',
      description: 'Mie goreng khas Indonesia yang gurih, pedas, dan penuh rasa. Dimasak dengan teknik tumis api besar sehingga menghasilkan aroma wok yang khas. Kombinasi sempurna antara mie kenyal, telur gurih, dan bumbu yang meresap. Bisa ditambah sayuran dan protein sesuai selera.',
      ingredients: [
        '1 bungkus mie instan (dengan bumbu)',
        '2 butir telur ayam',
        '3 siung bawang putih, cincang halus',
        '2 siung bawang merah, iris tipis',
        '1 sendok makan kecap manis',
        '1 sendok teh kecap asin (opsional)',
        '1/2 sendok teh saus tiram (opsional)',
        '2 batang sawi hijau/sawi putih, potong-potong (opsional)',
        '1/2 batang daun bawang, iris (opsional)',
        '1 buah cabai rawit, iris (opsional)',
        '3 sendok makan minyak goreng',
        'Garam dan merica secukupnya',
        '200 ml air untuk merebus'
      ],
      instructions: [
        'REBUS MIE DENGAN BENAR: Didihkan 200 ml air dalam panci. Setelah mendidih, masukkan mie instan. Rebus selama 2-3 menit saja (jangan terlalu lama agar mie tidak lembek). Aduk sesekali agar mie tidak lengket. Tiriskan mie dengan saringan, bilas sebentar dengan air dingin untuk menghentikan proses pemasakan. Sisihkan.',
        'SIAPKAN BUMBU INSTAN: Buka bumbu mie instan. Untuk mie goreng, gunakan hanya setengah hingga 2/3 bagian bumbu agar tidak terlalu asin. Sisihkan bumbu di mangkuk kecil.',
        'SIAPKAN TELUR: Kocok 2 butir telur dalam mangkuk kecil. Tambahkan sedikit garam dan merica bubuk. Kocok hingga kuning dan putih telur tercampur rata.',
        'MASAK TELUR ORAK-ARIK: Panaskan wajan dengan 1 sendok makan minyak goreng, api sedang. Tuang telur kocok, aduk-aduk dengan spatula hingga telur matang dan bergerindil (sekitar 1 menit). Jangan sampai terlalu kering. Angkat dan sisihkan di piring.',
        'TUMIS BUMBU AROMATIK: Dalam wajan yang sama, tambahkan 2 sendok makan minyak. Panaskan dengan api sedang-besar. Masukkan bawang putih cincang, tumis hingga harum dan berwarna keemasan (sekitar 30 detik). Jangan sampai gosong.',
        'TAMBAH BAWANG MERAH: Masukkan bawang merah iris, tumis hingga layu dan harum (sekitar 1 menit). Jika menggunakan cabai rawit, masukkan bersamaan dengan bawang merah.',
        'TUMIS SAYURAN (OPSIONAL): Jika menggunakan sawi, masukkan batangnya terlebih dahulu karena lebih keras. Tumis 1 menit, baru masukkan daunnya. Tumis hingga sawi layu tapi masih renyah (sekitar 1-2 menit).',
        'MASUKKAN MIE: Masukkan mie yang sudah direbus dan ditiriskan ke dalam wajan. Aduk cepat agar mie tidak lengket. Pecah-pecah gumpalan mie dengan spatula atau sumpit. Tumis dengan api besar selama 1-2 menit.',
        'BUMBUI MIE: Taburkan bumbu mie instan yang sudah disiapkan ke atas mie secara merata. Aduk cepat hingga bumbu tercampur rata. Tuang kecap manis, aduk lagi hingga warna mie kecoklatan merata. Tambahkan kecap asin dan saus tiram jika menggunakan.',
        'CAMPURKAN TELUR: Masukkan kembali telur orak-arik yang sudah dimasak. Aduk rata dengan mie hingga telur menyebar merata (sekitar 1 menit). Tambahkan irisan daun bawang, aduk sebentar.',
        'KOREKSI RASA: Cicipi rasanya. Tambahkan garam, merica, atau kecap sesuai selera. Aduk rata.',
        'SAJIKAN: Matikan api. Pindahkan mie goreng ke piring saji. Sajikan selagi panas. Bisa ditambahkan taburan bawang goreng, irisan tomat, atau kerupuk sebagai pelengkap.'
      ],
      cookingTime: '15-20 menit',
      difficulty: 'Sangat Mudah',
      servings: '1-2 porsi',
      tips: [
        'JANGAN REBUS MIE TERLALU LAMA: Mie yang direbus terlalu lama akan lembek saat digoreng. Cukup 2-3 menit saja, mie masih sedikit keras tidak masalah karena akan matang lagi saat digoreng.',
        'BILAS MIE DENGAN AIR DINGIN: Ini menghentikan proses masak dan membuat mie tidak lengket saat digoreng.',
        'GUNAKAN API BESAR SAAT GORENG: Api besar membuat mie goreng kering dan tidak lembek. Aduk terus agar tidak gosong.',
        'JANGAN GUNAKAN SEMUA BUMBU INSTAN: Bumbu mie instan biasanya sangat asin. Gunakan 1/2 hingga 2/3 saja, sisanya bisa untuk kuah.',
        'VARIASI PROTEIN: Bisa ditambahkan ayam suwir, bakso iris, sosis, atau udang untuk protein lebih.',
        'TAMBAHAN SAYURAN: Wortel serut, kol iris, atau kacang panjang potong bisa ditambahkan untuk nutrisi.',
        'PENYAJIAN: Mie goreng paling enak dimakan langsung selagi panas. Jika disimpan akan mengeras.'
      ]
    }
  ],

  // Default untuk produk apapun
  'default': [
    {
      name: 'Nasi Putih dengan Telur Ceplok',
      description: 'Menu praktis dan bergizi yang tidak pernah membosankan. Nasi putih pulen dipadukan dengan telur ceplok yang matang sempurna. Cocok untuk pemula yang baru belajar memasak. Bisa ditambah kecap manis, sambal, atau lalapan untuk variasi rasa. Ekonomis dan mengenyangkan.',
      ingredients: [
        '200 gram beras (cuci bersih 2-3 kali)',
        '400 ml air bersih untuk memasak nasi',
        '2 butir telur ayam segar',
        '3 sendok makan minyak goreng',
        '1/2 sendok teh garam halus',
        '1/4 sendok teh merica bubuk (opsional)',
        '1 siung bawang putih, geprek (opsional untuk harum)',
        'Kecap manis atau sambal untuk pelengkap'
      ],
      instructions: [
        'CUCI BERAS DENGAN BENAR: Masukkan 200 gram beras ke dalam mangkuk besar. Bilas dengan air mengalir sambil digosok-gosok perlahan dengan tangan. Air bilasan pertama akan keruh, buang air tersebut. Ulangi 2-3 kali hingga air bilasan relatif bening. Ini penting untuk menghilangkan kotoran dan kelebihan pati.',
        'RENDAM BERAS (OPSIONAL TAPI DIREKOMENDASIKAN): Setelah dicuci, rendam beras dalam air bersih selama 15-30 menit. Perendaman membuat beras menyerap air lebih merata sehingga nasi lebih pulen. Setelah direndam, tiriskan beras.',
        'UKUR AIR DENGAN TEPAT: Masukkan beras yang sudah dicuci ke dalam panci rice cooker atau panci biasa. Tambahkan 400 ml air (perbandingan 1 beras : 2 air). Cara praktis: air harus sekitar 1 ruas jari di atas permukaan beras. Jika suka nasi lebih pulen, tambah sedikit air. Jika suka lebih pera, kurangi sedikit.',
        'MASAK NASI (RICE COOKER): Jika pakai rice cooker, tutup dan tekan tombol "cook". Rice cooker akan otomatis pindah ke mode "warm" setelah nasi matang (sekitar 20-25 menit). Jangan buka tutup selama proses masak agar uap tidak keluar.',
        'MASAK NASI (KOMPOR BIASA): Jika pakai panci biasa, tutup panci rapat. Masak dengan api besar hingga mendidih (sekitar 5 menit). Setelah mendidih dan air mulai surut, kecilkan api menjadi sangat kecil. Masak 15-20 menit dengan tutup tertutup rapat. Matikan api, diamkan 10 menit dengan tutup masih tertutup (penting untuk hasil pulen).',
        'ISTIRAHATKAN NASI: Setelah nasi matang, diamkan 5-10 menit dengan tutup masih tertutup. Ini membuat nasi lebih pulen dan tidak keras. Setelah itu, buka tutup dan aduk nasi perlahan dengan sendok nasi agar uap keluar dan nasi tidak menggumpal.',
        'PANASKAN MINYAK UNTUK TELUR: Sementara nasi istirahat, panaskan wajan dengan 3 sendok makan minyak goreng. Gunakan api sedang. Jika mau aromanya lebih harum, masukkan 1 siung bawang putih geprek, goreng sebentar lalu angkat dan buang.',
        'TES SUHU MINYAK: Untuk mengecek minyak sudah panas, masukkan ujung sumpit atau spatula kayu. Jika muncul gelembung-gelembung kecil di sekitarnya, minyak sudah siap. Jangan terlalu panas agar telur tidak gosong.',
        'CEPLOK TELUR PERTAMA: Pecahkan 1 butir telur ke dalam mangkuk kecil dulu (untuk memastikan telur masih bagus dan tidak ada cangkang). Tuang perlahan telur dari mangkuk ke dalam minyak panas. Jangan langsung pecahkan telur di atas wajan. Biarkan telur matang dengan sendirinya, jangan diaduk.',
        'SIRAM TELUR DENGAN MINYAK PANAS: Ambil minyak panas dari pinggiran wajan dengan sendok, siramkan ke bagian atas putih telur yang masih basah. Ini membuat putih telur matang merata dan kuning telur tetap setengah matang (jika suka kuning matang total, balik telur sebentar).',
        'CEK KEMATANGAN TELUR: Telur ceplok yang baik: putih telur matang sempurna berwarna putih, bagian pinggir crispy kecoklatan, kuning telur masih lembut (atau matang total sesuai selera). Masak sekitar 3-4 menit. Angkat dan tiriskan di piring yang dialasi tisu.',
        'BUMBUI TELUR: Taburi telur dengan sedikit garam halus dan merica bubuk saat masih panas. Bumbu akan meresap lebih baik.',
        'CEPLOK TELUR KEDUA: Ulangi proses yang sama untuk telur kedua. Pastikan minyak masih panas. Tambah sedikit minyak jika perlu.',
        'SAJIKAN DENGAN BENAR: Ambil nasi hangat secukupnya (sekitar 1-1.5 centong per porsi), tata di piring. Letakkan telur ceplok di samping atau di atas nasi. Sajikan selagi hangat dengan kecap manis, sambal, atau acar sesuai selera. Bisa ditambah lalapan timun dan tomat.'
      ],
      cookingTime: '35-40 menit (termasuk memasak nasi)',
      difficulty: 'Mudah',
      servings: '2 porsi',
      tips: [
        'MEMILIH BERAS YANG BAIK: Pilih beras yang bersih, tidak berbau apek, dan tidak ada kutu beras. Beras premium biasanya lebih pulen.',
        'PERBANDINGAN AIR: Rumus umum 1:2 (1 cup beras : 2 cup air). Tapi bisa disesuaikan: beras baru butuh lebih banyak air, beras lama lebih sedikit.',
        'JANGAN SERING BUKA TUTUP: Saat memasak nasi, jangan sering membuka tutup panci karena uap akan keluar dan nasi jadi keras.',
        'TELUR SEGAR LEBIH BAIK: Telur segar putihnya lebih kental dan tidak menyebar kemana-mana saat diceplok. Kuning telur juga lebih bulat sempurna.',
        'MINYAK YANG CUKUP: Gunakan minyak agak banyak (3 sendok makan) agar telur tidak lengket dan bagian pinggir crispy.',
        'VARIASI TELUR: Bisa ditambah irisan cabai rawit, daun bawang, atau tomat di atas telur saat masak untuk variasi rasa.',
        'PENYIMPANAN NASI: Nasi bisa disimpan di rice cooker mode warm hingga 12 jam. Atau simpan di kulkas dalam wadah tertutup hingga 2-3 hari.'
      ]
    },
    {
      name: 'Nasi Goreng Spesial',
      description: 'Nasi goreng versi spesial dengan bumbu yang lebih lengkap dan kaya rasa. Menggunakan teknik profesional dengan api besar untuk hasil yang kering dan tidak lembek. Setiap butir nasi terbalut bumbu sempurna dengan aroma harum yang menggugah selera. Seperti nasi goreng di restoran favorit Anda!',
      ingredients: [
        '2 piring nasi putih (400 gram, lebih baik nasi dingin atau sisa kemarin)',
        '2 butir telur ayam',
        '4 siung bawang putih, cincang halus',
        '6 siung bawang merah, iris tipis',
        '2 sendok makan kecap manis',
        '1 sendok teh kecap asin',
        '1 sendok teh garam (sesuaikan selera)',
        '1/2 sendok teh merica bubuk',
        '1/2 sendok teh kaldu bubuk (opsional)',
        '4 sendok makan minyak goreng',
        '2 batang daun bawang, iris halus',
        '1 buah tomat, potong dadu kecil (opsional)',
        '2 buah cabai merah besar, iris serong (untuk warna, tidak pedas)',
        '2-3 cabai rawit, iris (opsional, untuk yang suka pedas)',
        '1 lembar daun jeruk, buang tulang tengah, iris tipis (opsional untuk aroma)',
        'Bawang goreng untuk taburan',
        'Kerupuk untuk pelengkap'
      ],
      instructions: [
        'PERSIAPAN NASI: Pastikan menggunakan nasi yang sudah dingin minimal 4 jam di kulkas atau nasi sisa semalam. Nasi dingin lebih kering dan tidak mudah hancur saat digoreng. Jika nasi masih hangat, akan menghasilkan nasi goreng yang lembek dan lengket. Hancurkan gumpalan nasi dengan tangan atau garpu agar terpisah-pisah.',
        'PERSIAPAN BUMBU: Siapkan semua bumbu yang sudah dipotong: bawang putih cincang halus, bawang merah iris tipis, cabai iris, daun bawang iris, tomat potong dadu, daun jeruk iris tipis. Taruh semua di dekat kompor agar mudah dijangkau saat memasak.',
        'KOCOK TELUR: Pecahkan 2 butir telur dalam mangkuk. Tambahkan 1/4 sendok teh garam dan sejumput merica. Kocok dengan garpu atau whisk hingga kuning dan putih telur tercampur rata dan berbusa sedikit.',
        'PANASKAN WAJAN DENGAN BENAR: Gunakan wajan besar (diameter minimal 28cm) agar nasi tidak berdesakan. Panaskan wajan dengan api besar selama 1 menit hingga benar-benar panas. Ini penting agar nasi goreng tidak lengket.',
        'MASAK TELUR ORAK-ARIK: Tuang 2 sendok makan minyak goreng ke wajan panas. Tunggu minyak panas (sekitar 30 detik), lalu tuang telur kocok. Biarkan mengembang sebentar (15 detik), lalu aduk-aduk dengan spatula hingga telur matang dan bergerindil kasar. Jangan terlalu halus, biarkan ada tekstur. Angkat dan sisihkan telur di piring.',
        'TUMIS BAWANG PUTIH: Di wajan yang sama (tidak perlu dicuci), tambahkan 2 sendok makan minyak lagi. Panaskan dengan api sedang-besar. Masukkan bawang putih cincang, tumis sambil terus diaduk hingga harum dan berwarna keemasan (sekitar 30-40 detik). Jangan sampai gosong karena akan pahit.',
        'TUMIS BAWANG MERAH DAN CABAI: Masukkan bawang merah iris dan semua jenis cabai (cabai merah besar dan cabai rawit). Tumis sambil terus diaduk hingga bawang layu dan harum (sekitar 1-2 menit). Jika pakai daun jeruk, masukkan sekarang dan tumis sebentar.',
        'TAMBAH TOMAT (OPSIONAL): Jika menggunakan tomat, masukkan potongan tomat. Tumis hingga tomat sedikit layu tapi tidak hancur (sekitar 1 menit). Tomat memberikan sedikit rasa asam segar.',
        'MASUKKAN NASI - BAGIAN PENTING: Kecilkan api sebentar menjadi sedang. Masukkan nasi dingin ke dalam wajan. Dengan spatula atau sutil, pecah-pecah gumpalan nasi sambil diaduk dengan bumbu. Ini tahap yang butuh tenaga, aduk terus selama 2-3 menit hingga semua nasi terpisah dan bercampur rata dengan bumbu.',
        'NAIKKAN API JADI BESAR: Setelah nasi tercampur rata, naikkan api menjadi besar. Tumis nasi dengan api besar sambil terus diaduk cepat. Gerakan mengaduk seperti melempar nasi dari bawah ke atas (seperti chef profesional). Ini penting agar nasi tidak lembek dan menghasilkan tekstur kering. Lakukan selama 2-3 menit.',
        'BUMBUI DENGAN KECAP: Tuang kecap manis ke seluruh permukaan nasi secara merata (jangan di satu tempat). Langsung aduk cepat agar warna nasi merata kecoklatan. Tambahkan kecap asin, aduk lagi. Masak sambil terus diaduk selama 2 menit.',
        'TAMBAH GARAM DAN PENYEDAP: Taburkan garam, merica bubuk, dan kaldu bubuk (jika pakai) ke seluruh nasi. Aduk cepat hingga bumbu tercampur rata. Terus aduk dengan api besar selama 1-2 menit.',
        'MASUKKAN KEMBALI TELUR: Masukkan telur orak-arik yang sudah dimasak tadi. Aduk rata dengan nasi hingga telur menyebar merata di seluruh nasi. Masak 1 menit sambil terus diaduk.',
        'TAMBAH DAUN BAWANG: Masukkan irisan daun bawang. Aduk cepat selama 30 detik saja agar daun bawang tidak layu total. Daun bawang memberikan aroma segar.',
        'TES DAN KOREKSI RASA: Cicipi nasi goreng. Cek apakah sudah cukup asin, manis, dan gurih. Jika kurang, tambahkan garam atau kecap manis sesuai selera. Jika terlalu asin, tambahkan sedikit gula. Aduk rata.',
        'MATIKAN API: Jika sudah pas rasanya, matikan api. Aduk nasi goreng sekali lagi hingga rata.',
        'PLATING DAN PENYAJIAN: Siapkan piring saji. Ambil nasi goreng dengan spatula, tata di piring. Buat bentuk gundukan atau ratakan sesuai selera. Taburkan bawang goreng di atas nasi goreng. Beri hiasan irisan tomat dan timun di pinggir piring. Sajikan dengan kerupuk, acar, atau sambal di samping. Untuk presentasi fancy, bisa cetak nasi goreng dengan mangkuk lalu balik di piring.',
        'TIPS PENYAJIAN RESTORAN: Untuk tampilan seperti di restoran, buat telur mata sapi terpisah dan taruh di atas nasi goreng. Tambahkan irisan mentimun, tomat, dan kerupuk di samping.'
      ],
      cookingTime: '20-25 menit',
      difficulty: 'Mudah',
      servings: '2-3 porsi',
      tips: [
        'RAHASIA NASI GORENG PROFESIONAL: Gunakan SELALU nasi dingin dari kulkas. Ini rahasia terbesar nasi goreng enak. Nasi hangat akan hancur dan lembek.',
        'WAJAN HARUS PANAS: Wajan yang kurang panas membuat nasi goreng lembek dan berminyak. Panaskan wajan hingga benar-benar panas sebelum memasak.',
        'API BESAR ADALAH KUNCI: Mayoritas waktu masak menggunakan api besar. Ini membuat nasi goreng kering, tidak lembek, dan ada sedikit char (wangi gosong khas wajan panas).',
        'JANGAN TAKUT MENGADUK KUAT: Aduk nasi dengan gerakan mengangkat dari bawah, seperti melempar. Ini membuat nasi tidak lengket di wajan dan matang merata.',
        'TIMING ADALAH SEGALANYA: Siapkan semua bahan sebelum mulai masak. Nasi goreng dimasak dengan cepat, tidak ada waktu untuk potong-potong bumbu di tengah proses.',
        'VARIASI PROTEIN: Tambahkan ayam suwir, udang, bakso iris, sosis, atau ham potong dadu untuk protein tambahan. Masukkan setelah menumis bawang.',
        'VARIASI SAYURAN: Bisa tambahkan wortel parut, kol iris, kacang polong, atau jagung pipil untuk nutrisi dan warna.',
        'UNTUK RASA LEBIH GURIH: Bisa tambahkan 1 sendok teh terasi bakar yang sudah dihaluskan saat menumis bumbu.',
        'NASI GORENG SEAFOOD: Ganti telur dengan udang dan cumi, tambahkan saus tiram 1 sendok makan.',
        'NASI GORENG PETE: Tambahkan pete yang sudah diiris tipis saat menumis bumbu.',
        'PENYIMPANAN: Nasi goreng paling enak dimakan fresh. Tapi bisa disimpan di kulkas 1-2 hari dalam wadah tertutup. Panaskan di microwave atau goreng ulang sebentar.'
      ]
    },
    {
      name: 'Telur Dadar Sederhana',
      description: 'Telur dadar klasik yang lembut dan gurih, cocok untuk lauk sehari-hari atau bekal. Teknik memasaknya sederhana namun menghasilkan telur dadar yang cantik dan tidak pecah. Bisa divariasikan dengan tambahan sayuran atau keju. Menu favorit anak-anak dan dewasa yang praktis namun lezat.',
      ingredients: [
        '3 butir telur ayam segar',
        '1/2 sendok teh garam halus',
        '1/4 sendok teh merica bubuk',
        '1 sendok makan air atau susu cair (untuk tekstur lebih lembut)',
        '2 batang daun bawang, iris halus (opsional)',
        '1 buah tomat cherry, potong kecil (opsional)',
        '2 sendok makan minyak goreng',
        'Sejumput penyedap rasa (opsional)'
      ],
      instructions: [
        'PERSIAPAN TELUR - CARA BENAR KOCOK TELUR: Pecahkan 3 butir telur ke dalam mangkuk yang cukup besar (minimal 500ml). Pastikan tidak ada pecahan cangkang yang ikut. Jika ada, ambil dengan sendok atau cangkang telur setengah.',
        'TAMBAH BUMBU DASAR: Masukkan 1/2 sendok teh garam halus, 1/4 sendok teh merica bubuk, dan sejumput penyedap (jika pakai) ke dalam telur. Garam adalah kunci rasa telur dadar yang enak.',
        'TAMBAH CAIRAN UNTUK TEKSTUR LEMBUT: Tuang 1 sendok makan air atau susu cair. Ini rahasia telur dadar yang lembut dan fluffy, tidak keras atau kering. Air/susu membuat telur mengembang saat dimasak.',
        'KOCOK TELUR DENGAN BENAR - INI PENTING: Gunakan garpu, whisk, atau chopstick. Kocok telur dengan gerakan memutar cepat. Kocok selama 1-2 menit hingga kuning dan putih telur tercampur sempurna dan muncul gelembung-gelembung halus di permukaan. Semakin lama dikocok (sampai berbusa), semakin lembut telur dadarnya. Jangan setengah-setengah.',
        'TAMBAH BAHAN PELENGKAP (OPSIONAL): Jika mau menambah daun bawang iris atau tomat potong kecil, masukkan sekarang. Aduk rata. Bahan ini memberikan rasa dan aroma segar.',
        'PANASKAN WAJAN ANTI LENGKET: Gunakan wajan anti lengket ukuran sedang (diameter 20-22cm untuk 3 telur). Wajan anti lengket penting agar telur tidak lengket. Panaskan dengan api sedang selama 1 menit.',
        'TES SUHU WAJAN: Percikkan sedikit air ke wajan. Jika air langsung mendesis dan menguap, wajan sudah cukup panas. Jangan terlalu panas, api sedang saja.',
        'TUANG MINYAK SECUKUPNYA: Tuang 2 sendok makan minyak goreng ke wajan. Putar wajan agar minyak merata ke seluruh permukaan termasuk sisi-sisinya. Tunggu minyak panas sekitar 30 detik.',
        'TUANG KOCOKAN TELUR: Kecilkan api menjadi sedang-kecil. Tuang semua kocokan telur ke tengah wajan. Telur akan langsung mengembang dan menyebar. Biarkan telur mengalir dan menyebar sendiri, jangan diaduk.',
        'BIARKAN BAGIAN BAWAH MATANG: Masak dengan api sedang-kecil tanpa disentuh selama 2-3 menit. Bagian bawah telur akan matang dan mengeras. Bagian atas masih cair - ini normal. Jangan panik dan langsung dibalik.',
        'CEK KEMATANGAN BAGIAN BAWAH: Goyang-goyangkan wajan. Jika telur dadar sudah tidak lengket dan bisa bergeser-geser bebas, bagian bawah sudah matang. Pinggiran telur akan terlihat kecoklatan.',
        'MELIPAT TELUR DADAR - TEKNIK PENTING: Ada 2 cara melipat. CARA 1: Miringkan wajan, lipat setengah bagian telur ke atas setengah lainnya dengan spatula, jadi bentuk setengah lingkaran (seperti omelet). CARA 2: Balik telur dadar seluruhnya, masak sebentar sisi lainnya, lalu lipat.',
        'MELIPAT DENGAN CARA 1 (LEBIH MUDAH): Saat bagian atas telur masih sedikit basah/lembut (tidak perlu tunggu kering total), gunakan spatula lebar. Angkat satu sisi telur dadar, lipat ke tengah menutupi setengah bagian lainnya. Tekan perlahan.',
        'MASAK SEBENTAR SETELAH DILIPAT: Setelah dilipat, masak lagi 30-60 detik dengan api kecil agar bagian yang masih basah matang sempurna. Jangan terlalu lama agar tidak kering.',
        'CEK KEMATANGAN: Tekan perlahan bagian tengah lipatan dengan spatula. Jika terasa padat (tidak ada cairan mengalir keluar), telur sudah matang sempurna. Jika masih ada cairan, masak 30 detik lagi.',
        'ANGKAT DAN TIRISKAN: Angkat telur dadar dengan spatula lebar, tiriskan minyak sebentar di atas wajan, lalu pindahkan ke piring yang sudah dialasi tisu dapur. Tisu akan menyerap kelebihan minyak.',
        'SAJIKAN: Pindahkan telur dadar ke piring saji bersih. Sajikan selagi hangat. Bisa dimakan dengan nasi putih, roti, atau sebagai lauk. Tambahkan saus sambal atau kecap manis sesuai selera.'
      ],
      cookingTime: '8-10 menit',
      difficulty: 'Sangat Mudah',
      servings: '1-2 porsi',
      tips: [
        'RAHASIA TELUR DADAR LEMBUT: Kocok telur hingga benar-benar berbusa. Tambahkan 1 sendok makan air/susu. Masak dengan api kecil-sedang, jangan api besar.',
        'MENGAPA TELUR DADAR KERAS/KERING?: Ini terjadi karena api terlalu besar atau dimasak terlalu lama. Gunakan api sedang dan jangan tunggu bagian atas kering total sebelum dilipat.',
        'TELUR DADAR LENGKET DI WAJAN: Pastikan pakai wajan anti lengket dan minyak cukup. Jika lengket, wajan kurang panas atau kurang minyak.',
        'KAPAN WAKTU TEPAT MELIPAT?: Saat bagian bawah sudah matang (telur bisa digeser) tapi bagian atas masih lembab. Jika terlalu lama, telur akan kering.',
        'VARIASI RASA ISI TELUR DADAR: Bisa tambahkan keju parut, jamur iris, paprika potong dadu, bayam cincang, atau daging cincang. Masukkan bersama kocokan telur.',
        'TELUR DADAR UNTUK ANAK: Kurangi merica, tambah keju parut untuk rasa lebih creamy yang disukai anak-anak.',
        'TELUR DADAR GORENG KERING (CRISPY): Gunakan api sedang-besar dan lebih banyak minyak. Jangan dilipat, masak hingga kedua sisi crispy kecoklatan.',
        'TIPS PRO LIPAT SEMPURNA: Gunakan spatula yang lebar dan tipis. Lipat saat telur masih lembut agar tidak pecah.',
        'PENYAJIAN MENARIK: Potong telur dadar jadi 3-4 bagian serong, tata di piring seperti restoran. Taburi daun bawang dan tomat di atas.',
        'TELUR DADAR UNTUK BEKAL: Telur dadar bisa dibuat untuk bekal. Masak hingga benar-benar matang (tidak terlalu lembab) agar awet. Simpan terpisah dari nasi.'
      ]
    }
  ]
}

// Fungsi AI untuk generate resep berdasarkan produk di keranjang
export function generateRecipeFromCart(productNames: string[]): Recipe[] {
  const normalizedNames = productNames.map(name => 
    name.toLowerCase()
      .replace('premium', '')
      .replace('ayam', '')
      .trim()
  )

  // Cek kombinasi spesifik
  if (normalizedNames.some(n => n.includes('beras') || n.includes('nasi')) && 
      normalizedNames.some(n => n.includes('telur'))) {
    return recipeDatabase['beras-telur']
  }

  if (normalizedNames.some(n => n.includes('tepung')) && 
      normalizedNames.some(n => n.includes('telur'))) {
    return recipeDatabase['tepung-telur']
  }

  if (normalizedNames.some(n => n.includes('mie')) && 
      normalizedNames.some(n => n.includes('telur'))) {
    return recipeDatabase['mie-telur']
  }

  // Return default recipes
  return recipeDatabase['default']
}
