/* FarmConnect prototype. MOCK AUTH + localStorage only.
   PRODUCTION: replace the `store` object with API calls; hash passwords server-side (bcrypt/argon2),
   use HTTPS, rate limiting, server-side checks so phone numbers are only returned after acceptance. */
const LANGS = ['en', 'te', 'hi', 'ta', 'kn', 'ml', 'mr', 'bn', 'gu', 'pa', 'or', 'as'], VOICE = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN', ta: 'ta-IN', kn: 'kn-IN', ml: 'ml-IN', mr: 'mr-IN', bn: 'bn-IN', gu: 'gu-IN', pa: 'pa-IN', or: 'or-IN', as: 'as-IN' };
// DEMO ONLY – NOT FOR PRODUCTION (client-side credentials are visible to anyone; use a real server-side login in production)
const DEMO_ADMIN = { phone: '9490217445', pin: '8845' };
let lang = localStorage.fc_lang || 'en';
// ---------- translations: 'English|Telugu|Hindi' ----------
const T = {
  home:'Home|హోమ్|होम', how:'How It Works|ఎలా పనిచేస్తుంది|यह कैसे काम करता है', about:'About|మా గురించి|हमारे बारे में',
  login:'Login|లాగిన్|लॉगिन', logout:'Logout|లాగ్అవుట్|लॉगआउट', find:'Find|వెతుకు|खोजें', work:'Work|పని|काम', alerts:'Alerts|సూచనలు|सूचना', profile:'Profile|ప్రొఫైల్|प्रोफ़ाइल',
  heroT:'Connect Farmers with Agricultural Labourers|రైతులను వ్యవసాయ కూలీలతో కలపండి|किसानों को खेतिहर मजदूरों से जोड़ें',
  heroS:'Find workers near you or find farm work near you.|మీ దగ్గర కూలీలను లేదా పనిని వెతకండి.|अपने पास मजदूर या खेती का काम खोजें।',
  farmer:'FARMER|రైతు|किसान', labourer:'LABOURER|కూలీ|मजदूर', needW:'Need workers for your farm?|మీ పొలానికి కూలీలు కావాలా?|खेत के लिए मजदूर चाहिए?',
  needJ:'Looking for farm work?|పొలం పని కావాలా?|खेत का काम चाहिए?', flogin:'Farmer Login|రైతు లాగిన్|किसान लॉगिन', llogin:'Labourer Login|కూలీ లాగిన్|मजदूर लॉगिन',
  phone:'Phone Number|ఫోన్ నంబర్|फ़ोन नंबर', pass:'4-Digit Password|4 అంకెల పాస్‌వర్డ్|4 अंकों का पासवर्ड', pass2:'Confirm 4-Digit Password|పాస్‌వర్డ్ మళ్ళీ|पासवर्ड दोहराएं',
  newu:'New User? Sign Up|కొత్తవారా? సైన్ అప్|नए हैं? साइन अप', haveacc:'Have account? Login|ఖాతా ఉందా? లాగిన్|खाता है? लॉगिन', LOGIN:'LOGIN|లాగిన్|लॉगिन',
  name:'Full Name|పూర్తి పేరు|पूरा नाम', state:'State|రాష్ట్రం|राज्य', district:'District|జిల్లా|जिला', mandal:'Mandal|మండలం|मंडल', village:'Village|గ్రామం|गाँव', select:'-- Select --|-- ఎంచుకోండి --|-- चुनें --',
  age:'Age|వయస్సు|उम्र', gender:'Gender|లింగం|लिंग', male:'Male|పురుషుడు|पुरुष', female:'Female|స్త్రీ|महिला', skills:'Work you can do|మీరు చేయగల పని|आप कौन सा काम कर सकते हैं',
  exp:'Years of experience|అనుభవం (సంవత్సరాలు)|अनुभव (साल)', avail:'Availability|అందుబాటు|उपलब्धता', farmLoc:'Farm Location|పొలం ప్రదేశం|खेत की जगह', contact:'Preferred Contact|సంప్రదింపు విధానం|संपर्क का तरीका', call:'Phone Call|ఫోన్ కాల్|फ़ोन कॉल', wapp:'WhatsApp|వాట్సాప్|व्हाट्सऐप',
  regF:'Farmer Registration|రైతు నమోదు|किसान पंजीकरण', regL:'Labourer Registration|కూలీ నమోదు|मजदूर पंजीकरण', createF:'Create Farmer Account|రైతు ఖాతా తయారు చేయండి|किसान खाता बनाएं', createL:'Create Labourer Account|కూలీ ఖాతా తయారు చేయండి|मजदूर खाता बनाएं',
  regOk:'Registration Successful|నమోదు విజయవంతం|पंजीकरण सफल', welcome:'Welcome|స్వాగతం|स्वागत', errPhone:'Enter 10-digit phone number|10 అంకెల ఫోన్ నంబర్ ఇవ్వండి|10 अंकों का फ़ोन नंबर डालें',
  errPass:'Password must be exactly 4 digits|పాస్‌వర్డ్ సరిగ్గా 4 అంకెలు ఉండాలి|पासवर्ड ठीक 4 अंकों का हो', errMatch:'Passwords do not match|పాస్‌వర్డ్‌లు సరిపోలలేదు|पासवर्ड मेल नहीं खाते', errBad:'Wrong phone or password|ఫోన్ లేదా పాస్‌వర్డ్ తప్పు|फ़ोन या पासवर्ड गलत', errExist:'This phone is already registered|ఈ ఫోన్ ఇప్పటికే నమోదైంది|यह फ़ोन पहले से पंजीकृत है', errFill:'Please fill all boxes|అన్ని ఖాళీలు నింపండి|सभी खाने भरें',
  postWork:'Post Work|పని పెట్టండి|काम डालें', findL:'Find Workers|కూలీలను వెతకండి|मजदूर खोजें', nearL:'Nearby Workers|దగ్గర కూలీలు|पास के मजदूर', myReq:'My Requests|నా అభ్యర్థనలు|मेरे अनुरोध', accL:'Accepted Workers|అంగీకరించిన కూలీలు|स्वीकार मजदूर', myProf:'My Profile|నా ప్రొఫైల్|मेरी प्रोफ़ाइल',
  findW:'Find Work|పని వెతకండి|काम खोजें', availJ:'Available Jobs|అందుబాటులో ఉన్న పనులు|उपलब्ध काम', nearJ:'Nearby Jobs|దగ్గర పనులు|पास के काम', myAcc:'My Accepted Work|నా అంగీకరించిన పని|मेरा स्वीकार काम', myWage:'My Wage|నా కూలీ|मेरी मजदूरी',
  crop:'Crop|పంట|फसल', workType:'Type of Work|పని రకం|काम का प्रकार', need:'Workers Needed|కావలసిన కూలీలు|मजदूर चाहिए', date:'Date|తేదీ|तारीख', hours:'Working Hours|పని గంటలు|काम के घंटे', wage:'Wage Offered (₹/day)|కూలీ (₹/రోజు)|मजदूरी (₹/दिन)', extra:'Extra Requirements|ఇతర అవసరాలు|अन्य ज़रूरतें', POST:'POST WORK|పని పెట్టండి|काम डालें',
  posted:'Work request posted successfully.|పని విజయవంతంగా పెట్టబడింది.|काम सफलतापूर्वक डाला गया।', sendReq:'Send Work Request|పని అభ్యర్థన పంపండి|काम का अनुरोध भेजें', sent:'Request sent|అభ్యర్థన పంపబడింది|अनुरोध भेजा गया',
  good:'⭐ Good Match|⭐ మంచి సరిపోలిక|⭐ अच्छा मेल', nearby:'📍 Nearby|📍 దగ్గరలో|📍 पास में', avail1:'Available|అందుబాటులో|उपलब्ध', km:'km|కి.మీ|किमी', yrs:'years|సంవత్సరాలు|साल', day:'/day|/రోజు|/दिन',
  waiting:'Waiting for Labourers|కూలీల కోసం ఎదురుచూపు|मजदूरों का इंतज़ार', accepted:'ACCEPTED|అంగీకరించారు|स्वीकार', closed:'Request Closed|అభ్యర్థన ముగిసింది|अनुरोध बंद', acc:'Accepted|అంగీకరించారు|स्वीकार', rem:'Remaining|మిగిలినవి|शेष',
  contactL:'Contact Labourer|కూలీని సంప్రదించండి|मजदूर से संपर्क करें', accWork:'ACCEPT WORK|పని అంగీకరించండి|काम स्वीकार करें', details:'View Details|వివరాలు|विवरण देखें', doYou:'Do you want to accept this work?|ఈ పని అంగీకరించాలా?|क्या यह काम स्वीकार करें?',
  yes:'✅ YES, ACCEPT|✅ అవును|✅ हाँ, स्वीकार', cancel:'❌ CANCEL|❌ రద్దు|❌ रद्द', okAcc:'Work Accepted Successfully|పని అంగీకరించబడింది|काम सफलतापूर्वक स्वीकार', fjob:'Farmer|రైతు|किसान', wanted:'Labourers Required|కావలసిన కూలీలు|मजदूर चाहिए',
  FIND:'FIND WORK|పని వెతకండి|काम खोजें', anyC:'Any crop|ఏదైనా పంట|कोई भी फसल', today:'Available today|ఈ రోజు|आज', tomorrow:'Available tomorrow|రేపు|कल', week:'Available this week|ఈ వారం|इस हफ्ते', pickD:'Select date|తేదీ ఎంచుకోండి|तारीख चुनें', above:'Above ₹700/day|₹700/రోజు పైన|₹700/दिन से ऊपर', custom:'Custom wage (₹)|మీ కూలీ (₹)|अपनी मजदूरी (₹)', anyW:'Any wage|ఏదైనా కూలీ|कोई भी मजदूरी',
  none:'Nothing found yet.|ఇంకా ఏమీ లేదు.|अभी कुछ नहीं।', notif:'🔔 Notifications|🔔 సూచనలు|🔔 सूचनाएं', nAcc:'{n} accepted your {w} work.|{n} మీ {w} పనిని అంగీకరించారు.|{n} ने आपका {w} काम स्वीकार किया।', nJob:'New {c} {w} work available {d} km from you.|కొత్త {c} {w} పని మీ నుండి {d} కి.మీ దూరంలో ఉంది.|नया {c} {w} काम आपसे {d} किमी दूर है।', nInv:'{n} sent you a work request.|{n} మీకు పని అభ్యర్థన పంపారు.|{n} ने आपको काम का अनुरोध भेजा।',
  say:'Tell us your requirement|మీ అవసరం చెప్పండి|अपनी ज़रूरत बताएं', sayEx:'Example: "I need five workers for rice harvesting"|ఉదా: "వరి కోతకు ఐదుగురు కూలీలు కావాలి"|उदाहरण: "धान कटाई के लिए पाँच मजदूर चाहिए"', noVoice:'Voice not supported on this phone|ఈ ఫోన్‌లో వాయిస్ లేదు|इस फ़ोन में आवाज़ सुविधा नहीं',
  instr:'Fill the boxes and press the big green button.|ఖాళీలు నింపి పెద్ద ఆకుపచ్చ బటన్ నొక్కండి.|खाने भरें और बड़ा हरा बटन दबाएं।', save:'SAVE|సేవ్|सेव', saved:'Saved|సేవ్ అయింది|सेव हुआ',
  h1:'1. Sign up with phone and 4-digit password.|1. ఫోన్ మరియు 4 అంకెల పాస్‌వర్డ్‌తో నమోదు.|1. फ़ोन और 4 अंकों के पासवर्ड से साइन अप करें।', h2:'2. Farmer posts work. Labourer chooses crop and wage.|2. రైతు పని పెడతారు. కూలీ పంట, కూలీ ఎంచుకుంటారు.|2. किसान काम डालता है। मजदूर फसल और मजदूरी चुनता है।', h3:'3. Labourer accepts. Farmer gets phone number.|3. కూలీ అంగీకరిస్తే రైతుకు ఫోన్ నంబర్ వస్తుంది.|3. मजदूर स्वीकार करे तो किसान को फ़ोन नंबर मिलता है।',
  aboutT:'FarmConnect helps villages: farmers find workers, workers find farm work. Free and simple.|FarmConnect గ్రామాలకు సహాయం: రైతులకు కూలీలు, కూలీలకు పని.|FarmConnect गाँवों की मदद करता है: किसानों को मजदूर, मजदूरों को काम।',
  admin:'Admin|అడ్మిన్|एडमिन', tF:'Total Farmers|మొత్తం రైతులు|कुल किसान', tL:'Total Labourers|మొత్తం కూలీలు|कुल मजदूर', aR:'Active Requests|క్రియాశీల అభ్యర్థనలు|सक्रिय अनुरोध', cR:'Completed Requests|పూర్తయినవి|पूरे हुए', reports:'Reports|నివేదికలు|रिपोर्ट', back:'⬅ Back|⬅ వెనుక|⬅ वापस', hidden:'Phone shown after acceptance|అంగీకారం తర్వాత ఫోన్ కనిపిస్తుంది|स्वीकार के बाद फ़ोन दिखेगा'
};
const CROPS = { rice:['🌾','Rice / Paddy|వరి|धान'], cotton:['☁️','Cotton|పత్తి|कपास'], chilli:['🌶️','Chilli|మిర్చి|मिर्च'], maize:['🌽','Maize|మొక్కజొన్న|मक्का'], groundnut:['🥜','Groundnut|వేరుశెనగ|मूंगफली'], veg:['🥕','Vegetables|కూరగాయలు|सब्जियां'], sugarcane:['🎋','Sugarcane|చెరకు|गन्ना'], other:['🌱','Other|ఇతర|अन्य'] };
const WORKS = { plant:['🌱','Planting|నాట్లు|रोपाई'], weed:['🌿','Weeding|కలుపు తీయడం|निराई'], harvest:['🧺','Harvesting|కోత|कटाई'], spray:['💦','Spraying|మందు చల్లడం|छिड़काव'], irrig:['🚿','Irrigation|నీటి పారుదల|सिंचाई'], prep:['🚜','Field preparation|పొలం సిద్ధం|खेत की तैयारी'], other:['🛠️','Other|ఇతర|अन्य'] };
const pk = s => { const p = s.split('|'); return p[LANGS.indexOf(lang)] || p[0]; };
const t = k => (T2[lang] && T2[lang][k]) || pk(T[k] || k);
const lb = (o, k) => pk(o[k][1]);
const cl = k => CROPS[k][0] + ' ' + lb(CROPS, k), wl = k => WORKS[k][0] + ' ' + lb(WORKS, k);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// ---------- configuration (easy to change) ----------
const WAGE_STEP = 50;                       // wage increments: ₹50, ₹100, ₹150 ...
const MENTOR_COMMISSION_PERCENTAGE = 5;     // mentor commission % of the farmer wage
const QUALS = ['Postgraduate', 'Graduate', 'Diploma', 'Intermediate', 'Other']; // selection order, highest priority first
const AVAIL_RANK = { today: 0, tomorrow: 1, week: 2 };
const QL = { Postgraduate: 'Postgraduate|పోస్ట్ గ్రాడ్యుయేట్|स्नातकोत्तर', Graduate: 'Graduate|గ్రాడ్యుయేట్|स्नातक', Diploma: 'Diploma|డిప్లొమా|डिप्लोमा', Intermediate: 'Intermediate|ఇంటర్మీడియట్|इंटरमीडिएट', Other: 'Other|ఇతర|अन्य' };
const ql = k => (T2[lang] && T2[lang]['q_' + k]) || pk(QL[k] || k);
Object.assign(T, {
  mentor: 'Mentor|మెంటార్|मेंटर', mlogin: 'Mentor Login|మెంటార్ లాగిన్|मेंटर लॉगिन', regM: 'Mentor Registration|మెంటార్ నమోదు|मेंटर पंजीकरण', createM: 'Create Mentor Account|మెంటార్ ఖాతా తయారు చేయండి|मेंटर खाता बनाएं',
  needM: 'Village helper for farmers and labourers|రైతులు, కూలీలకు గ్రామ సహాయకుడు|किसानों और मजदूरों के लिए गाँव सहायक', edu: 'Education|విద్యార్హత|शिक्षा', commission: 'Mentor Commission|మెంటార్ కమిషన్|मेंटर कमीशन',
  fwage: 'Farmer wage|రైతు కూలీ|किसान की मजदूरी', lpay: 'Labourer payment|కూలీకి చెల్లింపు|मजदूर को भुगतान', noDeduct: 'Estimate only. Nothing is deducted without confirmation.|ఇది అంచనా మాత్రమే. నిర్ధారణ లేకుండా ఏదీ కోయబడదు.|यह केवल अनुमान है। पुष्टि के बिना कुछ नहीं कटेगा।',
  myVillage: 'My Village|నా గ్రామం|मेरा गाँव', confirmC: 'Confirm Commission|కమిషన్ నిర్ధారించండి|कमीशन की पुष्टि करें', confirmed: 'Confirmed|నిర్ధారించబడింది|पुष्टि हुई', doConf: 'Confirm this commission?|ఈ కమిషన్ నిర్ధారించాలా?|क्या यह कमीशन पक्का करें?',
  contactM: 'Contact Mentor|మెంటార్‌ను సంప్రదించండి|मेंटर से संपर्क करें', noMentor: 'No mentor in your village yet.|మీ గ్రామంలో ఇంకా మెంటార్ లేరు.|आपके गाँव में अभी कोई मेंटर नहीं।'
});
// core labels for the other 9 languages (anything not listed falls back to English)
const T2K = 'home login logout farmer labourer phone name state district village save'.split(' ');
const T2 = Object.fromEntries(Object.entries({
  ta: 'முகப்பு|உள்நுழை|வெளியேறு|விவசாயி|தொழிலாளி|தொலைபேசி எண்|முழு பெயர்|மாநிலம்|மாவட்டம்|கிராமம்|சேமி',
  kn: 'ಮುಖಪುಟ|ಲಾಗಿನ್|ಲಾಗ್‌ಔಟ್|ರೈತ|ಕೂಲಿಕಾರ|ಫೋನ್ ಸಂಖ್ಯೆ|ಪೂರ್ಣ ಹೆಸರು|ರಾಜ್ಯ|ಜಿಲ್ಲೆ|ಗ್ರಾಮ|ಉಳಿಸಿ',
  ml: 'ഹോം|ലോഗിൻ|ലോഗൗട്ട്|കർഷകൻ|തൊഴിലാളി|ഫോൺ നമ്പർ|പൂർണ്ണ പേര്|സംസ്ഥാനം|ജില്ല|ഗ്രാമം|സേവ്',
  mr: 'मुख्यपृष्ठ|लॉगिन|लॉगआउट|शेतकरी|मजूर|फोन नंबर|पूर्ण नाव|राज्य|जिल्हा|गाव|जतन करा',
  bn: 'হোম|লগইন|লগআউট|কৃষক|শ্রমিক|ফোন নম্বর|পুরো নাম|রাজ্য|জেলা|গ্রাম|সংরক্ষণ',
  gu: 'હોમ|લૉગિન|લૉગઆઉટ|ખેડૂત|મજૂર|ફોન નંબર|પૂરું નામ|રાજ્ય|જિલ્લો|ગામ|સેવ',
  pa: 'ਹੋਮ|ਲਾਗਇਨ|ਲਾਗਆਊਟ|ਕਿਸਾਨ|ਮਜ਼ਦੂਰ|ਫ਼ੋਨ ਨੰਬਰ|ਪੂਰਾ ਨਾਮ|ਰਾਜ|ਜ਼ਿਲ੍ਹਾ|ਪਿੰਡ|ਸੇਵ',
  or: 'ହୋମ|ଲଗଇନ୍|ଲଗଆଉଟ୍|କୃଷକ|ଶ୍ରମିକ|ଫୋନ୍ ନମ୍ବର|ପୂର୍ଣ୍ଣ ନାମ|ରାଜ୍ୟ|ଜିଲ୍ଲା|ଗାଁ|ସେଭ୍',
  as: 'হোম|লগইন|লগআউট|কৃষক|শ্ৰমিক|ফোন নম্বৰ|সম্পূৰ্ণ নাম|ৰাজ্য|জিলা|গাঁও|সংৰক্ষণ'
}).map(([l, v]) => [l, Object.fromEntries(v.split('|').map((x, i) => [T2K[i], x]))]));
// mentor wording for the other 9 languages (so every language shows the mentor labels in its own script)
const T3K = 'mentor mlogin regM createM needM edu commission myVillage contactM confirmC confirmed noMentor fwage lpay doConf noDeduct q_Postgraduate q_Graduate q_Diploma q_Intermediate q_Other'.split(' ');
Object.entries({
  ta: "வழிகாட்டி|வழிகாட்டி உள்நுழைவு|வழிகாட்டி பதிவு|வழிகாட்டி கணக்கை உருவாக்கு|விவசாயிகள், தொழிலாளர்களுக்கு கிராம உதவியாளர்|கல்வித் தகுதி|வழிகாட்டி கமிஷன்|என் கிராமம்|வழிகாட்டியை தொடர்பு கொள்|கமிஷனை உறுதிசெய்|உறுதிசெய்யப்பட்டது|உங்கள் கிராமத்தில் இன்னும் வழிகாட்டி இல்லை.|விவசாயி கூலி|தொழிலாளர் பெறும் தொகை|இந்த கமிஷனை உறுதிசெய்யவா?|இது மதிப்பீடு மட்டுமே. உறுதிப்படுத்தாமல் எதுவும் பிடிக்கப்படாது.|முதுகலை|பட்டதாரி|டிப்ளமோ|இடைநிலை|மற்றவை",
  kn: "ಮಾರ್ಗದರ್ಶಕ|ಮಾರ್ಗದರ್ಶಕ ಲಾಗಿನ್|ಮಾರ್ಗದರ್ಶಕ ನೋಂದಣಿ|ಮಾರ್ಗದರ್ಶಕ ಖಾತೆ ರಚಿಸಿ|ರೈತರು ಮತ್ತು ಕೂಲಿಕಾರರಿಗೆ ಗ್ರಾಮ ಸಹಾಯಕ|ವಿದ್ಯಾರ್ಹತೆ|ಮಾರ್ಗದರ್ಶಕ ಕಮಿಷನ್|ನನ್ನ ಗ್ರಾಮ|ಮಾರ್ಗದರ್ಶಕರನ್ನು ಸಂಪರ್ಕಿಸಿ|ಕಮಿಷನ್ ದೃಢೀಕರಿಸಿ|ದೃಢೀಕರಿಸಲಾಗಿದೆ|ನಿಮ್ಮ ಗ್ರಾಮದಲ್ಲಿ ಇನ್ನೂ ಮಾರ್ಗದರ್ಶಕರಿಲ್ಲ.|ರೈತರ ಕೂಲಿ|ಕೂಲಿಕಾರರಿಗೆ ಪಾವತಿ|ಈ ಕಮಿಷನ್ ದೃಢೀಕರಿಸಬೇಕೇ?|ಇದು ಅಂದಾಜು ಮಾತ್ರ. ದೃಢೀಕರಣವಿಲ್ಲದೆ ಏನನ್ನೂ ಕಡಿತಗೊಳಿಸುವುದಿಲ್ಲ.|ಸ್ನಾತಕೋತ್ತರ|ಪದವೀಧರ|ಡಿಪ್ಲೊಮಾ|ಇಂಟರ್ಮೀಡಿಯೇಟ್|ಇತರೆ",
  ml: "മെന്റർ|മെന്റർ ലോഗിൻ|മെന്റർ രജിസ്ട്രേഷൻ|മെന്റർ അക്കൗണ്ട് ഉണ്ടാക്കുക|കർഷകർക്കും തൊഴിലാളികൾക്കും ഗ്രാമ സഹായി|വിദ്യാഭ്യാസ യോഗ്യത|മെന്റർ കമ്മീഷൻ|എന്റെ ഗ്രാമം|മെന്ററെ ബന്ധപ്പെടുക|കമ്മീഷൻ സ്ഥിരീകരിക്കുക|സ്ഥിരീകരിച്ചു|നിങ്ങളുടെ ഗ്രാമത്തിൽ ഇതുവരെ മെന്റർ ഇല്ല.|കർഷകന്റെ കൂലി|തൊഴിലാളിക്കുള്ള പേയ്‌മെന്റ്|ഈ കമ്മീഷൻ സ്ഥിരീകരിക്കട്ടെ?|ഇത് ഏകദേശ കണക്ക് മാത്രം. സ്ഥിരീകരണമില്ലാതെ ഒന്നും കുറയ്ക്കില്ല.|ബിരുദാനന്തര ബിരുദം|ബിരുദം|ഡിപ്ലോമ|ഇന്റർമീഡിയറ്റ്|മറ്റുള്ളവ",
  mr: "मार्गदर्शक|मार्गदर्शक लॉगिन|मार्गदर्शक नोंदणी|मार्गदर्शक खाते तयार करा|शेतकरी आणि मजुरांसाठी गाव सहाय्यक|शिक्षण|मार्गदर्शक कमिशन|माझे गाव|मार्गदर्शकाशी संपर्क करा|कमिशनची पुष्टी करा|पुष्टी झाली|तुमच्या गावात अजून मार्गदर्शक नाही.|शेतकऱ्याची मजुरी|मजुराला देय रक्कम|हे कमिशन निश्चित करायचे का?|हा फक्त अंदाज आहे. पुष्टीशिवाय काहीही कापले जाणार नाही.|पदव्युत्तर|पदवीधर|डिप्लोमा|इंटरमिजिएट|इतर",
  bn: "মেন্টর|মেন্টর লগইন|মেন্টর নিবন্ধন|মেন্টর অ্যাকাউন্ট তৈরি করুন|কৃষক ও শ্রমিকদের জন্য গ্রাম সহায়ক|শিক্ষাগত যোগ্যতা|মেন্টর কমিশন|আমার গ্রাম|মেন্টরের সাথে যোগাযোগ করুন|কমিশন নিশ্চিত করুন|নিশ্চিত হয়েছে|আপনার গ্রামে এখনও কোনো মেন্টর নেই।|কৃষকের মজুরি|শ্রমিকের প্রাপ্য|এই কমিশন নিশ্চিত করবেন?|এটি শুধু আনুমানিক। নিশ্চিতকরণ ছাড়া কিছু কাটা হবে না।|স্নাতকোত্তর|স্নাতক|ডিপ্লোমা|ইন্টারমিডিয়েট|অন্যান্য",
  gu: "માર્ગદર્શક|માર્ગદર્શક લૉગિન|માર્ગદર્શક નોંધણી|માર્ગદર્શક ખાતું બનાવો|ખેડૂતો અને મજૂરો માટે ગામ સહાયક|શિક્ષણ|માર્ગદર્શક કમિશન|મારું ગામ|માર્ગદર્શકનો સંપર્ક કરો|કમિશનની પુષ્ટિ કરો|પુષ્ટિ થઈ|તમારા ગામમાં હજી કોઈ માર્ગદર્શક નથી.|ખેડૂતની મજૂરી|મજૂરને ચુકવણી|આ કમિશન પાકું કરવું છે?|આ ફક્ત અંદાજ છે. પુષ્ટિ વિના કંઈ કપાશે નહીં.|અનુસ્નાતક|સ્નાતક|ડિપ્લોમા|ઇન્ટરમીડિયેટ|અન્ય",
  pa: "ਮਾਰਗਦਰਸ਼ਕ|ਮਾਰਗਦਰਸ਼ਕ ਲਾਗਇਨ|ਮਾਰਗਦਰਸ਼ਕ ਰਜਿਸਟ੍ਰੇਸ਼ਨ|ਮਾਰਗਦਰਸ਼ਕ ਖਾਤਾ ਬਣਾਓ|ਕਿਸਾਨਾਂ ਅਤੇ ਮਜ਼ਦੂਰਾਂ ਲਈ ਪਿੰਡ ਸਹਾਇਕ|ਸਿੱਖਿਆ|ਮਾਰਗਦਰਸ਼ਕ ਕਮਿਸ਼ਨ|ਮੇਰਾ ਪਿੰਡ|ਮਾਰਗਦਰਸ਼ਕ ਨਾਲ ਸੰਪਰਕ ਕਰੋ|ਕਮਿਸ਼ਨ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ|ਪੁਸ਼ਟੀ ਹੋ ਗਈ|ਤੁਹਾਡੇ ਪਿੰਡ ਵਿੱਚ ਅਜੇ ਕੋਈ ਮਾਰਗਦਰਸ਼ਕ ਨਹੀਂ।|ਕਿਸਾਨ ਦੀ ਮਜ਼ਦੂਰੀ|ਮਜ਼ਦੂਰ ਨੂੰ ਭੁਗਤਾਨ|ਕੀ ਇਹ ਕਮਿਸ਼ਨ ਪੱਕਾ ਕਰਨਾ ਹੈ?|ਇਹ ਸਿਰਫ਼ ਅੰਦਾਜ਼ਾ ਹੈ। ਪੁਸ਼ਟੀ ਤੋਂ ਬਿਨਾਂ ਕੁਝ ਨਹੀਂ ਕੱਟਿਆ ਜਾਵੇਗਾ।|ਪੋਸਟ ਗ੍ਰੈਜੂਏਟ|ਗ੍ਰੈਜੂਏਟ|ਡਿਪਲੋਮਾ|ਇੰਟਰਮੀਡੀਏਟ|ਹੋਰ",
  or: "ମାର୍ଗଦର୍ଶକ|ମାର୍ଗଦର୍ଶକ ଲଗଇନ୍|ମାର୍ଗଦର୍ଶକ ପଞ୍ଜୀକରଣ|ମାର୍ଗଦର୍ଶକ ଖାତା ତିଆରି କରନ୍ତୁ|କୃଷକ ଓ ଶ୍ରମିକଙ୍କ ପାଇଁ ଗ୍ରାମ ସହାୟକ|ଶିକ୍ଷାଗତ ଯୋଗ୍ୟତା|ମାର୍ଗଦର୍ଶକ କମିଶନ୍|ମୋ ଗାଁ|ମାର୍ଗଦର୍ଶକଙ୍କୁ ସମ୍ପର୍କ କରନ୍ତୁ|କମିଶନ୍ ନିଶ୍ଚିତ କରନ୍ତୁ|ନିଶ୍ଚିତ ହେଲା|ଆପଣଙ୍କ ଗାଁରେ ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ମାର୍ଗଦର୍ଶକ ନାହାଁନ୍ତି।|କୃଷକଙ୍କ ମଜୁରି|ଶ୍ରମିକଙ୍କ ପ୍ରାପ୍ୟ|ଏହି କମିଶନ୍ ନିଶ୍ଚିତ କରିବେ?|ଏହା କେବଳ ଅନୁମାନ। ନିଶ୍ଚିତକରଣ ବିନା କିଛି କଟାଯିବ ନାହିଁ।|ସ୍ନାତକୋତ୍ତର|ସ୍ନାତକ|ଡିପ୍ଲୋମା|ଇଣ୍ଟରମିଡିଏଟ୍|ଅନ୍ୟାନ୍ୟ",
  as: "পথপ্ৰদৰ্শক|পথপ্ৰদৰ্শক লগইন|পথপ্ৰদৰ্শক পঞ্জীয়ন|পথপ্ৰদৰ্শকৰ একাউণ্ট বনাওক|কৃষক আৰু শ্ৰমিকৰ বাবে গাঁও সহায়ক|শিক্ষাগত যোগ্যতা|পথপ্ৰদৰ্শক কমিছন|মোৰ গাঁও|পথপ্ৰদৰ্শকৰ সৈতে যোগাযোগ কৰক|কমিছন নিশ্চিত কৰক|নিশ্চিত হ'ল|আপোনাৰ গাঁৱত এতিয়ালৈকে কোনো পথপ্ৰদৰ্শক নাই।|কৃষকৰ মজুৰি|শ্ৰমিকক দিয়া ধন|এই কমিছন নিশ্চিত কৰিব নেকি?|এইটো কেৱল অনুমান। নিশ্চিতকৰণৰ অবিহনে একো কটা নহ'ব।|স্নাতকোত্তৰ|স্নাতক|ডিপ্লোমা|ইণ্টাৰমিডিয়েট|অন্যান্য"
}).forEach(([l, v]) => v.split('|').forEach((x, i) => { T2[l][T3K[i]] = x; }));
// ---------- locations (representative sample - NOT a complete list of Indian villages) ----------
const LOC = {
  'Andhra Pradesh': { Guntur: { 'Guntur Rural': ['Chowdavaram', 'Nallapadu'], Pedakakani: ['Pedakakani', 'Kanaparru'] }, Krishna: { 'Vijayawada Rural': ['Nunna', 'Gollapudi'], Machilipatnam: ['Chilakalapudi'] }, 'East Godavari': { 'Rajamahendravaram Rural': ['Katheru', 'Bommuru'], 'Kakinada Rural': ['Vakalapudi', 'Thimmapuram'] } },
  Telangana: { Warangal: { Hanamkonda: ['Kazipet', 'Madikonda'] }, Nizamabad: { Armoor: ['Mamidipally'] }, Khammam: { 'Khammam Rural': ['Ekunuru'] }, Karimnagar: { Karimnagar: ['Bommakal', 'Chamanpalle'], Huzurabad: ['Kesavapatnam', 'Singapur'] } },
  Karnataka: { Mysuru: { Nanjangud: ['Hullahalli', 'Kavalande'], Hunsur: ['Bilikere', 'Gavadagere'] }, Belagavi: { Gokak: ['Konnur', 'Mamadapur'], Athani: ['Aigali', 'Sankonatti'] } },
  'Tamil Nadu': { Thanjavur: { Thanjavur: ['Vallam', 'Neelagiri'], Orathanadu: ['Orathanadu', 'Vadaseri'] }, Coimbatore: { Pollachi: ['Anaimalai', 'Kinathukadavu'], Mettupalayam: ['Sirumugai', 'Thekkampatti'] } },
  Kerala: { Palakkad: { Chittur: ['Kozhinjampara', 'Vadakarapathy'], Alathur: ['Vadakkencherry', 'Kuthannur'] }, Wayanad: { Mananthavady: ['Thondernad', 'Edavaka'] } },
  Maharashtra: { Pune: { Baramati: ['Malegaon', 'Supe'], Haveli: ['Loni Kalbhor', 'Uruli Kanchan'] }, Nashik: { Niphad: ['Pimpalgaon Baswant', 'Lasalgaon'], Sinnar: ['Sinnar', 'Nandur Shingote'] } },
  Gujarat: { Anand: { Anand: ['Karamsad', 'Vallabh Vidyanagar'], Petlad: ['Petlad', 'Sojitra'] }, Rajkot: { Gondal: ['Gondal', 'Bhunava'], Jetpur: ['Jetpur', 'Navagadh'] } },
  Punjab: { Ludhiana: { Jagraon: ['Jagraon', 'Sidhwan Khurd'], Khanna: ['Khanna', 'Payal'] }, Amritsar: { Ajnala: ['Ajnala', 'Ramdas'], 'Baba Bakala': ['Baba Bakala', 'Rayya'] } },
  'Uttar Pradesh': { Meerut: { Mawana: ['Mawana', 'Daurala'], Sardhana: ['Sardhana', 'Kithore'] }, Varanasi: { Pindra: ['Pindra', 'Harahua'], Rajatalab: ['Rajatalab', 'Chiraigaon'] } },
  'West Bengal': { 'Purba Bardhaman': { Katwa: ['Katwa', 'Ketugram'], Kalna: ['Kalna', 'Purbasthali'] }, Hooghly: { Chinsurah: ['Chinsurah', 'Singur'], Arambagh: ['Arambagh', 'Khanakul'] } },
  Odisha: { Cuttack: { Banki: ['Banki', 'Charampa'], Athagarh: ['Athagarh', 'Baramba'] }, Puri: { Nimapara: ['Nimapara', 'Astaranga'] } },
  Assam: { Nagaon: { Nagaon: ['Kathiatoli', 'Raha'], Hojai: ['Hojai', 'Lanka'] }, Jorhat: { Jorhat: ['Teok', 'Titabor'] } }
};
const LK = ['state', 'district', 'mandal', 'village'];
function locList(k, v) { if (k === 'state') return Object.keys(LOC); let o = LOC[v.state]; if (!o) return []; if (k === 'district') return Object.keys(o); o = o[v.district]; if (!o) return []; return k === 'mandal' ? Object.keys(o) : (o[v.mandal] || []); }
const opts = (list, val) => `<option value="">${t('select')}</option>` + list.map(x => { const [v, l] = Array.isArray(x) ? x : [x, x]; return `<option value="${esc(v)}" ${v == val ? 'selected' : ''}>${esc(l)}</option>`; }).join('');
const locHTML = (v = {}) => LK.map(k => `<label>📍 ${t(k)}<select name="${k}" data-loc="${k}" required>${opts(locList(k, v), v[k])}</select></label>`).join('');
function locChange(el) { const f = el.form, i = LK.indexOf(el.dataset.loc), v = {}; LK.slice(0, i + 1).forEach(k => v[k] = f[k].value); LK.slice(i + 1).forEach(k => f[k].innerHTML = opts(locList(k, v), '')); }
// ---------- mock data store ----------
const seed = () => ({
  farmers: [{ id: 'f1', name: 'Ravi Kumar', phone: '9000000001', password: '1234', state: 'Andhra Pradesh', district: 'Guntur', mandal: 'Guntur Rural', village: 'Chowdavaram' }, { id: 'f2', name: 'Suresh', phone: '9000000002', password: '1234', state: 'Andhra Pradesh', district: 'Guntur', mandal: 'Pedakakani', village: 'Pedakakani' }],
  labourers: [{ id: 'l1', name: 'Ramesh', phone: '9876543210', password: '1234', state: 'Andhra Pradesh', district: 'Guntur', mandal: 'Guntur Rural', village: 'Chowdavaram', age: 34, gender: 'male', skills: ['harvest', 'plant'], experience: 4, expectedWage: 500, availability: 'week' },
    { id: 'l2', name: 'Lakshmi', phone: '9876543211', password: '1234', state: 'Andhra Pradesh', district: 'Guntur', mandal: 'Pedakakani', village: 'Pedakakani', age: 29, gender: 'female', skills: ['weed', 'spray'], experience: 3, expectedWage: 450, availability: 'today' }],
  requests: [{ id: 'r1', farmerId: 'f1', crop: 'rice', workType: 'harvest', labourersRequired: 5, acceptedLabourers: 0, date: '2026-10-20', hours: '7am-5pm', wage: 500, state: 'Andhra Pradesh', district: 'Guntur', mandal: 'Guntur Rural', village: 'Chowdavaram', status: 'open' },
    { id: 'r2', farmerId: 'f2', crop: 'chilli', workType: 'weed', labourersRequired: 3, acceptedLabourers: 0, date: '2026-10-15', hours: '7am-1pm', wage: 450, state: 'Andhra Pradesh', district: 'Guntur', mandal: 'Pedakakani', village: 'Pedakakani', status: 'open' }],
  acceptances: [], notifs: []
});
function demoData() {
  const FN = ['Ravi', 'Suresh', 'Venkat', 'Srinivas', 'Mahesh', 'Ramu', 'Gopal', 'Kishore', 'Naresh', 'Prasad', 'Harish', 'Balaji', 'Anil', 'Sanjay', 'Rajesh', 'Mohan'], LN = ['Reddy', 'Naidu', 'Rao', 'Kumar', 'Patel', 'Singh', 'Nair', 'Gowda', 'Das', 'Yadav', 'Pawar', 'Sharma'], FF = ['Lakshmi', 'Sita', 'Padma', 'Radha', 'Kavitha', 'Durga', 'Meena', 'Sunita', 'Anitha', 'Savitri', 'Geeta', 'Rani'];
  const CK = Object.keys(CROPS), WK = Object.keys(WORKS), AV = ['today', 'tomorrow', 'week'], o = { farmers: [], labourers: [], mentors: [], requests: [] }; let i = 0;
  for (const [state, ds] of Object.entries(LOC)) for (const [district, ms] of Object.entries(ds)) for (const [mandal, vs] of Object.entries(ms)) for (const village of vs) {
    const loc = { state, district, mandal, village }, p = (a, k = 0) => a[(i * 7 + k * 3) % a.length], n = String(i).padStart(3, '0'), fid = 'gf' + n;
    o.farmers.push({ id: fid, name: p(FN) + ' ' + p(LN, 1), phone: '91' + String(i).padStart(8, '0'), password: '1234', ...loc, farmLoc: village + ' farm', contactPref: i % 2 ? 'wapp' : 'call' });
    for (let k = 0; k < 2; k++) { const female = (i + k) % 2, id = i * 2 + k; o.labourers.push({ id: 'gl' + n + k, name: (female ? p(FF, k + 2) : p(FN, k + 2)) + ' ' + p(LN, k + 4), phone: '92' + String(id).padStart(8, '0'), password: '1234', ...loc, age: 20 + (i * 5 + k * 9) % 30, gender: female ? 'female' : 'male', skills: [p(WK, k), p(WK, k + 2)].filter((x, j, a) => a.indexOf(x) === j), experience: 1 + (i * 3 + k) % 15, expectedWage: 300 + WAGE_STEP * ((i + k) % 7), availability: AV[(i + k) % 3] }); }
    for (let k = 0; k < (i % 3 === 0 ? 2 : 1); k++) o.mentors.push({ id: 'gm' + n + k, name: (k ? p(FF, 5) : p(FN, 6)) + ' ' + p(LN, 7 + k), phone: '93' + String(i * 2 + k).padStart(8, '0'), password: '1234', ...loc, education: QUALS[(i * 2 + k) % QUALS.length], availability: AV[(i + k) % 3], contactPref: 'call' });
    if (i % 2 === 0) o.requests.push({ id: 'gr' + n, farmerId: fid, crop: p(CK), workType: p(WK, 1), labourersRequired: 2 + i % 5, acceptedLabourers: 0, date: '2026-10-' + String(10 + i % 20).padStart(2, '0'), hours: '7am-5pm', wage: 300 + WAGE_STEP * (i % 8), ...loc, status: 'open' });
    i++;
  }
  return o;
}
let db = JSON.parse(localStorage.fc_db || 'null') || seed();
(function mergeDemo() { const d = demoData(); ['farmers', 'labourers', 'mentors', 'requests'].forEach(k => { db[k] = db[k] || []; d[k].forEach(x => { if (!db[k].some(y => y.id === x.id)) db[k].push(x); }); }); db.acceptances = db.acceptances || []; db.notifs = db.notifs || []; })();
const save = () => localStorage.fc_db = JSON.stringify(db);
const uid = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
let me = JSON.parse(sessionStorage.fc_me || 'null'), view = 'home', arg = null, flt = {};
const user = () => me && me.role !== 'admin' ? db[me.role + 's'].find(u => u.id === me.id) : null;
const byId = (a, id) => db[a].find(x => x.id === id);
// ---------- matching ----------
const dist = (a, b) => a.village === b.village ? 2 : a.mandal === b.mandal ? 8 : a.district === b.district ? 25 : 80;
const locScore = d => d <= 2 ? 3 : d <= 8 ? 2 : d <= 25 ? 1 : 0;
const label = (s, d) => s >= 5 ? t('good') : d <= 25 ? t('nearby') : '';
function jobScore(j, l, f = {}) {
  const d = dist(j, l), days = (new Date(j.date) - new Date()) / 864e5;
  let s = locScore(d) + (!f.crop || f.crop === j.crop ? 1 : 0) + (l.skills.includes(j.workType) ? 1 : 0) + (f.wage ? (j.wage >= f.wage ? 1 : 0) : (j.wage >= l.expectedWage ? 1 : 0));
  s += !f.avail || f.avail === 'week' && days <= 7 || f.avail === 'today' && days < 1 || f.avail === 'tomorrow' && days < 2 || f.avail === 'date' && j.date === f.date ? 1 : 0;
  return { s, d };
}
// ---------- helpers ----------
const toast = m => { const e = document.getElementById('toast'); e.textContent = m; e.hidden = false; setTimeout(() => e.hidden = true, 2600); };
const modal = h => { const m = document.getElementById('modal'); m.innerHTML = h ? `<div class="card" role="dialog" aria-modal="true">${h}</div>` : ''; m.hidden = !h; };
const err = k => `<div class="err" role="alert">⚠️ ${t(k)}</div>`;
const statusB = r => r.status === 'closed' ? `<span class="badge r">🔴 ${t('closed')}</span>` : r.acceptedLabourers > 0 ? `<span class="badge">🟢 ${t('accepted')}</span>` : `<span class="badge y">🟡 ${t('waiting')}</span>`;
const dstr = d => new Date(d).toLocaleDateString(VOICE[lang], { day: 'numeric', month: 'long', year: 'numeric' });
const back = (v = 'dash') => `<button class="btn alt sm" data-go="${v}">${t('back')}</button>`;
const empty = () => `<div class="card">${t('none')}</div>`;
// ---------- views ----------
const V = {};
V.login = () => `<section class="hero"><h1>${t('heroT')}</h1><p>${t('heroS')}</p></section>
<div class="grid"><div class="card big"><span class="ic">👨‍🌾</span><h2>${t('farmer')}</h2><p>${t('needW')}</p><button class="btn" data-go="auth" data-a="farmer:login">${t('flogin')}</button></div>
<div class="card big"><span class="ic">👷</span><h2>${t('labourer')}</h2><p>${t('needJ')}</p><button class="btn" data-go="auth" data-a="labourer:login">${t('llogin')}</button></div>
<div class="card big"><span class="ic">🧑‍🏫</span><h2>${t('mentor')}</h2><p>${t('needM')}</p><button class="btn" data-go="auth" data-a="mentor:login">${t('mlogin')}</button></div></div>
`;
V.how = () => back('home') + `<div class="card"><h2>❓ ${t('how')}</h2><p>${t('h1')}</p><p>${t('h2')}</p><p>${t('h3')}</p></div>`;
V.about = () => back('home') + `<div class="card"><h2>🌾 ${t('about')}</h2><p>${t('aboutT')}</p></div>`;
const pwField = (n, l) => `<label>🔢 ${t(l)}<div class="pw"><input name="${n}" type="password" inputmode="numeric" pattern="\\d{4}" maxlength="4" placeholder="_ _ _ _" autocomplete="off" required><button type="button" data-do="eye" aria-label="Show/hide">👁️</button></div></label>`;
V.auth = () => {
  const [role, mode] = arg.split(':'), ic = role === 'farmer' ? '👨‍🌾' : role === 'labourer' ? '👷' : role === 'mentor' ? '🧑‍🏫' : '🛠️', sign = mode === 'signup';
  const other = role === 'mentor' ? mentorFields() : role === 'farmer' ? [`<label>🏡 ${t('farmLoc')}<input name="farmLoc" placeholder="${t('farmLoc')}"></label>`, `<label>📞 ${t('contact')}<select name="contactPref"><option value="call">${t('call')}</option><option value="wapp">${t('wapp')}</option></select></label>`].join('')
    : `<label>🎂 ${t('age')}<input name="age" type="number" inputmode="numeric" min="16" max="80" required></label><label>🚻 ${t('gender')}<select name="gender"><option value="male">${t('male')}</option><option value="female">${t('female')}</option></select></label>
<label>🛠️ ${t('skills')}</label><div class="chk">${Object.keys(WORKS).map(k => `<label><input type="checkbox" name="skills" value="${k}"> ${wl(k)}</label>`).join('')}</div>
<label>⭐ ${t('exp')}<input name="experience" type="number" inputmode="numeric" min="0" max="60" required></label>
<label>💰 ${t('myWage')} (₹)<input name="expectedWage" type="number" step="${WAGE_STEP}" min="0" inputmode="numeric" value="500" required></label>
<label>🕒 ${t('avail')}<select name="availability">${['today', 'tomorrow', 'week'].map(k => `<option value="${k}">${t(k)}</option>`).join('')}</select></label>`;
  return back('login') + `<div class="card"><h2>${ic} ${sign ? t({ farmer: 'regF', labourer: 'regL', mentor: 'regM' }[role]) : t({ farmer: 'flogin', labourer: 'llogin', mentor: 'mlogin' }[role] || 'admin')}</h2><div id="msg"></div>
<form data-f="${sign ? 'signup' : 'login'}" data-role="${role}">
${sign ? `<label>👤 ${t('name')}<input name="name" required></label>` : ''}
<label>📱 ${t('phone')}<input name="phone" type="tel" inputmode="numeric" maxlength="10" placeholder="${t('errPhone')}" required></label>
${pwField('password', 'pass')}${sign ? pwField('password2', 'pass2') + locHTML() + other : ''}
<button class="btn">${sign ? t({ farmer: 'createF', labourer: 'createL', mentor: 'createM' }[role]) : t('LOGIN')}</button></form>
${role !== 'admin' ? `<button class="btn alt" data-go="auth" data-a="${role}:${sign ? 'login' : 'signup'}">${sign ? t('haveacc') : t('newu')}</button>` : '<p class="note">Demo admin: 0000000000 / 0000</p>'}
${!sign && role !== 'admin' ? '<p class="note">Demo: 9000000001 / 1234 (farmer), 9876543210 / 1234 (labourer), 9300000000 / 1234 (mentor)</p>' : ''}</div>`;
};
const TILES = {
  farmer: [['📋', 'postWork', 'post'], ['👷', 'findL', 'findL'], ['📍', 'nearL', 'nearL'], ['📊', 'myReq', 'reqs'], ['✅', 'accL', 'accL'], ['👤', 'myProf', 'profile']],
  labourer: [['🔎', 'findW', 'find'], ['🌾', 'availJ', 'jobs'], ['📍', 'nearJ', 'near'], ['✅', 'myAcc', 'myacc'], ['💰', 'myWage', 'wage'], ['👤', 'myProf', 'profile']]
};
V.dash = () => `<h1>${{ farmer: '👨‍🌾', labourer: '👷', mentor: '🧑‍🏫' }[me.role]} ${t('welcome')}, ${esc(user().name)}</h1><div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">${TILES[me.role].map(([i, k, v]) => `<button class="tile" data-go="${v}"><span class="ic">${i}</span>${t(k)}</button>`).join('')}</div>`;
V.post = () => { const u = user(); return back() + `<div class="card"><h2>📋 ${t('postWork')}</h2><p>${t('instr')}</p><div id="msg"></div>
<form data-f="post"><label>🌾 ${t('crop')}<select name="crop">${Object.keys(CROPS).map(k => `<option value="${k}">${cl(k)}</option>`).join('')}</select></label>
<label>🛠️ ${t('workType')}<select name="workType">${Object.keys(WORKS).map(k => `<option value="${k}">${wl(k)}</option>`).join('')}</select></label>
<label>👷 ${t('need')}</label><div class="cnt"><button type="button" data-do="cnt" data-a="-1" aria-label="-">−</button><b id="cn">1</b><button type="button" data-do="cnt" data-a="1" aria-label="+">+</button></div><input type="hidden" name="labourersRequired" value="1">
<label>📅 ${t('date')}<input type="date" name="date" required></label><label>🕒 ${t('hours')}<input name="hours" value="7am - 5pm"></label>
<label>💰 ${t('wage')}<input name="wage" type="number" step="${WAGE_STEP}" min="0" inputmode="numeric" value="500" required></label>${locHTML(u)}
<label>📝 ${t('extra')}<textarea name="extra" rows="2"></textarea></label><button class="btn">${t('POST')}</button></form></div>`; };
const lcard = (l, s, d, ask) => `<div class="card">👷 <b>${esc(l.name)}</b> <span class="badge">${label(s, d)}</span><br>📍 ${esc(l.village)} · ${d} ${t('km')}<br>🌾 ${l.skills.map(wl).join(', ')}<br>⭐ ${l.experience} ${t('yrs')}<br>💰 ₹${l.expectedWage}${t('day')}<br>🟢 ${t(l.availability)}<br><span class="note">🔒 ${t('hidden')}</span><button class="btn" data-do="invite" data-a="${l.id}">📨 ${t('sendReq')}</button></div>`;
function labList(near) {
  const f = user(), ref = db.requests.filter(r => r.farmerId === f.id && r.status === 'open').pop();
  const list = db.labourers.map(l => { const d = dist(f, l), s = locScore(d) + (ref && l.skills.includes(ref.workType) ? 2 : 1) + (ref && l.expectedWage <= ref.wage ? 1 : 0) + 1; return { l, d, s }; }).filter(x => !near || x.d <= 25).sort((a, b) => b.s - a.s || a.d - b.d);
  return `<h2>${near ? '📍' : '👷'} ${t(near ? 'nearL' : 'findL')}</h2><div class="grid">${list.map(x => lcard(x.l, x.s, x.d)).join('') || empty()}</div>`;
}
V.findL = () => back() + labList(false); V.nearL = () => back() + labList(true);
V.reqs = () => { const rs = db.requests.filter(r => r.farmerId === me.id).reverse(); return back() + `<h2>📊 ${t('myReq')}</h2><div class="grid">${rs.map(r => `<div class="card"><b>${cl(r.crop)}</b> · ${wl(r.workType)}<br>${statusB(r)}<br>📅 ${dstr(r.date)} · 💰 ₹${r.wage}${t('day')}<br>👷 ${t('need')}: <b>${r.labourersRequired}</b><br>✅ ${t('acc')}: <b>${r.acceptedLabourers}</b><br>⏳ ${t('rem')}: <b>${Math.max(0, r.labourersRequired - r.acceptedLabourers)}</b></div>`).join('') || empty()}</div>`; };
V.accL = () => { const rows = db.acceptances.filter(a => byId('requests', a.workRequestId)?.farmerId === me.id); return back() + `<h2>✅ ${t('accL')}</h2><div class="grid">${rows.map(a => { const l = byId('labourers', a.labourerId), r = byId('requests', a.workRequestId); return `<div class="card"><span class="badge">🟢 ${t('accepted')}</span><br>👷 <b>${esc(l.name)}</b><br>📱 ${esc(l.phone)}<br>📍 ${esc(l.district)}, ${esc(l.village)}<br>🌾 ${l.skills.map(wl).join(', ')}<br>⭐ ${l.experience} ${t('yrs')}<br>💰 ₹${l.expectedWage}${t('day')}<br><span class="note">${cl(r.crop)} · ${wl(r.workType)}</span><a class="btn" style="text-decoration:none;text-align:center" href="tel:${esc(l.phone)}">📞 ${t('contactL')}</a></div>`; }).join('') || empty()}</div>`; };
V.profile = () => { const u = user(); return back() + `<div class="card"><h2>👤 ${t('myProf')}</h2><p>👤 ${esc(u.name)}<br>📱 ${esc(u.phone)}<br>📍 ${esc(u.village)}, ${esc(u.mandal)}, ${esc(u.district)}, ${esc(u.state)}</p>${me.role === 'labourer' ? `<p>🌾 ${u.skills.map(wl).join(', ')}<br>⭐ ${u.experience} ${t('yrs')}<br>💰 ₹${u.expectedWage}${t('day')}</p>` : ''}${profExtra(u)}<button class="btn red" data-do="logout">${t('logout')}</button></div>`; };
// labourer
const WAGES = Array.from({ length: Math.floor((700 - 300) / WAGE_STEP) + 1 }, (_, i) => 300 + i * WAGE_STEP);
V.find = () => back() + `<div class="card"><h2>🔎 ${t('findW')}</h2><form data-f="find">
<label>🌾 ${t('crop')}<select name="crop"><option value="">${t('anyC')}</option>${Object.keys(CROPS).map(k => `<option value="${k}">${cl(k)}</option>`).join('')}</select></label>
<label>💰 ${t('wage')}<select name="wage"><option value="">${t('anyW')}</option>${WAGES.map(w => `<option value="${w}">₹${w}${t('day')}</option>`).join('')}<option value="701">${t('above')}</option></select></label>
<label>${t('custom')}<input name="cwage" type="number" step="${WAGE_STEP}" min="0" inputmode="numeric"></label>
<label>🕒 ${t('avail')}<select name="avail">${['today', 'tomorrow', 'week'].map(k => `<option value="${k}">${t(k)}</option>`).join('')}<option value="date">${t('pickD')}</option></select></label><input type="date" name="date">${locHTML(user())}
<button class="btn">${t('FIND')}</button></form></div>`;
function jobCard(j, s, d) {
  const f = byId('farmers', j.farmerId), done = db.acceptances.some(a => a.workRequestId === j.id && a.labourerId === me.id);
  return `<div class="card"><b>${cl(j.crop)} ${wl(j.workType)}</b> <span class="badge">${label(s, d)}</span><br>👨‍🌾 ${t('fjob')}: ${esc(f.name)}<br>📍 ${esc(j.village)} · ${d} ${t('km')}<br>👷 ${t('wanted')}: ${j.labourersRequired - j.acceptedLabourers}<br>💰 ₹${j.wage}${t('day')}<br>📅 ${dstr(j.date)}<br>🟢 ${t('avail1')}
${done ? `<span class="badge">✅ ${t('accepted')}</span>` : `<button class="btn" data-do="accept" data-a="${j.id}">${t('accWork')}</button>`}<button class="btn alt" data-do="detail" data-a="${j.id}">${t('details')}</button></div>`;
}
function jobList(mode) {
  const l = user(), f = mode === 'find' ? flt : {};
  const list = db.requests.filter(r => r.status === 'open').map(j => ({ j, ...jobScore(j, l, f) })).filter(x => (mode === 'near' ? x.d <= 25 : true) && (!f.district || x.j.district === f.district) && (!f.village || x.j.village === f.village || x.d <= 25)).sort((a, b) => b.s - a.s || a.d - b.d);
  return back(mode === 'find' ? 'find' : 'dash') + `<h2>${mode === 'near' ? '📍' : '🌾'} ${t(mode === 'near' ? 'nearJ' : 'availJ')}</h2><div class="grid">${list.map(x => jobCard(x.j, x.s, x.d)).join('') || empty()}</div>`;
}
V.jobs = () => jobList('jobs'); V.near = () => jobList('near'); V.results = () => jobList('find');
V.myacc = () => { const rows = db.acceptances.filter(a => a.labourerId === me.id); return back() + `<h2>✅ ${t('myAcc')}</h2><div class="grid">${rows.map(a => { const j = byId('requests', a.workRequestId), f = byId('farmers', j.farmerId); return `<div class="card"><span class="badge">🟢 ${t('accepted')}</span><br><b>${cl(j.crop)} ${wl(j.workType)}</b><br>👨‍🌾 ${esc(f.name)} · 📱 ${esc(f.phone)}<br>📍 ${esc(j.village)}<br>📅 ${dstr(j.date)} · 💰 ₹${j.wage}${t('day')}</div>`; }).join('') || empty()}</div>`; };
V.wage = () => { const u = user(); return back() + `<div class="card"><h2>💰 ${t('myWage')}</h2><form data-f="wage"><input name="expectedWage" type="number" step="${WAGE_STEP}" min="0" inputmode="numeric" value="${u.expectedWage}" required><button class="btn">${t('save')}</button></form></div>`; };
const nText = n => t(n.type).replace('{n}', n.name).replace('{w}', n.work ? lb(WORKS, n.work) : '').replace('{c}', n.crop ? lb(CROPS, n.crop) : '').replace('{d}', n.d ?? '');
V.notifs = () => { const ns = db.notifs.filter(n => n.to === me.id).reverse(); return back() + `<h2>${t('notif')}</h2>${ns.map(n => `<div class="card" style="margin-bottom:8px">🔔 ${esc(nText(n))}</div>`).join('') || empty()}`; };
V.admin = () => { const tab = arg || 'reports', act = db.requests.filter(r => r.status === 'open').length;
  const tb = (h, rows) => `<div style="overflow-x:auto"><table><tr>${h.map(x => `<th>${x}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</table></div>`;
  const body = tab === 'farmers' ? tb(['Name', 'Phone', 'Village', 'District'], db.farmers.map(f => [f.name, f.phone, f.village, f.district])) : tab === 'labourers' ? tb(['Name', 'Phone', 'Village', 'Skills', '₹'], db.labourers.map(l => [l.name, l.phone, l.village, l.skills.join(','), l.expectedWage])) : tab === 'mentors' ? tb(['Name', 'Phone', 'Village', 'Education', 'Availability'], db.mentors.map(m => [m.name, m.phone, m.village, m.education, m.availability])) : tab === 'requests' ? tb(['Crop', 'Work', 'Need', 'Accepted', 'Village', 'Status'], db.requests.map(r => [r.crop, r.workType, r.labourersRequired, r.acceptedLabourers, r.village, r.status])) : `<div class="card">📈 Acceptances: ${db.acceptances.length}<br>🔔 Notifications: ${db.notifs.length}</div>`;
  return back('home') + `<h1>🛠️ ${t('admin')}</h1><div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))"><div class="card big"><span class="ic">👨‍🌾</span>${t('tF')}<h2>${db.farmers.length}</h2></div><div class="card big"><span class="ic">👷</span>${t('tL')}<h2>${db.labourers.length}</h2></div><div class="card big"><span class="ic">📋</span>${t('aR')}<h2>${act}</h2></div><div class="card big"><span class="ic">✅</span>${t('cR')}<h2>${db.requests.length - act}</h2></div></div>
