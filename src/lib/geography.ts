
export type Constituency = {
  name: string;
};

export type District = {
  name: string;
  constituencies: Constituency[];
};

export type State = {
  name: string;
  districts: District[];
};

export const indianGeography: State[] = [
  {
    "name": "Andhra Pradesh",
    "districts": [
      {
        "name": "Srikakulam",
        "constituencies": [
          { "name": "Ichchapuram" },
          { "name": "Palasa" },
          { "name": "Tekkali" },
          { "name": "Pathapatnam" },
          { "name": "Srikakulam" },
          { "name": "Amadalavalasa" },
          { "name": "Etcherla" },
          { "name": "Narasannapeta" }
        ]
      },
      {
        "name": "Vizianagaram",
        "constituencies": [
          { "name": "Rajam (SC)" },
          { "name": "Bobbili" },
          { "name": "Cheepurupalli" },
          { "name": "Gajapathinagaram" },
          { "name": "Nellimarla" },
          { "name": "Vizianagaram" },
          { "name": "Srungavarapukota" }
        ]
      },
      {
        "name": "Parvathipuram Manyam",
        "constituencies": [
          { "name": "Palakonda (ST)" },
          { "name": "Kurupam (ST)" },
          { "name": "Parvathipuram (SC)" },
          { "name": "Salur (ST)" }
        ]
      },
      {
        "name": "Visakhapatnam",
        "constituencies": [
          { "name": "Bhimili" },
          { "name": "Visakhapatnam East" },
          { "name": "Visakhapatnam South" },
          { "name": "Visakhapatnam North" },
          { "name": "Visakhapatnam West" },
          { "name": "Gajuwaka" },
          { "name": "Pendurthi" }
        ]
      },
      {
        "name": "Anakapalli",
        "constituencies": [
          { "name": "Chodavaram" },
          { "name": "Madugula" },
          { "name": "Anakapalli" },
          { "name": "Yelamanchili" },
          { "name": "Payakaraopet (SC)" },
          { "name": "Narsipatnam" }
        ]
      },
      {
        "name": "Alluri Sitharama Raju",
        "constituencies": [
          { "name": "Araku Valley (ST)" },
          { "name": "Paderu (ST)" },
          { "name": "Rampachodavaram (ST)" }
        ]
      },
      {
        "name": "Kakinada",
        "constituencies": [
          { "name": "Tuni" },
          { "name": "Prathipadu (Kakinada)" },
          { "name": "Pithapuram" },
          { "name": "Kakinada Rural" },
          { "name": "Peddapuram" },
          { "name": "Kakinada City" },
          { "name": "Jaggampeta" }
        ]
      },
      {
        "name": "East Godavari",
        "constituencies": [
          { "name": "Anaparthy" },
          { "name": "Rajanagaram" },
          { "name": "Rajahmundry City" },
          { "name": "Rajahmundry Rural" },
          { "name": "Kovvur (SC)" },
          { "name": "Nidadavole" },
          { "name": "Gopalapuram (SC)" }
        ]
      },
      {
        "name": "Konaseema",
        "constituencies": [
          { "name": "Ramachandrapuram" },
          { "name": "Mummidivaram" },
          { "name": "Amalapuram (SC)" },
          { "name": "Razole (SC)" },
          { "name": "Gannavaram (Konaseema) (SC)" },
          { "name": "Kothapeta" },
          { "name": "Mandapeta" }
        ]
      },
      {
        "name": "West Godavari",
        "constituencies": [
          { "name": "Achanta" },
          { "name": "Palakollu" },
          { "name": "Narasapuram" },
          { "name": "Bhimavaram" },
          { "name": "Undi" },
          { "name": "Tanuku" },
          { "name": "Tadepalligudem" }
        ]
      },
      {
        "name": "Eluru",
        "constituencies": [
          { "name": "Unguturu" },
          { "name": "Denduluru" },
          { "name": "Eluru" },
          { "name": "Polavaram (ST)" },
          { "name": "Chintalapudi (SC)" },
          { "name": "Nuzvid" },
          { "name": "Kaikalur" }
        ]
      },
      {
        "name": "NTR",
        "constituencies": [
          { "name": "Tiruvuru (SC)" },
          { "name": "Vijayawada West" },
          { "name": "Vijayawada Central" },
          { "name": "Vijayawada East" },
          { "name": "Mylavaram" },
          { "name": "Nandigama (SC)" },
          { "name": "Jaggayyapeta" }
        ]
      },
      {
        "name": "Krishna",
        "constituencies": [
          { "name": "Gannavaram (Krishna)" },
          { "name": "Gudivada" },
          { "name": "Pedana" },
          { "name": "Machilipatnam" },
          { "name": "Avanigadda" },
          { "name": "Pamarru (SC)" },
          { "name": "Penamaluru" }
        ]
      },
      {
        "name": "Palnadu",
        "constituencies": [
          { "name": "Pedakurapadu" },
          { "name": "Chilakaluripet" },
          { "name": "Narasaraopet" },
          { "name": "Sattenapalle" },
          { "name": "Vinukonda" },
          { "name": "Gurazala" },
          { "name": "Macherla" }
        ]
      },
      {
        "name": "Guntur",
        "constituencies": [
          { "name": "Tadikonda (SC)" },
          { "name": "Mangalagiri" },
          { "name": "Ponnuru" },
          { "name": "Tenali" },
          { "name": "Prathipadu (Guntur) (SC)" },
          { "name": "Guntur West" },
          { "name": "Guntur East" }
        ]
      },
      {
        "name": "Bapatla",
        "constituencies": [
          { "name": "Vemuru (SC)" },
          { "name": "Repalle" },
          { "name": "Bapatla" },
          { "name": "Parchur" },
          { "name": "Addanki" },
          { "name": "Chirala" }
        ]
      },
      {
        "name": "Prakasam",
        "constituencies": [
          { "name": "Yerragondapalem (SC)" },
          { "name": "Darsi" },
          { "name": "Santhanuthalapadu (SC)" },
          { "name": "Ongole" },
          { "name": "Kondapi (SC)" },
          { "name": "Markapuram" },
          { "name": "Giddalur" },
          { "name": "Kanigiri" }
        ]
      },
      {
        "name": "Nellore",
        "constituencies": [
          { "name": "Kandukur" },
          { "name": "Kavali" },
          { "name": "Atmakur" },
          { "name": "Kovur" },
          { "name": "Nellore City" },
          { "name": "Nellore Rural" },
          { "name": "Sarvepalli" },
          { "name": "Udayagiri" }
        ]
      },
      {
        "name": "Tirupati",
        "constituencies": [
          { "name": "Gudur (SC)" },
          { "name": "Sullurpeta (SC)" },
          { "name": "Venkatagiri" },
          { "name": "Chandragiri" },
          { "name": "Tirupati" },
          { "name": "Srikalahasti" },
          { "name": "Satyavedu (SC)" }
        ]
      },
      {
        "name": "YSR Kadapa",
        "constituencies": [
          { "name": "Badvel (SC)" },
          { "name": "Kadapa" },
          { "name": "Pulivendula" },
          { "name": "Kamalapuram" },
          { "name": "Jammalamadugu" },
          { "name": "Proddatur" },
          { "name": "Mydukur" }
        ]
      },
      {
        "name": "Annamayya",
        "constituencies": [
          { "name": "Rajampet" },
          { "name": "Kodur (SC)" },
          { "name": "Rayachoti" },
          { "name": "Thamballapalle" },
          { "name": "Pileru" },
          { "name": "Madanapalle" }
        ]
      },
      {
        "name": "Nandyal",
        "constituencies": [
          { "name": "Allagadda" },
          { "name": "Srisailam" },
          { "name": "Nandikotkur (SC)" },
          { "name": "Nandyal" },
          { "name": "Banaganapalle" },
          { "name": "Dhone" }
        ]
      },
      {
        "name": "Kurnool",
        "constituencies": [
          { "name": "Kurnool" },
          { "name": "Panyam" },
          { "name": "Pattikonda" },
          { "name": "Kodumur (SC)" },
          { "name": "Yemmiganur" },
          { "name": "Mantralayam" },
          { "name": "Adoni" },
          { "name": "Alur" }
        ]
      },
      {
        "name": "Ananthapuramu",
        "constituencies": [
          { "name": "Rayadurg" },
          { "name": "Uravakonda" },
          { "name": "Guntakal" },
          { "name": "Tadipatri" },
          { "name": "Singanamala (SC)" },
          { "name": "Anantapur Urban" },
          { "name": "Kalyandurg" },
          { "name": "Raptadu" }
        ]
      },
      {
        "name": "Sri Sathya Sai",
        "constituencies": [
          { "name": "Madakasira (SC)" },
          { "name": "Hindupur" },
          { "name": "Penukonda" },
          { "name": "Puttaparthi" },
          { "name": "Dharmavaram" },
          { "name": "Kadiri" }
        ]
      },
      {
        "name": "Chittoor",
        "constituencies": [
          { "name": "Punganur" },
          { "name": "Nagari" },
          { "name": "Gangadhara Nellore (SC)" },
          { "name": "Chittoor" },
          { "name": "Puthalapattu (SC)" },
          { "name": "Palamaner" },
          { "name": "Kuppam" }
        ]
      }
    ]
  },
  {
    "name": "Arunachal Pradesh",
    "districts": [
      {
        "name": "Tawang",
        "constituencies": [
          { "name": "Lumla" },
          { "name": "Tawang" },
          { "name": "Mukto" }
        ]
      },
      {
        "name": "West Kameng",
        "constituencies": [
          { "name": "Dirang" },
          { "name": "Kalaktang" },
          { "name": "Thrizino-Buragaon" },
          { "name": "Bomdila" }
        ]
      },
      {
        "name": "East Kameng",
        "constituencies": [
          { "name": "Bameng" },
          { "name": "Chayangtajo" },
          { "name": "Seppa East" },
          { "name": "Seppa West" }
        ]
      },
      {
        "name": "Pakke-Kessang",
        "constituencies": [{ "name": "Pakke-Kessang" }]
      },
      {
        "name": "Papum Pare",
        "constituencies": [
          { "name": "Itanagar" },
          { "name": "Doimukh" },
          { "name": "Sagalee" }
        ]
      },
      {
        "name": "Lower Subansiri",
        "constituencies": [{ "name": "Yachuli" }, { "name": "Ziro–Hapoli" }]
      },
      {
        "name": "Kra-Daadi",
        "constituencies": [{ "name": "Palin" }, { "name": "Tali" }]
      },
      {
        "name": "Kurung Kumey",
        "constituencies": [{ "name": "Nyapin" }, { "name": "Koloriang" }]
      },
      {
        "name": "Upper Subansiri",
        "constituencies": [
          { "name": "Nacho" },
          { "name": "Taliha" },
          { "name": "Daporijo" },
          { "name": "Dumporijo" }
        ]
      },
      { "name": "Kamle", "constituencies": [{ "name": "Raga" }] },
      {
        "name": "West Siang",
        "constituencies": [
          { "name": "Liromoba" },
          { "name": "Along West" },
          { "name": "Along East" }
        ]
      },
      {
        "name": "Lower Siang",
        "constituencies": [{ "name": "Likabali" }, { "name": "Nari-Koyu" }]
      },
      { "name": "Lepa Rada", "constituencies": [{ "name": "Basar" }] },
      {
        "name": "Siang",
        "constituencies": [{ "name": "Rumgong" }, { "name": "Pangin" }]
      },
      { "name": "Shi Yomi", "constituencies": [{ "name": "Mechuka" }] },
      {
        "name": "Upper Siang",
        "constituencies": [
          { "name": "Tuting–Yingkiong" },
          { "name": "Mariyang-Geku" }
        ]
      },
      {
        "name": "East Siang",
        "constituencies": [
          { "name": "Pasighat West" },
          { "name": "Pasighat East" },
          { "name": "Mebo" }
        ]
      },
      { "name": "Dibang Valley", "constituencies": [{ "name": "Anini" }] },
      {
        "name": "Lower Dibang Valley",
        "constituencies": [{ "name": "Dambuk" }, { "name": "Roing" }]
      },
      { "name": "Lohit", "constituencies": [{ "name": "Tezu" }] },
      { "name": "Anjaw", "constituencies": [{ "name": "Hayuliang" }] },
      {
        "name": "Namsai",
        "constituencies": [
          { "name": "Chowkham" },
          { "name": "Namsai" },
          { "name": "Lekang" }
        ]
      },
      {
        "name": "Changlang",
        "constituencies": [
          { "name": "Bordumsa-Diyun" },
          { "name": "Miao" },
          { "name": "Nampong" },
          { "name": "Changlang South" },
          { "name": "Changlang North" }
        ]
      },
      {
        "name": "Tirap",
        "constituencies": [
          { "name": "Namsang" },
          { "name": "Khonsa East" },
          { "name": "Khonsa West" },
          { "name": "Borduria–Bagapani" }
        ]
      },
      {
        "name": "Longding",
        "constituencies": [
          { "name": "Kanubari" },
          { "name": "Longding–Pumao" },
          { "name": "Pongchau-Wakka" }
        ]
      }
    ]
  },
  {
    "name": "Assam",
    "districts": [
      {
        "name": "Sribhumi",
        "constituencies": [
          { "name": "Ratabari (SC)" },
          { "name": "Patharkandi" },
          { "name": "Karimganj North" },
          { "name": "Karimganj South" },
          { "name": "Badarpur" }
        ]
      },
      {
        "name": "Hailakandi",
        "constituencies": [
          { "name": "Hailakandi" },
          { "name": "Katlicherra" },
          { "name": "Algapur" }
        ]
      },
      {
        "name": "Cachar",
        "constituencies": [
          { "name": "Silchar" },
          { "name": "Sonai" },
          { "name": "Dholai (SC)" },
          { "name": "Udharbond" },
          { "name": "Lakhipur" },
          { "name": "Barkhola" },
          { "name": "Katigorah" }
        ]
      },
      { "name": "Dima Hasao", "constituencies": [{ "name": "Haflong (ST)" }] },
      {
        "name": "Karbi Anglong",
        "constituencies": [
          { "name": "Bokajan (ST)" },
          { "name": "Howraghat (ST)" },
          { "name": "Diphu (ST)" }
        ]
      },
      {
        "name": "West Karbi Anglong",
        "constituencies": [{ "name": "Baithalangso (ST)" }]
      },
      {
        "name": "South Salmara-Mankachar",
        "constituencies": [{ "name": "Mankachar" }, { "name": "Salmara South" }]
      },
      {
        "name": "Dhubri",
        "constituencies": [
          { "name": "Dhubri" },
          { "name": "Gauripur" },
          { "name": "Golakganj" },
          { "name": "Bilasipara West" },
          { "name": "Bilasipara East" }
        ]
      },
      {
        "name": "Kokrajhar",
        "constituencies": [
          { "name": "Gossaigaon" },
          { "name": "Kokrajhar West (ST)" },
          { "name": "Kokrajhar East (ST)" }
        ]
      },
      {
        "name": "Chirang",
        "constituencies": [{ "name": "Sidli (ST)" }, { "name": "Bijni" }]
      },
      {
        "name": "Bongaigaon",
        "constituencies": [
          { "name": "Bongaigaon" },
          { "name": "Abhayapuri North" },
          { "name": "Abhayapuri South (SC)" }
        ]
      },
      {
        "name": "Goalpara",
        "constituencies": [
          { "name": "Dudhnai (ST)" },
          { "name": "Goalpara East" },
          { "name": "Goalpara West" },
          { "name": "Jaleswar" }
        ]
      },
      {
        "name": "Barpeta",
        "constituencies": [
          { "name": "Sorbhog" },
          { "name": "Barpeta" },
          { "name": "Jania" },
          { "name": "Baghbor" },
          { "name": "Sarukhetri" },
          { "name": "Chenga" }
        ]
      },
      {
        "name": "Bajali",
        "constituencies": [
          { "name": "Bhabanipur" },
          { "name": "Patacharkuchi" }
        ]
      },
      {
        "name": "Kamrup",
        "constituencies": [
          { "name": "Boko (SC)" },
          { "name": "Chaygaon" },
          { "name": "Palasbari" },
          { "name": "Hajo" },
          { "name": "Kamalpur" },
          { "name": "Rangia" }
        ]
      },
      {
        "name": "Kamrup Metropolitan",
        "constituencies": [
          { "name": "Jalukbari" },
          { "name": "Dispur" },
          { "name": "Gauhati East" },
          { "name": "Gauhati West" }
        ]
      },
      {
        "name": "Baksa",
        "constituencies": [
          { "name": "Tamulpur" },
          { "name": "Barama (ST)" },
          { "name": "Chapaguri (ST)" }
        ]
      },
      {
        "name": "Nalbari",
        "constituencies": [
          { "name": "Nalbari" },
          { "name": "Barkhetry" },
          { "name": "Dharmapur" }
        ]
      },
      {
        "name": "Udalguri",
        "constituencies": [
          { "name": "Panery" },
          { "name": "Udalguri (ST)" },
          { "name": "Majbat" }
        ]
      },
      {
        "name": "Darrang",
        "constituencies": [
          { "name": "Kalaigaon" },
          { "name": "Sipajhar" },
          { "name": "Mangaldoi (SC)" },
          { "name": "Dalgaon" }
        ]
      },
      {
        "name": "Sonitpur",
        "constituencies": [
          { "name": "Dhekiajuli" },
          { "name": "Barchalla" },
          { "name": "Tezpur" },
          { "name": "Rangapara" },
          { "name": "Sootea" },
          { "name": "Gohpur" }
        ]
      },
      {
        "name": "Biswanath",
        "constituencies": [{ "name": "Biswanath" }, { "name": "Behali" }]
      },
      {
        "name": "Morigaon",
        "constituencies": [
          { "name": "Jagiroad (SC)" },
          { "name": "Marigaon" },
          { "name": "Laharighat" }
        ]
      },
      {
        "name": "Nagaon",
        "constituencies": [
          { "name": "Raha (SC)" },
          { "name": "Dhing" },
          { "name": "Batadroba" },
          { "name": "Rupohihat" },
          { "name": "Nowgong" },
          { "name": "Barhampur" },
          { "name": "Samaguri" },
          { "name": "Kaliabor" }
        ]
      },
      {
        "name": "Hojai",
        "constituencies": [
          { "name": "Jamunamukh" },
          { "name": "Hojai" },
          { "name": "Lumding" }
        ]
      },
      {
        "name": "Golaghat",
        "constituencies": [
          { "name": "Bokakhat" },
          { "name": "Sarupathar" },
          { "name": "Golaghat" },
          { "name": "Khumtai" },
          { "name": "Dergaon (SC)" }
        ]
      },
      {
        "name": "Jorhat",
        "constituencies": [
          { "name": "Jorhat" },
          { "name": "Titabar" },
          { "name": "Mariani" },
          { "name": "Teok" }
        ]
      },
      { "name": "Majuli", "constituencies": [{ "name": "Majuli (ST)" }] },
      {
        "name": "Sibsagar",
        "constituencies": [
          { "name": "Amguri" },
          { "name": "Nazira" },
          { "name": "Thowra" },
          { "name": "Sibsagar" }
        ]
      },
      {
        "name": "Charaideo",
        "constituencies": [{ "name": "Mahmara" }, { "name": "Sonari" }]
      },
      {
        "name": "Lakhimpur",
        "constituencies": [
          { "name": "Bihpuria" },
          { "name": "Naoboicha" },
          { "name": "Lakhimpur" },
          { "name": "Dhakuakhana (ST)" }
        ]
      },
      {
        "name": "Dhemaji",
        "constituencies": [
          { "name": "Dhemaji (ST)" },
          { "name": "Jonai (ST)" }
        ]
      },
      {
        "name": "Dibrugarh",
        "constituencies": [
          { "name": "Moran" },
          { "name": "Dibrugarh" },
          { "name": "Lahowal" },
          { "name": "Duliajan" },
          { "name": "Tingkhong" },
          { "name": "Naharkatia" },
          { "name": "Chabua" }
        ]
      },
      {
        "name": "Tinsukia",
        "constituencies": [
          { "name": "Tinsukia" },
          { "name": "Digboi" },
          { "name": "Margherita" },
          { "name": "Doomdooma" },
          { "name": "Sadiya" }
        ]
      }
    ]
  },
  {
    "name": "Bihar",
    "districts": [
      {
        "name": "West Champaran",
        "constituencies": [
          { "name": "Valmiki Nagar" },
          { "name": "Ramnagar (SC)" },
          { "name": "Narkatiaganj" },
          { "name": "Bagaha" },
          { "name": "Lauriya" },
          { "name": "Nautan" },
          { "name": "Chanpatia" },
          { "name": "Bettiah" },
          { "name": "Sikta" }
        ]
      },
      {
        "name": "East Champaran",
        "constituencies": [
          { "name": "Raxaul" },
          { "name": "Sugauli" },
          { "name": "Narkatiya" },
          { "name": "Harsidhi (SC)" },
          { "name": "Govindganj" },
          { "name": "Kesaria" },
          { "name": "Kalyanpur" },
          { "name": "Pipra" },
          { "name": "Madhuban" },
          { "name": "Motihari" },
          { "name": "Chiraia" },
          { "name": "Dhaka" }
        ]
      },
      { "name": "Sheohar", "constituencies": [{ "name": "Sheohar" }] },
      {
        "name": "Sitamarhi",
        "constituencies": [
          { "name": "Riga" },
          { "name": "Bathnaha (SC)" },
          { "name": "Parihar" },
          { "name": "Sursand" },
          { "name": "Bajpatti" },
          { "name": "Sitamarhi" },
          { "name": "Runnisaidpur" },
          { "name": "Belsand" }
        ]
      },
      {
        "name": "Madhubani",
        "constituencies": [
          { "name": "Harlakhi" },
          { "name": "Benipatti" },
          { "name": "Khajauli" },
          { "name": "Babubarhi" },
          { "name": "Bisfi" },
          { "name": "Madhubani" },
          { "name": "Rajnagar (SC)" },
          { "name": "Jhanjharpur" },
          { "name": "Phulparas" },
          { "name": "Laukaha" }
        ]
      },
      {
        "name": "Supaul",
        "constituencies": [
          { "name": "Nirmali" },
          { "name": "Pipra" },
          { "name": "Supaul" },
          { "name": "Triveniganj (SC)" },
          { "name": "Chhatapur" }
        ]
      },
      {
        "name": "Araria",
        "constituencies": [
          { "name": "Narpatganj" },
          { "name": "Raniganj (SC)" },
          { "name": "Forbesganj" },
          { "name": "Araria" },
          { "name": "Jokihat" },
          { "name": "Sikti" }
        ]
      },
      {
        "name": "Kishanganj",
        "constituencies": [
          { "name": "Bahadurganj" },
          { "name": "Thakurganj" },
          { "name": "Kishanganj" },
          { "name": "Kochadhaman" }
        ]
      },
      {
        "name": "Purnia",
        "constituencies": [
          { "name": "Amour" },
          { "name": "Baisi" },
          { "name": "Kasba" },
          { "name": "Banmankhi (SC)" },
          { "name": "Rupauli" },
          { "name": "Dhamdaha" },
          { "name": "Purnia" }
        ]
      },
      {
        "name": "Katihar",
        "constituencies": [
          { "name": "Katihar" },
          { "name": "Kadwa" },
          { "name": "Balrampur" },
          { "name": "Pranpur" },
          { "name": "Manihari (ST)" },
          { "name": "Barari" },
          { "name": "Korha (SC)" }
        ]
      },
      {
        "name": "Madhepura",
        "constituencies": [
          { "name": "Alamnagar" },
          { "name": "Bihariganj" },
          { "name": "Singheshwar (SC)" },
          { "name": "Madhepura" }
        ]
      },
      {
        "name": "Saharsa",
        "constituencies": [
          { "name": "Sonbarsha (SC)" },
          { "name": "Saharsa" },
          { "name": "Simri Bakhtiarpur" },
          { "name": "Mahishi" }
        ]
      },
      {
        "name": "Darbhanga",
        "constituencies": [
          { "name": "Kusheshwar Asthan (SC)" },
          { "name": "Gaura Bauram" },
          { "name": "Benipur" },
          { "name": "Alinagar" },
          { "name": "Darbhanga Rural" },
          { "name": "Darbhanga" },
          { "name": "Hayaghat" },
          { "name": "Bahadurpur" },
          { "name": "Keoti" },
          { "name": "Jale" }
        ]
      },
      {
        "name": "Muzaffarpur",
        "constituencies": [
          { "name": "Gaighat" },
          { "name": "Aurai" },
          { "name": "Minapur" },
          { "name": "Bochahan (SC)" },
          { "name": "Sakra (SC)" },
          { "name": "Kurhani" },
          { "name": "Muzaffarpur" },
          { "name": "Kanti" },
          { "name": "Baruraj" },
          { "name": "Paroo" },
          { "name": "Sahebganj" }
        ]
      },
      {
        "name": "Gopalganj",
        "constituencies": [
          { "name": "Baikunthpur" },
          { "name": "Barauli" },
          { "name": "Gopalganj" },
          { "name": "Kuchaikote" },
          { "name": "Bhore (SC)" },
          { "name": "Hathua" }
        ]
      },
      {
        "name": "Siwan",
        "constituencies": [
          { "name": "Siwan" },
          { "name": "Ziradei" },
          { "name": "Darauli (SC)" },
          { "name": "Raghunathpur" },
          { "name": "Daraunda" },
          { "name": "Barharia" },
          { "name": "Goriakothi" },
          { "name": "Maharajganj" }
        ]
      },
      {
        "name": "Saran",
        "constituencies": [
          { "name": "Ekma" },
          { "name": "Manjhi" },
          { "name": "Baniapur" },
          { "name": "Taraiya" },
          { "name": "Marhaura" },
          { "name": "Chapra" },
          { "name": "Garkha (SC)" },
          { "name": "Amnour" },
          { "name": "Parsa" },
          { "name": "Sonpur" }
        ]
      },
      {
        "name": "Vaishali",
        "constituencies": [
          { "name": "Hajipur" },
          { "name": "Lalganj" },
          { "name": "Vaishali" },
          { "name": "Mahua" },
          { "name": "Raja Pakar (SC)" },
          { "name": "Raghopur" },
          { "name": "Mahnar" },
          { "name": "Patepur (SC)" }
        ]
      },
      {
        "name": "Samastipur",
        "constituencies": [
          { "name": "Kalyanpur" },
          { "name": "Warisnagar" },
          { "name": "Samastipur" },
          { "name": "Ujiarpur" },
          { "name": "Morwa" },
          { "name": "Sarairanjan" },
          { "name": "Mohiuddinnagar" },
          { "name": "Bibhutipur" },
          { "name": "Rosera (SC)" },
          { "name": "Hasanpur" }
        ]
      },
      {
        "name": "Begusarai",
        "constituencies": [
          { "name": "Cheria-Bariarpur" },
          { "name": "Bachhwara" },
          { "name": "Teghra" },
          { "name": "Matihani" },
          { "name": "Sahebpur Kamal" },
          { "name": "Begusarai" },
          { "name": "Bakhri (SC)" }
        ]
      },
      {
        "name": "Khagaria",
        "constituencies": [
          { "name": "Alauli (SC)" },
          { "name": "Khagaria" },
          { "name": "Beldaur" },
          { "name": "Parbatta" }
        ]
      },
      {
        "name": "Bhagalpur",
        "constituencies": [
          { "name": "Bihpur" },
          { "name": "Gopalpur" },
          { "name": "Pirpainti (SC)" },
          { "name": "Kahalgaon" },
          { "name": "Bhagalpur" },
          { "name": "Sultanganj" },
          { "name": "Nathnagar" }
        ]
      },
      {
        "name": "Banka",
        "constituencies": [
          { "name": "Amarpur" },
          { "name": "Dhoraiya (SC)" },
          { "name": "Banka" },
          { "name": "Katoria (ST)" },
          { "name": "Belhar" }
        ]
      },
      {
        "name": "Munger",
        "constituencies": [
          { "name": "Tarapur" },
          { "name": "Munger" },
          { "name": "Jamalpur" }
        ]
      },
      {
        "name": "Lakhisarai",
        "constituencies": [{ "name": "Suryagarha" }, { "name": "Lakhisarai" }]
      },
      {
        "name": "Sheikhpura",
        "constituencies": [{ "name": "Sheikhpura" }, { "name": "Barbigha" }]
      },
      {
        "name": "Nalanda",
        "constituencies": [
          { "name": "Asthawan" },
          { "name": "Biharsharif" },
          { "name": "Rajgir (SC)" },
          { "name": "Islampur" },
          { "name": "Hilsa" },
          { "name": "Nalanda" },
          { "name": "Harnaut" }
        ]
      },
      {
        "name": "Patna",
        "constituencies": [
          { "name": "Mokama" },
          { "name": "Barh" },
          { "name": "Bakhtiarpur" },
          { "name": "Digha" },
          { "name": "Bankipur" },
          { "name": "Kumhrar" },
          { "name": "Patna Sahib" },
          { "name": "Fatuha" },
          { "name": "Danapur" },
          { "name": "Maner" },
          { "name": "Phulwari (SC)" },
          { "name": "Masaurhi (SC)" },
          { "name": "Paliganj" },
          { "name": "Bikram" }
        ]
      },
      {
        "name": "Bhojpur",
        "constituencies": [
          { "name": "Sandesh" },
          { "name": "Barhara" },
          { "name": "Arrah" },
          { "name": "Agiaon (SC)" },
          { "name": "Tarari" },
          { "name": "Jagdishpur" },
          { "name": "Shahpur" }
        ]
      },
      {
        "name": "Buxar",
        "constituencies": [
          { "name": "Brahampur" },
          { "name": "Buxar" },
          { "name": "Dumraon" },
          { "name": "Rajpur (SC)" }
        ]
      },
      {
        "name": "Kaimur",
        "constituencies": [
          { "name": "Ramgarh" },
          { "name": "Mohania (SC)" },
          { "name": "Bhabua" },
          { "name": "Chainpur" }
        ]
      },
      {
        "name": "Rohtas",
        "constituencies": [
          { "name": "Chenari (SC)" },
          { "name": "Sasaram" },
          { "name": "Kargahar" },
          { "name": "Dinara" },
          { "name": "Nokha" },
          { "name": "Dehri" },
          { "name": "Karakat" }
        ]
      },
      {
        "name": "Arwal",
        "constituencies": [{ "name": "Arwal" }, { "name": "Kurtha" }]
      },
      {
        "name": "Jehanabad",
        "constituencies": [
          { "name": "Jehanabad" },
          { "name": "Ghosi" },
          { "name": "Makhdumpur (SC)" }
        ]
      },
      {
        "name": "Aurangabad",
        "constituencies": [
          { "name": "Goh" },
          { "name": "Obra" },
          { "name": "Nabinagar" },
          { "name": "Kutumba (SC)" },
          { "name": "Aurangabad" },
          { "name": "Rafiganj" }
        ]
      },
      {
        "name": "Gaya",
        "constituencies": [
          { "name": "Gurua" },
          { "name": "Sherghati" },
          { "name": "Imamganj (SC)" },
          { "name": "Barachatti (SC)" },
          { "name": "Bodh Gaya (SC)" },
          { "name": "Gaya Town" },
          { "name": "Tikari" },
          { "name": "Belaganj" },
          { "name": "Atri" },
          { "name": "Wazirganj" }
        ]
      },
      {
        "name": "Nawada",
        "constituencies": [
          { "name": "Rajauli (SC)" },
          { "name": "Hisua" },
          { "name": "Nawada" },
          { "name": "Gobindpur" },
          { "name": "Warsaliganj" }
        ]
      },
      {
        "name": "Jamui",
        "constituencies": [
          { "name": "Sikandra (SC)" },
          { "name": "Jamui" },
          { "name": "Jhajha" },
          { "name": "Chakai" }
        ]
      }
    ]
  },
  {
    "name": "Chhattisgarh",
    "districts": [
      {
        "name": "Manendragarh-Chirmiri-Bharatpur",
        "constituencies": [
          { "name": "Bharatpur-Sonhat (ST)" },
          { "name": "Manendragarh" }
        ]
      },
      { "name": "Koriya", "constituencies": [{ "name": "Baikunthpur" }] },
      {
        "name": "Surajpur",
        "constituencies": [{ "name": "Premnagar" }, { "name": "Bhatgaon" }]
      },
      {
        "name": "Balrampur",
        "constituencies": [
          { "name": "Pratappur (ST)" },
          { "name": "Ramanujganj (ST)" },
          { "name": "Samri" }
        ]
      },
      {
        "name": "Surguja",
        "constituencies": [
          { "name": "Lundra (ST)" },
          { "name": "Ambikapur" },
          { "name": "Sitapur (ST)" }
        ]
      },
      {
        "name": "Jashpur",
        "constituencies": [
          { "name": "Jashpur (ST)" },
          { "name": "Kunkuri (ST)" },
          { "name": "Pathalgaon (ST)" }
        ]
      },
      {
        "name": "Raigarh",
        "constituencies": [
          { "name": "Lailunga (ST)" },
          { "name": "Raigarh" },
          { "name": "Dharamjaigarh (ST)" }
        ]
      },
      {
        "name": "Sarangarh-Bilaigarh",
        "constituencies": [
          { "name": "Sarangarh (SC)" },
          { "name": "Kharsia" },
          { "name": "Bilaigarh (SC)" }
        ]
      },
      {
        "name": "Korba",
        "constituencies": [
          { "name": "Rampur (ST)" },
          { "name": "Korba" },
          { "name": "Katghora" },
          { "name": "Pali-Tanakhar (ST)" }
        ]
      },
      {
        "name": "Gaurela Pendra Marwahi",
        "constituencies": [{ "name": "Marwahi (ST)" }, { "name": "Kota" }]
      },
      {
        "name": "Mungeli",
        "constituencies": [{ "name": "Lormi" }, { "name": "Mungeli (SC)" }]
      },
      {
        "name": "Bilaspur",
        "constituencies": [
          { "name": "Takhatpur" },
          { "name": "Bilha" },
          { "name": "Bilaspur" },
          { "name": "Beltara" },
          { "name": "Masturi (SC)" }
        ]
      },
      {
        "name": "Janjgir-Champa",
        "constituencies": [
          { "name": "Akaltara" },
          { "name": "Janjgir-Champa" },
          { "name": "Pamgarh (SC)" }
        ]
      },
      {
        "name": "Sakti",
        "constituencies": [
          { "name": "Sakti" },
          { "name": "Chandrapur" },
          { "name": "Jaijaipur" }
        ]
      },
      {
        "name": "Mahasamund",
        "constituencies": [
          { "name": "Saraipali (SC)" },
          { "name": "Basna" },
          { "name": "Khallari" },
          { "name": "Mahasamund" }
        ]
      },
      {
        "name": "Baloda Bazar",
        "constituencies": [
          { "name": "Kasdol" },
          { "name": "Baloda Bazar" },
          { "name": "Bhatapara" }
        ]
      },
      {
        "name": "Raipur",
        "constituencies": [
          { "name": "Dharsiwa" },
          { "name": "Raipur Rural" },
          { "name": "Raipur City West" },
          { "name": "Raipur City North" },
          { "name": "Raipur City South" },
          { "name": "Arang" },
          { "name": "Abhanpur" }
        ]
      },
      {
        "name": "Gariaband",
        "constituencies": [
          { "name": "Rajim" },
          { "name": "Bindrawagarh (ST)" }
        ]
      },
      {
        "name": "Dhamtari",
        "constituencies": [
          { "name": "Sihawa (ST)" },
          { "name": "Kurud" },
          { "name": "Dhamtari" }
        ]
      },
      {
        "name": "Balod",
        "constituencies": [
          { "name": "Sanjari-Balod" },
          { "name": "Dondi Lohara (ST)" },
          { "name": "Gunderdehi" }
        ]
      },
      {
        "name": "Durg",
        "constituencies": [
          { "name": "Patan" },
          { "name": "Durg Rural" },
          { "name": "Durg City" },
          { "name": "Bhilai Nagar" },
          { "name": "Vaishali Nagar" },
          { "name": "Ahiwara (SC)" }
        ]
      },
      {
        "name": "Bemetara",
        "constituencies": [
          { "name": "Saja" },
          { "name": "Bemetara" },
          { "name": "Navagarh (SC)" }
        ]
      },
      {
        "name": "Kabirdham",
        "constituencies": [{ "name": "Pandariya" }, { "name": "Kawardha" }]
      },
      {
        "name": "Rajnandgaon",
        "constituencies": [
          { "name": "Khairagarh" },
          { "name": "Dongargarh (SC)" },
          { "name": "Rajnandgaon" },
          { "name": "Dongargaon" },
          { "name": "Khujji" },
          { "name": "Mohla-Manpur" }
        ]
      },
      {
        "name": "Kanker",
        "constituencies": [
          { "name": "Antagarh (ST)" },
          { "name": "Bhanupratappur (ST)" },
          { "name": "Kanker (ST)" }
        ]
      },
      {
        "name": "Kondagaon",
        "constituencies": [
          { "name": "Keshkal (ST)" },
          { "name": "Kondagaon (ST)" }
        ]
      },
      {
        "name": "Narayanpur",
        "constituencies": [{ "name": "Narayanpur (ST)" }]
      },
      {
        "name": "Bastar",
        "constituencies": [
          { "name": "Bastar (ST)" },
          { "name": "Jagdalpur" },
          { "name": "Chitrakot (ST)" }
        ]
      },
      { "name": "Dantewada", "constituencies": [{ "name": "Dantewada (ST)" }] },
      { "name": "Bijapur", "constituencies": [{ "name": "Bijapur (ST)" }] },
      { "name": "Sukma", "constituencies": [{ "name": "Konta (ST)" }] }
    ]
  },
  {
    "name": "Delhi",
    "districts": [
      {
        "name": "North Delhi",
        "constituencies": [
          { "name": "Narela" },
          { "name": "Adarsh Nagar" },
          { "name": "Badli" },
          { "name": "Bawana (SC)" },
          { "name": "Rohini" },
          { "name": "Shakur Basti" },
          { "name": "Wazirpur" },
          { "name": "Model Town" }
        ]
      },
      {
        "name": "Central Delhi",
        "constituencies": [
          { "name": "Burari" },
          { "name": "Timarpur" },
          { "name": "Sadar Bazar" },
          { "name": "Chandni Chowk" },
          { "name": "Matia Mahal" },
          { "name": "Ballimaran" },
          { "name": "Karol Bagh (SC)" }
        ]
      },
      {
        "name": "North West Delhi",
        "constituencies": [
          { "name": "Rithala" },
          { "name": "Mundka" },
          { "name": "Kirari" },
          { "name": "Sultan Pur Majra (SC)" },
          { "name": "Mangol Puri (SC)" },
          { "name": "Shalimar Bagh" },
          { "name": "Tri Nagar" }
        ]
      },
      {
        "name": "West Delhi",
        "constituencies": [
          { "name": "Nangloi Jat" },
          { "name": "Moti Nagar" },
          { "name": "Madipur (SC)" },
          { "name": "Rajouri Garden" },
          { "name": "Hari Nagar" },
          { "name": "Tilak Nagar" },
          { "name": "Janakpuri" }
        ]
      },
      {
        "name": "New Delhi",
        "constituencies": [
          { "name": "Patel Nagar (SC)" },
          { "name": "Delhi Cantonment" },
          { "name": "Rajinder Nagar" },
          { "name": "New Delhi" },
          { "name": "R. K. Puram" },
          { "name": "Greater Kailash" }
        ]
      },
      {
        "name": "South West Delhi",
        "constituencies": [
          { "name": "Vikaspuri" },
          { "name": "Uttam Nagar" },
          { "name": "Dwarka" },
          { "name": "Matiala" },
          { "name": "Najafgarh" },
          { "name": "Bijwasan" },
          { "name": "Palam" }
        ]
      },
      {
        "name": "South East Delhi",
        "constituencies": [
          { "name": "Jangpura" },
          { "name": "Kasturba Nagar" },
          { "name": "Sangam Vihar" },
          { "name": "Kalkaji" },
          { "name": "Tughlakabad" },
          { "name": "Badarpur" },
          { "name": "Okhla" }
        ]
      },
      {
        "name": "South Delhi",
        "constituencies": [
          { "name": "Malviya Nagar" },
          { "name": "Mehrauli" },
          { "name": "Chhatarpur" },
          { "name": "Deoli (SC)" },
          { "name": "Ambedkar Nagar (SC)" }
        ]
      },
      {
        "name": "East Delhi",
        "constituencies": [
          { "name": "Trilokpuri (SC)" },
          { "name": "Kondli (SC)" },
          { "name": "Patparganj" },
          { "name": "Laxmi Nagar" },
          { "name": "Krishna Nagar" },
          { "name": "Gandhi Nagar" }
        ]
      },
      {
        "name": "Shahdara",
        "constituencies": [
          { "name": "Vishwas Nagar" },
          { "name": "Shahdara" },
          { "name": "Seemapuri (SC)" },
          { "name": "Rohtas Nagar" },
          { "name": "Babarpur" }
        ]
      },
      {
        "name": "North East Delhi",
        "constituencies": [
          { "name": "Seelampur" },
          { "name": "Ghonda" },
          { "name": "Gokalpur (SC)" },
          { "name": "Mustafabad" },
          { "name": "Karawal Nagar" }
        ]
      }
    ]
  },
  {
    "name": "Goa",
    "districts": [
      {
        "name": "North Goa",
        "constituencies": [
          { "name": "Mandrem" },
          { "name": "Pernem (SC)" },
          { "name": "Bicholim" },
          { "name": "Tivim" },
          { "name": "Mapusa" },
          { "name": "Siolim" },
          { "name": "Saligao" },
          { "name": "Calangute" },
          { "name": "Porvorim" },
          { "name": "Aldona" },
          { "name": "Panaji" },
          { "name": "Taleigao" },
          { "name": "Santa Cruz" },
          { "name": "St. Andre" },
          { "name": "Cumbarjua" },
          { "name": "Maem" },
          { "name": "Sanquelim" },
          { "name": "Poriem" },
          { "name": "Valpoi" },
          { "name": "Priol" },
          { "name": "Ponda" },
          { "name": "Siroda" },
          { "name": "Marcaim" }
        ]
      },
      {
        "name": "South Goa",
        "constituencies": [
          { "name": "Mormugao" },
          { "name": "Vasco Da Gama" },
          { "name": "Dabolim" },
          { "name": "Cortalim" },
          { "name": "Nuvem" },
          { "name": "Curtorim" },
          { "name": "Fatorda" },
          { "name": "Margao" },
          { "name": "Benaulim" },
          { "name": "Navelim" },
          { "name": "Cuncolim" },
          { "name": "Velim" },
          { "name": "Quepem" },
          { "name": "Curchorem" },
          { "name": "Sanvordem" },
          { "name": "Sanguem" },
          { "name": "Canacona" }
        ]
      }
    ]
  },
  {
    "name": "Gujarat",
    "districts": [
      {
        "name": "Kutch",
        "constituencies": [
          { "name": "Abdasa" },
          { "name": "Mandvi (Kachchh)" },
          { "name": "Bhuj" },
          { "name": "Anjar" },
          { "name": "Gandhidham (SC)" },
          { "name": "Rapar" }
        ]
      },
      { "name": "Banaskantha", "constituencies": [{ "name": "Vav" }] },
      {
        "name": "Vav-Tharad",
        "constituencies": [
          { "name": "Tharad" },
          { "name": "Dhanera" },
          { "name": "Danta (ST)" },
          { "name": "Vadgam (SC)" },
          { "name": "Palanpur" },
          { "name": "Deesa" },
          { "name": "Deodar" },
          { "name": "Kankrej" }
        ]
      },
      {
        "name": "Patan",
        "constituencies": [
          { "name": "Radhanpur" },
          { "name": "Chanasma" },
          { "name": "Patan" },
          { "name": "Sidhpur" }
        ]
      },
      {
        "name": "Mehsana",
        "constituencies": [
          { "name": "Kheralu" },
          { "name": "Unjha" },
          { "name": "Visnagar" },
          { "name": "Bechraji" },
          { "name": "Kadi (SC)" },
          { "name": "Mahesana" },
          { "name": "Vijapur" }
        ]
      },
      {
        "name": "Sabarkantha",
        "constituencies": [
          { "name": "Himatnagar" },
          { "name": "Idar (SC)" },
          { "name": "Khedbrahma (ST)" },
          { "name": "Prantij" }
        ]
      },
      {
        "name": "Aravalli",
        "constituencies": [
          { "name": "Bhiloda (ST)" },
          { "name": "Modasa" },
          { "name": "Bayad" }
        ]
      },
      {
        "name": "Gandhinagar",
        "constituencies": [
          { "name": "Dahegam" },
          { "name": "Gandhinagar South" },
          { "name": "Gandhinagar North" },
          { "name": "Mansa" },
          { "name": "Kalol" }
        ]
      },
      {
        "name": "Ahmedabad",
        "constituencies": [
          { "name": "Viramgam" },
          { "name": "Sanand" },
          { "name": "Ghatlodia" },
          { "name": "Vejalpur" },
          { "name": "Vatva" },
          { "name": "Ellisbridge" },
          { "name": "Naranpura" },
          { "name": "Nikol" },
          { "name": "Naroda" },
          { "name": "Thakkarbapa Nagar" },
          { "name": "Bapunagar" },
          { "name": "Amraiwadi" },
          { "name": "Dariapur" },
          { "name": "Jamalpur-Khadiya" },
          { "name": "Maninagar" },
          { "name": "Danilimda (SC)" },
          { "name": "Sabarmati" },
          { "name": "Asarwa (SC)" },
          { "name": "Daskroi" },
          { "name": "Dholka" },
          { "name": "Dhandhuka" }
        ]
      },
      {
        "name": "Surendranagar",
        "constituencies": [
          { "name": "Dasada (SC)" },
          { "name": "Limdi" },
          { "name": "Wadhwan" },
          { "name": "Chotila" },
          { "name": "Dhangadhra" }
        ]
      },
      {
        "name": "Morbi",
        "constituencies": [
          { "name": "Morbi" },
          { "name": "Tankara" },
          { "name": "Wankaner" }
        ]
      },
      {
        "name": "Rajkot",
        "constituencies": [
          { "name": "Rajkot East" },
          { "name": "Rajkot West" },
          { "name": "Rajkot South" },
          { "name": "Rajkot Rural (SC)" },
          { "name": "Jasdan" },
          { "name": "Gondal" },
          { "name": "Jetpur" },
          { "name": "Dhoraji" }
        ]
      },
      {
        "name": "Jamnagar",
        "constituencies": [
          { "name": "Kalavad (SC)" },
          { "name": "Jamnagar Rural" },
          { "name": "Jamnagar North" },
          { "name": "Jamnagar South" },
          { "name": "Jamjodhpur" }
        ]
      },
      {
        "name": "Devbhoomi Dwarka",
        "constituencies": [{ "name": "Khambhaliya" }, { "name": "Dwarka" }]
      },
      {
        "name": "Porbandar",
        "constituencies": [{ "name": "Porbandar" }, { "name": "Kutiyana" }]
      },
      {
        "name": "Junagarh",
        "constituencies": [
          { "name": "Manavadar" },
          { "name": "Junagadh" },
          { "name": "Visavadar" },
          { "name": "Keshod" },
          { "name": "Mangrol" }
        ]
      },
      {
        "name": "Gir Somnath",
        "constituencies": [
          { "name": "Somnath" },
          { "name": "Talala" },
          { "name": "Kodinar (SC)" },
          { "name": "Una" }
        ]
      },
      {
        "name": "Amreli",
        "constituencies": [
          { "name": "Dhari" },
          { "name": "Amreli" },
          { "name": "Lathi" },
          { "name": "Savarkundla" },
          { "name": "Rajula" }
        ]
      },
      {
        "name": "Bhavnagar",
        "constituencies": [
          { "name": "Mahuva" },
          { "name": "Talaja" },
          { "name": "Gariadhar" },
          { "name": "Palitana" },
          { "name": "Bhavnagar Rural" },
          { "name": "Bhavnagar East" },
          { "name": "Bhavnagar West" }
        ]
      },
      {
        "name": "Botad",
        "constituencies": [{ "name": "Gadhada (SC)" }, { "name": "Botad" }]
      },
      {
        "name": "Anand",
        "constituencies": [
          { "name": "Khambhat" },
          { "name": "Borsad" },
          { "name": "Anklav" },
          { "name": "Umreth" },
          { "name": "Anand" },
          { "name": "Petlad" },
          { "name": "Sojitra" }
        ]
      },
      {
        "name": "Kheda",
        "constituencies": [
          { "name": "Matar" },
          { "name": "Nadiad" },
          { "name": "Mehmedabad" },
          { "name": "Mahudha" },
          { "name": "Thasra" },
          { "name": "Kapadvanj" }
        ]
      },
      {
        "name": "Mahisagar",
        "constituencies": [
          { "name": "Balasinor" },
          { "name": "Lunawada" },
          { "name": "Santrampur (ST)" }
        ]
      },
      {
        "name": "Panchmahal",
        "constituencies": [
          { "name": "Shehra" },
          { "name": "Morva Hadaf (ST)" },
          { "name": "Godhra" },
          { "name": "Kalol (Panchmahal)" },
          { "name": "Halol" }
        ]
      },
      {
        "name": "Dahod",
        "constituencies": [
          { "name": "Fatepura (ST)" },
          { "name": "Jhalod (ST)" },
          { "name": "Limkheda (ST)" },
          { "name": "Dahod (ST)" },
          { "name": "Garbada (ST)" },
          { "name": "Devgadhbariya" }
        ]
      },
      {
        "name": "Vadodara",
        "constituencies": [
          { "name": "Savli" },
          { "name": "Vaghodiya" },
          { "name": "Dabhoi" },
          { "name": "Vadodara City (SC)" },
          { "name": "Sayajigunj" },
          { "name": "Akota" },
          { "name": "Raopura" },
          { "name": "Manjalpur" },
          { "name": "Padra" },
          { "name": "Karjan" }
        ]
      },
      {
        "name": "Chhota Udaipur District",
        "constituencies": [
          { "name": "Chhota Udaipur (ST)" },
          { "name": "Jetpur, Chhota Udaipur (ST)" },
          { "name": "Sankheda (ST)" }
        ]
      },
      {
        "name": "Narmada",
        "constituencies": [
          { "name": "Nandod (ST)" },
          { "name": "Dediapada (ST)" }
        ]
      },
      {
        "name": "Bharuch District",
        "constituencies": [
          { "name": "Jambusar" },
          { "name": "Vagra" },
          { "name": "Jhagadiya (ST)" },
          { "name": "Bharuch" },
          { "name": "Ankleshwar" }
        ]
      },
      {
        "name": "Surat",
        "constituencies": [
          { "name": "Olpad" },
          { "name": "Mangrol (Surat) (ST)" },
          { "name": "Mandvi (Surat) (ST)" },
          { "name": "Kamrej" },
          { "name": "Surat East" },
          { "name": "Surat North" },
          { "name": "Varachha Road" },
          { "name": "Karanj" },
          { "name": "Limbayat" },
          { "name": "Udhana" },
          { "name": "Majura" },
          { "name": "Katargam" },
          { "name": "Surat West" },
          { "name": "Choryasi" },
          { "name": "Bardoli (SC)" },
          { "name": "Mahuva (Surat) (ST)" }
        ]
      },
      {
        "name": "Tapi",
        "constituencies": [{ "name": "Vyara (ST)" }, { "name": "Nizar (ST)" }]
      },
      { "name": "Dang", "constituencies": [{ "name": "Dangs (ST)" }] },
      {
        "name": "Navsari",
        "constituencies": [
          { "name": "Jalalpore" },
          { "name": "Navsari" },
          { "name": "Gandevi (ST)" },
          { "name": "Vansda (ST)" }
        ]
      },
      {
        "name": "Valsad",
        "constituencies": [
          { "name": "Dharampur (ST)" },
          { "name": "Valsad" },
          { "name": "Pardi" },
          { "name": "Kaprada (ST)" },
          { "name": "Umbergaon (ST)" }
        ]
      }
    ]
  },
  {
    "name": "Haryana",
    "districts": [
      {
        "name": "Panchkula",
        "constituencies": [{ "name": "Kalka" }, { "name": "Panchkula" }]
      },
      {
        "name": "Ambala",
        "constituencies": [
          { "name": "Naraingarh" },
          { "name": "Ambala Cantt" },
          { "name": "Ambala City" },
          { "name": "Mulana (SC)" }
        ]
      },
      {
        "name": "Yamunanagar",
        "constituencies": [
          { "name": "Sadhaura (SC)" },
          { "name": "Jagadhri" },
          { "name": "Yamunanagar" },
          { "name": "Radaur" }
        ]
      },
      {
        "name": "Kurukshetra",
        "constituencies": [
          { "name": "Ladwa" },
          { "name": "Shahbad (SC)" },
          { "name": "Thanesar" },
          { "name": "Pehowa" }
        ]
      },
      {
        "name": "Kaithal",
        "constituencies": [
          { "name": "Guhla (SC)" },
          { "name": "Kalayat" },
          { "name": "Kaithal" },
          { "name": "Pundri" }
        ]
      },
      {
        "name": "Karnal",
        "constituencies": [
          { "name": "Nilokheri (SC)" },
          { "name": "Indri" },
          { "name": "Karnal" },
          { "name": "Gharaunda" },
          { "name": "Assandh" }
        ]
      },
      {
        "name": "Panipat",
        "constituencies": [
          { "name": "Panipat Rural" },
          { "name": "Panipat City" },
          { "name": "Israna (SC)" },
          { "name": "Samalkha" }
        ]
      },
      {
        "name": "Sonipat",
        "constituencies": [
          { "name": "Ganaur" },
          { "name": "Rai" },
          { "name": "Kharkhauda (SC)" },
          { "name": "Sonipat" },
          { "name": "Gohana" },
          { "name": "Baroda" }
        ]
      },
      {
        "name": "Jind",
        "constituencies": [
          { "name": "Julana" },
          { "name": "Safidon" },
          { "name": "Jind" },
          { "name": "Uchana Kalan" },
          { "name": "Narwana (SC)" }
        ]
      },
      {
        "name": "Fatehabad",
        "constituencies": [
          { "name": "Tohana" },
          { "name": "Fatehabad" },
          { "name": "Ratia (SC)" }
        ]
      },
      {
        "name": "Sirsa",
        "constituencies": [
          { "name": "Kalanwali (SC)" },
          { "name": "Dabwali" },
          { "name": "Rania" },
          { "name": "Sirsa" },
          { "name": "Ellenabad" }
        ]
      },
      {
        "name": "Hisar",
        "constituencies": [
          { "name": "Adampur" },
          { "name": "Uklana (SC)" },
          { "name": "Narnaund" },
          { "name": "Hansi" },
          { "name": "Barwala" },
          { "name": "Hisar" },
          { "name": "Nalwa" }
        ]
      },
      {
        "name": "Bhiwani",
        "constituencies": [
          { "name": "Loharu" },
          { "name": "Bhiwani" },
          { "name": "Tosham" },
          { "name": "Bawani Khera (SC)" }
        ]
      },
      {
        "name": "Charkhi Dadri",
        "constituencies": [{ "name": "Badhra" }, { "name": "Dadri" }]
      },
      {
        "name": "Rohtak",
        "constituencies": [
          { "name": "Meham" },
          { "name": "Garhi Sampla-Kiloi" },
          { "name": "Rohtak" },
          { "name": "Kalanaur (SC)" }
        ]
      },
      {
        "name": "Jhajjar",
        "constituencies": [
          { "name": "Bahadurgarh" },
          { "name": "Badli" },
          { "name": "Jhajjar (SC)" },
          { "name": "Beri" }
        ]
      },
      {
        "name": "Mahendragarh",
        "constituencies": [
          { "name": "Ateli" },
          { "name": "Mahendragarh" },
          { "name": "Narnaul" },
          { "name": "Nangal Chaudhry" }
        ]
      },
      {
        "name": "Rewari",
        "constituencies": [
          { "name": "Bawal (SC)" },
          { "name": "Kosli" },
          { "name": "Rewari" }
        ]
      },
      {
        "name": "Gurgaon",
        "constituencies": [
          { "name": "Pataudi (SC)" },
          { "name": "Badshahpur" },
          { "name": "Gurgaon" },
          { "name": "Sohna" }
        ]
      },
      {
        "name": "Nuh",
        "constituencies": [
          { "name": "Nuh" },
          { "name": "Ferozepur Jhirka" },
          { "name": "Punahana" }
        ]
      },
      {
        "name": "Palwal",
        "constituencies": [
          { "name": "Hathin" },
          { "name": "Hodal (SC)" },
          { "name": "Palwal" }
        ]
      },
      {
        "name": "Faridabad",
        "constituencies": [
          { "name": "Prithla" },
          { "name": "Faridabad NIT" },
          { "name": "Badkhal" },
          { "name": "Ballabgarh" },
          { "name": "Faridabad" },
          { "name": "Tigaon" }
        ]
      }
    ]
  },
  {
    "name": "Himachal Pradesh",
    "districts": [
      {
        "name": "Chamba",
        "constituencies": [
          { "name": "Churah (SC)" },
          { "name": "Bharmour (ST)" },
          { "name": "Chamba" },
          { "name": "Dalhousie" },
          { "name": "Bhattiyat" }
        ]
      },
      {
        "name": "Kangra",
        "constituencies": [
          { "name": "Nurpur" },
          { "name": "Indora (SC)" },
          { "name": "Fatehpur" },
          { "name": "Jawali" },
          { "name": "Dehra" },
          { "name": "Jaswan-Pragpur" },
          { "name": "Jawalamukhi" },
          { "name": "Jaisinghpur (SC)" },
          { "name": "Sullah" },
          { "name": "Nagrota" },
          { "name": "Kangra" },
          { "name": "Shahpur" },
          { "name": "Dharamshala" },
          { "name": "Palampur" },
          { "name": "Baijnath (SC)" }
        ]
      },
      {
        "name": "Lahaul and Spiti",
        "constituencies": [{ "name": "Lahaul and Spiti (ST)" }]
      },
      {
        "name": "Kullu",
        "constituencies": [
          { "name": "Manali" },
          { "name": "Kullu" },
          { "name": "Banjar" },
          { "name": "Anni (SC)" }
        ]
      },
      {
        "name": "Mandi",
        "constituencies": [
          { "name": "Karsog (SC)" },
          { "name": "Sundernagar" },
          { "name": "Nachan (SC)" },
          { "name": "Seraj" },
          { "name": "Darang" },
          { "name": "Jogindernagar" },
          { "name": "Dharampur" },
          { "name": "Mandi" },
          { "name": "Balh (SC)" },
          { "name": "Sarkaghat" }
        ]
      },
      {
        "name": "Hamirpur",
        "constituencies": [
          { "name": "Bhoranj (SC)" },
          { "name": "Sujanpur" },
          { "name": "Hamirpur" },
          { "name": "Barsar" },
          { "name": "Nadaun" }
        ]
      },
      {
        "name": "Una",
        "constituencies": [
          { "name": "Chintpurni (SC)" },
          { "name": "Gagret" },
          { "name": "Haroli" },
          { "name": "Una" },
          { "name": "Kutlehar" }
        ]
      },
      {
        "name": "Bilaspur",
        "constituencies": [
          { "name": "Jhanduta (SC)" },
          { "name": "Ghumarwin" },
          { "name": "Bilaspur" },
          { "name": "Sri Naina Deviji" }
        ]
      },
      {
        "name": "Solan",
        "constituencies": [
          { "name": "Arki" },
          { "name": "Nalagarh" },
          { "name": "Doon" },
          { "name": "Solan (SC)" },
          { "name": "Kasauli (SC)" }
        ]
      },
      {
        "name": "Sirmaur",
        "constituencies": [
          { "name": "Pachhad (SC)" },
          { "name": "Nahan" },
          { "name": "Sri Renukaji (SC)" },
          { "name": "Paonta Sahib" },
          { "name": "Shillai" }
        ]
      },
      {
        "name": "Shimla",
        "constituencies": [
          { "name": "Chopal" },
          { "name": "Theog" },
          { "name": "Kasumpti" },
          { "name": "Shimla" },
          { "name": "Shimla Rural" },
          { "name": "Jubbal-Kotkhai" },
          { "name": "Rampur (SC)" },
          { "name": "Rohru (SC)" }
        ]
      },
      { "name": "Kinnaur", "constituencies": [{ "name": "Kinnaur (ST)" }] }
    ]
  },
  { "name": "Jammu & Kashmir", "districts": [] },
  {
    "name": "Jharkhand",
    "districts": [
      {
        "name": "Sahebganj",
        "constituencies": [
          { "name": "Rajmahal" },
          { "name": "Borio" },
          { "name": "Barhait" }
        ]
      },
      {
        "name": "Pakur",
        "constituencies": [
          { "name": "Litipara" },
          { "name": "Pakur" },
          { "name": "Maheshpur" }
        ]
      },
      {
        "name": "Dumka",
        "constituencies": [
          { "name": "Sikaripara" },
          { "name": "Dumka" },
          { "name": "Jama" },
          { "name": "Jarmundi" }
        ]
      },
      {
        "name": "Jamtara",
        "constituencies": [{ "name": "Nala" }, { "name": "Jamtara" }]
      },
      {
        "name": "Deoghar",
        "constituencies": [
          { "name": "Madhupur" },
          { "name": "Sarath" },
          { "name": "Deoghar" }
        ]
      },
      {
        "name": "Godda",
        "constituencies": [
          { "name": "Poreyahat" },
          { "name": "Godda" },
          { "name": "Mahagama" }
        ]
      },
      { "name": "Koderma", "constituencies": [{ "name": "Kodarma" }] },
      {
        "name": "Hazaribagh",
        "constituencies": [
          { "name": "Barkatha" },
          { "name": "Barhi" },
          { "name": "Mandu" },
          { "name": "Hazaribagh" }
        ]
      },
      {
        "name": "Ramgarh",
        "constituencies": [{ "name": "Barkagaon" }, { "name": "Ramgarh" }]
      },
      {
        "name": "Chatra",
        "constituencies": [{ "name": "Simaria" }, { "name": "Chatra" }]
      },
      {
        "name": "Giridih",
        "constituencies": [
          { "name": "Dhanwar" },
          { "name": "Bagodar" },
          { "name": "Jamua" },
          { "name": "Gandey" },
          { "name": "Giridih" },
          { "name": "Dumri" }
        ]
      },
      {
        "name": "Bokaro",
        "constituencies": [
          { "name": "Gomia" },
          { "name": "Bermo" },
          { "name": "Bokaro" },
          { "name": "Chandankiyari" }
        ]
      },
      {
        "name": "Dhanbad",
        "constituencies": [
          { "name": "Sindri" },
          { "name": "Nirsa" },
          { "name": "Dhanbad" },
          { "name": "Jharia" },
          { "name": "Tundi" },
          { "name": "Baghmara" }
        ]
      },
      {
        "name": "East Singhbhum",
        "constituencies": [
          { "name": "Baharagora" },
          { "name": "Ghatsila" },
          { "name": "Potka" },
          { "name": "Jugsalai" },
          { "name": "Jamshedpur East" },
          { "name": "Jamshedpur West" }
        ]
      },
      {
        "name": "Seraikela Kharsawan",
        "constituencies": [
          { "name": "Ichagarh" },
          { "name": "Seraikella" },
          { "name": "Kharsawan" }
        ]
      },
      {
        "name": "West Singhbhum",
        "constituencies": [
          { "name": "Chaibasa" },
          { "name": "Majhgaon" },
          { "name": "Jaganathpur" },
          { "name": "Manoharpur" },
          { "name": "Chakradharpur" }
        ]
      },
      {
        "name": "Ranchi",
        "constituencies": [
          { "name": "Tamar" },
          { "name": "Silli" },
          { "name": "Khijri" },
          { "name": "Ranchi" },
          { "name": "Hatia" },
          { "name": "Kanke" },
          { "name": "Mandar" }
        ]
      },
      {
        "name": "Khunti",
        "constituencies": [{ "name": "Torpa" }, { "name": "Khunti" }]
      },
      {
        "name": "Gumla",
        "constituencies": [
          { "name": "Sisai" },
          { "name": "Gumla" },
          { "name": "Bishunpur" }
        ]
      },
      {
        "name": "Simdega",
        "constituencies": [{ "name": "Simdega" }, { "name": "Kolebira" }]
      },
      { "name": "Lohardaga", "constituencies": [{ "name": "Lohardaga" }] },
      {
        "name": "Latehar",
        "constituencies": [{ "name": "Manika" }, { "name": "Latehar" }]
      },
      {
        "name": "Palamu",
        "constituencies": [
          { "name": "Panki" },
          { "name": "Daltonganj" },
          { "name": "Bishrampur" },
          { "name": "Chhatarpur" },
          { "name": "Hussainabad" }
        ]
      },
      {
        "name": "Garhwa",
        "constituencies": [{ "name": "Garhwa" }, { "name": "Bhawanathpur" }]
      }
    ]
  },
  {
    "name": "Karnataka",
    "districts": [
      {
        "name": "Belagavi",
        "constituencies": [
          { "name": "Nippani" },
          { "name": "Chikkodi-Sadalga" },
          { "name": "Athani" },
          { "name": "Kagwad" },
          { "name": "Kudachi (SC)" },
          { "name": "Raibag (SC)" },
          { "name": "Hukkeri" },
          { "name": "Arabhavi" },
          { "name": "Gokak" },
          { "name": "Yemkanmardi (ST)" },
          { "name": "Belgaum Uttar" },
          { "name": "Belgaum Dakshin" },
          { "name": "Belgaum Rural" },
          { "name": "Khanapur" },
          { "name": "Kittur" },
          { "name": "Bailhongal" },
          { "name": "Saundatti Yellamma" },
          { "name": "Ramdurg" }
        ]
      },
      {
        "name": "Bagalkot",
        "constituencies": [
          { "name": "Mudhol (SC)" },
          { "name": "Terdal" },
          { "name": "Jamkhandi" },
          { "name": "Bilgi" },
          { "name": "Badami" },
          { "name": "Bagalkot" },
          { "name": "Hungund" }
        ]
      },
      {
        "name": "Vijayapura",
        "constituencies": [
          { "name": "Muddebihal" },
          { "name": "Devar Hippargi" },
          { "name": "Basavana Bagevadi" },
          { "name": "Babaleshwar" },
          { "name": "Bijapur City" },
          { "name": "Nagathan (SC)" },
          { "name": "Indi" },
          { "name": "Sindagi" }
        ]
      },
      {
        "name": "Kalaburagi",
        "constituencies": [
          { "name": "Afzalpur" },
          { "name": "Jevargi" },
          { "name": "Chittapur (SC)" },
          { "name": "Sedam" },
          { "name": "Chincholi (SC)" },
          { "name": "Gulbarga Rural (SC)" },
          { "name": "Gulbarga Dakshin" },
          { "name": "Gulbarga Uttar" },
          { "name": "Aland" }
        ]
      },
      {
        "name": "Yadgir",
        "constituencies": [
          { "name": "Shorapur (ST)" },
          { "name": "Shahapur" },
          { "name": "Yadgir" },
          { "name": "Gurmitkal" }
        ]
      },
      {
        "name": "Bidar",
        "constituencies": [
          { "name": "Basavakalyan" },
          { "name": "Humnabad" },
          { "name": "Bidar South" },
          { "name": "Bidar" },
          { "name": "Bhalki" },
          { "name": "Aurad (SC)" }
        ]
      },
      {
        "name": "Raichur",
        "constituencies": [
          { "name": "Raichur Rural (ST)" },
          { "name": "Raichur" },
          { "name": "Manvi (ST)" },
          { "name": "Devadurga (ST)" },
          { "name": "Lingsugur (SC)" },
          { "name": "Sindhanur" },
          { "name": "Maski (ST)" }
        ]
      },
      {
        "name": "Koppal",
        "constituencies": [
          { "name": "Kushtagi" },
          { "name": "Kanakagiri (SC)" },
          { "name": "Gangawati" },
          { "name": "Yelburga" },
          { "name": "Koppal" }
        ]
      },
      {
        "name": "Gadag",
        "constituencies": [
          { "name": "Shirahatti (SC)" },
          { "name": "Gadag" },
          { "name": "Ron" },
          { "name": "Nargund" }
        ]
      },
      {
        "name": "Dharwad",
        "constituencies": [
          { "name": "Navalgund" },
          { "name": "Kundgol" },
          { "name": "Dharwad" },
          { "name": "Hubli-Dharwad East (SC)" },
          { "name": "Hubli-Dharwad Central" },
          { "name": "Hubli-Dharwad West" },
          { "name": "Kalghatgi" }
        ]
      },
      {
        "name": "Uttara Kannada",
        "constituencies": [
          { "name": "Haliyal" },
          { "name": "Karwar" },
          { "name": "Kumta" },
          { "name": "Bhatkal" },
          { "name": "Sirsi" },
          { "name": "Yellapur" }
        ]
      },
      {
        "name": "Haveri",
        "constituencies": [
          { "name": "Hangal" },
          { "name": "Shiggaon" },
          { "name": "Haveri (SC)" },
          { "name": "Byadgi" },
          { "name": "Hirekerur" },
          { "name": "Ranebennur" }
        ]
      },
      {
        "name": "Vijayanagara",
        "constituencies": [
          { "name": "Hoovina Hadagali (SC)" },
          { "name": "Hagaribommanahalli (SC)" },
          { "name": "Vijayanagara" },
          { "name": "Kudligi (ST)" },
          { "name": "Harapanahalli" }
        ]
      },
      {
        "name": "Ballari",
        "constituencies": [
          { "name": "Kampli (ST)" },
          { "name": "Siruguppa (ST)" },
          { "name": "Bellary (ST)" },
          { "name": "Bellary City" },
          { "name": "Sandur (ST)" }
        ]
      },
      {
        "name": "Chitradurga",
        "constituencies": [
          { "name": "Molakalmuru (ST)" },
          { "name": "Challakere (ST)" },
          { "name": "Chitradurga" },
          { "name": "Hiriyur" },
          { "name": "Hosadurga" },
          { "name": "Holalkere (SC)" }
        ]
      },
      {
        "name": "Davanagere",
        "constituencies": [
          { "name": "Jagalur (ST)" },
          { "name": "Harihar" },
          { "name": "Davanagere North" },
          { "name": "Davanagere South" },
          { "name": "Mayakonda (SC)" },
          { "name": "Channagiri" },
          { "name": "Honnali" }
        ]
      },
      {
        "name": "Shimoga",
        "constituencies": [
          { "name": "Shimoga Rural (SC)" },
          { "name": "Bhadravati" },
          { "name": "Shimoga" },
          { "name": "Tirthahalli" },
          { "name": "Shikaripura" },
          { "name": "Sorab" },
          { "name": "Sagar" }
        ]
      },
      {
        "name": "Udupi",
        "constituencies": [
          { "name": "Byndoor" },
          { "name": "Kundapura" },
          { "name": "Udupi" },
          { "name": "Kapu" },
          { "name": "Karkala" }
        ]
      },
      {
        "name": "Chikmagalur",
        "constituencies": [
          { "name": "Sringeri" },
          { "name": "Mudigere (SC)" },
          { "name": "Chikmagalur" },
          { "name": "Tarikere" },
          { "name": "Kadur" }
        ]
      },
      {
        "name": "Tumakuru",
        "constituencies": [
          { "name": "Chiknayakanhalli" },
          { "name": "Tiptur" },
          { "name": "Turuvekere" },
          { "name": "Kunigal" },
          { "name": "Tumkur City" },
          { "name": "Tumkur Rural" },
          { "name": "Koratagere (SC)" },
          { "name": "Gubbi" },
          { "name": "Sira" },
          { "name": "Pavagada (SC)" },
          { "name": "Madhugiri" }
        ]
      },
      {
        "name": "Chikkaballapura",
        "constituencies": [
          { "name": "Gauribidanur" },
          { "name": "Bagepalli" },
          { "name": "Chikkaballapur" },
          { "name": "Sidlaghatta" },
          { "name": "Chintamani" }
        ]
      },
      {
        "name": "Kolar",
        "constituencies": [
          { "name": "Srinivaspur" },
          { "name": "Mulbagal (SC)" },
          { "name": "Kolar Gold Field (SC)" },
          { "name": "Bangarapet (SC)" },
          { "name": "Kolar" },
          { "name": "Malur" }
        ]
      },
      {
        "name": "Bangalore Urban",
        "constituencies": [
          { "name": "Yelahanka" },
          { "name": "Krishnarajapuram" },
          { "name": "Byatarayanapura" },
          { "name": "Yeshwantpur" },
          { "name": "Rajarajeshwarinagar" },
          { "name": "Dasarahalli" },
          { "name": "Mahalakshmi Layout" },
          { "name": "Malleshwaram" },
          { "name": "Hebbal" },
          { "name": "Pulakeshinagar (SC)" },
          { "name": "Sarvagnanagar" },
          { "name": "C. V. Raman Nagar (SC)" },
          { "name": "Shivajinagar" },
          { "name": "Shanti Nagar" },
          { "name": "Gandhi Nagar" },
          { "name": "Rajaji Nagar" },
          { "name": "Govindraj Nagar" },
          { "name": "Vijay Nagar" },
          { "name": "Chamrajpet" },
          { "name": "Chickpet" },
          { "name": "Basavanagudi" },
          { "name": "Padmanabhanagar" },
          { "name": "B.T.M. Layout" },
          { "name": "Jayanagar" },
          { "name": "Mahadevapura (SC)" },
          { "name": "Bommanahalli" },
          { "name": "Bangalore South" },
          { "name": "Anekal (SC)" }
        ]
      },
      {
        "name": "Bangalore Rural",
        "constituencies": [
          { "name": "Hoskote" },
          { "name": "Devanahalli (SC)" },
          { "name": "Doddaballapur" },
          { "name": "Nelamangala (SC)" }
        ]
      },
      {
        "name": "Ramanagara",
        "constituencies": [
          { "name": "Magadi" },
          { "name": "Ramanagara" },
          { "name": "Kanakapura" },
          { "name": "Channapatna" }
        ]
      },
      {
        "name": "Mandya",
        "constituencies": [
          { "name": "Malavalli (SC)" },
          { "name": "Maddur" },
          { "name": "Melukote" },
          { "name": "Mandya" },
          { "name": "Shrirangapattana" },
          { "name": "Nagamangala" },
          { "name": "Krishnarajapet" }
        ]
      },
      {
        "name": "Hassan",
        "constituencies": [
          { "name": "Shravanabelagola" },
          { "name": "Arsikere" },
          { "name": "Belur" },
          { "name": "Hassan" },
          { "name": "Holenarasipur" },
          { "name": "Arkalgud" },
          { "name": "Sakleshpur (SC)" }
        ]
      },
      {
        "name": "Dakshina Kannada",
        "constituencies": [
          { "name": "Belthangady" },
          { "name": "Moodabidri" },
          { "name": "Mangalore City North" },
          { "name": "Mangalore City South" },
          { "name": "Mangalore" },
          { "name": "Bantval" },
          { "name": "Puttur" },
          { "name": "Sullia (SC)" }
        ]
      },
      {
        "name": "Kodagu",
        "constituencies": [{ "name": "Madikeri" }, { "name": "Virajpet" }]
      },
      {
        "name": "Mysore",
        "constituencies": [
          { "name": "Periyapatna" },
          { "name": "Krishnarajanagara" },
          { "name": "Hunsur" },
          { "name": "Heggadadevankote (ST)" },
          { "name": "Nanjangud (SC)" },
          { "name": "Chamundeshwari" },
          { "name": "Krishnaraja" },
          { "name": "Chamaraja" },
          { "name": "Narasimharaja" },
          { "name": "Varuna" },
          { "name": "T. Narasipur (SC)" }
        ]
      },
      {
        "name": "Chamarajanagar",
        "constituencies": [
          { "name": "Hanur" },
          { "name": "Kollegal (SC)" },
          { "name": "Chamarajanagar" },
          { "name": "Gundlupet" }
        ]
      }
    ]
  },
  {
    "name": "Kerala",
    "districts": [
      {
        "name": "Kasaragod",
        "constituencies": [
          { "name": "Manjeshwaram" },
          { "name": "Kasaragod" },
          { "name": "Udma" },
          { "name": "Kanhangad" },
          { "name": "Thrikaripur" }
        ]
      },
      {
        "name": "Kannur",
        "constituencies": [
          { "name": "Payyanur" },
          { "name": "Kalliasseri" },
          { "name": "Taliparamba" },
          { "name": "Irikkur" },
          { "name": "Azhikode" },
          { "name": "Kannur" },
          { "name": "Dharmadom" },
          { "name": "Thalassery" },
          { "name": "Mattanur" },
          { "name": "Kuthuparamba" },
          { "name": "Peravoor" }
        ]
      },
      {
        "name": "Wayanad",
        "constituencies": [
          { "name": "Mananthavady (ST)" },
          { "name": "Sulthan Bathery (ST)" },
          { "name": "Kalpetta" }
        ]
      },
      {
        "name": "Kozhikode",
        "constituencies": [
          { "name": "Vadakara" },
          { "name": "Kuttiady" },
          { "name": "Nadapuram" },
          { "name": "Koyilandy" },
          { "name": "Perambra" },
          { "name": "Balussery (SC)" },
          { "name": "Elathur" },
          { "name": "Kozhikode North" },
          { "name": "Kozhikode South" },
          { "name": "Beypore" },
          { "name": "Kunnamangalam" },
          { "name": "Koduvally" },
          { "name": "Thiruvambady" }
        ]
      },
      {
        "name": "Malappuram",
        "constituencies": [
          { "name": "Kondotty" },
          { "name": "Eranad" },
          { "name": "Nilambur" },
          { "name": "Wandoor (SC)" },
          { "name": "Manjeri" },
          { "name": "Perinthalmanna" },
          { "name": "Mankada" },
          { "name": "Malappuram" },
          { "name": "Vengara" },
          { "name": "Vallikkunnu" },
          { "name": "Tirurangadi" },
          { "name": "Tanur" },
          { "name": "Tirur" },
          { "name": "Kottakkal" },
          { "name": "Thavanur" },
          { "name": "Ponnani" }
        ]
      },
      {
        "name": "Palakkad",
        "constituencies": [
          { "name": "Thrithala" },
          { "name": "Pattambi" },
          { "name": "Shornur" },
          { "name": "Ottapalam" },
          { "name": "Kongad (SC)" },
          { "name": "Mannarkkad" },
          { "name": "Malampuzha" },
          { "name": "Palakkad" },
          { "name": "Tarur (SC)" },
          { "name": "Chittur" },
          { "name": "Nenmara" },
          { "name": "Alathur" }
        ]
      },
      {
        "name": "Thrissur",
        "constituencies": [
          { "name": "Chelakkara (SC)" },
          { "name": "Kunnamkulam" },
          { "name": "Guruvayur" },
          { "name": "Manalur" },
          { "name": "Wadakkanchery" },
          { "name": "Ollur" },
          { "name": "Thrissur" },
          { "name": "Nattika (SC)" },
          { "name": "Kaipamangalam" },
          { "name": "Irinjalakuda" },
          { "name": "Puthukkad" },
          { "name": "Chalakudy" },
          { "name": "Kodungallur" }
        ]
      },
      {
        "name": "Ernakulam",
        "constituencies": [
          { "name": "Perumbavoor" },
          { "name": "Angamaly" },
          { "name": "Aluva" },
          { "name": "Kalamassery" },
          { "name": "Paravur" },
          { "name": "Vypin" },
          { "name": "Kochi" },
          { "name": "Thrippunithura" },
          { "name": "Ernakulam" },
          { "name": "Thrikkakara" },
          { "name": "Kunnathunad (SC)" },
          { "name": "Piravom" },
          { "name": "Muvattupuzha" },
          { "name": "Kothamangalam" }
        ]
      },
      {
        "name": "Idukki",
        "constituencies": [
          { "name": "Devikulam" },
          { "name": "Udumbanchola" },
          { "name": "Thodupuzha" },
          { "name": "Idukki" },
          { "name": "Peerumade" }
        ]
      },
      {
        "name": "Kottayam",
        "constituencies": [
          { "name": "Pala" },
          { "name": "Kaduthuruthy" },
          { "name": "Vaikom (SC)" },
          { "name": "Ettumanoor" },
          { "name": "Kottayam" },
          { "name": "Puthuppally" },
          { "name": "Changanassery" },
          { "name": "Kanjirappally" },
          { "name": "Poonjar" }
        ]
      },
      {
        "name": "Alappuzha",
        "constituencies": [
          { "name": "Aroor" },
          { "name": "Cherthala" },
          { "name": "Alappuzha" },
          { "name": "Ambalappuzha" },
          { "name": "Kuttanad" },
          { "name": "Haripad" },
          { "name": "Kayamkulam" },
          { "name": "Mavelikara" },
          { "name": "Chengannur" }
        ]
      },
      {
        "name": "Pathanamthitta",
        "constituencies": [
          { "name": "Thiruvalla" },
          { "name": "Ranni" },
          { "name": "Aranmula" },
          { "name": "Konni" },
          { "name": "Adoor" }
        ]
      },
      {
        "name": "Kollam",
        "constituencies": [
          { "name": "Karunagapally" },
          { "name": "Chavara" },
          { "name": "Kunnathur" },
          { "name": "Kottarakkara" },
          { "name": "Pathanapuram" },
          { "name": "Punalur" },
          { "name": "Chadayamangalam" },
          { "name": "Kundara" },
          { "name": "Kollam" },
          { "name": "Eravipuram" },
          { "name": "Chathannoor" }
        ]
      },
      {
        "name": "Thiruvananthapuram",
        "constituencies": [
          { "name": "Varkala" },
          { "name": "Attingal" },
          { "name": "Chirayinkeezhu" },
          { "name": "Nedumangad" },
          { "name": "Vamanapuram" },
          { "name": "Kazhakootam" },
          { "name": "Vattiyoorkavu" },
          { "name": "Thiruvananthapuram" },
          { "name": "Nemom" },
          { "name": "Aruvikkara" },
          { "name": "Parassala" },
          { "name": "Kattakkada" },
          { "name": "Kovalam" },
          { "name": "Neyyattinkara" }
        ]
      }
    ]
  },
  { "name": "Madhya Pradesh", "districts": [] },
  {
    "name": "Maharashtra",
    "districts": [
      {
        "name": "Nandurbar",
        "constituencies": [
          { "name": "Akkalkuwa (ST)" },
          { "name": "Shahada (ST)" },
          { "name": "Nandurbar (ST)" },
          { "name": "Navapur (ST)" }
        ]
      },
      {
        "name": "Dhule",
        "constituencies": [
          { "name": "Sakri (ST)" },
          { "name": "Dhule Rural" },
          { "name": "Dhule City" },
          { "name": "Sindkheda" },
          { "name": "Shirpur (ST)" }
        ]
      },
      {
        "name": "Jalgaon",
        "constituencies": [
          { "name": "Chopda (ST)" },
          { "name": "Raver" },
          { "name": "Bhusawal (SC)" },
          { "name": "Jalgaon City" },
          { "name": "Jalgaon Rural" },
          { "name": "Amalner" },
          { "name": "Erandol" },
          { "name": "Chalisgaon" },
          { "name": "Pachora" },
          { "name": "Jamner" },
          { "name": "Muktainagar" }
        ]
      },
      {
        "name": "Buldana",
        "constituencies": [
          { "name": "Malkapur" },
          { "name": "Buldhana" },
          { "name": "Chikhali" },
          { "name": "Sindkhed Raja" },
          { "name": "Mehkar (SC)" },
          { "name": "Khamgaon" },
          { "name": "Jalgaon (Jamod)" }
        ]
      },
      {
        "name": "Akola",
        "constituencies": [
          { "name": "Akot" },
          { "name": "Balapur" },
          { "name": "Akola West" },
          { "name": "Akola East" },
          { "name": "Murtizapur (SC)" }
        ]
      },
      {
        "name": "Washim",
        "constituencies": [
          { "name": "Risod" },
          { "name": "Washim (SC)" },
          { "name": "Karanja" }
        ]
      },
      {
        "name": "Amravati",
        "constituencies": [
          { "name": "Dhamangaon Railway" },
          { "name": "Badnera" },
          { "name": "Amravati" },
          { "name": "Teosa" },
          { "name": "Daryapur (SC)" },
          { "name": "Melghat (ST)" },
          { "name": "Achalpur" },
          { "name": "Morshi" }
        ]
      },
      {
        "name": "Wardha",
        "constituencies": [
          { "name": "Arvi" },
          { "name": "Deoli" },
          { "name": "Hinganghat" },
          { "name": "Wardha" }
        ]
      },
      {
        "name": "Nagpur",
        "constituencies": [
          { "name": "Katol" },
          { "name": "Savner" },
          { "name": "Hingna" },
          { "name": "Umred (SC)" },
          { "name": "Nagpur South West" },
          { "name": "Nagpur South" },
          { "name": "Nagpur East" },
          { "name": "Nagpur Central" },
          { "name": "Nagpur West" },
          { "name": "Nagpur North (SC)" },
          { "name": "Kamthi" },
          { "name": "Ramtek" }
        ]
      },
      {
        "name": "Bhandara",
        "constituencies": [
          { "name": "Tumsar" },
          { "name": "Bhandara (SC)" },
          { "name": "Sakoli" }
        ]
      },
      {
        "name": "Gondia",
        "constituencies": [
          { "name": "Arjuni Morgaon (SC)" },
          { "name": "Tirora" },
          { "name": "Gondiya" },
          { "name": "Amgaon (ST)" }
        ]
      },
      {
        "name": "Gadchiroli",
        "constituencies": [
          { "name": "Armori (ST)" },
          { "name": "Gadchiroli (ST)" },
          { "name": "Aheri (ST)" }
        ]
      },
      {
        "name": "Chandrapur",
        "constituencies": [
          { "name": "Rajura" },
          { "name": "Chandrapur (SC)" },
          { "name": "Ballarpur" },
          { "name": "Bramhapuri" },
          { "name": "Chimur" },
          { "name": "Warora" }
        ]
      },
      {
        "name": "Yavatmal",
        "constituencies": [
          { "name": "Wani" },
          { "name": "Ralegaon (ST)" },
          { "name": "Yavatmal" },
          { "name": "Digras" },
          { "name": "Arni (ST)" },
          { "name": "Pusad" },
          { "name": "Umarkhed (SC)" }
        ]
      },
      {
        "name": "Nanded",
        "constituencies": [
          { "name": "Kinwat" },
          { "name": "Hadgaon" },
          { "name": "Bhokar" },
          { "name": "Nanded North" },
          { "name": "Nanded South" },
          { "name": "Loha" },
          { "name": "Naigaon" },
          { "name": "Deglur (SC)" },
          { "name": "Mukhed" }
        ]
      },
      {
        "name": "Hingoli",
        "constituencies": [
          { "name": "Basmath" },
          { "name": "Kalamnuri" },
          { "name": "Hingoli" }
        ]
      },
      {
        "name": "Parbhani",
        "constituencies": [
          { "name": "Jintur" },
          { "name": "Parbhani" },
          { "name": "Gangakhed" },
          { "name": "Pathri" }
        ]
      },
      {
        "name": "Jalna",
        "constituencies": [
          { "name": "Partur" },
          { "name": "Ghansawangi" },
          { "name": "Jalna" },
          { "name": "Badnapur (SC)" },
          { "name": "Bhokardan" }
        ]
      },
      {
        "name": "Chhatrapati Sambhaji Nagar",
        "constituencies": [
          { "name": "Sillod" },
          { "name": "Kannad" },
          { "name": "Phulambri" },
          { "name": "Aurangabad Central" },
          { "name": "Aurangabad West (SC)" },
          { "name": "Aurangabad East" },
          { "name": "Paithan" },
          { "name": "Gangapur" },
          { "name": "Vaijapur" }
        ]
      },
      {
        "name": "Nashik",
        "constituencies": [
          { "name": "Nandgaon" },
          { "name": "Malegaon Central" },
          { "name": "Malegaon Outer" },
          { "name": "Baglan (ST)" },
          { "name": "Kalwan (ST)" },
          { "name": "Chandwad" },
          { "name": "Yevla" },
          { "name": "Sinnar" },
          { "name": "Niphad" },
          { "name": "Dindori (ST)" },
          { "name": "Nashik East" },
          { "name": "Nashik Central" },
          { "name": "Nashik West" },
          { "name": "Deolali (SC)" },
          { "name": "Igatpuri (ST)" }
        ]
      },
      {
        "name": "Palghar",
        "constituencies": [
          { "name": "Dahanu (ST)" },
          { "name": "Vikramgad (ST)" },
          { "name": "Palghar (ST)" },
          { "name": "Boisar (ST)" },
          { "name": "Nalasopara" },
          { "name": "Vasai" }
        ]
      },
      {
        "name": "Thane",
        "constituencies": [
          { "name": "Bhiwandi Rural (ST)" },
          { "name": "Shahapur (ST)" },
          { "name": "Bhiwandi West" },
          { "name": "Bhiwandi East" },
          { "name": "Kalyan West" },
          { "name": "Murbad" },
          { "name": "Ambernath (SC)" },
          { "name": "Ulhasnagar" },
          { "name": "Kalyan East" },
          { "name": "Dombivli" },
          { "name": "Kalyan Rural" },
          { "name": "Mira Bhayandar" },
          { "name": "Ovala-Majiwada" },
          { "name": "Kopri-Pachpakhadi" },
          { "name": "Thane" },
          { "name": "Mumbra-Kalwa" },
          { "name": "Airoli" },
          { "name": "Belapur" }
        ]
      },
      {
        "name": "Mumbai Suburban",
        "constituencies": [
          { "name": "Borivali" },
          { "name": "Dahisar" },
          { "name": "Magathane" },
          { "name": "Mulund" },
          { "name": "Vikhroli" },
          { "name": "Bhandup West" },
          { "name": "Jogeshwari East" },
          { "name": "Dindoshi" },
          { "name": "Kandivali East" },
          { "name": "Charkop" },
          { "name": "Malad West" },
          { "name": "Goregaon" },
          { "name": "Versova" },
          { "name": "Andheri West" },
          { "name": "Andheri East" },
          { "name": "Vile Parle" },
          { "name": "Chandivali" },
          { "name": "Ghatkopar West" },
          { "name": "Ghatkopar East" },
          { "name": "Mankhurd Shivaji Nagar" },
          { "name": "Anushakti Nagar" },
          { "name": "Chembur" },
          { "name": "Kurla(SC)" },
          { "name": "Kalina" },
          { "name": "Vandre East" },
          { "name": "Vandre West" }
        ]
      },
      {
        "name": "Mumbai City",
        "constituencies": [
          { "name": "Dharavi (SC)" },
          { "name": "Sion Koliwada" },
          { "name": "Wadala" },
          { "name": "Mahim" },
          { "name": "Worli" },
          { "name": "Shivadi" },
          { "name": "Byculla" },
          { "name": "Malabar Hill" },
          { "name": "Mumbadevi" },
          { "name": "Colaba" }
        ]
      },
      {
        "name": "Raigad",
        "constituencies": [
          { "name": "Panvel" },
          { "name": "Karjat" },
          { "name": "Uran" },
          { "name": "Pen" },
          { "name": "Alibag" },
          { "name": "Shrivardhan" },
          { "name": "Mahad" }
        ]
      },
      {
        "name": "Pune",
        "constituencies": [
          { "name": "Junnar" },
          { "name": "Ambegaon" },
          { "name": "Khed Alandi" },
          { "name": "Shirur" },
          { "name": "Daund" },
          { "name": "Indapur" },
          { "name": "Baramati" },
          { "name": "Purandar" },
          { "name": "Bhor" },
          { "name": "Maval" },
          { "name": "Chinchwad" },
          { "name": "Pimpri (SC)" },
          { "name": "Bhosari" },
          { "name": "Vadgaon Sheri" },
          { "name": "Shivajinagar" },
          { "name": "Kothrud" },
          { "name": "Khadakwasala" },
          { "name": "Parvati" },
          { "name": "Hadapsar" },
          { "name": "Pune Cantonment" },
          { "name": "Kasba Peth" }
        ]
      },
      {
        "name": "Ahmednagar",
        "constituencies": [
          { "name": "Akole (ST)" },
          { "name": "Sangamner" },
          { "name": "Shirdi" },
          { "name": "Kopargaon" },
          { "name": "Shrirampur (SC)" },
          { "name": "Nevasa" },
          { "name": "Shevgaon" },
          { "name": "Rahuri" },
          { "name": "Parner" },
          { "name": "Ahmednagar City" },
          { "name": "Shrigonda" },
          { "name": "Karjat Jamkhed" }
        ]
      },
      {
        "name": "Beed",
        "constituencies": [
          { "name": "Georai (SC)" },
          { "name": "Majalgaon" },
          { "name": "Beed" },
          { "name": "Ashti" },
          { "name": "Kaij (SC)" },
          { "name": "Parli" }
        ]
      },
      {
        "name": "Latur",
        "constituencies": [
          { "name": "Latur Rural" },
          { "name": "Latur City" },
          { "name": "Ahmadpur" },
          { "name": "Udgir (SC)" },
          { "name": "Nilanga" },
          { "name": "Ausa" }
        ]
      },
      {
        "name": "Dharashiv",
        "constituencies": [
          { "name": "Umarga (SC)" },
          { "name": "Tuljapur" },
          { "name": "Dharashiv" },
          { "name": "Paranda" }
        ]
      },
      {
        "name": "Solapur",
        "constituencies": [
          { "name": "Karmala" },
          { "name": "Madha" },
          { "name": "Barshi" },
          { "name": "Mohol (SC)" },
          { "name": "Solapur City North" },
          { "name": "Solapur City Central" },
          { "name": "Akkalkot" },
          { "name": "Solapur South" },
          { "name": "Pandharpur" },
          { "name": "Sangola" },
          { "name": "Malshiras (SC)" }
        ]
      },
      {
        "name": "Satara",
        "constituencies": [
          { "name": "Phaltan (SC)" },
          { "name": "Wai" },
          { "name": "Koregaon" },
          { "name": "Man" },
          { "name": "Karad North" },
          { "name": "Karad South" },
          { "name": "Patan" },
          { "name": "Satara" }
        ]
      },
      {
        "name": "Ratnagiri",
        "constituencies": [
          { "name": "Dapoli" },
          { "name": "Guhagar" },
          { "name": "Chiplun" },
          { "name": "Ratnagiri" },
          { "name": "Rajapur" }
        ]
      },
      {
        "name": "Sindhudurg",
        "constituencies": [
          { "name": "Kankavli" },
          { "name": "Kudal" },
          { "name": "Sawantwadi" }
        ]
      },
      {
        "name": "Kolhapur",
        "constituencies": [
          { "name": "Chandgad" },
          { "name": "Radhanagari" },
          { "name": "Kagal" },
          { "name": "Kolhapur South" },
          { "name": "Karvir" },
          { "name": "Kolhapur North" },
          { "name": "Shahuwadi" },
          { "name": "Hatkanangle (SC)" },
          { "name": "Ichalkaranji" },
          { "name": "Shirol" }
        ]
      },
      {
        "name": "Sangli",
        "constituencies": [
          { "name": "Miraj (SC)" },
          { "name": "Sangli" },
          { "name": "Islampur" },
          { "name": "Shirala" },
          { "name": "Palus-Kadegaon" },
          { "name": "Khanapur" },
          { "name": "Tasgaon-Kavathe Mahankal" },
          { "name": "Jat" }
        ]
      }
    ]
  },
  {
    "name": "Manipur",
    "districts": [
      {
        "name": "Imphal East",
        "constituencies": [
          { "name": "Khundrakpam" },
          { "name": "Heingang" },
          { "name": "Khurai" },
          { "name": "Kshetrigao" },
          { "name": "Thongju" },
          { "name": "Keirao" },
          { "name": "Andro" },
          { "name": "Lamlai" },
          { "name": "Yaiskul" },
          { "name": "Wangkhei" },
          { "name": "Jiribam" }
        ]
      },
      {
        "name": "Imphal West",
        "constituencies": [
          { "name": "Thangmeiband" },
          { "name": "Uripok" },
          { "name": "Sagolband" },
          { "name": "Keishamthong" },
          { "name": "Singjamei" },
          { "name": "Sekmai (SC)" },
          { "name": "Lamsang" },
          { "name": "Konthoujam" },
          { "name": "Patsoi" },
          { "name": "Langthabal" },
          { "name": "Naoriya Pakhanglakpa" },
          { "name": "Wangoi" },
          { "name": "Mayang Imphal" }
        ]
      },
      {
        "name": "Bishnupur",
        "constituencies": [
          { "name": "Nambol" },
          { "name": "Oinam" },
          { "name": "Bishnupur" },
          { "name": "Moirang" },
          { "name": "Thanga" },
          { "name": "Kumbi" }
        ]
      },
      {
        "name": "Thoubal",
        "constituencies": [
          { "name": "Lilong" },
          { "name": "Thoubal" },
          { "name": "Wangkhem" },
          { "name": "Heirok" },
          { "name": "Wangjing Tentha" },
          { "name": "Khangabok" },
          { "name": "Wabgai" },
          { "name": "Kakching" },
          { "name": "Hiyanglam" },
          { "name": "Sugnu" }
        ]
      },
      {
        "name": "Chandel",
        "constituencies": [
          { "name": "Chandel (ST)" },
          { "name": "Tengnoupal (ST)" }
        ]
      },
      {
        "name": "Ukhrul",
        "constituencies": [
          { "name": "Phungyar (ST)" },
          { "name": "Ukhrul (ST)" },
          { "name": "Chingai (ST)" }
        ]
      },
      {
        "name": "Senapati",
        "constituencies": [
          { "name": "Saikul (ST)" },
          { "name": "Karong (ST)" },
          { "name": "Mao (ST)" },
          { "name": "Tadubi (ST)" },
          { "name": "Kangpokpi" },
          { "name": "Saitu (ST)" }
        ]
      },
      {
        "name": "Tamenglong",
        "constituencies": [
          { "name": "Tamei (ST)" },
          { "name": "Tamenglong (ST)" },
          { "name": "Nungba (ST)" }
        ]
      },
      {
        "name": "Churachandpur",
        "constituencies": [
          { "name": "Tipaimukh (ST)" },
          { "name": "Thanlon (ST)" },
          { "name": "Henglep (ST)" },
          { "name": "Churachandpur (ST)" },
          { "name": "Saikot (ST)" },
          { "name": "Singhat (ST)" }
        ]
      }
    ]
  },
  {
    "name": "Meghalaya",
    "districts": [
      {
        "name": "West Jaintia Hills",
        "constituencies": [
          { "name": "Nartiang (ST)" },
          { "name": "Jowai (ST)" },
          { "name": "Raliang (ST)" },
          { "name": "Mowkaiaw (ST)" },
          { "name": "Amlarem (ST)" }
        ]
      },
      {
        "name": "East Jaintia Hills",
        "constituencies": [
          { "name": "Sutnga Saipung (ST)" },
          { "name": "Khliehriat (ST)" }
        ]
      },
      {
        "name": "Ri Bhoi",
        "constituencies": [
          { "name": "Mawhati (ST)" },
          { "name": "Nongpoh (ST)" },
          { "name": "Jirang (ST)" },
          { "name": "Umsning (ST)" },
          { "name": "Umroi (ST)" }
        ]
      },
      {
        "name": "East Khasi Hills",
        "constituencies": [
          { "name": "Mawrengkneng (ST)" },
          { "name": "Pynthorumkhrah" },
          { "name": "Mawlai (ST)" },
          { "name": "East Shillong (ST)" },
          { "name": "North Shillong (ST)" },
          { "name": "West Shillong" },
          { "name": "South Shillong" },
          { "name": "Mylliem (ST)" },
          { "name": "Nongthymmai (ST)" },
          { "name": "Nongkrem (ST)" },
          { "name": "Sohiong (ST)" },
          { "name": "Mawphlang (ST)" },
          { "name": "Mawsynram (ST)" },
          { "name": "Shella (ST)" },
          { "name": "Pynursla (ST)" },
          { "name": "Sohra (ST)" },
          { "name": "Mawkynrew (ST)" }
        ]
      },
      {
        "name": "Eastern West Khasi Hills",
        "constituencies": [
          { "name": "Mairang (ST)" },
          { "name": "Mawthadraishan (ST)" }
        ]
      },
      {
        "name": "West Khasi Hills",
        "constituencies": [
          { "name": "Nongstoin (ST)" },
          { "name": "Rambrai-Jyrngam (ST)" },
          { "name": "Mawshynrut (ST)" }
        ]
      },
      {
        "name": "South West Khasi Hills",
        "constituencies": [
          { "name": "Ranikor (ST)" },
          { "name": "Mawkyrwat (ST)" }
        ]
      },
      {
        "name": "North Garo Hills",
        "constituencies": [
          { "name": "Kharkutta (ST)" },
          { "name": "Mendipathar (ST)" },
          { "name": "Resubelpara (ST)" },
          { "name": "Bajengdoba (ST)" }
        ]
      },
      {
        "name": "East Garo Hills",
        "constituencies": [
          { "name": "Songsak (ST)" },
          { "name": "Rongjeng (ST)" },
          { "name": "Williamnagar (ST)" }
        ]
      },
      {
        "name": "West Garo Hills",
        "constituencies": [
          { "name": "Raksamgre (ST)" },
          { "name": "Tikrikilla (ST)" },
          { "name": "Phulbari" },
          { "name": "Rajabala" },
          { "name": "Selsella (ST)" },
          { "name": "Dadenggre (ST)" },
          { "name": "North Tura (ST)" },
          { "name": "South Tura (ST)" },
          { "name": "Rangsakona (ST)" },
          { "name": "Gambegre (ST)" },
          { "name": "Dalu (ST)" }
        ]
      },
      {
        "name": "South West Garo Hills",
        "constituencies": [
          { "name": "Ampati (ST)" },
          { "name": "Mahendraganj (ST)" },
          { "name": "Salmanpara (ST)" }
        ]
      },
      {
        "name": "South Garo Hills",
        "constituencies": [
          { "name": "Rongara Siju (ST)" },
          { "name": "Chokpot (ST)" },
          { "name": "Baghmara (ST)" }
        ]
      }
    ]
  },
  {
    "name": "Mizoram",
    "districts": [
      {
        "name": "Mamit",
        "constituencies": [
          { "name": "Hachhek" },
          { "name": "Dampa" },
          { "name": "Mamit" }
        ]
      },
      {
        "name": "Kolasib",
        "constituencies": [
          { "name": "Tuirial" },
          { "name": "Kolasib" },
          { "name": "Serlui" }
        ]
      },
      {
        "name": "Aizawl",
        "constituencies": [
          { "name": "Tuivawl" },
          { "name": "Chalfilh" },
          { "name": "Tawi" },
          { "name": "Aizawl North 1" },
          { "name": "Aizawl North 2" },
          { "name": "Aizawl North 3" },
          { "name": "Aizawl East 1" },
          { "name": "Aizawl East 2" },
          { "name": "Aizawl West 1" },
          { "name": "Aizawl West 2" },
          { "name": "Aizawl West 3" },
          { "name": "Aizawl South 1" },
          { "name": "Aizawl South 2" },
          { "name": "Aizawl South 3" }
        ]
      },
      {
        "name": "Champhai",
        "constituencies": [
          { "name": "Lengteng" },
          { "name": "Tuichang" },
          { "name": "Champhai North" },
          { "name": "Champhai South" },
          { "name": "East Tuipui" }
        ]
      },
      {
        "name": "Serchhip",
        "constituencies": [
          { "name": "Serchhip" },
          { "name": "Tuikum" },
          { "name": "Hrangturzo" }
        ]
      },
      {
        "name": "Lunglei",
        "constituencies": [
          { "name": "South Tuipui" },
          { "name": "Lunglei North" },
          { "name": "Lunglei East" },
          { "name": "Lunglei West" },
          { "name": "Lunglei South" },
          { "name": "Thorang" },
          { "name": "West Tuipui" }
        ]
      },
      {
        "name": "Lawngtlai",
        "constituencies": [
          { "name": "Tuichawng" },
          { "name": "Lawngtlai West" },
          { "name": "Lawngtlai East" }
        ]
      },
      {
        "name": "Saiha",
        "constituencies": [{ "name": "Saiha" }, { "name": "Palak" }]
      }
    ]
  },
  {
    "name": "Nagaland",
    "districts": [
      {
        "name": "Dimapur",
        "constituencies": [
          { "name": "Dimapur I" },
          { "name": "Dimapur II (ST)" }
        ]
      },
      {
        "name": "Chümoukedima",
        "constituencies": [
          { "name": "Dimapur III (ST)" },
          { "name": "Ghaspani II (ST)" }
        ]
      },
      {
        "name": "Chümoukedima and Niuland",
        "constituencies": [{ "name": "Ghaspani I (ST)" }]
      },
      {
        "name": "Peren",
        "constituencies": [{ "name": "Tening (ST)" }, { "name": "Peren (ST)" }]
      },
      {
        "name": "Kohima",
        "constituencies": [
          { "name": "Western Angami (ST)" },
          { "name": "Kohima Town (ST)" },
          { "name": "Northern Angami I (ST)" },
          { "name": "Northern Angami II (ST)" },
          { "name": "Southern Angami I (ST)" },
          { "name": "Southern Angami II (ST)" }
        ]
      },
      { "name": "Tseminyü", "constituencies": [{ "name": "Tseminyü (ST)" }] },
      {
        "name": "Zünheboto",
        "constituencies": [
          { "name": "Pughoboto (ST)" },
          { "name": "Akuluto (ST)" },
          { "name": "Atoizü (ST)" },
          { "name": "Suruhoto (ST)" },
          { "name": "Aghunato (ST)" },
          { "name": "Zünheboto (ST)" },
          { "name": "Satakha (ST)" }
        ]
      },
      {
        "name": "Phek",
        "constituencies": [
          { "name": "Pfütsero (ST)" },
          { "name": "Chizami (ST)" },
          { "name": "Chozuba (ST)" },
          { "name": "Phek (ST)" },
          { "name": "Meluri (ST)" }
        ]
      },
      {
        "name": "Mokokchung",
        "constituencies": [
          { "name": "Tuli (ST)" },
          { "name": "Arkakong (ST)" },
          { "name": "Impur (ST)" },
          { "name": "Angetyongpang (ST)" },
          { "name": "Mongoya (ST)" },
          { "name": "Aonglenden (ST)" },
          { "name": "Mokokchung Town (ST)" },
          { "name": "Koridang (ST)" },
          { "name": "Jangpetkong (ST)" },
          { "name": "Alongtaki (ST)" }
        ]
      },
      {
        "name": "Wokha",
        "constituencies": [
          { "name": "Tyüi (ST)" },
          { "name": "Wokha (ST)" },
          { "name": "Sanis (ST)" },
          { "name": "Bhandari (ST)" }
        ]
      },
      {
        "name": "Mon",
        "constituencies": [
          { "name": "Tizit (ST)" },
          { "name": "Wakching (ST)" },
          { "name": "Tapi (ST)" },
          { "name": "Phomching (ST)" },
          { "name": "Tehok (ST)" },
          { "name": "Mon Town (ST)" },
          { "name": "Aboi (ST)" },
          { "name": "Moka (ST)" },
          { "name": "Tobu (ST)" }
        ]
      },
      {
        "name": "Longleng",
        "constituencies": [{ "name": "Tamlu (ST)" }, { "name": "Longleng (ST)" }]
      },
      {
        "name": "Tuensang",
        "constituencies": [
          { "name": "Noksen (ST)" },
          { "name": "Longkhim–Chare (ST)" },
          { "name": "Tuensang Sadar I (ST)" },
          { "name": "Tuensang Sadar II (ST)" }
        ]
      },
      {
        "name": "Noklak",
        "constituencies": [
          { "name": "Noklak (ST)" },
          { "name": "Thonoknyu (ST)" }
        ]
      },
      {
        "name": "Shamator",
        "constituencies": [{ "name": "Shamator–Chessore (ST)" }]
      },
      {
        "name": "Kiphire",
        "constituencies": [
          { "name": "Seyochung–Sitimi (ST)" },
          { "name": "Pungro–Kiphire (ST)" }
        ]
      }
    ]
  },
  {
    "name": "Odisha",
    "districts": [
      {
        "name": "Bargarh",
        "constituencies": [
          { "name": "Padampur" },
          { "name": "Bijepur" },
          { "name": "Bargarh" },
          { "name": "Attabira (SC)" },
          { "name": "Bhatli" }
        ]
      },
      {
        "name": "Jharsuguda",
        "constituencies": [{ "name": "Brajarajnagar" }, { "name": "Jharsuguda" }]
      },
      {
        "name": "Sundargarh",
        "constituencies": [
          { "name": "Talsara (ST)" },
          { "name": "Sundargarh (ST)" },
          { "name": "Biramitrapur (ST)" },
          { "name": "Raghunathpali (SC)" },
          { "name": "Rourkela" },
          { "name": "Rajgangpur (ST)" },
          { "name": "Bonai (ST)" }
        ]
      },
      {
        "name": "Sambalpur",
        "constituencies": [
          { "name": "Kuchinda (ST)" },
          { "name": "Rengali (SC)" },
          { "name": "Sambalpur" },
          { "name": "Rairakhol" }
        ]
      },
      { "name": "Deogarh", "constituencies": [{ "name": "Deogarh" }] },
      {
        "name": "Keonjhar",
        "constituencies": [
          { "name": "Telkoi (ST)" },
          { "name": "Ghasipura" },
          { "name": "Anandpur (SC)" },
          { "name": "Patna (ST)" },
          { "name": "Keonjhar (ST)" },
          { "name": "Champua" }
        ]
      },
      {
        "name": "Mayurbhanj",
        "constituencies": [
          { "name": "Jashipur (ST)" },
          { "name": "Saraskana (ST)" },
          { "name": "Rairangpur (ST)" },
          { "name": "Bangriposi (ST)" },
          { "name": "Karanjia (ST)" },
          { "name": "Udala (ST)" },
          { "name": "Badasahi (SC)" },
          { "name": "Baripada (ST)" },
          { "name": "Morada" }
        ]
      },
      {
        "name": "Balasore",
        "constituencies": [
          { "name": "Jaleswar" },
          { "name": "Bhograi" },
          { "name": "Basta" },
          { "name": "Balasore" },
          { "name": "Remuna (SC)" },
          { "name": "Nilagiri" },
          { "name": "Soro (SC)" },
          { "name": "Simulia" }
        ]
      },
      {
        "name": "Bhadrak",
        "constituencies": [
          { "name": "Bhandaripokhari" },
          { "name": "Bhadrak" },
          { "name": "Basudevpur" },
          { "name": "Dhamnagar (SC)" },
          { "name": "Chandabali" }
        ]
      },
      {
        "name": "Jajpur",
        "constituencies": [
          { "name": "Binjharpur (SC)" },
          { "name": "Bari" },
          { "name": "Barchana" },
          { "name": "Dharmasala" },
          { "name": "Jajpur" },
          { "name": "Korei" },
          { "name": "Sukinda" }
        ]
      },
      {
        "name": "Dhenkanal",
        "constituencies": [
          { "name": "Dhenkanal" },
          { "name": "Hindol (SC)" },
          { "name": "Kamakhyanagar" },
          { "name": "Parjanga" }
        ]
      },
      {
        "name": "Angul",
        "constituencies": [
          { "name": "Pallahara" },
          { "name": "Talcher" },
          { "name": "Angul" },
          { "name": "Chhendipada (SC)" },
          { "name": "Athmallik" }
        ]
      },
      {
        "name": "Subarnapur",
        "constituencies": [
          { "name": "Birmaharajpur (SC)" },
          { "name": "Sonepur" }
        ]
      },
      {
        "name": "Bolangir",
        "constituencies": [
          { "name": "Loisingha (SC)" },
          { "name": "Patnagarh" },
          { "name": "Bolangir" },
          { "name": "Titlagarh" },
          { "name": "Kantabanji" }
        ]
      },
      {
        "name": "Nuapada",
        "constituencies": [{ "name": "Nuapada" }, { "name": "Khariar" }]
      },
      {
        "name": "Nabarangpur",
        "constituencies": [
          { "name": "Umarkote (ST)" },
          { "name": "Jharigam (ST)" },
          { "name": "Nabarangpur (ST)" },
          { "name": "Dabugam (ST)" }
        ]
      },
      {
        "name": "Kalahandi",
        "constituencies": [
          { "name": "Lanjigarh (ST)" },
          { "name": "Junagarh" },
          { "name": "Dharmagarh" },
          { "name": "Bhawanipatna (SC)" },
          { "name": "Narla" }
        ]
      },
      {
        "name": "Kandhamal",
        "constituencies": [
          { "name": "Baliguda (ST)" },
          { "name": "G. Udayagiri (ST)" },
          { "name": "Phulbani (ST)" }
        ]
      },
      {
        "name": "Boudh",
        "constituencies": [{ "name": "Kantamal" }, { "name": "Boudh" }]
      },
      {
        "name": "Cuttack",
        "constituencies": [
          { "name": "Baramba" },
          { "name": "Banki" },
          { "name": "Athgarh" },
          { "name": "Barabati-Cuttack" },
          { "name": "Choudwar-Cuttack" },
          { "name": "Niali (SC)" },
          { "name": "Cuttack Sadar (SC)" },
          { "name": "Salipur" },
          { "name": "Mahanga" }
        ]
      },
      {
        "name": "Kendrapara",
        "constituencies": [
          { "name": "Patkura" },
          { "name": "Kendrapara (SC)" },
          { "name": "Aul" },
          { "name": "Rajanagar" },
          { "name": "Mahakalapada" }
        ]
      },
      {
        "name": "Jagatsinghpur",
        "constituencies": [
          { "name": "Paradeep" },
          { "name": "Tirtol (SC)" },
          { "name": "Balikuda-Erasama" },
          { "name": "Jagatsinghpur" }
        ]
      },
      {
        "name": "Puri",
        "constituencies": [
          { "name": "Kakatpur (SC)" },
          { "name": "Nimapara" },
          { "name": "Puri" },
          { "name": "Brahmagiri" },
          { "name": "Satyabadi" },
          { "name": "Pipili" }
        ]
      },
      {
        "name": "Khordha",
        "constituencies": [
          { "name": "Jayadev (SC)" },
          { "name": "Bhubaneswar Central" },
          { "name": "Bhubaneswar North" },
          { "name": "Ekamra Bhubaneswar" },
          { "name": "Jatani" },
          { "name": "Begunia" },
          { "name": "Khurda" },
          { "name": "Chilika" }
        ]
      },
      {
        "name": "Nayagarh",
        "constituencies": [
          { "name": "Ranpur" },
          { "name": "Khandapada" },
          { "name": "Daspalla (SC)" },
          { "name": "Nayagarh" }
        ]
      },
      {
        "name": "Ganjam",
        "constituencies": [
          { "name": "Bhanjanagar" },
          { "name": "Polasara" },
          { "name": "Kabisuryanagar" },
          { "name": "Khalikote (SC)" },
          { "name": "Chhatrapur (SC)" },
          { "name": "Aska" },
          { "name": "Surada" },
          { "name": "Sanakhemundi" },
          { "name": "Hinjili" },
          { "name": "Gopalpur" },
          { "name": "Berhampur" },
          { "name": "Digapahandi" },
          { "name": "Chikiti" }
        ]
      },
      {
        "name": "Gajapati",
        "constituencies": [
          { "name": "Mohana (ST)" },
          { "name": "Paralakhemundi" }
        ]
      },
      {
        "name": "Rayagada",
        "constituencies": [
          { "name": "Gunupur (ST)" },
          { "name": "Bissam Cuttack (ST)" },
          { "name": "Rayagada (ST)" }
        ]
      },
      {
        "name": "Koraput",
        "constituencies": [
          { "name": "Lakshmipur (ST)" },
          { "name": "Kotpad (ST)" },
          { "name": "Jeypore" },
          { "name": "Koraput (SC)" },
          { "name": "Pottangi (ST)" }
        ]
      },
      {
        "name": "Malkangiri",
        "constituencies": [
          { "name": "Malkangiri (ST)" },
          { "name": "Chitrakonda (ST)" }
        ]
      }
    ]
  },
  {
    "name": "Puducherry",
    "districts": [
      {
        "name": "Pudhucherry",
        "constituencies": [
          { "name": "Mannadipet" },
          { "name": "Thirubhuvanai" },
          { "name": "Oussudu" },
          { "name": "Mangalam" },
          { "name": "Villianur" },
          { "name": "Ozhukarai" },
          { "name": "Kadirgamam" },
          { "name": "Indira Nagar" },
          { "name": "Thattanchavady" },
          { "name": "Kamaraj Nagar" },
          { "name": "Lawspet" },
          { "name": "Kalapet" },
          { "name": "Muthialpet" },
          { "name": "Raj Bhavan" },
          { "name": "Oupalam" },
          { "name": "Orleampeth" },
          { "name": "Nellithope" },
          { "name": "Mudaliarpet" },
          { "name": "Ariankuppam" },
          { "name": "Manavely" },
          { "name": "Embalam" },
          { "name": "Nettapakkam" },
          { "name": "Bahour" }
        ]
      },
      {
        "name": "Karaikal",
        "constituencies": [
          { "name": "Nedungadu" },
          { "name": "Thirunallar" },
          { "name": "Karaikal North" },
          { "name": "Karaikal South" },
          { "name": "Neravy – T. R. Pattinam" }
        ]
      },
      { "name": "Mahe", "constituencies": [{ "name": "Mahe" }] },
      { "name": "Yanam", "constituencies": [{ "name": "Yanam" }] }
    ]
  },
  {
    "name": "Punjab",
    "districts": [
      {
        "name": "Pathankot",
        "constituencies": [
          { "name": "Sujanpur" },
          { "name": "Bhoa (SC)" },
          { "name": "Pathankot" }
        ]
      },
      {
        "name": "Gurdaspur",
        "constituencies": [
          { "name": "Gurdaspur" },
          { "name": "Dina Nagar (SC)" },
          { "name": "Qadian" },
          { "name": "Batala" },
          { "name": "Sri Hargobindpur (SC)" },
          { "name": "Fatehgarh Churian" },
          { "name": "Dera Baba Nanak" }
        ]
      },
      {
        "name": "Amritsar",
        "constituencies": [
          { "name": "Ajnala" },
          { "name": "Rajasansi" },
          { "name": "Majitha" },
          { "name": "Jandiala (SC)" },
          { "name": "Amritsar North" },
          { "name": "Amritsar West (SC)" },
          { "name": "Amritsar Central" },
          { "name": "Amritsar East" },
          { "name": "Amritsar South" },
          { "name": "Attari (SC)" },
          { "name": "Baba Bakala (SC)" }
        ]
      },
      {
        "name": "Tarn Taran",
        "constituencies": [
          { "name": "Tarn Taran" },
          { "name": "Khemkaran" },
          { "name": "Patti" },
          { "name": "Khadoor Sahib" }
        ]
      },
      {
        "name": "Kapurthala",
        "constituencies": [
          { "name": "Bholath" },
          { "name": "Kapurthala" },
          { "name": "Sultanpur Lodhi" },
          { "name": "Phagwara (SC)" }
        ]
      },
      {
        "name": "Jalandhar",
        "constituencies": [
          { "name": "Phillaur (SC)" },
          { "name": "Nakodar" },
          { "name": "Shahkot" },
          { "name": "Kartarpur (SC)" },
          { "name": "Jalandhar West (SC)" },
          { "name": "Jalandhar Central" },
          { "name": "Jalandhar North" },
          { "name": "Jalandhar Cantonment" },
          { "name": "Adampur (SC)" }
        ]
      },
      {
        "name": "Hoshiarpur",
        "constituencies": [
          { "name": "Mukerian" },
          { "name": "Dasuya" },
          { "name": "Urmar" },
          { "name": "Sham Chaurasi (SC)" },
          { "name": "Hoshiarpur" },
          { "name": "Chabbewal (SC)" },
          { "name": "Garhshankar" }
        ]
      },
      {
        "name": "Shaheed Bhagat Singh Nagar",
        "constituencies": [
          { "name": "Banga (SC)" },
          { "name": "Nawan Shahr" },
          { "name": "Balachaur" }
        ]
      },
      {
        "name": "Rupnagar",
        "constituencies": [
          { "name": "Anandpur Sahib" },
          { "name": "Rupnagar" },
          { "name": "Chamkaur Sahib (SC)" }
        ]
      },
      {
        "name": "Sahibzada Ajit Singh Nagar",
        "constituencies": [
          { "name": "Kharar" },
          { "name": "S.A.S. Nagar" },
          { "name": "Dera Bassi" }
        ]
      },
      {
        "name": "Fatehgarh Sahib",
        "constituencies": [
          { "name": "Bassi Pathana (SC)" },
          { "name": "Fatehgarh Sahib" },
          { "name": "Amloh" }
        ]
      },
      {
        "name": "Ludhiana",
        "constituencies": [
          { "name": "Khanna" },
          { "name": "Samrala" },
          { "name": "Sahnewal" },
          { "name": "Ludhiana East" },
          { "name": "Ludhiana South" },
          { "name": "Atam Nagar" },
          { "name": "Ludhiana Central" },
          { "name": "Ludhiana West" },
          { "name": "Ludhiana North" },
          { "name": "Gill (SC)" },
          { "name": "Payal (SC)" },
          { "name": "Dakha" },
          { "name": "Raikot (SC)" },
          { "name": "Jagraon (SC)" }
        ]
      },
      {
        "name": "Moga",
        "constituencies": [
          { "name": "Nihal Singh Wala (SC)" },
          { "name": "Bhagha Purana" },
          { "name": "Moga" },
          { "name": "Dharamkot" }
        ]
      },
      {
        "name": "Ferozpur",
        "constituencies": [
          { "name": "Zira" },
          { "name": "Firozpur City" },
          { "name": "Firozpur Rural (SC)" },
          { "name": "Guru Har Sahai" }
        ]
      },
      {
        "name": "Fazilka",
        "constituencies": [
          { "name": "Jalalabad" },
          { "name": "Fazilka" },
          { "name": "Abohar" },
          { "name": "Balluana (SC)" }
        ]
      },
      {
        "name": "Sri Muktsar Sahib",
        "constituencies": [
          { "name": "Lambi" },
          { "name": "Gidderbaha" },
          { "name": "Malout (SC)" },
          { "name": "Muktsar" }
        ]
      },
      {
        "name": "Faridkot",
        "constituencies": [
          { "name": "Faridkot" },
          { "name": "Kotkapura" },
          { "name": "Jaitu (SC)" }
        ]
      },
      {
        "name": "Bathinda",
        "constituencies": [
          { "name": "Rampura Phul" },
          { "name": "Bhucho Mandi (SC)" },
          { "name": "Bathinda Urban" },
          { "name": "Bathinda Rural (SC)" },
          { "name": "Talwandi Sabo" },
          { "name": "Maur" }
        ]
      },
      {
        "name": "Mansa",
        "constituencies": [
          { "name": "Mansa" },
          { "name": "Sardulgarh" },
          { "name": "Budhlada (SC)" }
        ]
      },
      {
        "name": "Sangrur",
        "constituencies": [
          { "name": "Lehragaga" },
          { "name": "Dirba (SC)" },
          { "name": "Sunam" },
          { "name": "Malerkotla" },
          { "name": "Amargarh" },
          { "name": "Dhuri" },
          { "name": "Sangrur" }
        ]
      },
      {
        "name": "Barnala",
        "constituencies": [
          { "name": "Bhadaur (SC)" },
          { "name": "Barnala" },
          { "name": "Mehal Kalan (SC)" }
        ]
      },
      {
        "name": "Patiala",
        "constituencies": [
          { "name": "Nabha (SC)" },
          { "name": "Patiala Rural" },
          { "name": "Rajpura" },
          { "name": "Ghanaur" },
          { "name": "Sanour" },
          { "name": "Patiala" },
          { "name": "Samana" },
          { "name": "Shutrana (SC)" }
        ]
      }
    ]
  },
  {
    "name": "Rajasthan",
    "districts": [
      {
        "name": "Sri Ganganagar",
        "constituencies": [
          { "name": "Sadulshahar" },
          { "name": "Ganganagar" },
          { "name": "Karanpur" },
          { "name": "Suratgarh" },
          { "name": "Raisinghnagar (SC)" },
          { "name": "Anupgarh (SC)" }
        ]
      },
      {
        "name": "Hanumangarh",
        "constituencies": [
          { "name": "Sangaria" },
          { "name": "Hanumangarh" },
          { "name": "Pilibanga (SC)" },
          { "name": "Nohar" },
          { "name": "Bhadra" }
        ]
      },
      {
        "name": "Bikaner",
        "constituencies": [
          { "name": "Khajuwala (SC)" },
          { "name": "Bikaner West" },
          { "name": "Bikaner East" },
          { "name": "Kolayat" },
          { "name": "Lunkaransar" },
          { "name": "Dungargarh" },
          { "name": "Nokha" }
        ]
      },
      {
        "name": "Churu",
        "constituencies": [
          { "name": "Sadulpur" },
          { "name": "Taranagar" },
          { "name": "Sardarshahar" },
          { "name": "Churu" },
          { "name": "Ratangarh" },
          { "name": "Sujangarh (SC)" }
        ]
      },
      {
        "name": "Jhunjhunu",
        "constituencies": [
          { "name": "Pilani (SC)" },
          { "name": "Surajgarh" },
          { "name": "Jhunjhunu" },
          { "name": "Mandawa" },
          { "name": "Nawalgarh" },
          { "name": "Udaipurwati" },
          { "name": "Khetri" }
        ]
      },
      {
        "name": "Sikar",
        "constituencies": [
          { "name": "Fatehpur" },
          { "name": "Lachhmangarh" },
          { "name": "Dhod (SC)" },
          { "name": "Sikar" },
          { "name": "Dantaramgarh" },
          { "name": "Khandela" },
          { "name": "Neem Ka Thana" },
          { "name": "Srimadhopur" }
        ]
      },
      {
        "name": "Jaipur",
        "constituencies": [
          { "name": "Kotputli" },
          { "name": "Viratnagar" },
          { "name": "Shahpura" },
          { "name": "Chomu" },
          { "name": "Phulera" },
          { "name": "Dudu (SC)" },
          { "name": "Jhotwara" },
          { "name": "Amber" },
          { "name": "Jamwa Ramgarh (ST)" },
          { "name": "Hawa Mahal" },
          { "name": "Vidhyadhar Nagar" },
          { "name": "Civil Lines" },
          { "name": "Kishanpole" },
          { "name": "Adarsh Nagar" },
          { "name": "Malviya Nagar" },
          { "name": "Sanganer" },
          { "name": "Bagru (SC)" },
          { "name": "Bassi (ST)" },
          { "name": "Chaksu (SC)" }
        ]
      },
      {
        "name": "Alwar",
        "constituencies": [
          { "name": "Tijara" },
          { "name": "Kishangarh Bas" },
          { "name": "Mundawar" },
          { "name": "Behror" },
          { "name": "Bansur" },
          { "name": "Thanagazi" },
          { "name": "Alwar Rural (SC)" },
          { "name": "Alwar Urban" },
          { "name": "Ramgarh" },
          { "name": "Rajgarh-Laxmangarh (ST)" },
          { "name": "Kathumar (SC)" }
        ]
      },
      {
        "name": "Bharatpur",
        "constituencies": [
          { "name": "Kaman" },
          { "name": "Nagar" },
          { "name": "Deeg-Kumher" },
          { "name": "Bharatpur" },
          { "name": "Nadbai" },
          { "name": "Weir (SC)" },
          { "name": "Bayana (SC)" }
        ]
      },
      {
        "name": "Dholpur",
        "constituencies": [
          { "name": "Baseri (SC)" },
          { "name": "Bari" },
          { "name": "Dholpur" },
          { "name": "Rajakhera" }
        ]
      },
      {
        "name": "Karauli",
        "constituencies": [
          { "name": "Todabhim (ST)" },
          { "name": "Hindaun (SC)" },
          { "name": "Karauli" },
          { "name": "Sapotra (ST)" }
        ]
      },
      {
        "name": "Dausa",
        "constituencies": [
          { "name": "Bandikui" },
          { "name": "Mahuwa" },
          { "name": "Sikrai (SC)" },
          { "name": "Dausa" },
          { "name": "Lalsot (ST)" }
        ]
      },
      {
        "name": "Sawai Madhopur",
        "constituencies": [
          { "name": "Gangapur" },
          { "name": "Bamanwas (ST)" },
          { "name": "Sawai Madhopur" },
          { "name": "Khandar (SC)" }
        ]
      },
      {
        "name": "Tonk",
        "constituencies": [
          { "name": "Malpura" },
          { "name": "Niwai (SC)" },
          { "name": "Tonk" },
          { "name": "Deoli-Uniara" }
        ]
      },
      {
        "name": "Ajmer",
        "constituencies": [
          { "name": "Kishangarh" },
          { "name": "Pushkar" },
          { "name": "Ajmer North" },
          { "name": "Ajmer South (SC)" },
          { "name": "Nasirabad" },
          { "name": "Beawar" },
          { "name": "Masuda" },
          { "name": "Kekri" }
        ]
      },
      {
        "name": "Nagaur",
        "constituencies": [
          { "name": "Ladnun" },
          { "name": "Deedwana" },
          { "name": "Jayal (SC)" },
          { "name": "Nagaur" },
          { "name": "Khinwsar" },
          { "name": "Merta (SC)" },
          { "name": "Degana" },
          { "name": "Makrana" },
          { "name": "Parbatsar" },
          { "name": "Nawan" }
        ]
      },
      {
        "name": "Pali",
        "constituencies": [
          { "name": "Jaitaran" },
          { "name": "Sojat (SC)" },
          { "name": "Pali" },
          { "name": "Marwar Junction" },
          { "name": "Bali" },
          { "name": "Sumerpur" }
        ]
      },
      {
        "name": "Jodhpur",
        "constituencies": [
          { "name": "Phalodi" },
          { "name": "Lohawat" },
          { "name": "Shergarh" },
          { "name": "Osian" },
          { "name": "Bhopalgarh (SC)" },
          { "name": "Sardarpura" },
          { "name": "Jodhpur" },
          { "name": "Soorsagar" },
          { "name": "Luni" },
          { "name": "Bilara (SC)" }
        ]
      },
      {
        "name": "Jaisalmer",
        "constituencies": [{ "name": "Jaisalmer" }, { "name": "Pokaran" }]
      },
      {
        "name": "Barmer",
        "constituencies": [
          { "name": "Sheo" },
          { "name": "Barmer" },
          { "name": "Baytoo" },
          { "name": "Pachpadra" },
          { "name": "Siwana" },
          { "name": "Gudamalani" },
          { "name": "Chohtan (SC)" }
        ]
      },
      {
        "name": "Jalore",
        "constituencies": [
          { "name": "Ahore" },
          { "name": "Jalore (SC)" },
          { "name": "Bhinmal" },
          { "name": "Sanchore" },
          { "name": "Raniwara" }
        ]
      },
      {
        "name": "Sirohi",
        "constituencies": [
          { "name": "Sirohi" },
          { "name": "Pindwara-Abu (ST)" },
          { "name": "Reodar (SC)" }
        ]
      },
      {
        "name": "Udaipur",
        "constituencies": [
          { "name": "Gogunda (ST)" },
          { "name": "Jhadol (ST)" },
          { "name": "Kherwara (ST)" },
          { "name": "Udaipur Rural (ST)" },
          { "name": "Udaipur" },
          { "name": "Mavli" },
          { "name": "Vallabhnagar" },
          { "name": "Salumber (ST)" }
        ]
      },
      {
        "name": "Pratapgarh",
        "constituencies": [
          { "name": "Dhariawad (ST)" },
          { "name": "Pratapgarh (ST)" }
        ]
      },
      {
        "name": "Dungarpur",
        "constituencies": [
          { "name": "Dungarpur (ST)" },
          { "name": "Aspur (ST)" },
          { "name": "Sagwara (ST)" },
          { "name": "Chorasi (ST)" }
        ]
      },
      {
        "name": "Banswara",
        "constituencies": [
          { "name": "Ghatol (ST)" },
          { "name": "Garhi (ST)" },
          { "name": "Banswara (ST)" },
          { "name": "Bagidora (ST)" },
          { "name": "Kushalgarh (ST)" }
        ]
      },
      {
        "name": "Chittorgarh",
        "constituencies": [
          { "name": "Kapasan (SC)" },
          { "name": "Begun" },
          { "name": "Chittorgarh" },
          { "name": "Nimbahera" },
          { "name": "Bari Sadri" }
        ]
      },
      {
        "name": "Rajsamand",
        "constituencies": [
          { "name": "Bhim" },
          { "name": "Kumbhalgarh" },
          { "name": "Rajsamand" },
          { "name": "Nathdwara" }
        ]
      },
      {
        "name": "Bhilwara",
        "constituencies": [
          { "name": "Asind" },
          { "name": "Mandal" },
          { "name": "Sahara" },
          { "name": "Bhilwara" },
          { "name": "Shahpura" },
          { "name": "Jahazpur" },
          { "name": "Mandalgarh" }
        ]
      },
      {
        "name": "Bundi",
        "constituencies": [
          { "name": "Hindoli" },
          { "name": "Keshoraipatan (SC)" },
          { "name": "Bundi" }
        ]
      },
      {
        "name": "Kota",
        "constituencies": [
          { "name": "Pipalda" },
          { "name": "Sangod" },
          { "name": "Kota North" },
          { "name": "Kota South" },
          { "name": "Ladpura" },
          { "name": "Ramganj Mandi (SC)" }
        ]
      },
      {
        "name": "Baran",
        "constituencies": [
          { "name": "Anta" },
          { "name": "Kishanganj (ST)" },
          { "name": "Baran-Atru (SC)" },
          { "name": "Chhabra" }
        ]
      },
      {
        "name": "Jhalawar",
        "constituencies": [
          { "name": "Dag (SC)" },
          { "name": "Jhalrapatan" },
          { "name": "Khanpur" },
          { "name": "Manohar Thana" }
        ]
      }
    ]
  },
  {
    "name": "Sikkim",
    "districts": [
      {
        "name": "Gyalshing",
        "constituencies": [
          { "name": "Yoksam–Tashiding (BL)" },
          { "name": "Yangthang" },
          { "name": "Maneybong–Dentam" },
          { "name": "Gyalshing–Barnyak" }
        ]
      },
      {
        "name": "Soreng",
        "constituencies": [
          { "name": "Rinchenpong (BL)" },
          { "name": "Daramdin (BL)" },
          { "name": "Soreng–Chakung" },
          { "name": "Salghari–Zoom (SC)" }
        ]
      },
      {
        "name": "Namchi",
        "constituencies": [
          { "name": "Barfung (BL)" },
          { "name": "Poklok–Kamrang" },
          { "name": "Namchi–Singhithang" },
          { "name": "Melli" },
          { "name": "Namthang–Rateypani" },
          { "name": "Temi–Namphing" },
          { "name": "Rangang–Yangang" },
          { "name": "Tumin–Lingee (BL)" }
        ]
      },
      {
        "name": "Gangtok",
        "constituencies": [
          { "name": "Khamdong–Singtam" },
          { "name": "Shyari (BL)" },
          { "name": "Martam–Rumtek (BL)" },
          { "name": "Upper Tadong" },
          { "name": "Arithang" },
          { "name": "Gangtok (BL)" },
          { "name": "Upper Burtuk" }
        ]
      },
      {
        "name": "Pakyong",
        "constituencies": [
          { "name": "West Pendam (SC)" },
          { "name": "Rhenock" },
          { "name": "Chujachen" },
          { "name": "Gnathang–Machong (BL)" },
          { "name": "Namchaybong" }
        ]
      },
      {
        "name": "Mangan",
        "constituencies": [
          { "name": "Kabi–Lungchok (BL)" },
          { "name": "Djongu (BL)" },
          { "name": "Lachen–Mangan (BL)" }
        ]
      },
      {
        "name": "Buddhist Monasteries",
        "constituencies": [{ "name": "Sangha" }]
      }
    ]
  },
  {
    "name": "Tamil Nadu",
    "districts": [
      {
        "name": "Tiruvallur",
        "constituencies": [
          { "name": "Gummidipoondi" },
          { "name": "Ponneri (SC)" },
          { "name": "Tiruttani" },
          { "name": "Thiruvallur" },
          { "name": "Poonamallee (SC)" },
          { "name": "Avadi" }
        ]
      },
      {
        "name": "Chennai",
        "constituencies": [
          { "name": "Maduravoyal" },
          { "name": "Ambattur" },
          { "name": "Madavaram" },
          { "name": "Thiruvottiyur" },
          { "name": "Dr. Radhakrishnan Nagar" },
          { "name": "Perambur" },
          { "name": "Kolathur" },
          { "name": "Villivakkam" },
          { "name": "Thiru-Vi-Ka-Nagar (SC)" },
          { "name": "Egmore (SC)" },
          { "name": "Royapuram" },
          { "name": "Harbour" },
          { "name": "Chepauk-Thiruvallikeni" },
          { "name": "Thousand Lights" },
          { "name": "Anna Nagar" },
          { "name": "Virugampakkam" },
          { "name": "Saidapet" },
          { "name": "Thiyagaraya Nagar" },
          { "name": "Mylapore" },
          { "name": "Velachery" },
          { "name": "Shozhinganallur" },
          { "name": "Alandur" }
        ]
      },
      {
        "name": "Kanchipuram",
        "constituencies": [
          { "name": "Sriperumbudur (SC)" },
          { "name": "Uthiramerur" },
          { "name": "Kancheepuram" }
        ]
      },
      {
        "name": "Chengalpattu",
        "constituencies": [
          { "name": "Pallavaram" },
          { "name": "Tambaram" },
          { "name": "Chengalpattu" },
          { "name": "Thiruporur" },
          { "name": "Cheyyur (SC)" },
          { "name": "Maduranthakam (SC)" }
        ]
      },
      {
        "name": "Ranipet",
        "constituencies": [
          { "name": "Arakkonam (SC)" },
          { "name": "Sholingur" },
          { "name": "Ranipet" },
          { "name": "Arcot" }
        ]
      },
      {
        "name": "Vellore",
        "constituencies": [
          { "name": "Katpadi" },
          { "name": "Vellore" },
          { "name": "Anaikattu" },
          { "name": "Kilvaithinankuppam (SC)" },
          { "name": "Gudiyattam (SC)" }
        ]
      },
      {
        "name": "Tirupathur",
        "constituencies": [
          { "name": "Vaniyambadi" },
          { "name": "Ambur" },
          { "name": "Jolarpet" },
          { "name": "Tirupattur(Vellore)" }
        ]
      },
      {
        "name": "Krishnagiri",
        "constituencies": [
          { "name": "Uthangarai (SC)" },
          { "name": "Bargur" },
          { "name": "Krishnagiri" },
          { "name": "Veppanahalli" },
          { "name": "Hosur" },
          { "name": "Thalli" }
        ]
      },
      {
        "name": "Dharmapuri",
        "constituencies": [
          { "name": "Palacode" },
          { "name": "Pennagaram" },
          { "name": "Dharmapuri" },
          { "name": "Pappireddippatti" },
          { "name": "Harur (SC)" }
        ]
      },
      {
        "name": "Tiruvannamalai",
        "constituencies": [
          { "name": "Chengam (SC)" },
          { "name": "Tiruvannamalai" },
          { "name": "Kilpennathur" },
          { "name": "Kalasapakkam" },
          { "name": "Polur" },
          { "name": "Arani" },
          { "name": "Cheyyar" },
          { "name": "Vandavasi (SC)" }
        ]
      },
      {
        "name": "Viluppuram",
        "constituencies": [
          { "name": "Gingee" },
          { "name": "Mailam" },
          { "name": "Tindivanam" },
          { "name": "Vanur (SC)" },
          { "name": "Villupuram" },
          { "name": "Vikravandi" },
          { "name": "Tirukkoyilur" }
        ]
      },
      {
        "name": "Kallakurichi",
        "constituencies": [
          { "name": "Ulundurpettai" },
          { "name": "Rishivandiyam" },
          { "name": "Sankarapuram" },
          { "name": "Kallakurichi" }
        ]
      },
      {
        "name": "Salem",
        "constituencies": [
          { "name": "Gangavalli (SC)" },
          { "name": "Attur (SC)" },
          { "name": "Yercaud (ST)" },
          { "name": "Omalur" },
          { "name": "Mettur" },
          { "name": "Edappadi" },
          { "name": "Sankari" },
          { "name": "Salem (West)" },
          { "name": "Salem (North)" },
          { "name": "Salem (South)" },
          { "name": "Veerapandi" }
        ]
      },
      {
        "name": "Namakkal",
        "constituencies": [
          { "name": "Rasipuram (SC)" },
          { "name": "Senthamangalam (ST)" },
          { "name": "Namakkal" },
          { "name": "Paramathi-Velur" },
          { "name": "Tiruchengodu" },
          { "name": "Kumarapalayam" }
        ]
      },
      {
        "name": "Erode",
        "constituencies": [
          { "name": "Erode (East)" },
          { "name": "Erode (West)" },
          { "name": "Modakkurichi" },
          { "name": "Perundurai" },
          { "name": "Bhavani" },
          { "name": "Anthiyur" },
          { "name": "Gobichettipalayam" },
          { "name": "Bhavanisagar (SC)" }
        ]
      },
      {
        "name": "Tiruppur",
        "constituencies": [
          { "name": "Dharapuram" },
          { "name": "Kangayam" },
          { "name": "Avanashi (SC)" },
          { "name": "Tiruppur (North)" },
          { "name": "Tiruppur (South)" },
          { "name": "Palladam" },
          { "name": "Udumalaipettai" },
          { "name": "Madathukulam" }
        ]
      },
      {
        "name": "Nilgiris",
        "constituencies": [
          { "name": "Udhagamandalam" },
          { "name": "Gudalur (SC)" },
          { "name": "Coonoor" }
        ]
      },
      {
        "name": "Coimbatore",
        "constituencies": [
          { "name": "Mettupalayam" },
          { "name": "Sulur" },
          { "name": "Kavundampalayam" },
          { "name": "Coimbatore (North)" },
          { "name": "Thondamuthur" },
          { "name": "Coimbatore (South)" },
          { "name": "Singanallur" },
          { "name": "Kinathukadavu" },
          { "name": "Pollachi" },
          { "name": "Valparai (SC)" }
        ]
      },
      {
        "name": "Dindigul",
        "constituencies": [
          { "name": "Palani" },
          { "name": "Oddanchatram" },
          { "name": "Athoor" },
          { "name": "Nilakottai (SC)" },
          { "name": "Natham" },
          { "name": "Dindigul" },
          { "name": "Vedasandur" }
        ]
      },
      {
        "name": "Karur",
        "constituencies": [
          { "name": "Aravakurichi" },
          { "name": "Karur" },
          { "name": "Krishnarayapuram (SC)" },
          { "name": "Kulithalai" }
        ]
      },
      {
        "name": "Tiruchirappalli",
        "constituencies": [
          { "name": "Manapaarai" },
          { "name": "Srirangam" },
          { "name": "Tiruchirappalli (West)" },
          { "name": "Tiruchirappalli (East)" },
          { "name": "Thiruverumbur" },
          { "name": "Lalgudi" },
          { "name": "Manachanallur" },
          { "name": "Musiri" },
          { "name": "Thuraiyur (SC)" }
        ]
      },
      {
        "name": "Perambalur",
        "constituencies": [
          { "name": "Perambalur (SC)" },
          { "name": "Kunnam" }
        ]
      },
      {
        "name": "Ariyalur",
        "constituencies": [{ "name": "Ariyalur" }, { "name": "Jayankondam" }]
      },
      {
        "name": "Cuddalore",
        "constituencies": [
          { "name": "Tittakudi" },
          { "name": "Vriddhachalam" },
          { "name": "Neyveli" },
          { "name": "Panruti" },
          { "name": "Cuddalore" },
          { "name": "Kurinjipadi" },
          { "name": "Bhuvanagiri" },
          { "name": "Chidambaram" },
          { "name": "Kattumannarkoil (SC)" }
        ]
      },
      {
        "name": "Mayiladuthurai",
        "constituencies": [
          { "name": "Sirkazhi (SC)" },
          { "name": "Mayiladuthurai" },
          { "name": "Poompuhar" }
        ]
      },
      {
        "name": "Nagapattinam",
        "constituencies": [
          { "name": "Nagapattinam" },
          { "name": "Kilvelur (SC)" },
          { "name": "Vedaranyam" }
        ]
      },
      {
        "name": "Tiruvarur",
        "constituencies": [
          { "name": "Thiruthuraipoondi (SC)" },
          { "name": "Mannargudi" },
          { "name": "Thiruvarur" },
          { "name": "Nannilam" }
        ]
      },
      {
        "name": "Thanjavur",
        "constituencies": [
          { "name": "Thiruvidaimarudur (SC)" },
          { "name": "Kumbakonam" },
          { "name": "Papanasam" },
          { "name": "Thiruvaiyaru" },
          { "name": "Thanjavur" },
          { "name": "Orathanadu" },
          { "name": "Pattukkottai" },
          { "name": "Peravurani" }
        ]
      },
      {
        "name": "Pudukkottai",
        "constituencies": [
          { "name": "Gandharvakottai (SC)" },
          { "name": "Viralimalai" },
          { "name": "Pudukkottai" },
          { "name": "Thirumayam" },
          { "name": "Alangudi" },
          { "name": "Aranthangi" }
        ]
      },
      {
        "name": "Sivaganga",
        "constituencies": [
          { "name": "Karaikudi" },
          { "name": "Tiruppattur(Sivaganga)" },
          { "name": "Sivaganga" },
          { "name": "Manamadurai (SC)" }
        ]
      },
      {
        "name": "Madurai",
        "constituencies": [
          { "name": "Melur" },
          { "name": "Madurai East" },
          { "name": "Sholavandan (SC)" },
          { "name": "Madurai North" },
          { "name": "Madurai South" },
          { "name": "Madurai Central" },
          { "name": "Madurai West" },
          { "name": "Thiruparankundram" },
          { "name": "Tirumangalam" },
          { "name": "Usilampatti" }
        ]
      },
      {
        "name": "Theni",
        "constituencies": [
          { "name": "Andipatti" },
          { "name": "Periyakulam (SC)" },
          { "name": "Bodinayakanur" },
          { "name": "Cumbum" }
        ]
      },
      {
        "name": "Virudhunagar",
        "constituencies": [
          { "name": "Rajapalayam" },
          { "name": "Srivilliputhur (SC)" },
          { "name": "Sattur" },
          { "name": "Sivakasi" },
          { "name": "Virudhunagar" },
          { "name": "Aruppukkottai" },
          { "name": "Tiruchuli" }
        ]
      },
      {
        "name": "Ramanathapuram",
        "constituencies": [
          { "name": "Paramakudi (SC)" },
          { "name": "Tiruvadanai" },
          { "name": "Ramanathapuram" },
          { "name": "Mudhukulathur" }
        ]
      },
      {
        "name": "Thoothukudi",
        "constituencies": [
          { "name": "Vilathikulam" },
          { "name": "Thoothukkudi" },
          { "name": "Tiruchendur" },
          { "name": "Srivaikuntam" },
          { "name": "Ottapidaram (SC)" },
          { "name": "Kovilpatti" }
        ]
      },
      {
        "name": "Tenkasi",
        "constituencies": [
          { "name": "Sankarankovil (SC)" },
          { "name": "Vasudevanallur (SC)" },
          { "name": "Kadayanallur" },
          { "name": "Tenkasi" },
          { "name": "Alangulam" }
        ]
      },
      {
        "name": "Tirunelveli",
        "constituencies": [
          { "name": "Tirunelveli" },
          { "name": "Ambasamudram" },
          { "name": "Palayamkottai" },
          { "name": "Nanguneri" },
          { "name": "Radhapuram" }
        ]
      },
      {
        "name": "Kanyakumari",
        "constituencies": [
          { "name": "Kanniyakumari" },
          { "name": "Nagercoil" },
          { "name": "Colachel" },
          { "name": "Padmanabhapuram" },
          { "name": "Vilavancode" },
          { "name": "Killiyoor" }
        ]
      }
    ]
  },
  {
    "name": "Telangana",
    "districts": [
      {
        "name": "Kumuram Bheem Asifabad",
        "constituencies": [
          { "name": "Sirpur" },
          { "name": "Asifabad (ST)" }
        ]
      },
      {
        "name": "Mancherial",
        "constituencies": [
          { "name": "Chennur (SC)" },
          { "name": "Bellampalli (SC)" },
          { "name": "Mancherial" }
        ]
      },
      {
        "name": "Nirmal",
        "constituencies": [
          { "name": "Khanapur (ST)" },
          { "name": "Nirmal" },
          { "name": "Mudhole" }
        ]
      },
      {
        "name": "Adilabad",
        "constituencies": [{ "name": "Adilabad" }, { "name": "Boath (ST)" }]
      },
      {
        "name": "Nizambad",
        "constituencies": [
          { "name": "Armur" },
          { "name": "Bodhan" },
          { "name": "Banswada" },
          { "name": "Nizamabad Urban" },
          { "name": "Nizamabad Rural" },
          { "name": "Balkonda" }
        ]
      },
      {
        "name": "Kamareddy",
        "constituencies": [
          { "name": "Jukkal (SC)" },
          { "name": "Yellareddy" },
          { "name": "Kamareddy" }
        ]
      },
      {
        "name": "Jagital",
        "constituencies": [
          { "name": "Koratla" },
          { "name": "Jagtial" },
          { "name": "Dharmapuri" }
        ]
      },
      {
        "name": "Peddapalli",
        "constituencies": [
          { "name": "Ramagundam" },
          { "name": "Manthani" },
          { "name": "Peddapalle" }
        ]
      },
      {
        "name": "Karimnagar",
        "constituencies": [
          { "name": "Karimnagar" },
          { "name": "Choppadandi (SC)" },
          { "name": "Manakondur (SC)" },
          { "name": "Huzurabad" }
        ]
      },
      {
        "name": "Rajanna Sircilla",
        "constituencies": [{ "name": "Vemulawada" }, { "name": "Sircilla" }]
      },
      {
        "name": "Siddipet",
        "constituencies": [
          { "name": "Husnabad" },
          { "name": "Siddipet" },
          { "name": "Dubbak" },
          { "name": "Gajwel" }
        ]
      },
      {
        "name": "Medak",
        "constituencies": [{ "name": "Medak" }, { "name": "Narsapur" }]
      },
      {
        "name": "Sangareddy",
        "constituencies": [
          { "name": "Narayankhed" },
          { "name": "Andole (SC)" },
          { "name": "Zahirabad (SC)" },
          { "name": "Sangareddy" },
          { "name": "Patancheru" }
        ]
      },
      {
        "name": "Medchal Malkajgiri",
        "constituencies": [
          { "name": "Medchal" },
          { "name": "Malkajgiri" },
          { "name": "Quthbullapur" },
          { "name": "Kukatpally" },
          { "name": "Uppal" }
        ]
      },
      {
        "name": "Ranga Reddy",
        "constituencies": [
          { "name": "Ibrahimpatnam" },
          { "name": "L. B. Nagar" },
          { "name": "Maheshwaram" },
          { "name": "Rajendranagar" },
          { "name": "Serilingampally" },
          { "name": "Chevella (SC)" },
          { "name": "Kalwakurthy" },
          { "name": "Shadnagar" }
        ]
      },
      {
        "name": "Vikarabad",
        "constituencies": [
          { "name": "Pargi" },
          { "name": "Vikarabad (SC)" },
          { "name": "Tandur" },
          { "name": "Kodangal" }
        ]
      },
      {
        "name": "Hyderabad",
        "constituencies": [
          { "name": "Musheerabad" },
          { "name": "Malakpet" },
          { "name": "Amberpet" },
          { "name": "Khairatabad" },
          { "name": "Jubilee Hills" },
          { "name": "Sanathnagar" },
          { "name": "Nampally" },
          { "name": "Karwan" },
          { "name": "Goshamahal" },
          { "name": "Charminar" },
          { "name": "Chandrayangutta" },
          { "name": "Yakutpura" },
          { "name": "Bahadurpura" },
          { "name": "Secunderabad" },
          { "name": "Secunderabad Cantt. (SC)" }
        ]
      },
      {
        "name": "Narayanpet",
        "constituencies": [{ "name": "Narayanpet" }, { "name": "Makthal" }]
      },
      {
        "name": "Mahabubnagar",
        "constituencies": [
          { "name": "Mahbubnagar" },
          { "name": "Jadcherla" },
          { "name": "Devarkadra" }
        ]
      },
      { "name": "Wanaparty", "constituencies": [{ "name": "Wanaparthy" }] },
      {
        "name": "Jogulamba Gadwal",
        "constituencies": [{ "name": "Gadwal" }, { "name": "Alampur (SC)" }]
      },
      {
        "name": "Nagarkurnool",
        "constituencies": [
          { "name": "Nagarkurnool" },
          { "name": "Achampet (SC)" },
          { "name": "Kollapur" }
        ]
      },
      {
        "name": "Nalgonda",
        "constituencies": [
          { "name": "Devarakonda (ST)" },
          { "name": "Nagarjuna Sagar" },
          { "name": "Miryalaguda" },
          { "name": "Nalgonda" },
          { "name": "Munugode" },
          { "name": "Nakrekal (SC)" }
        ]
      },
      {
        "name": "Suryapet",
        "constituencies": [
          { "name": "Huzurnagar" },
          { "name": "Kodad" },
          { "name": "Suryapet" },
          { "name": "Thungathurthi (SC)" }
        ]
      },
      {
        "name": "Yadadri Bhuvanagari",
        "constituencies": [{ "name": "Bhongir" }, { "name": "Alair" }]
      },
      {
        "name": "Jangoan",
        "constituencies": [
          { "name": "Jangaon" },
          { "name": "Ghanpur (Station) (SC)" },
          { "name": "Palakurthi" }
        ]
      },
      {
        "name": "Mahabubabad",
        "constituencies": [
          { "name": "Dornakal (ST)" },
          { "name": "Mahabubabad (ST)" }
        ]
      },
      {
        "name": "Warangal Rural",
        "constituencies": [
          { "name": "Narsampet" },
          { "name": "Parkal" },
          { "name": "Warangal West" },
          { "name": "Warangal East" },
          { "name": "Waradhanapet (SC)" }
        ]
      },
      {
        "name": "Jayashankar Bhupalpalle",
        "constituencies": [{ "name": "Bhupalpalle" }]
      },
      { "name": "Mulug", "constituencies": [{ "name": "Mulug (ST)" }] },
      {
        "name": "Bhadradri Kothagudem",
        "constituencies": [
          { "name": "Pinapaka (ST)" },
          { "name": "Yellandu (ST)" },
          { "name": "Kothagudem" },
          { "name": "Aswaraopeta (ST)" },
          { "name": "Bhadrachalam (ST)" }
        ]
      },
      {
        "name": "Khammam",
        "constituencies": [
          { "name": "Khammam" },
          { "name": "Palair" },
          { "name": "Madhira (SC)" },
          { "name": "Wyra (ST)" },
          { "name": "Sathupalli (SC)" }
        ]
      }
    ]
  },
  {
    "name": "Tripura",
    "districts": [
      {
        "name": "West Tripura",
        "constituencies": [
          { "name": "Simna (ST)" },
          { "name": "Mohanpur" },
          { "name": "Bamutia (SC)" },
          { "name": "Barjala (SC)" },
          { "name": "Khayerpur" },
          { "name": "Agartala" },
          { "name": "Ramnagar" },
          { "name": "Town Bordowali" },
          { "name": "Banamalipur" },
          { "name": "Majlishpur" },
          { "name": "Mandaibazar (ST)" },
          { "name": "Pratapgarh (SC)" },
          { "name": "Badharghat (SC)" },
          { "name": "Suryamaninagar" }
        ]
      },
      {
        "name": "Sipahijala",
        "constituencies": [
          { "name": "Takarjala (ST)" },
          { "name": "Kamalasagar" },
          { "name": "Bishalgarh" },
          { "name": "Golaghati (ST)" },
          { "name": "Charilam (ST)" },
          { "name": "Boxanagar" },
          { "name": "Nalchar (SC)" },
          { "name": "Sonamura" },
          { "name": "Dhanpur" }
        ]
      },
      {
        "name": "Khowai",
        "constituencies": [
          { "name": "Ramchandraghat (ST)" },
          { "name": "Khowai" },
          { "name": "Asharambari (ST)" },
          { "name": "Kalyanpur-Pramodenagar" },
          { "name": "Teliamura" },
          { "name": "Krishnapur (ST)" }
        ]
      },
      {
        "name": "Gomati",
        "constituencies": [
          { "name": "Bagma (ST)" },
          { "name": "Radhakishorpur" },
          { "name": "Matarbari" },
          { "name": "Kakraban-Salgarh (SC)" },
          { "name": "Ampinagar (ST)" },
          { "name": "Amarpur" },
          { "name": "Karbook (ST)" }
        ]
      },
      {
        "name": "South Tripura",
        "constituencies": [
          { "name": "Rajnagar (SC)" },
          { "name": "Belonia" },
          { "name": "Santirbazar (ST)" },
          { "name": "Hrishyamukh" },
          { "name": "Jolaibari (ST)" },
          { "name": "Manu (ST)" },
          { "name": "Sabroom" }
        ]
      },
      {
        "name": "Dhalai",
        "constituencies": [
          { "name": "Raima Valley (ST)" },
          { "name": "Kamalpur" },
          { "name": "Surma (SC)" },
          { "name": "Ambassa (ST)" },
          { "name": "Karamcherra (ST)" },
          { "name": "Chawamanu (ST)" }
        ]
      },
      {
        "name": "Unakoti",
        "constituencies": [
          { "name": "Pabiachhara (SC)" },
          { "name": "Fatikroy (SC)" },
          { "name": "Chandipur" },
          { "name": "Kailashahar" }
        ]
      },
      {
        "name": "North Tripura",
        "constituencies": [
          { "name": "Kadamtala-Kurti" },
          { "name": "Bagbassa" },
          { "name": "Dharmanagar" },
          { "name": "Jubarajnagar" },
          { "name": "Panisagar" },
          { "name": "Pencharthal (ST)" },
          { "name": "Kanchanpur (ST)" }
        ]
      }
    ]
  },
  {
    "name": "Uttar Pradesh",
    "districts": [
      {
        "name": "Saharanpur",
        "constituencies": [
          { "name": "Behat" },
          { "name": "Nakur" },
          { "name": "Saharanpur Nagar" },
          { "name": "Saharanpur" },
          { "name": "Deoband" },
          { "name": "Rampur Maniharan (SC)" },
          { "name": "Gangoh" }
        ]
      },
      {
        "name": "Shamli",
        "constituencies": [
          { "name": "Kairana" },
          { "name": "Thana Bhawan" },
          { "name": "Shamli" }
        ]
      },
      {
        "name": "Muzaffarnagar",
        "constituencies": [
          { "name": "Budhana" },
          { "name": "Charthawal" },
          { "name": "Purqazi (SC)" },
          { "name": "Muzaffarnagar" },
          { "name": "Khatauli" },
          { "name": "Meerapur" }
        ]
      },
      {
        "name": "Bijnor",
        "constituencies": [
          { "name": "Najibabad" },
          { "name": "Nagina (SC)" },
          { "name": "Barhapur" },
          { "name": "Dhampur" },
          { "name": "Nehtaur (SC)" },
          { "name": "Bijnor" },
          { "name": "Chandpur" },
          { "name": "Noorpur" }
        ]
      },
      {
        "name": "Moradabad",
        "constituencies": [
          { "name": "Kanth" },
          { "name": "Thakurdwara" },
          { "name": "Moradabad Rural" },
          { "name": "Moradabad Nagar" },
          { "name": "Kundarki" },
          { "name": "Bilari" }
        ]
      },
      {
        "name": "Sambhal",
        "constituencies": [
          { "name": "Chandausi (SC)" },
          { "name": "Asmoli" },
          { "name": "Sambhal" },
          { "name": "Gunnaur" }
        ]
      },
      {
        "name": "Rampur",
        "constituencies": [
          { "name": "Suar" },
          { "name": "Chamraua" },
          { "name": "Bilaspur" },
          { "name": "Rampur" },
          { "name": "Milak (SC)" }
        ]
      },
      {
        "name": "Amroha",
        "constituencies": [
          { "name": "Dhanaura (SC)" },
          { "name": "Naugawan Sadat" },
          { "name": "Amroha" },
          { "name": "Hasanpur" }
        ]
      },
      {
        "name": "Meerut",
        "constituencies": [
          { "name": "Siwalkhas" },
          { "name": "Sardhana" },
          { "name": "Hastinapur" },
          { "name": "Kithore" },
          { "name": "Meerut Cantt." },
          { "name": "Meerut City" },
          { "name": "Meerut South" }
        ]
      },
      {
        "name": "Bagpat",
        "constituencies": [
          { "name": "Chhaprauli" },
          { "name": "Baraut" },
          { "name": "Baghpat" }
        ]
      },
      {
        "name": "Ghaziabad",
        "constituencies": [
          { "name": "Loni" },
          { "name": "Muradnagar" },
          { "name": "Sahibabad" },
          { "name": "Ghaziabad" },
          { "name": "Modi Nagar" }
        ]
      },
      {
        "name": "Hapur",
        "constituencies": [
          { "name": "Dholana" },
          { "name": "Hapur" },
          { "name": "Garhmukteshwar" }
        ]
      },
      {
        "name": "Gautam Buddh Nagar",
        "constituencies": [
          { "name": "Noida" },
          { "name": "Dadri" },
          { "name": "Jewar" }
        ]
      },
      {
        "name": "Bulandshahr",
        "constituencies": [
          { "name": "Sikandrabad" },
          { "name": "Bulandshahr" },
          { "name": "Syana" },
          { "name": "Anupshahr" },
          { "name": "Debai" },
          { "name": "Shikarpur" },
          { "name": "Khurja (SC)" }
        ]
      },
      {
        "name": "Aligarh",
        "constituencies": [
          { "name": "Khair (SC)" },
          { "name": "Barauli" },
          { "name": "Atrauli" },
          { "name": "Chharra" },
          { "name": "Koil" },
          { "name": "Aligarh" },
          { "name": "Iglas (SC)" }
        ]
      },
      {
        "name": "Hathras",
        "constituencies": [
          { "name": "Hathras (SC)" },
          { "name": "Sadabad" },
          { "name": "Sikandra Rao" }
        ]
      },
      {
        "name": "Mathura",
        "constituencies": [
          { "name": "Chhata" },
          { "name": "Mant" },
          { "name": "Goverdhan" },
          { "name": "Mathura" },
          { "name": "Baldev (SC)" }
        ]
      },
      {
        "name": "Agra",
        "constituencies": [
          { "name": "Etmadpur" },
          { "name": "Agra Cantt. (SC)" },
          { "name": "Agra South" },
          { "name": "Agra North" },
          { "name": "Agra Rural (SC)" },
          { "name": "Fatehpur Sikri" },
          { "name": "Kheragarh" },
          { "name": "Fatehabad" },
          { "name": "Bah" }
        ]
      },
      {
        "name": "Firozabad",
        "constituencies": [
          { "name": "Tundla (SC)" },
          { "name": "Jasrana" },
          { "name": "Firozabad" },
          { "name": "Shikohabad" },
          { "name": "Sirsaganj" }
        ]
      },
      {
        "name": "Kasganj",
        "constituencies": [
          { "name": "Kasganj" },
          { "name": "Amanpur" },
          { "name": "Patiyali" }
        ]
      },
      {
        "name": "Etah",
        "constituencies": [
          { "name": "Aliganj" },
          { "name": "Etah" },
          { "name": "Marhara" },
          { "name": "Jalesar (SC)" }
        ]
      },
      {
        "name": "Mainpuri",
        "constituencies": [
          { "name": "Mainpuri" },
          { "name": "Bhongaon" },
          { "name": "Kishni (SC)" },
          { "name": "Karhal" }
        ]
      },
      {
        "name": "Budaun",
        "constituencies": [
          { "name": "Bisauli (SC)" },
          { "name": "Sahaswan" },
          { "name": "Bilsi" },
          { "name": "Badaun" },
          { "name": "Shekhupur" },
          { "name": "Dataganj" }
        ]
      },
      {
        "name": "Bareilly",
        "constituencies": [
          { "name": "Baheri" },
          { "name": "Meerganj" },
          { "name": "Bhojipura" },
          { "name": "Nawabganj" },
          { "name": "Faridpur (SC)" },
          { "name": "Bithari Chainpur" },
          { "name": "Bareilly" },
          { "name": "Bareilly Cantt" },
          { "name": "Aonla" }
        ]
      },
      {
        "name": "Pilibhit",
        "constituencies": [
          { "name": "Pilibhit" },
          { "name": "Barkhera" },
          { "name": "Puranpur (SC)" },
          { "name": "Bisalpur" }
        ]
      },
      {
        "name": "Shahjahanpur",
        "constituencies": [
          { "name": "Katra" },
          { "name": "Jalalabad" },
          { "name": "Tilhar" },
          { "name": "Powayan (SC)" },
          { "name": "Shahjahanpur" },
          { "name": "Dadraul" }
        ]
      },
      {
        "name": "Lakhimpur Kheri",
        "constituencies": [
          { "name": "Palia" },
          { "name": "Nighasan" },
          { "name": "Gola Gokarnnath" },
          { "name": "Sri Nagar (SC)" },
          { "name": "Dhaurahra" },
          { "name": "Lakhimpur" },
          { "name": "Kasta (SC)" },
          { "name": "Mohammadi" }
        ]
      },
      {
        "name": "Sitapur",
        "constituencies": [
          { "name": "Maholi" },
          { "name": "Sitapur" },
          { "name": "Hargaon (SC)" },
          { "name": "Laharpur" },
          { "name": "Biswan" },
          { "name": "Sevata" },
          { "name": "Mahmoodabad" },
          { "name": "Sidhauli (SC)" },
          { "name": "Misrikh (SC)" }
        ]
      },
      {
        "name": "Hardoi",
        "constituencies": [
          { "name": "Sawayazpur" },
          { "name": "Shahabad" },
          { "name": "Hardoi" },
          { "name": "Gopamau (SC)" },
          { "name": "Sandi (SC)" },
          { "name": "Bilgram-Mallanwan" },
          { "name": "Balamau (SC)" },
          { "name": "Sandila" }
        ]
      },
      {
        "name": "Unnao",
        "constituencies": [
          { "name": "Bangarmau" },
          { "name": "Safipur (SC)" },
          { "name": "Mohan (SC)" },
          { "name": "Unnao" },
          { "name": "Bhagwantnagar" },
          { "name": "Purwa" }
        ]
      },
      {
        "name": "Lucknow",
        "constituencies": [
          { "name": "Malihabad (SC)" },
          { "name": "Bakshi Kaa Talab" },
          { "name": "Sarojini Nagar" },
          { "name": "Lucknow West" },
          { "name": "Lucknow North" },
          { "name": "Lucknow East" },
          { "name": "Lucknow Central" },
          { "name": "Lucknow Cantt" },
          { "name": "Mohanlalganj (SC)" }
        ]
      },
      {
        "name": "Raebareli",
        "constituencies": [
          { "name": "Bachhrawan (SC)" },
          { "name": "Harchandpur" },
          { "name": "Rae Bareli" },
          { "name": "Salon (SC)" },
          { "name": "Sareni" },
          { "name": "Unchahar" }
        ]
      },
      {
        "name": "Amethi",
        "constituencies": [
          { "name": "Tiloi" },
          { "name": "Jagdishpur (SC)" },
          { "name": "Gauriganj" },
          { "name": "Amethi" }
        ]
      },
      {
        "name": "Sultanpur",
        "constituencies": [
          { "name": "Isauli" },
          { "name": "Sultanpur" },
          { "name": "Sadar" },
          { "name": "Lambhua" },
          { "name": "Kadipur (SC)" }
        ]
      },
      {
        "name": "Farrukhabad",
        "constituencies": [
          { "name": "Kaimganj (SC)" },
          { "name": "Amritpur" },
          { "name": "Farrukhabad" },
          { "name": "Bhojpur" }
        ]
      },
      {
        "name": "Kannauj",
        "constituencies": [
          { "name": "Chhibramau" },
          { "name": "Tirwa" },
          { "name": "Kannauj (SC)" }
        ]
      },
      {
        "name": "Etawah",
        "constituencies": [
          { "name": "Jaswantnagar" },
          { "name": "Etawah" },
          { "name": "Bharthana (SC)" }
        ]
      },
      {
        "name": "Auraiya",
        "constituencies": [
          { "name": "Bidhuna" },
          { "name": "Dibiyapur" },
          { "name": "Auraiya (SC)" }
        ]
      },
      {
        "name": "Kanpur Dehat",
        "constituencies": [
          { "name": "Rasulabad (SC)" },
          { "name": "Akbarpur-Raniya" },
          { "name": "Sikandra" },
          { "name": "Bhognipur" }
        ]
      },
      {
        "name": "Kanpur Nagar",
        "constituencies": [
          { "name": "Bilhaur (SC)" },
          { "name": "Bithoor" },
          { "name": "Kalyanpur" },
          { "name": "Govindnagar" },
          { "name": "Sishamau" },
          { "name": "Arya Nagar" },
          { "name": "Kidwai Nagar" },
          { "name": "Kanpur Cantt" },
          { "name": "Maharajpur" },
          { "name": "Ghatampur (SC)" }
        ]
      },
      {
        "name": "Jalaun",
        "constituencies": [
          { "name": "Madhaugarh" },
          { "name": "Kalpi" },
          { "name": "Orai (SC)" }
        ]
      },
      {
        "name": "Jhansi",
        "constituencies": [
          { "name": "Babina" },
          { "name": "Jhansi Nagar" },
          { "name": "Mauranipur (SC)" },
          { "name": "Garautha" }
        ]
      },
      {
        "name": "Lalitpur",
        "constituencies": [{ "name": "Lalitpur" }, { "name": "Mehroni (SC)" }]
      },
      {
        "name": "Hamirpur",
        "constituencies": [{ "name": "Hamirpur" }, { "name": "Rath (SC)" }]
      },
      {
        "name": "Mahoba",
        "constituencies": [{ "name": "Mahoba" }, { "name": "Charkhari" }]
      },
      {
        "name": "Banda",
        "constituencies": [
          { "name": "Tindwari" },
          { "name": "Baberu" },
          { "name": "Naraini (SC)" },
          { "name": "Banda" }
        ]
      },
      {
        "name": "Chitrakoot",
        "constituencies": [{ "name": "Chitrakoot" }, { "name": "Manikpur" }]
      },
      {
        "name": "Fatehpur",
        "constituencies": [
          { "name": "Jahanabad" },
          { "name": "Bindki" },
          { "name": "Fatehpur" },
          { "name": "Ayah Shah" },
          { "name": "Husainganj" },
          { "name": "Khaga (SC)" }
        ]
      },
      {
        "name": "Pratapgarh",
        "constituencies": [
          { "name": "Rampur Khas" },
          { "name": "Babaganj (SC)" },
          { "name": "Kunda" },
          { "name": "Bishwavnathganj" },
          { "name": "Pratapgarh" },
          { "name": "Patti" },
          { "name": "Raniganj" }
        ]
      },
      {
        "name": "Kaushambi",
        "constituencies": [
          { "name": "Sirathu" },
          { "name": "Manjhanpur (SC)" },
          { "name": "Chail" }
        ]
      },
      {
        "name": "Prayagraj",
        "constituencies": [
          { "name": "Phaphamau" },
          { "name": "Soraon (SC)" },
          { "name": "Phulpur" },
          { "name": "Pratappur" },
          { "name": "Handia" },
          { "name": "Meja" },
          { "name": "Karachhana" },
          { "name": "Prayagraj West" },
          { "name": "Prayagraj North" },
          { "name": "Prayagraj South" },
          { "name": "Bara (SC)" },
          { "name": "Koraon" }
        ]
      },
      {
        "name": "Barabanki",
        "constituencies": [
          { "name": "Kursi" },
          { "name": "Ram Nagar" },
          { "name": "Barabanki" },
          { "name": "Zaidpur (SC)" },
          { "name": "Dariyabad" },
          { "name": "Haidergarh (SC)" }
        ]
      },
      {
        "name": "Ayodhya",
        "constituencies": [
          { "name": "Rudauli" },
          { "name": "Milkipur (SC)" },
          { "name": "Bikapur" },
          { "name": "Ayodhya" },
          { "name": "Goshainganj" }
        ]
      },
      {
        "name": "Ambedkar Nagar",
        "constituencies": [
          { "name": "Katehari" },
          { "name": "Tanda" },
          { "name": "Alapur (SC)" },
          { "name": "Jalalpur" },
          { "name": "Akbarpur" }
        ]
      },
      {
        "name": "Bahraich",
        "constituencies": [
          { "name": "Balha (SC)" },
          { "name": "Nanpara" },
          { "name": "Matera" },
          { "name": "Mahasi" },
          { "name": "Bahraich" },
          { "name": "Payagpur" },
          { "name": "Kaiserganj" }
        ]
      },
      {
        "name": "Shravasti",
        "constituencies": [{ "name": "Bhinga" }, { "name": "Shrawasti" }]
      },
      {
        "name": "Balrampur",
        "constituencies": [
          { "name": "Tulsipur" },
          { "name": "Gainsari" },
          { "name": "Utraula" },
          { "name": "Balrampur (SC)" }
        ]
      },
      {
        "name": "Gonda",
        "constituencies": [
          { "name": "Mehnaun" },
          { "name": "Gonda" },
          { "name": "Katra Bazar" },
          { "name": "Colonelganj" },
          { "name": "Tarabganj" },
          { "name": "Mankapur (SC)" },
          { "name": "Gaura" }
        ]
      },
      {
        "name": "Siddharthnagar",
        "constituencies": [
          { "name": "Shohratgarh" },
          { "name": "Kapilvastu (SC)" },
          { "name": "Bansi" },
          { "name": "Itwa" },
          { "name": "Domariyaganj" }
        ]
      },
      {
        "name": "Basti",
        "constituencies": [
          { "name": "Harraiya" },
          { "name": "Kaptanganj" },
          { "name": "Rudhauli" },
          { "name": "Basti Sadar" },
          { "name": "Mahadewa (SC)" }
        ]
      },
      {
        "name": "Sant Kabir Nagar",
        "constituencies": [
          { "name": "Menhdawal" },
          { "name": "Khalilabad" },
          { "name": "Dhanghata (SC)" }
        ]
      },
      {
        "name": "Maharajganj",
        "constituencies": [
          { "name": "Pharenda" },
          { "name": "Nautanwa" },
          { "name": "Siswa" },
          { "name": "Maharajganj (SC)" },
          { "name": "Paniyara" }
        ]
      },
      {
        "name": "Gorakhpur",
        "constituencies": [
          { "name": "Caimpiyarganj" },
          { "name": "Pipraich" },
          { "name": "Gorakhpur Urban" },
          { "name": "Gorakhpur Rural" },
          { "name": "Sahajanwa" },
          { "name": "Khajani (SC)" },
          { "name": "Chauri-Chaura" },
          { "name": "Bansgaon (SC)" },
          { "name": "Chillupar" }
        ]
      },
      {
        "name": "Kushinagar",
        "constituencies": [
          { "name": "Khadda" },
          { "name": "Padrauna" },
          { "name": "Tamkuhi Raj" },
          { "name": "Fazilnagar" },
          { "name": "Kushinagar" },
          { "name": "Hata" },
          { "name": "Ramkola (SC)" }
        ]
      },
      {
        "name": "Deoria",
        "constituencies": [
          { "name": "Rudrapur" },
          { "name": "Deoria" },
          { "name": "Pathardeva" },
          { "name": "Rampur Karkhana" },
          { "name": "Bhatpar Rani" },
          { "name": "Salempur (SC)" },
          { "name": "Barhaj" }
        ]
      },
      {
        "name": "Azamgarh",
        "constituencies": [
          { "name": "Atrauliya" },
          { "name": "Gopalpur" },
          { "name": "Sagri" },
          { "name": "Mubarakpur" },
          { "name": "Azamgarh" },
          { "name": "Nizamabad" },
          { "name": "Phoolpur Pawai" },
          { "name": "Didarganj" },
          { "name": "Lalganj (SC)" },
          { "name": "Mehnagar (SC)" }
        ]
      },
      {
        "name": "Mau",
        "constituencies": [
          { "name": "Madhuban" },
          { "name": "Ghosi" },
          { "name": "Muhammadabad-Gohna (SC)" },
          { "name": "Mau" }
        ]
      },
      {
        "name": "Ballia",
        "constituencies": [
          { "name": "Belthara Road (SC)" },
          { "name": "Rasara" },
          { "name": "Sikanderpur" },
          { "name": "Phephana" },
          { "name": "Ballia Nagar" },
          { "name": "Bansdih" },
          { "name": "Bairia" }
        ]
      },
      {
        "name": "Jaunpur",
        "constituencies": [
          { "name": "Badlapur" },
          { "name": "Shahganj" },
          { "name": "Jaunpur" },
          { "name": "Malhani" },
          { "name": "Mungra Badshahpur" },
          { "name": "Machhlishahr (SC)" },
          { "name": "Mariyahu" },
          { "name": "Zafrabad" },
          { "name": "Kerakat (SC)" }
        ]
      },
      {
        "name": "Ghazipur",
        "constituencies": [
          { "name": "Jakhanian (SC)" },
          { "name": "Saidpur (SC)" },
          { "name": "Ghazipur Sadar" },
          { "name": "Jangipur" },
          { "name": "Zahoorabad" },
          { "name": "Mohammadabad" },
          { "name": "Zamania" }
        ]
      },
      {
        "name": "Chandauli",
        "constituencies": [
          { "name": "Mughalsarai" },
          { "name": "Sakaldiha" },
          { "name": "Saiyadraja" },
          { "name": "Chakia (SC)" }
        ]
      },
      {
        "name": "Varanasi",
        "constituencies": [
          { "name": "Pindra" },
          { "name": "Ajagara (SC)" },
          { "name": "Shivpur" },
          { "name": "Rohaniya" },
          { "name": "Varanasi North" },
          { "name": "Varanasi South" },
          { "name": "Varanasi Cantonment" },
          { "name": "Sevapuri" }
        ]
      },
      {
        "name": "Bhadohi",
        "constituencies": [
          { "name": "Bhadohi" },
          { "name": "Gyanpur" },
          { "name": "Aurai (SC)" }
        ]
      },
      {
        "name": "Mirzapur",
        "constituencies": [
          { "name": "Chhanbey (SC)" },
          { "name": "Mirzapur" },
          { "name": "Majhawan" },
          { "name": a: "Chunar" },
          { "name": "Marihan" }
        ]
      },
      {
        "name": "Sonbhadra",
        "constituencies": [
          { "name": "Ghorawal" },
          { "name": "Robertsganj" },
          { "name": "Obra (ST)" },
          { "name": "Duddhi (ST)" }
        ]
      }
    ]
  },
  {
    "name": "Uttarakhand",
    "districts": [
      {
        "name": "Uttarkashi",
        "constituencies": [
          { "name": "Purola (SC)" },
          { "name": "Yamunotri" },
          { "name": "Gangotri" }
        ]
      },
      {
        "name": "Chamoli",
        "constituencies": [
          { "name": "Badrinath" },
          { "name": "Tharali (SC)" },
          { "name": "Karnaprayag" }
        ]
      },
      {
        "name": "Rudraprayag",
        "constituencies": [{ "name": "Kedarnath" }, { "name": "Rudraprayag" }]
      },
      {
        "name": "Tehri Garhwal",
        "constituencies": [
          { "name": "Ghansali (SC)" },
          { "name": "Devprayag" },
          { "name": "Narendranagar" },
          { "name": "Pratapnagar" },
          { "name": "Tehri" },
          { "name": "Dhanaulti" }
        ]
      },
      {
        "name": "Dehradun",
        "constituencies": [
          { "name": "Chakrata (ST)" },
          { "name": "Vikasnagar" },
          { "name": "Sahaspur" },
          { "name": "Dharampur" },
          { "name": "Raipur" },
          { "name": "Rajpur Road (SC)" },
          { "name": "Dehradun Cantonment" },
          { "name": "Mussoorie" },
          { "name": "Doiwala" },
          { "name": "Rishikesh" }
        ]
      },
      {
        "name": "Haridwar",
        "constituencies": [
          { "name": "Haridwar" },
          { "name": "BHEL Ranipur" },
          { "name": "Jwalapur (SC)" },
          { "name": "Bhagwanpur (SC)" },
          { "name": "Jhabrera (SC)" },
          { "name": "Piran Kaliyar" },
          { "name": "Roorkee" },
          { "name": "Khanpur" },
          { "name": "Manglaur" },
          { "name": "Laksar" },
          { "name": "Haridwar Rural" }
        ]
      },
      {
        "name": "Pauri Garhwal",
        "constituencies": [
          { "name": "Yamkeshwar" },
          { "name": "Pauri (SC)" },
          { "name": "Srinagar" },
          { "name": "Chaubattakhal" },
          { "name": "Lansdowne" },
          { "name": "Kotdwar" }
        ]
      },
      {
        "name": "Pithoragarh",
        "constituencies": [
          { "name": "Dharchula" },
          { "name": "Didihat" },
          { "name": "Pithoragarh" },
          { "name": "Gangolihat (SC)" }
        ]
      },
      {
        "name": "Bageshwar",
        "constituencies": [{ "name": "Kapkot" }, { "name": "Bageshwar (SC)" }]
      },
      {
        "name": "Almora",
        "constituencies": [
          { "name": "Dwarahat" },
          { "name": "Salt" },
          { "name": "Ranikhet" },
          { "name": "Someshwar (SC)" },
          { "name": "Almora" },
          { "name": "Jageshwar" }
        ]
      },
      {
        "name": "Champawat",
        "constituencies": [{ "name": "Lohaghat" }, { "name": "Champawat" }]
      },
      {
        "name": "Nainital",
        "constituencies": [
          { "name": "Lalkuan" },
          { "name": "Bhimtal" },
          { "name": "Nainital (SC)" },
          { "name": "Haldwani" },
          { "name": "Kaladhungi" },
          { "name": "Ramnagar" }
        ]
      },
      {
        "name": "Udham Singh Nagar",
        "constituencies": [
          { "name": "Jaspur" },
          { "name": "Kashipur" },
          { "name": "Bajpur (SC)" },
          { "name": "Gadarpur" },
          { "name": "Rudrapur" },
          { "name": "Kichha" },
          { "name": "Sitarganj" },
          { "name": "Nanakmatta (ST)" },
          { "name": "Khatima" }
        ]
      }
    ]
  },
  {
    "name": "West Bengal",
    "districts": [
      {
        "name": "Cooch Behar",
        "constituencies": [
          { "name": "Mekliganj" },
          { "name": "Mathabhanga" },
          { "name": "Cooch Behar Uttar" },
          { "name": "Cooch Behar Dakshin" },
          { "name": "Sitalkuchi" },
          { "name": "Sitai" },
          { "name": "Dinhata" },
          { "name": "Natabari" },
          { "name": "Tufanganj" }
        ]
      },
      {
        "name": "Alipurduar",
        "constituencies": [
          { "name": "Kumargram" },
          { "name": "Kalchini" },
          { "name": "Alipurduars" },
          { "name": "Falakata" },
          { "name": "Madarihat" }
        ]
      },
      {
        "name": "Jalpaiguri",
        "constituencies": [
          { "name": "Dhupguri" },
          { "name": "Maynaguri" },
          { "name": "Jalpaiguri" },
          { "name": "Rajganj" },
          { "name": "Dabgram-Phulbari" },
          { "name": "Mal" },
          { "name": "Nagrakata" }
        ]
      },
      { "name": "Kalimpong", "constituencies": [{ "name": "Kalimpong" }] },
      {
        "name": "Darjeeling",
        "constituencies": [
          { "name": "Darjeeling" },
          { "name": "Kurseong" },
          { "name": "Matigara-Naxalbari" },
          { "name": "Siliguri" },
          { "name": "Phansidewa" }
        ]
      },
      {
        "name": "Uttar Dinajpur",
        "constituencies": [
          { "name": "Chopra" },
          { "name": "Islampur" },
          { "name": "Goalpokhar" },
          { "name": "Chakulia" },
          { "name": "Karandighi" },
          { "name": "Hemtabad" },
          { "name": "Kaliaganj" },
          { "name": "Raiganj" },
          { "name": "Itahar" }
        ]
      },
      {
        "name": "Dakshin Dinajpur",
        "constituencies": [
          { "name": "Kushmandi" },
          { "name": "Kumarganj" },
          { "name": "Balurghat" },
          { "name": "Tapan" },
          { "name": "Gangarampur" },
          { "name": "Harirampur" }
        ]
      },
      {
        "name": "Malda",
        "constituencies": [
          { "name": "Habibpur" },
          { "name": "Gazole" },
          { "name": "Chanchal" },
          { "name": "Harishchandrapur" },
          { "name": "Malatipur" },
          { "name": "Ratua" },
          { "name": "Manikchak" },
          { "name": "Maldaha" },
          { "name": "English Bazar" },
          { "name": "Mothabari" },
          { "name": "Sujapur" },
          { "name": "Baisnabnagar" }
        ]
      },
      {
        "name": "Murshidabad",
        "constituencies": [
          { "name": "Farakka" },
          { "name": "Samserganj" },
          { "name": "Suti" },
          { "name": "Jangipur" },
          { "name": "Raghunathganj" },
          { "name": "Sagardighi" },
          { "name": "Lalgola" },
          { "name": "Bhagabangola" },
          { "name": "Raninagar" },
          { "name": "Murshidabad" },
          { "name": "Nabagram" },
          { "name": "Khargram" },
          { "name": "Burwan" },
          { "name": "Kandi" },
          { "name": "Bharatpur" },
          { "name": "Rejinagar" },
          { "name": "Beldanga" },
          { "name": "Baharampur" },
          { "name": "Hariharpara" },
          { "name": "Naoda" },
          { "name": "Domkal" },
          { "name": "Jalangi" }
        ]
      },
      {
        "name": "Nadia",
        "constituencies": [
          { "name": "Karimpur" },
          { "name": "Tehatta" },
          { "name": "Palashipara" },
          { "name": "Kaliganj" },
          { "name": "Nakashipara" },
          { "name": "Chapra" },
          { "name": "Krishnanagar Uttar" },
          { "name": "Nabadwip" },
          { "name": "Krishnanagar Dakshin" },
          { "name": "Santipur" },
          { "name": "Ranaghat Uttar Paschim" },
          { "name": "Krishnaganj" },
          { "name": "Ranaghat Uttar Purba" },
          { "name": "Ranaghat Dakshin" },
          { "name": "Chakdaha" },
          { "name": "Kalyani" },
          { "name": "Haringhata" }
        ]
      },
      {
        "name": "North 24 Parganas",
        "constituencies": [
          { "name": "Bagdah" },
          { "name": "Bangaon Uttar" },
          { "name": "Bangaon Dakshin" },
          { "name": "Gaighata" },
          { "name": "Swarupnagar" },
          { "name": "Baduria" },
          { "name": "Habra" },
          { "name": "Ashokenagar" },
          { "name": "Amdanga" },
          { "name": "Bijpur" },
          { "name": "Naihati" },
          { "name": "Bhatpara" },
          { "name": "Jagatdal" },
          { "name": "Noapara" },
          { "name": "Barrackpore" },
          { "name": "Khardaha" },
          { "name": "Dum Dum Uttar" },
          { "name": "Panihati" },
          { "name": "Kamarhati" },
          { "name": "Baranagar" },
          { "name": "Dum Dum" },
          { "name": "Rajarhat New Town" },
          { "name": "Bidhannagar" },
          { "name": "Rajarhat Gopalpur" },
          { "name": "Madhyamgram" },
          { "name": "Barasat" },
          { "name": "Deganga" },
          { "name": "Haroa" },
          { "name": "Minakhan" },
          { "name": "Sandeshkhali" },
          { "name": "Basirhat Dakshin" },
          { "name": "Basirhat Uttar" },
          { "name": "Hingalganj" }
        ]
      },
      {
        "name": "South 24 Parganas",
        "constituencies": [
          { "name": "Gosaba" },
          { "name": "Basanti" },
          { "name": "Kultali" },
          { "name": "Patharpratima" },
          { "name": "Kakdwip" },
          { "name": "Sagar" },
          { "name": "Kulpi" },
          { "name": "Raidighi" },
          { "name": "Mandirbazar" },
          { "name": "Jaynagar" },
          { "name": "Baruipur Purba" },
          { "name": "Canning Paschim" },
          { "name": "Canning Purba" },
          { "name": "Baruipur Paschim" },
          { "name": "Magrahat Purba" },
          { "name": "Magrahat Paschim" },
          { "name": "Diamond Harbour" },
          { "name": "Falta" },
          { "name": "Satgachia" },
          { "name": "Bishnupur" },
          { "name": "Sonarpur Dakshin" },
          { "name": "Bhangar" },
          { "name": "Kasba" },
          { "name": "Jadavpur" },
          { "name": "Sonarpur Uttar" },
          { "name": "Tollygunge" },
          { "name": "Behala Purba" },
          { "name": "Behala Paschim" },
          { "name": "Maheshtala" },
          { "name": "Budge Budge" },
          { "name": "Metiaburuz" }
        ]
      },
      {
        "name": "Kolkata",
        "constituencies": [
          { "name": "Kolkata Port" },
          { "name": "Bhabanipur" },
          { "name": "Rashbehari" },
          { "name": "Ballygunge" },
          { "name": "Chowrangee" },
          { "name": "Entally" },
          { "name": "Beleghata" },
          { "name": "Jorasanko" },
          { "name": "Shyampukur" },
          { "name": "Maniktala" },
          { "name": "Kashipur-Belgachhia" }
        ]
      },
      {
        "name": "Howrah",
        "constituencies": [
          { "name": "Bally" },
          { "name": "Howrah Uttar" },
          { "name": "Howrah Madhya" },
          { "name": "Shibpur" },
          { "name": "Howrah Dakshin" },
          { "name": "Sankrail" },
          { "name": "Panchla" },
          { "name": "Uluberia Purba" },
          { "name": "Uluberia Uttar" },
          { "name": "Uluberia Dakshin" },
          { "name": "Shyampur" },
          { "name": "Bagnan" },
          { "name": "Amta" },
          { "name": "Udaynarayanpur" },
          { "name": "Jagatballavpur" },
          { "name": "Domjur" }
        ]
      },
      {
        "name": "Hooghly",
        "constituencies": [
          { "name": "Uttarpara" },
          { "name": "Sreerampur" },
          { "name": "Champdani" },
          { "name": "Singur" },
          { "name": "Chandannagar" },
          { "name": "Chunchura" },
          { "name": "Balagarh" },
          { "name": "Pandua" },
          { "name": "Saptagram" },
          { "name": "Chanditala" },
          { "name": "Jangipara" },
          { "name": "Haripal" },
          { "name": "Dhanekhali" },
          { "name": "Tarakeswar" },
          { "name": "Pursurah" },
          { "name": "Arambagh" },
          { "name": "Goghat" },
          { "name": "Khanakul" }
        ]
      },
      {
        "name": "Purba Medinipur",
        "constituencies": [
          { "name": "Tamluk" },
          { "name": "Panskura Purba" },
          { "name": "Panskura Paschim" },
          { "name": "Moyna" },
          { "name": "Nandakumar" },
          { "name": "Mahisadal" },
          { "name": "Haldia" },
          { "name": "Nandigram" },
          { "name": "Chandipur" },
          { "name": "Patashpur" },
          { "name": "Kanthi Uttar" },
          { "name": "Bhagabanpur" },
          { "name": "Khejuri" },
          { "name": "Kanthi Dakshin" },
          { "name": "Ramnagar" },
          { "name": "Egra" }
        ]
      },
      {
        "name": "Paschim Medinipur",
        "constituencies": [
          { "name": "Dantan" },
          { "name": "Keshiary" },
          { "name": "Kharagpur Sadar" },
          { "name": "Narayangarh" },
          { "name": "Sabang" },
          { "name": "Pingla" },
          { "name": "Kharagpur" },
          { "name": "Debra" },
          { "name": "Daspur" },
          { "name": "Ghatal" },
          { "name": "Chandrakona" },
          { "name": "Garbeta" },
          { "name": "Salboni" },
          { "name": "Keshpur" },
          { "name": "Medinipur" }
        ]
      },
      {
        "name": "Jhargram",
        "constituencies": [
          { "name": "Nayagram" },
          { "name": "Gopiballavpur" },
          { "name": "Jhargram" },
          { "name": "Binpur" }
        ]
      },
      {
        "name": "Purulia",
        "constituencies": [
          { "name": "Bandwan" },
          { "name": "Balarampur" },
          { "name": "Baghmundi" },
          { "name": "Joypur" },
          { "name": "Purulia" },
          { "name": "Manbazar" },
          { "name": "Kashipur" },
          { "name": "Para" },
          { "name": "Raghunathpur" }
        ]
      },
      {
        "name": "Bankura",
        "constituencies": [
          { "name": "Saltora" },
          { "name": "Chhatna" },
          { "name": "Ranibandh" },
          { "name": "Raipur" },
          { "name": "Taldangra" },
          { "name": "Bankura" },
          { "name": "Barjora" },
          { "name": "Onda" },
          { "name": "Bishnupur" },
          { "name": "Katulpur" },
          { "name": "Indas" },
          { "name": "Sonamukhi" }
        ]
      },
      {
        "name": "Purba Bardhaman",
        "constituencies": [
          { "name": "Khandaghosh" },
          { "name": "Bardhaman Dakshin" },
          { "name": "Raina" },
          { "name": "Jamalpur" },
          { "name": "Monteswar" },
          { "name": "Kalna" },
          { "name": "Memari" },
          { "name": "Bardhaman Uttar" },
          { "name": "Bhatar" },
          { "name": "Purbasthali Dakshin" },
          { "name": "Purbasthali Uttar" },
          { "name": "Katwa" },
          { "name": "Ketugram" },
          { "name": "Mangalkot" },
          { "name": "Ausgram" },
          { "name": "Galsi" }
        ]
      },
      {
        "name": "Paschim Bardhaman",
        "constituencies": [
          { "name": "Pandabeswar" },
          { "name": "Durgapur Purba" },
          { "name": "Durgapur Paschim" },
          { "name": "Raniganj" },
          { "name": "Jamuria" },
          { "name": "Asansol Dakshin" },
          { "name": "Asansol Uttar" },
          { "name": "Kulti" },
          { "name": "Barabani" }
        ]
      },
      {
        "name": "Birbhum",
        "constituencies": [
          { "name": "Dubrajpur" },
          { "name": "Suri" },
          { "name": "Bolpur" },
          { "name": "Nanoor" },
          { "name": "Labpur" },
          { "name": "Sainthia" },
          { "name": "Mayureswar" },
          { "name": "Rampurhat" },
          { "name": "Hansan" },
          { "name": "Nalhati" },
          { "name": "Murarai" }
        ]
      }
    ]
  }
]