<div class="tabs">${['farmers', 'labourers', 'mentors', 'requests', 'reports'].map(k => `<button class="btn alt sm" data-go="admin" data-a="${k}">${k === 'reports' ? t('reports') : k}</button>`).join('')}</div>${body}<button class="btn red" data-do="logout">${t('logout')}</button>`; };
// ---------- actions ----------
const A = {
  eye(_, b) { const i = b.previousElementSibling; i.type = i.type === 'password' ? 'tel' : 'password'; },
  cnt(d) { const i = document.querySelector('[name=labourersRequired]'); i.value = Math.max(1, +i.value + +d); document.getElementById('cn').textContent = i.value; },
  logout() { me = null; sessionStorage.removeItem('fc_me'); go('home'); },
  invite(id) { const f = user(); db.notifs.push({ to: id, type: 'nInv', name: f.name }); save(); toast('✅ ' + t('sent')); },
  detail(id) { const j = byId('requests', id); modal(`<h2>${cl(j.crop)} ${wl(j.workType)}</h2><p>📅 ${dstr(j.date)}<br>🕒 ${esc(j.hours)}<br>💰 ₹${j.wage}${t('day')}<br>📍 ${esc(j.village)}, ${esc(j.mandal)}, ${esc(j.district)}<br>${j.extra ? '📝 ' + esc(j.extra) : ''}</p>${wageSplit(j.wage)}${mentorLine(j)}<button class="btn" data-do="close">OK</button>`); },
  close() { modal(''); },
  accept(id) { modal(`<h2>${t('doYou')}</h2><button class="btn" data-do="confirm" data-a="${id}">${t('yes')}</button><button class="btn red" data-do="close">${t('cancel')}</button>`); },
  confirm(id) {
    const j = byId('requests', id), l = user(); modal('');
    if (!db.acceptances.some(a => a.workRequestId === id && a.labourerId === l.id)) {
      db.acceptances.push({ id: uid('a'), workRequestId: id, labourerId: l.id, status: 'accepted', acceptedAt: new Date().toISOString() });
      j.acceptedLabourers++; if (j.acceptedLabourers >= j.labourersRequired) j.status = 'closed';
      db.notifs.push({ to: j.farmerId, type: 'nAcc', name: l.name, work: j.workType });
    }
    save(); toast('✅ ' + t('okAcc')); go('myacc');
  }
};
// ---------- mentor system ----------
const qi = m => { const i = QUALS.indexOf(m.education); return i < 0 ? QUALS.length : i; };
function pickMentor(loc) { // 1) education level  2) availability  3) village association (same village first, then same mandal)
  const same = db.mentors.filter(m => m.village === loc.village && m.district === loc.district);
  const pool = same.length ? same : db.mentors.filter(m => m.mandal === loc.mandal && m.district === loc.district);
  return pool.slice().sort((a, b) => qi(a) - qi(b) || (AVAIL_RANK[a.availability] ?? 9) - (AVAIL_RANK[b.availability] ?? 9))[0];
}
const mentorFields = () => `<label>🎓 ${t('edu')}<select name="education">${QUALS.map(q => `<option value="${q}">${ql(q)}</option>`).join('')}</select></label>
<label>🕒 ${t('avail')}<select name="availability">${['today', 'tomorrow', 'week'].map(k => `<option value="${k}">${t(k)}</option>`).join('')}</select></label>
<label>📞 ${t('contact')}<select name="contactPref"><option value="call">${t('call')}</option><option value="wapp">${t('wapp')}</option></select></label>`;
const wageSplit = w => { const c = Math.round(w * MENTOR_COMMISSION_PERCENTAGE) / 100; return `<div class="ok">💰 ${t('fwage')}: ₹${w}${t('day')}<br>🧑‍🏫 ${t('commission')} (${MENTOR_COMMISSION_PERCENTAGE}%): ₹${c}<br>👷 ${t('lpay')}: ₹${w - c}${t('day')}<br><span class="note">${t('noDeduct')}</span></div>`; };
const mentorLine = loc => { const m = pickMentor(loc); return m ? `<div class="card" style="margin:8px 0">🧑‍🏫 <b>${t('mentor')}</b>: ${esc(m.name)}<br>🎓 ${ql(m.education)} · 🟢 ${t(m.availability)}<br><a class="btn sm" style="text-decoration:none;text-align:center" href="tel:${esc(m.phone)}">📞 ${t('contactM')}</a></div>` : `<p class="note">${t('noMentor')}</p>`; };
const profExtra = u => me.role === 'mentor' ? `<p>🎓 ${ql(u.education)}<br>🟢 ${t(u.availability)}</p>` : mentorLine(u);
TILES.mentor = [['👥', 'myVillage', 'mvil'], ['💰', 'commission', 'mcomm'], ['👤', 'myProf', 'profile']];
V.home = () => homePage();
V.mvil = () => { const u = user(), same = x => x.village === u.village && x.district === u.district, rows = [...db.farmers.filter(same).map(p => ['👨‍🌾', p, t('farmer')]), ...db.labourers.filter(same).map(p => ['👷', p, t('labourer')])];
  return back() + `<h2>👥 ${t('myVillage')}</h2><div class="grid">${rows.map(([i, p, r]) => `<div class="card">${i} <b>${esc(p.name)}</b> <span class="badge">${r}</span><br>📍 ${esc(p.village)}${p.skills ? '<br>🌾 ' + p.skills.map(wl).join(', ') : ''}</div>`).join('') || empty()}</div>`; };
V.mcomm = () => { const u = user(), rows = db.acceptances.filter(a => { const j = byId('requests', a.workRequestId); return j && pickMentor(j)?.id === u.id; });
  return back() + `<h2>💰 ${t('commission')} (${MENTOR_COMMISSION_PERCENTAGE}%)</h2><div class="grid">${rows.map(a => { const j = byId('requests', a.workRequestId), l = byId('labourers', a.labourerId); return `<div class="card"><b>${cl(j.crop)} ${wl(j.workType)}</b><br>👷 ${esc(l.name)} · 📅 ${dstr(j.date)}${wageSplit(j.wage)}${a.commissionConfirmed ? `<span class="badge">✅ ${t('confirmed')}</span>` : `<button class="btn" data-do="mconf" data-a="${a.id}">${t('confirmC')}</button>`}</div>`; }).join('') || empty()}</div>`; };
Object.assign(A, {
  mconf(id) { modal(`<h2>${t('doConf')}</h2><button class="btn" data-do="mdo" data-a="${id}">${t('yes')}</button><button class="btn red" data-do="close">${t('cancel')}</button>`); },
  mdo(id) { const a = db.acceptances.find(x => x.id === id); if (a) { a.commissionConfirmed = true; save(); } modal(''); toast('✅ ' + t('confirmed')); render(); }
});
const F = {
  login(v, f) {
    const role = f.dataset.role, m = document.getElementById('msg');
    if (!/^\d{10}$/.test(v.phone)) return m.innerHTML = err('errPhone');
    if (!/^\d{4}$/.test(v.password)) return m.innerHTML = err('errPass');
    if (role === 'admin') { if (v.phone === '0000000000' && v.password === '0000') { setMe({ role: 'admin' }); return go('admin'); } return m.innerHTML = err('errBad'); }
    if (role === 'farmer' && v.phone === DEMO_ADMIN.phone && v.password === DEMO_ADMIN.pin) { setMe({ role: 'admin' }); return go('admin'); } // DEMO ONLY – NOT FOR PRODUCTION
    const u = db[role + 's'].find(x => x.phone === v.phone && x.password === v.password);
    if (!u) return m.innerHTML = err('errBad'); setMe({ role, id: u.id }); go('dash');
  },
  signup(v, f) {
    const role = f.dataset.role, m = document.getElementById('msg');
    if (!v.name.trim() || LK.some(k => !v[k])) return m.innerHTML = err('errFill');
    if (!/^\d{10}$/.test(v.phone)) return m.innerHTML = err('errPhone');
    if (!/^\d{4}$/.test(v.password)) return m.innerHTML = err('errPass');
    if (v.password !== v.password2) return m.innerHTML = err('errMatch');
    if (db[role + 's'].some(x => x.phone === v.phone)) return m.innerHTML = err('errExist');
    const u = { id: uid(role[0]), name: v.name.trim(), phone: v.phone, password: v.password, ...Object.fromEntries(LK.map(k => [k, v[k]])) };
    if (role === 'mentor') Object.assign(u, { education: v.education, availability: v.availability, contactPref: v.contactPref });
    else if (role === 'farmer') Object.assign(u, { farmLoc: v.farmLoc, contactPref: v.contactPref });
    else Object.assign(u, { age: +v.age, gender: v.gender, skills: [...f.querySelectorAll('[name=skills]:checked')].map(c => c.value), experience: +v.experience, expectedWage: +v.expectedWage, availability: v.availability });
    db[role + 's'].push(u); save(); setMe({ role, id: u.id });
    document.getElementById('app').innerHTML = `<div class="ok" style="font-size:24px;text-align:center">✅ ${t('regOk')}</div>`; setTimeout(() => go('dash'), 1200);
  },
  post(v) {
    const u = user(), r = { id: uid('r'), farmerId: u.id, crop: v.crop, workType: v.workType, labourersRequired: +v.labourersRequired, acceptedLabourers: 0, date: v.date, hours: v.hours, wage: +v.wage, extra: v.extra, ...Object.fromEntries(LK.map(k => [k, v[k]])), status: 'open' };
    db.requests.push(r);
    db.labourers.forEach(l => { const d = dist(r, l); if (d <= 25) db.notifs.push({ to: l.id, type: 'nJob', crop: r.crop, work: r.workType, d }); });
    save(); toast('✅ ' + t('posted')); go('reqs');
  },
  find(v) { flt = { crop: v.crop, wage: +v.cwage || +v.wage || 0, avail: v.avail, date: v.date, district: v.district, village: v.village }; go('results'); },
  wage(v) { user().expectedWage = +v.expectedWage; save(); toast('✅ ' + t('saved')); }
};
// ---------- router / render ----------
function setMe(m) { me = m; sessionStorage.fc_me = JSON.stringify(m); }
function go(v, a) { if (!me && !['home', 'login', 'how', 'about', 'auth'].includes(v)) v = 'home'; view = v; arg = a; modal(''); render(); scrollTo(0, 0); }
function render() {
  document.documentElement.lang = lang; document.getElementById('lang').value = lang;
  document.getElementById('nav').innerHTML = [['home', 'home'], ['how', 'how'], ['about', 'about']].map(([v, k]) => `<button data-go="${v}">${t(k)}</button>`).join('') + (me ? `<button data-go="${me.role === 'admin' ? 'admin' : 'dash'}">👤</button><button data-do="logout">${t('logout')}</button>` : `<button data-go="auth" data-a="farmer:login">${t('login')}</button>`);
  const b = document.getElementById('bottom'), fm = me?.role === 'farmer';
  b.className = me && me.role !== 'admin' ? 'show' : ''; b.style.display = '';
  b.innerHTML = me && me.role !== 'admin' ? (me.role === 'mentor' ? [['🏠', 'home', 'dash'], ['👥', 'myVillage', 'mvil'], ['💰', 'commission', 'mcomm'], ['👤', 'profile', 'profile']] : [['🏠', 'home', 'dash'], ['🔎', 'find', fm ? 'findL' : 'find'], ['📋', 'work', fm ? 'reqs' : 'myacc'], ['🔔', 'alerts', 'notifs'], ['👤', 'profile', 'profile']]).map(([i, k, v]) => `<button data-go="${v}" class="${view === v ? 'on' : ''}"><span>${i}</span>${t(k)}</button>`).join('') : '';
  if (view === 'dash' && me?.role === 'admin') view = 'admin';
  document.getElementById('app').innerHTML = (V[view] || V.home)();
  document.body.classList.toggle('on-home', view === 'home'); if (view === 'home') homeInit();
}
document.addEventListener('click', e => { const b = e.target.closest('[data-go],[data-do]'); if (!b) return; e.preventDefault(); if (b.dataset.go) go(b.dataset.go, b.dataset.a); else A[b.dataset.do]?.(b.dataset.a, b); });
document.addEventListener('submit', e => { e.preventDefault(); F[e.target.dataset.f]?.(Object.fromEntries(new FormData(e.target)), e.target); });
document.addEventListener('change', e => { if (e.target.dataset.loc) locChange(e.target); });
document.getElementById('lang').addEventListener('change', e => { lang = e.target.value; localStorage.fc_lang = lang; render(); });
render();
