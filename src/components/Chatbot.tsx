import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Mic, MicOff, Volume2, VolumeX, Phone, Calendar, MapPin, Square } from 'lucide-react';

interface QuickAction {
  label: string;
  labelHi: string;
  to?: string;      // internal route
  href?: string;    // external link / tel:
  icon?: 'phone' | 'calendar' | 'map';
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
  /** Short conversational version read aloud. Falls back to `text` when absent. */
  speech?: string;
  actions?: QuickAction[];
}

interface FaqEntry {
  keywords: string[];
  en: string;
  hi: string;
  /** Deeper detail, offered after the basic answer and sent when the user asks for more. */
  more?: { en: string; hi: string };
  actions?: QuickAction[];
}

const BOOK_ACTION: QuickAction = { label: 'Book an Appointment', labelHi: 'अपॉइंटमेंट बुक करें', to: '/appointment', icon: 'calendar' };
const CALL_ACTION: QuickAction = { label: 'Call 05946-223616', labelHi: 'कॉल करें 05946-223616', href: 'tel:05946223616', icon: 'phone' };
const DIRECTIONS_ACTION: QuickAction = { label: 'Get Directions', labelHi: 'रास्ता देखें', href: 'https://maps.google.com/?q=Vedanta+Netralya+Haldwani', icon: 'map' };

const FAQ_DATABASE: FaqEntry[] = [
  {
    keywords: ['cataract', 'motiyabind', 'phaco', 'cloudy', 'mics', 'lens replacement', 'safed motia', 'मोतियाबिंद', 'सफेद मोतिया'],
    en: "Cataract care is truly our home ground — it's what Vedanta Netralya is best known for in the Kumaon region. 😊\n\nOur surgeons perform Micro-Incision (MICS) phaco surgery with premium foldable lenses. There are no injections and no stitches, and most patients see clearly and return to daily life within 24 hours.\n\nIf you or a loved one has been noticing cloudy or dim vision, it's worth getting checked — we'd be glad to take a look.",
    hi: "मोतियाबिंद का इलाज वेदांत नेत्रालय की सबसे बड़ी पहचान है। 😊\n\nहमारे सर्जन बिना टांके, बिना इंजेक्शन के माइक्रो-इंसीज़न (MICS) फेको सर्जरी करते हैं, वो भी प्रीमियम फोल्डेबल लेंस के साथ। ज़्यादातर मरीज़ 24 घंटे में सामान्य जीवन में लौट आते हैं।\n\nअगर आपको या परिवार में किसी को धुंधला दिखता है, तो एक बार जाँच ज़रूर करवाएँ।",
    more: {
      en: "Here's the fuller picture on cataract surgery with us:\n\n🔬 **The procedure** — Micro-Incision Cataract Surgery (MICS) through a tiny opening, no stitches, no injection, usually under 15 minutes\n🔍 **Before surgery** — optical biometry on our ALADIN system calculates your exact lens power, plus a full retina and pressure check\n👁️ **Lens choice** — monofocal, multifocal, EDOF or toric, from Alcon, Zeiss and Johnson & Johnson\n🏥 **On the day** — day-care procedure, cardiac monitoring available, and general anaesthesia for patients who need it\n🔄 **Recovery** — most people see clearly within 24 hours; drops for a few weeks and avoid dust, rubbing and swimming\n🧒 **Children** — Dr. Sameer Varma also handles paediatric cataract, which needs a different approach entirely\n\nWe've done over 50,000 of these. Shall I help you book an evaluation?",
      hi: "मोतियाबिंद सर्जरी की पूरी जानकारी:\n\n🔬 **प्रक्रिया** — माइक्रो-इंसीज़न सर्जरी (MICS), बहुत छोटे छेद से, बिना टाँके, बिना इंजेक्शन, आमतौर पर 15 मिनट में\n🔍 **सर्जरी से पहले** — ALADIN बायोमेट्री से लेंस का सही नंबर, साथ में रेटिना और प्रेशर की जाँच\n👁️ **लेंस के विकल्प** — मोनोफोकल, मल्टीफोकल, EDOF या टोरिक — Alcon, Zeiss और Johnson & Johnson के\n🏥 **सर्जरी के दिन** — डे-केयर प्रक्रिया, कार्डियक मॉनिटरिंग और ज़रूरत पड़ने पर जनरल एनेस्थीसिया\n🔄 **रिकवरी** — ज़्यादातर लोग 24 घंटे में साफ देखने लगते हैं; कुछ हफ्ते ड्रॉप्स, और धूल, रगड़ने व तैराकी से बचें\n🧒 **बच्चों में** — डॉ. समीर वर्मा बच्चों का मोतियाबिंद भी करते हैं, जिसका तरीका अलग होता है\n\nहम 50,000 से ज़्यादा सर्जरी कर चुके हैं। क्या मैं जाँच के लिए अपॉइंटमेंट बुक करूँ?",
    },
    actions: [BOOK_ACTION, { label: 'Learn About Cataract', labelHi: 'मोतियाबिंद के बारे में जानें', to: '/cataract' }]
  },
  {
    keywords: ['glaucoma', 'kala motia', 'eye pressure', 'optic nerve', 'perimetry', 'काला मोतिया', 'ग्लूकोमा'],
    en: "Glaucoma (Kala Motia) is often called the 'silent thief of sight' because it damages vision gradually, without any warning signs. That's why early detection matters so much.\n\nAt Vedanta Netralya, our glaucoma clinic is headed by Dr. Sameer Varma, with advanced diagnostics like OCT and Perimetry available in-house. If glaucoma runs in your family or you're over 40, an annual pressure check is a very wise habit.",
    hi: "ग्लूकोमा (काला मोतिया) को 'नज़र का खामोश चोर' कहा जाता है — यह बिना किसी लक्षण के धीरे-धीरे दृष्टि छीन लेता है। इसलिए समय पर जाँच बहुत ज़रूरी है।\n\nवेदांत नेत्रालय में डॉ. समीर वर्मा के नेतृत्व में OCT और पेरीमेट्री जैसी आधुनिक जाँचें उपलब्ध हैं। अगर परिवार में किसी को ग्लूकोमा रहा है या आपकी उम्र 40 से ऊपर है, तो साल में एक बार जाँच ज़रूर करवाएँ।",
    more: {
      en: "More on how we handle glaucoma:\n\n🔍 **Diagnosis** — tonometry (both NCT and applanation) for eye pressure, perimetry for your visual field, gonioscopy to assess the drainage angle, and OCT of the optic nerve head with pachymetry\n💊 **Medical therapy** — pressure-lowering drops with nerve protection, reviewed regularly\n💡 **Laser** — YAG laser iridotomy for narrow angles, and Selective Laser Trabeculoplasty (SLT) to improve drainage\n🔪 **Surgery** — filtration trabeculectomy when drops and laser aren't enough\n\nThe important thing to understand: glaucoma damage can't be reversed, only halted. That's why we're firm about annual checks if you're over 40 or have family history.",
      hi: "ग्लूकोमा के इलाज की विस्तृत जानकारी:\n\n🔍 **जाँच** — प्रेशर के लिए टोनोमेट्री (NCT और अप्लनेशन), दृष्टि क्षेत्र के लिए पेरीमेट्री, गोनियोस्कोपी, और ऑप्टिक नर्व की OCT व पैकीमेट्री\n💊 **दवा** — प्रेशर कम करने वाली ड्रॉप्स, नियमित जाँच के साथ\n💡 **लेज़र** — संकरे एंगल के लिए YAG इरिडोटॉमी, और ड्रेनेज सुधारने के लिए SLT\n🔪 **सर्जरी** — जब दवा और लेज़र काफी न हों तो ट्रैबेक्युलेक्टमी\n\nसमझने वाली अहम बात: ग्लूकोमा से हुआ नुकसान वापस नहीं आता, सिर्फ रोका जा सकता है। इसलिए 40 के बाद या पारिवारिक इतिहास होने पर सालाना जाँच ज़रूरी है।",
    },
    actions: [BOOK_ACTION, { label: 'Glaucoma Services', labelHi: 'ग्लूकोमा सेवाएँ', to: '/glaucoma-services' }]
  },
  {
    keywords: ['specs removal', 'glasses', 'chashma', 'icl', 'rle', 'refractive', 'remove specs', 'spectacles', 'चश्मा', 'चश्मे'],
    en: "Dreaming of a life without glasses? You're not alone — it's one of the most common things patients ask us. 😊\n\nWe offer advanced options like ICL (Implantable Collamer Lens) and RLE (Refractive Lens Exchange) for permanent freedom from spectacles. The right procedure depends on your eye power, corneal health, and age — our surgeons will guide you honestly on what suits you best after a detailed evaluation.",
    hi: "चश्मे से आज़ादी का सपना? आप अकेले नहीं हैं — यह हमसे सबसे ज़्यादा पूछा जाने वाला सवाल है। 😊\n\nहम ICL (इम्प्लांटेबल कोलामर लेंस) और RLE जैसी आधुनिक प्रक्रियाएँ प्रदान करते हैं जिनसे चश्मे से स्थायी मुक्ति मिल सकती है। कौन सी प्रक्रिया आपके लिए सही है, यह आपके नंबर, कॉर्निया और उम्र पर निर्भर करता है — विस्तृत जाँच के बाद हमारे डॉक्टर आपको ईमानदारी से सलाह देंगे।",
    actions: [BOOK_ACTION, { label: 'Refractive Surgery Options', labelHi: 'रिफ्रैक्टिव सर्जरी विकल्प', to: '/refractive-surgery' }]
  },
  {
    keywords: ['lasik', 'laser', 'myopia', 'shortsight', 'nearsight', 'मायोपिया', 'लेसिक'],
    en: "LASIK is a laser procedure that gently reshapes the cornea to correct your eye power. It's a popular elective option for people who want to say goodbye to glasses.\n\nA quick honest note: LASIK isn't medically *necessary* for myopia — glasses correct vision just as well. But if you'd love the freedom, we can run a detailed suitability check and walk you through all your options, including ICL if LASIK isn't right for your eyes.",
    hi: "लेसिक एक लेज़र प्रक्रिया है जो कॉर्निया को हल्के से रीशेप करके आपका नंबर ठीक करती है। चश्मा हटाने के लिए यह एक लोकप्रिय विकल्प है।\n\nएक ईमानदार बात: मायोपिया के लिए लेसिक ज़रूरी नहीं है — चश्मा भी उतना ही अच्छा काम करता है। लेकिन अगर आप चश्मे से आज़ादी चाहते हैं, तो हम पूरी जाँच करके आपको सही सलाह देंगे — और अगर लेसिक आपकी आँखों के लिए उपयुक्त न हो, तो ICL जैसे विकल्प भी हैं।",
    actions: [BOOK_ACTION, { label: 'Refractive Surgery Options', labelHi: 'रिफ्रैक्टिव सर्जरी विकल्प', to: '/refractive-surgery' }]
  },
  {
    keywords: ['retina', 'retinal', 'diabetic', 'retinopathy', 'armd', 'amd', 'macular', 'parda', 'injection', 'anti-vegf', 'vegf', 'vitreo', 'पर्दा', 'रेटिना', 'डायबिटीज', 'शुगर'],
    en: "Retina care is very close to our heart. If you have diabetes or high blood pressure, your retina needs a check-up at least once a year — diabetic retinopathy can quietly damage vision long before you notice anything.\n\nOur retina clinic is led by Dr. Maj Aditya Bhardwaj, a fellowship-trained vitreo-retinal surgeon (Army Hospital R&R, Delhi). And here's a helpful tip: every Tuesday is our Retina Screening Day with 50% off on consultation and fundus evaluation. 🙌",
    hi: "अगर आपको डायबिटीज़ (शुगर) या हाई ब्लड प्रेशर है, तो साल में कम से कम एक बार रेटिना (पर्दे) की जाँच ज़रूर करवाएँ — डायबिटिक रेटिनोपैथी बिना लक्षण के नज़र को नुकसान पहुँचा सकती है।\n\nहमारा रेटिना क्लिनिक डॉ. मेजर आदित्य भारद्वाज (आर्मी हॉस्पिटल R&R, दिल्ली से प्रशिक्षित विट्रियो-रेटिनल सर्जन) के नेतृत्व में चलता है। और हाँ — हर मंगलवार को रेटिना स्क्रीनिंग डे पर जाँच शुल्क में 50% छूट मिलती है। 🙌",
    more: {
      en: "The full picture on our retina care:\n\n🔬 **Diagnostics** — OCT, B-scan ultrasonography, fundus photography with FFA, and 78D/90D clinical examination\n💉 **Treatments** — Anti-VEGF and corticosteroid injections, green laser photocoagulation, laser indirect ophthalmoscopy, PDT and cryotherapy\n🔪 **Surgery** — sutureless vitrectomy, retinal detachment repair, macular hole and ERM peeling, diabetic vitrectomy\n🩺 **Conditions** — diabetic retinopathy, ARMD, retinal vein occlusion, retinal tears and detachment\n\nDr. Maj Aditya Bhardwaj leads this, and his background in diabetology is a real advantage for diabetic eye disease. Every Tuesday is Retina Screening Day with 50% off consultation and fundus evaluation.",
      hi: "रेटिना देखभाल की पूरी जानकारी:\n\n🔬 **जाँच** — OCT, B-स्कैन अल्ट्रासोनोग्राफी, फंडस फोटोग्राफी व FFA, और 78D/90D जाँच\n💉 **इलाज** — एंटी-VEGF व स्टेरॉयड इंजेक्शन, ग्रीन लेज़र फोटोकोएगुलेशन, LIO, PDT और क्रायोथेरेपी\n🔪 **सर्जरी** — बिना टाँके की विट्रेक्टमी, रेटिनल डिटैचमेंट, मैक्युलर होल व ERM पीलिंग, डायबिटिक विट्रेक्टमी\n🩺 **बीमारियाँ** — डायबिटिक रेटिनोपैथी, ARMD, रेटिनल वेन ऑक्लूज़न, रेटिनल टियर व डिटैचमेंट\n\nडॉ. मेजर आदित्य भारद्वाज इसकी अगुवाई करते हैं, और डायबिटोलॉजी का उनका अनुभव बहुत काम आता है। हर मंगलवार रेटिना स्क्रीनिंग डे पर 50% छूट।",
    },
    actions: [BOOK_ACTION, { label: 'Retina Services', labelHi: 'रेटिना सेवाएँ', to: '/retina-services' }]
  },
  {
    keywords: ['child', 'children', 'kid', 'baby', 'infant', 'toddler', 'newborn', 'squint', 'strabismus', 'lazy eye', 'amblyopia', 'paediatric', 'pediatric', 'school', 'बच्चे', 'बच्चा', 'भेंगापन'],
    en: "Children's eyes deserve extra gentle care — and catching problems early makes all the difference for their learning and confidence.\n\nWe treat squint (crossed eyes), lazy eye (amblyopia), and childhood refractive errors. A lovely thing to know: every Wednesday we run a FREE eye screening clinic for children below 5 years — infants, toddlers, and pre-schoolers are all welcome, at no charge. 💙",
    hi: "बच्चों की आँखों को खास देखभाल चाहिए — और समय पर जाँच से उनकी पढ़ाई और आत्मविश्वास दोनों सुरक्षित रहते हैं।\n\nहम भेंगापन (squint), लेज़ी आई (amblyopia) और बच्चों के चश्मे के नंबर का इलाज करते हैं। एक अच्छी बात: हर बुधवार को 5 साल से छोटे बच्चों की आँखों की जाँच बिल्कुल मुफ़्त होती है। 💙",
    actions: [BOOK_ACTION, { label: 'Paediatric Eye Care', labelHi: 'बच्चों की नेत्र देखभाल', to: '/paediatric-ophthalmology' }]
  },
  {
    keywords: ['dry', 'strain', 'screen', 'computer', 'mobile', 'burning', 'itching', 'watering', 'tired', '20-20-20', 'थकान', 'जलन', 'सूखी'],
    en: "Ah, the modern screen-life struggle — you're definitely not alone! Tired, dry, or burning eyes after long hours on screens is one of the most common complaints we see.\n\nTry the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds. Blink consciously, keep your screen below eye level, and stay hydrated. If the dryness or strain persists, do come in — persistent dry eye is very treatable.",
    hi: "स्क्रीन के ज़माने की आम परेशानी — आप अकेले नहीं हैं! लंबे समय तक मोबाइल या कंप्यूटर देखने से आँखों में थकान, सूखापन या जलन बहुत आम है।\n\n20-20-20 नियम आज़माएँ: हर 20 मिनट में, 20 सेकंड के लिए 20 फीट दूर देखें। पलकें झपकाते रहें और पानी पीते रहें। अगर परेशानी बनी रहे, तो एक बार दिखा लें — ड्राई आई का इलाज आसानी से हो जाता है।",
    actions: [BOOK_ACTION]
  },
  {
    keywords: ['prevention', 'preventive', 'checkup', 'check up', 'screening', 'routine', 'protect', 'healthy eyes', 'बचाव', 'जाँच'],
    en: "Prevention truly is the best medicine for your eyes. Conditions like glaucoma and diabetic retinopathy can quietly damage vision with zero early symptoms — a simple annual check-up catches them in time.\n\nOur rule of thumb: everyone over 40, anyone with diabetes or BP, and all children before starting school should get their eyes examined once a year. We've also put together a full prevention guide on our website.",
    hi: "आँखों के लिए बचाव ही सबसे अच्छा इलाज है। ग्लूकोमा और डायबिटिक रेटिनोपैथी जैसी बीमारियाँ बिना किसी लक्षण के नज़र को नुकसान पहुँचाती हैं — साल में एक बार की सामान्य जाँच इन्हें समय पर पकड़ लेती है।\n\nहमारी सलाह: 40 की उम्र के बाद हर व्यक्ति, डायबिटीज़/बीपी वाले मरीज़, और स्कूल जाने से पहले हर बच्चे की आँखों की जाँच साल में एक बार ज़रूर हो।",
    actions: [{ label: 'Eye Prevention Guide', labelHi: 'नेत्र बचाव गाइड', to: '/prevention' }, BOOK_ACTION]
  },
  {
    keywords: ['appointment', 'book', 'booking', 'consult', 'consultation', 'schedule', 'slot', 'visit', 'अपॉइंटमेंट', 'बुक'],
    en: "Booking a visit is quick and easy — I can point you right to it. 😊\n\nYou can book online in under a minute (just your name, phone, preferred doctor, date and slot), or simply call our helpdesk at 05946-223616 / +91 90685 61971.\n\n🕘 Consultation slots: 9:30, 10:30, 11:30 AM and 2:30, 3:30, 4:30, 5:30 PM\n👨‍⚕️ Choose your doctor — Dr. Sameer Varma (cataract, glaucoma, oculoplasty, paediatric, refractive), Dr. Maj Aditya Bhardwaj (retina), or Dr. R.J.K. Singh (cataract & general).",
    hi: "अपॉइंटमेंट बुक करना बहुत आसान है। 😊\n\nआप एक मिनट में ऑनलाइन बुक कर सकते हैं (सिर्फ नाम, फोन, डॉक्टर, तारीख और समय चुनें), या हेल्पडेस्क पर कॉल करें: 05946-223616 / +91 90685 61971।\n\n🕘 परामर्श समय: सुबह 9:30, 10:30, 11:30 और दोपहर 2:30, 3:30, 4:30, 5:30\n👨‍⚕️ डॉक्टर चुनें — डॉ. समीर वर्मा (मोतियाबिंद, ग्लूकोमा, ऑक्यूलोप्लास्टी, बच्चे), डॉ. मेजर आदित्य भारद्वाज (रेटिना), या डॉ. आर.जे.के. सिंह (मोतियाबिंद व सामान्य)।",
    actions: [BOOK_ACTION, CALL_ACTION]
  },
  {
    keywords: ['sameer', 'varma', 'founder', 'समीर', 'वर्मा', 'संस्थापक'],
    en: "Dr. Sameer Varma is our Founder & Senior Eye Specialist. 😊\n\n🎓 M.S., Fellow — Sadguru Netra Chikitsalaya (SNC), Chitrakoot\n👁️ Comprehensive Ophthalmology, Cataract, Oculoplasty, Glaucoma & Paediatric Cataract\n\nHe is a high-volume surgeon with 50,000+ cataract surgeries, 4,000+ eyelid reconstructions and 2,000+ lacrimal (tear duct) surgeries to his name. Before founding Vedanta Netralya, he was Clinical In-charge at Eye Q Superspeciality Eye Hospital, Haldwani, from 2007 to 2017.",
    hi: "डॉ. समीर वर्मा हमारे संस्थापक और वरिष्ठ नेत्र विशेषज्ञ हैं। 😊\n\n🎓 M.S., फेलो — सद्गुरु नेत्र चिकित्सालय (SNC), चित्रकूट\n👁️ कम्प्रिहेंसिव ऑप्थैल्मोलॉजी, मोतियाबिंद, ऑक्यूलोप्लास्टी, ग्लूकोमा और बच्चों का मोतियाबिंद\n\nउन्होंने 50,000+ मोतियाबिंद सर्जरी, 4,000+ पलक पुनर्निर्माण और 2,000+ आँसू नली (लैक्रिमल) सर्जरी की हैं। वेदांत नेत्रालय की स्थापना से पहले वे 2007 से 2017 तक Eye Q सुपरस्पेशलिटी हॉस्पिटल, हल्द्वानी में क्लिनिकल इंचार्ज रहे।",
    actions: [{ label: 'Doctor Profiles', labelHi: 'डॉक्टर प्रोफ़ाइल', to: '/doctors' }, BOOK_ACTION]
  },
  {
    keywords: ['rjk', 'r.j.k', 'sitapur', 'kanpur', 'doms', 'सिंह', 'सीतापुर'],
    en: "Dr. R.J.K. Singh is our Senior Consultant Ophthalmologist — one of the most experienced eye surgeons in the region.\n\n🎓 DOMS, Kanpur University (1972); Senior Fellowship at Sitapur Eye Hospital\n👁️ Comprehensive Ophthalmology\n\nHe spent 35+ years with Sitapur Eye Hospital across its Uttarakhand branches, and later served three years as senior consultant at Eye Q Eye Hospital before joining us.",
    hi: "डॉ. आर.जे.के. सिंह हमारे वरिष्ठ सलाहकार नेत्र रोग विशेषज्ञ हैं — इस क्षेत्र के सबसे अनुभवी नेत्र सर्जनों में से एक।\n\n🎓 DOMS, कानपुर विश्वविद्यालय (1972); सीतापुर आँख अस्पताल से सीनियर फेलोशिप\n👁️ कम्प्रिहेंसिव ऑप्थैल्मोलॉजी\n\nउन्होंने सीतापुर आँख अस्पताल की उत्तराखंड शाखाओं में 35+ वर्ष कार्य किया, और उसके बाद तीन वर्ष Eye Q आई हॉस्पिटल में वरिष्ठ सलाहकार रहे।",
    actions: [{ label: 'Doctor Profiles', labelHi: 'डॉक्टर प्रोफ़ाइल', to: '/doctors' }, BOOK_ACTION]
  },
  {
    keywords: ['aditya', 'bhardwaj', 'maj', 'major', 'army', 'आदित्य', 'भारद्वाज'],
    en: "Dr. Maj Aditya Bhardwaj is our Vitreo-Retinal Surgeon, Medical Retina Specialist & Cataract Surgeon.\n\n🎓 MBBS, MS (Ophthalmology) — Army Hospital (R&R), New Delhi\n🎓 Fellowship in Vitreo-Retina Surgery — ASG Eye Hospital, Varanasi\n👁️ 10,000+ surgeries\n\nHe was formerly Vitreo-Retinal Surgeon & Deputy MS at KK Medical College & Hospital, and brings an unusual extra strength — a background in Family Medicine (CMC Vellore) and Diabetology, which matters a great deal in diabetic retina care.",
    hi: "डॉ. मेजर आदित्य भारद्वाज हमारे विट्रियो-रेटिनल सर्जन, मेडिकल रेटिना विशेषज्ञ और मोतियाबिंद सर्जन हैं।\n\n🎓 MBBS, MS (ऑप्थैल्मोलॉजी) — आर्मी हॉस्पिटल (R&R), नई दिल्ली\n🎓 विट्रियो-रेटिना सर्जरी में फेलोशिप — ASG आई हॉस्पिटल, वाराणसी\n👁️ 10,000+ सर्जरी\n\nवे पहले KK मेडिकल कॉलेज में विट्रियो-रेटिनल सर्जन और डिप्टी MS रह चुके हैं। उनके पास फैमिली मेडिसिन (CMC वेल्लोर) और डायबिटोलॉजी का भी अनुभव है, जो डायबिटिक रेटिना के इलाज में बहुत काम आता है।",
    actions: [{ label: 'Doctor Profiles', labelHi: 'डॉक्टर प्रोफ़ाइल', to: '/doctors' }, { label: 'Retina Services', labelHi: 'रेटिना सेवाएँ', to: '/retina-services' }]
  },
  {
    keywords: [
      'team', 'staff', 'support staff', 'administrative', 'admin', 'counsellor', 'counselor',
      'receptionist', 'manager', 'employee', 'directory', 'extension', 'who works',
      'टीम', 'स्टाफ', 'कर्मचारी', 'प्रबंधक'
    ],
    en: "Behind every surgery there's a whole team — 3 doctors and 26 support and administrative staff. 💙\n\nOur team works across six departments: Administration & Management, Optometry & Clinical, Front Office & Billing, Pharmacy & Optical, Marketing, and Support Services.\n\nYou can see everyone on our Team page, search by name or designation, and filter by department.",
    hi: "हर सर्जरी के पीछे एक पूरी टीम होती है — 3 डॉक्टर और 26 सहायक व प्रशासनिक कर्मचारी। 💙\n\nहमारी टीम छह विभागों में काम करती है: प्रशासन एवं प्रबंधन, ऑप्टोमेट्री एवं क्लिनिकल, फ्रंट ऑफिस एवं बिलिंग, फार्मेसी एवं ऑप्टिकल, मार्केटिंग, और सहायक सेवाएँ।\n\nआप टीम पेज पर सबको देख सकते हैं, नाम या पद से खोज सकते हैं, और विभाग से छाँट सकते हैं।",
    more: {
      en: "Here's how our team is organised:\n\n🧑‍💼 **Administration & Management** — Counselling Manager, Account Manager, Admin Incharge, Maintenance Manager and Clinical Manager\n👁️ **Optometry & Clinical** — Senior Optometrists, OT Technician, Nurse, OT Assistant and OT Runner\n🏢 **Front Office & Billing** — Receptionist, PROs and Billing Executives\n💊 **Pharmacy & Optical** — Optical Manager, Pharmacist, Pharmacy Executive, Optical and Sales Executives, and a Fitter\n📣 **Marketing** — Marketing Executive\n🛡️ **Support Services** — Security Guards and Driver\n\nFor privacy we don't share staff personal numbers here — our helpdesk on 05946-223616 will connect you to the right person.",
      hi: "हमारी टीम इस तरह संगठित है:\n\n🧑‍💼 **प्रशासन एवं प्रबंधन** — काउंसलिंग मैनेजर, अकाउंट मैनेजर, एडमिन इंचार्ज, मेंटेनेंस मैनेजर और क्लिनिकल मैनेजर\n👁️ **ऑप्टोमेट्री एवं क्लिनिकल** — सीनियर ऑप्टोमेट्रिस्ट, OT टेक्नीशियन, नर्स, OT असिस्टेंट और OT रनर\n🏢 **फ्रंट ऑफिस एवं बिलिंग** — रिसेप्शनिस्ट, PRO और बिलिंग एग्ज़ीक्यूटिव\n💊 **फार्मेसी एवं ऑप्टिकल** — ऑप्टिकल मैनेजर, फार्मासिस्ट, फार्मेसी एग्ज़ीक्यूटिव, ऑप्टिकल व सेल्स एग्ज़ीक्यूटिव, और फिटर\n📣 **मार्केटिंग** — मार्केटिंग एग्ज़ीक्यूटिव\n🛡️ **सहायक सेवाएँ** — सुरक्षा गार्ड और ड्राइवर\n\nनिजता के लिए हम स्टाफ के व्यक्तिगत नंबर साझा नहीं करते — 05946-223616 पर कॉल करें, हम आपको सही व्यक्ति से जोड़ देंगे।",
    },
    actions: [{ label: 'Our Doctors & Team', labelHi: 'हमारे डॉक्टर और टीम', to: '/doctors' }]
  },
  {
    keywords: [
      'doctor', 'doc', 'dr', 'surgeon', 'ophthalmologist', 'opthalmologist', 'optometrist',
      'eye specialist', 'eye doctor', 'specialist', 'consultant', 'physician', 'profile', 'qualification',
      'experience', 'panel', 'faculty', 'singh',
      'डॉक्टर', 'डाक्टर', 'सर्जन', 'नेत्र रोग विशेषज्ञ', 'विशेषज्ञ', 'चिकित्सक'
    ],
    en: "We're proud of our team — let me introduce them:\n\n👨‍⚕️ Dr. Sameer Varma — Founder & Senior Eye Specialist (M.S., Fellow SNC Chitrakoot). Cataract, Glaucoma, Oculoplasty & Paediatric Cataract. 50,000+ surgeries.\n👨‍⚕️ Dr. R.J.K. Singh — Senior Consultant Ophthalmologist (DOMS, Kanpur 1972). 35+ years with Sitapur Eye Hospital.\n👨‍⚕️ Dr. Maj Aditya Bhardwaj — Vitreo-Retinal & Cataract Surgeon (MS from Army Hospital R&R, Delhi). 10,000+ surgeries.\n\nOur panel also includes consulting surgeons and clinical support staff working in rotation. Ask me about any doctor by name and I'll share their full profile. 😊",
    hi: "हमें अपनी टीम पर गर्व है — मिलिए हमारे डॉक्टरों से:\n\n👨‍⚕️ डॉ. समीर वर्मा — संस्थापक और वरिष्ठ नेत्र विशेषज्ञ (M.S., फेलो SNC चित्रकूट)। मोतियाबिंद, ग्लूकोमा, ऑक्यूलोप्लास्टी। 50,000+ सर्जरी।\n👨‍⚕️ डॉ. आर.जे.के. सिंह — वरिष्ठ सलाहकार (DOMS, कानपुर 1972)। सीतापुर आँख अस्पताल में 35+ वर्ष।\n👨‍⚕️ डॉ. मेजर आदित्य भारद्वाज — विट्रियो-रेटिनल और मोतियाबिंद सर्जन (MS, आर्मी हॉस्पिटल R&R दिल्ली)। 10,000+ सर्जरी।\n\nहमारे पैनल में रोटेशन पर कंसल्टिंग सर्जन और क्लिनिकल स्टाफ भी हैं। किसी भी डॉक्टर का नाम लेकर पूछें — मैं उनकी पूरी जानकारी दूँगी। 😊",
    actions: [{ label: 'Meet Our Doctors', labelHi: 'हमारे डॉक्टरों से मिलें', to: '/doctors' }, BOOK_ACTION]
  },
  {
    keywords: [
      'speciality', 'specialty', 'specialities', 'specialties', 'service', 'department', 'ophthalmology',
      'what do you treat', 'what do you offer', 'what do you do', 'opd', 'all services',
      'विशेषता', 'सेवा', 'सेवाएँ', 'विभाग', 'इलाज'
    ],
    en: "We're a full-service eye hospital — here's what we look after:\n\n👁️ Cataract Surgery (MICS phaco, premium lenses)\n👁️ Glaucoma (Kala Motia) diagnosis & management\n👁️ Retina & Vitreo-Retinal Surgery\n👁️ Specs Removal — ICL & RLE\n👁️ Paediatric Ophthalmology & Squint\n👁️ Oculoplasty (eyelids, watering eyes)\n👁️ Optical Services & Contact Lenses\n\nWhich one would you like to know more about?",
    hi: "हम एक पूर्ण नेत्र चिकित्सालय हैं — हमारी विशेषताएँ:\n\n👁️ मोतियाबिंद सर्जरी (MICS फेको, प्रीमियम लेंस)\n👁️ ग्लूकोमा (काला मोतिया) की जाँच व इलाज\n👁️ रेटिना और विट्रियो-रेटिनल सर्जरी\n👁️ चश्मा हटाना — ICL और RLE\n👁️ बच्चों की नेत्र चिकित्सा व भेंगापन\n👁️ ऑक्यूलोप्लास्टी (पलकें, आँख से पानी आना)\n👁️ ऑप्टिकल सेवाएँ और कॉन्टैक्ट लेंस\n\nआप किसके बारे में और जानना चाहेंगे?",
    actions: [{ label: 'All Specialities', labelHi: 'सभी विशेषताएँ', to: '/services' }, BOOK_ACTION]
  },
  {
    keywords: ['location', 'address', 'branch', 'centre', 'center', 'haldwani', 'kichha', 'where', 'reach', 'directions', 'नवाबी', 'पता', 'कहाँ', 'हल्द्वानी', 'किच्छा'],
    en: "We have two centres:\n\n📍 **Haldwani (Main, Super-Speciality)**\nNawabi Road, near DPS Junior School, Subhash Nagar, Haldwani, Uttarakhand 263139\n☎️ 05946-223616 / +91 90685 61971\n🕘 Mon–Sat 9 AM–7 PM · Sun 9 AM–2 PM\n\n📍 **Kichha (Specialist Outreach Clinic)**\n1, Kichha, Uttarakhand 263148\n☎️ +91 79007 77709\n🕘 Mon–Sat 9 AM–6 PM\n\nTap 'Get Directions' below and Google Maps will bring you straight to our door.",
    hi: "हमारे दो केंद्र हैं:\n\n📍 **हल्द्वानी (मुख्य, सुपर-स्पेशलिटी)**\nनवाबी रोड, DPS जूनियर स्कूल के पास, सुभाष नगर, हल्द्वानी, उत्तराखंड 263139\n☎️ 05946-223616 / +91 90685 61971\n🕘 सोम–शनि सुबह 9 – शाम 7 · रवि सुबह 9 – दोपहर 2\n\n📍 **किच्छा (आउटरीच क्लिनिक)**\n1, किच्छा, उत्तराखंड 263148\n☎️ +91 79007 77709\n🕘 सोम–शनि सुबह 9 – शाम 6\n\nनीचे 'रास्ता देखें' दबाएँ — Google Maps आपको सीधे हम तक पहुँचा देगा।",
    actions: [DIRECTIONS_ACTION, { label: 'View All Centres', labelHi: 'सभी केंद्र देखें', to: '/centres' }]
  },
  {
    keywords: ['timing', 'timings', 'hours', 'open', 'close', 'sunday', 'time', 'kab', 'समय', 'खुला', 'टाइम'],
    en: "Here are our OPD timings:\n\n🕘 Monday – Saturday: 9:00 AM – 7:00 PM\n🕘 Sunday: 9:00 AM – 2:00 PM\n\nMornings are usually the quietest if you prefer a shorter wait. Shall I help you book a slot?",
    hi: "हमारा OPD समय:\n\n🕘 सोमवार – शनिवार: सुबह 9:00 – शाम 7:00\n🕘 रविवार: सुबह 9:00 – दोपहर 2:00\n\nअगर कम भीड़ चाहिए तो सुबह का समय सबसे अच्छा रहता है। क्या मैं अपॉइंटमेंट बुक करने में मदद करूँ?",
    actions: [BOOK_ACTION, CALL_ACTION]
  },
  {
    keywords: [
      'cost', 'price', 'fee', 'fees', 'charge', 'how much', 'surgery cost', 'operation cost',
      'treatment cost', 'package', 'estimate', 'bill', 'billing', 'payment', 'insurance', 'tpa',
      'cashless', 'cghs', 'echs', 'ayushman', 'खर्च', 'बीमा', 'फीस', 'कीमत', 'कितना'
    ],
    en: "We believe good eye care shouldn't come with surprise bills — our pricing is fully transparent.\n\nWe support all major TPA insurance networks for cashless treatment, and we're CGHS/ECHS panel friendly too. For exact costs for your specific treatment, our billing desk will give you a clear estimate before anything begins — just call or visit.",
    hi: "हम मानते हैं कि अच्छे इलाज में छुपे हुए खर्च नहीं होने चाहिए — हमारी कीमतें पूरी तरह पारदर्शी हैं।\n\nसभी प्रमुख TPA बीमा नेटवर्क से कैशलेस इलाज उपलब्ध है, और हम CGHS/ECHS पैनल से भी जुड़े हैं। आपके इलाज का सटीक खर्च जानने के लिए हमारे बिलिंग डेस्क पर कॉल करें या आएँ — इलाज से पहले पूरा अनुमान दिया जाता है।",
    more: {
      en: "More detail on costs and insurance:\n\n💳 **Cashless** — we work with all major TPA insurance networks, so approved treatment can be cashless. Bring your insurance card and a photo ID\n🏛️ **Government panels** — we're CGHS and ECHS panel friendly\n🧾 **Estimates** — our billing desk gives you a written estimate before anything begins, so there are no surprises\n💰 **What changes the price** — for cataract, the lens you choose is the biggest factor; a monofocal is considerably less than a multifocal or toric\n🗣️ **Counselling** — we have a separate counselling chamber with dedicated counsellors who'll walk you through the options honestly\n\nI can't quote exact figures — they depend on your eyes and your chosen lens. Please call 05946-223616 for a proper estimate.",
      hi: "खर्च और बीमा की विस्तृत जानकारी:\n\n💳 **कैशलेस** — सभी प्रमुख TPA बीमा नेटवर्क से कैशलेस इलाज उपलब्ध है। बीमा कार्ड और फोटो ID साथ लाएँ\n🏛️ **सरकारी पैनल** — हम CGHS और ECHS पैनल से जुड़े हैं\n🧾 **अनुमान** — इलाज से पहले बिलिंग डेस्क लिखित अनुमान देती है, कोई छुपा खर्च नहीं\n💰 **कीमत किस पर निर्भर** — मोतियाबिंद में सबसे बड़ा फर्क लेंस से पड़ता है; मोनोफोकल, मल्टीफोकल या टोरिक से काफी सस्ता होता है\n🗣️ **काउंसलिंग** — अलग काउंसलिंग चैंबर है जहाँ काउंसलर आपको ईमानदारी से सब समझाएँगे\n\nमैं सटीक राशि नहीं बता सकती — यह आपकी आँख और चुने गए लेंस पर निर्भर है। सही अनुमान के लिए 05946-223616 पर कॉल करें।",
    },
    actions: [CALL_ACTION, BOOK_ACTION]
  },
  {
    keywords: ['offer', 'offers', 'discount', 'free', 'special', 'camp', 'senior', 'tuesday', 'wednesday', 'friday', 'छूट', 'मुफ्त', 'ऑफर'],
    en: "Yes! We run special OPD days every week — here's what's on:\n\n🗓️ Tuesday — Retina Screening Day: 50% off consultation & fundus evaluation (great for diabetics & BP patients)\n🗓️ Wednesday — FREE eye screening for children below 5 years\n🗓️ Friday — Senior Citizen Day: 50% off OPD for everyone above 60\n\nPick your day and I'll help you book!",
    hi: "जी हाँ! हर हफ्ते हमारे स्पेशल OPD दिन होते हैं:\n\n🗓️ मंगलवार — रेटिना स्क्रीनिंग डे: जाँच शुल्क में 50% छूट (डायबिटीज़/बीपी के मरीज़ों के लिए)\n🗓️ बुधवार — 5 साल से छोटे बच्चों की मुफ़्त आँखों की जाँच\n🗓️ शुक्रवार — वरिष्ठ नागरिक दिवस: 60+ उम्र के लिए OPD में 50% छूट\n\nअपना दिन चुनें, मैं बुकिंग में मदद करता हूँ!",
    actions: [{ label: 'Offers & Updates', labelHi: 'ऑफर और अपडेट', to: '/updates' }, BOOK_ACTION]
  },
  {
    keywords: ['emergency', 'urgent', 'injury', 'injured', 'trauma', 'accident', 'chemical', 'acid', 'burn', 'sudden', 'vision loss', 'severe pain', 'red eye', 'चोट', 'दर्द', 'इमरजेंसी', 'आपातकाल'],
    en: "⚠️ If this is an eye emergency — an injury, chemical splash, sudden vision loss, or severe pain — please don't wait. Call us right away at 05946-223616 or +91 90685 61971, or come straight to the hospital.\n\nFor chemical splashes: rinse the eye gently with clean water for 10–15 minutes while you're on your way. Quick action can save vision.",
    hi: "⚠️ अगर यह आँख की इमरजेंसी है — चोट, केमिकल गिरना, अचानक दिखना बंद होना, या तेज़ दर्द — तो कृपया इंतज़ार न करें। तुरंत कॉल करें: 05946-223616 या +91 90685 61971, या सीधे अस्पताल आ जाएँ।\n\nकेमिकल गिरने पर: रास्ते में आते समय आँख को साफ पानी से 10–15 मिनट तक धीरे-धीरे धोएँ। जल्दी किया गया इलाज नज़र बचा सकता है।",
    actions: [CALL_ACTION, DIRECTIONS_ACTION]
  },
  {
    keywords: ['test', 'eye test', 'digital test', 'snellen', 'acuity', 'simulator', 'simulate', 'game', 'टेस्ट'],
    en: "Here's something fun — you can actually test your vision right on our website! 😄\n\nOur Digital Eye Test takes about 2 minutes (a Tumbling E acuity test). And if you're curious what conditions like cataract or night blindness actually *look* like, try the Sight Simulator on our Home page. Of course, nothing replaces a real check-up — but it's a great starting point!",
    hi: "एक मज़ेदार बात — आप हमारी वेबसाइट पर ही अपनी नज़र की जाँच कर सकते हैं! 😄\n\nहमारा डिजिटल आई टेस्ट सिर्फ 2 मिनट का है। और अगर आप जानना चाहते हैं कि मोतियाबिंद या रतौंधी में दुनिया कैसी दिखती है, तो होम पेज पर साइट सिम्युलेटर आज़माएँ। बेशक, असली जाँच की जगह कुछ नहीं ले सकता — पर शुरुआत के लिए बढ़िया है!",
    actions: [{ label: 'Take the Eye Test', labelHi: 'आई टेस्ट करें', to: '/test-eye' }]
  },
  {
    keywords: ['night blindness', 'nyctalopia', 'night vision', 'night driving', 'driving at night', 'dim light', 'ratondhi', 'रतौंधी', 'रात में'],
    en: "Night blindness (nyctalopia) makes it hard to see in dim light — driving at night often becomes the first struggle. It usually has an underlying cause: uncorrected eye power, early cataract, or sometimes a vitamin A deficiency.\n\nThe good news? Most causes are very treatable once identified. A simple examination will tell us exactly what's going on.",
    hi: "रतौंधी में कम रोशनी में देखना मुश्किल हो जाता है — अक्सर रात में गाड़ी चलाने में सबसे पहले परेशानी होती है। इसके पीछे कोई कारण होता है: चश्मे का नंबर, शुरुआती मोतियाबिंद, या कभी-कभी विटामिन A की कमी।\n\nअच्छी खबर? कारण पता चलने पर ज़्यादातर मामलों का इलाज आसानी से हो जाता है। एक सामान्य जाँच से सब साफ हो जाएगा।",
    actions: [BOOK_ACTION]
  },
  {
    keywords: ['oculoplasty', 'ptosis', 'droopy', 'eyelid', 'watering eye', 'stye', 'chalazion', 'पलक'],
    en: "Our oculoplasty department cares for everything around the eye — droopy eyelids (ptosis), constantly watering eyes, styes, chalazion, and cosmetic eyelid concerns.\n\nThese issues are often brushed off as 'minor', but they affect comfort and confidence every single day — and most have simple, effective treatments.",
    hi: "हमारा ऑक्यूलोप्लास्टी विभाग आँख के आसपास की हर समस्या का इलाज करता है — झुकी हुई पलकें (ptosis), लगातार पानी आना, गुहेरी (stye), और पलकों से जुड़ी कॉस्मेटिक समस्याएँ।\n\nइन्हें अक्सर 'छोटी बात' समझ लिया जाता है, पर ये रोज़ की तकलीफ देती हैं — और ज़्यादातर का इलाज आसान और असरदार है।",
    actions: [{ label: 'Oculoplasty Services', labelHi: 'ऑक्यूलोप्लास्टी सेवाएँ', to: '/oculoplasty-services' }, BOOK_ACTION]
  },
  {
    keywords: [
      'vitrectomy', 'mivs', 'retinal detachment', 'detachment', 'detached', 'macular hole', 'erm', 'epiretinal', 'vitreous',
      'floater', 'sfiol', 'sf-iol', 'scleral', 'vr surgery', 'dislocated lens', 'sutureless',
      'विट्रेक्टमी', 'रेटिनल डिटैचमेंट'
    ],
    en: "Vitreo-Retinal (VR) surgery is among the most delicate work we do, and it's led by Dr. Maj Aditya Bhardwaj.\n\nWhat we handle:\n• Sutureless Vitrectomy (MIVS)\n• Retinal Detachment repair\n• Macular Hole & ERM peeling\n• Diabetic Vitrectomy\n• Secondary & Scleral-Fixated IOL (SF-IOL)\n• Ocular trauma & subretinal surgery\n• Dislocated lens / nucleus retrieval\n\nA retinal detachment is time-sensitive — if you're seeing a sudden shower of floaters, flashes, or a curtain across your vision, please come in the same day.",
    hi: "विट्रियो-रेटिनल (VR) सर्जरी हमारे सबसे नाज़ुक कामों में से है, जिसकी अगुवाई डॉ. मेजर आदित्य भारद्वाज करते हैं।\n\nहम करते हैं:\n• बिना टाँके की विट्रेक्टमी (MIVS)\n• रेटिनल डिटैचमेंट (पर्दा उखड़ना) की सर्जरी\n• मैक्युलर होल और ERM पीलिंग\n• डायबिटिक विट्रेक्टमी\n• सेकेंडरी और स्क्लेरल-फिक्सेटेड IOL (SF-IOL)\n• आँख की चोट और सबरेटिनल सर्जरी\n• खिसके हुए लेंस को निकालना\n\nरेटिनल डिटैचमेंट में देर नहीं करनी चाहिए — अगर अचानक बहुत सारे काले धब्बे, चमक, या नज़र पर पर्दा जैसा दिखे तो उसी दिन दिखाएँ।",
    actions: [{ label: 'VR Surgery Details', labelHi: 'VR सर्जरी जानकारी', to: '/vr-surgery' }, CALL_ACTION]
  },
  {
    keywords: [
      'iol', 'intraocular', 'monofocal', 'multifocal', 'trifocal', 'toric', 'edof', 'symphony',
      'foldable', 'aspheric', 'premium lens', 'lens type', 'lens option', 'which lens', 'lens quality',
      'कौन सा लेंस', 'लेंस विकल्प'
    ],
    en: "Great question — the lens (IOL) choice really shapes your result after cataract surgery.\n\nWhat we offer:\n• Foldable Aspheric monofocal — excellent clarity, glasses usually needed for reading\n• Multifocal — distance and near together, far less dependence on glasses\n• EDOF (Symphony) — smooth continuous range of vision\n• Toric — corrects astigmatism (cylindrical power) at the same time\n• SF-IOL / AC IOL — for eyes without capsule support\n\nWe use lenses from Alcon, Zeiss and Johnson & Johnson. Our counsellors will honestly explain which suits your eye and budget — no upselling.",
    hi: "बढ़िया सवाल — मोतियाबिंद सर्जरी का नतीजा काफी हद तक लेंस (IOL) की पसंद पर निर्भर करता है।\n\nहमारे विकल्प:\n• फोल्डेबल एस्फेरिक मोनोफोकल — बेहतरीन साफ नज़र, पढ़ने के लिए चश्मा लगेगा\n• मल्टीफोकल — दूर और पास दोनों, चश्मे पर निर्भरता बहुत कम\n• EDOF (सिम्फनी) — लगातार बढ़िया रेंज\n• टोरिक — सिलिंड्रिकल नंबर (एस्टिग्मेटिज़्म) भी ठीक करता है\n• SF-IOL / AC IOL — जिन आँखों में सपोर्ट नहीं बचा हो\n\nहम Alcon, Zeiss और Johnson & Johnson के लेंस उपयोग करते हैं। हमारे काउंसलर ईमानदारी से बताएँगे कि आपकी आँख और बजट के लिए क्या सही है।",
    actions: [{ label: 'Cataract & Lenses', labelHi: 'मोतियाबिंद और लेंस', to: '/cataract' }, BOOK_ACTION]
  },
  {
    keywords: [
      'facility', 'infrastructure', 'operation theatre', 'operation theater', 'modular', 'ward', 'bed',
      'admission', 'admit', 'anesthesia', 'anaesthesia', 'pharmacy', 'medical store', 'power backup',
      'generator', 'air conditioned', 'counselling', 'counseling', 'hygiene', 'sterile', 'nabh',
      'सुविधा', 'ऑपरेशन थिएटर', 'भर्ती', 'वार्ड', 'दवा'
    ],
    en: "Vedanta Netralya is a newly built, fully air-conditioned super-specialty eye centre. Here's what's inside:\n\n🏥 Two modular Operation Theatres\n🛏️ Indoor ward with recovery beds & recliners\n💓 Cardiac monitoring + General Anaesthesia facility for vulnerable patients\n👁️ Lid & lacrimal surgery suite with ocular prosthesis support\n🧒 Dedicated paediatric clinic\n💊 In-house pharmacy and optical store\n🗣️ Separate counselling chamber with dedicated counsellors\n⚡ 24-hour generator power backup\n\nWe follow strict NABH safety standards and sterile OT protocol.",
    hi: "वेदांत नेत्रालय एक नया बना, पूरी तरह वातानुकूलित सुपर-स्पेशलिटी नेत्र केंद्र है। अंदर क्या है:\n\n🏥 दो मॉड्यूलर ऑपरेशन थिएटर\n🛏️ रिकवरी बेड और रिक्लाइनर के साथ इनडोर वार्ड\n💓 कार्डियक मॉनिटरिंग और जनरल एनेस्थीसिया की सुविधा\n👁️ पलक और आँसू नली सर्जरी सुइट, कृत्रिम आँख की सुविधा सहित\n🧒 बच्चों के लिए अलग क्लिनिक\n💊 अपनी फार्मेसी और ऑप्टिकल स्टोर\n🗣️ अलग काउंसलिंग चैंबर\n⚡ 24 घंटे जनरेटर बैकअप\n\nहम NABH सुरक्षा मानकों और स्टेराइल OT प्रोटोकॉल का सख्ती से पालन करते हैं।",
    actions: [{ label: 'Hospital Facilities', labelHi: 'अस्पताल सुविधाएँ', to: '/facilities' }, BOOK_ACTION]
  },
  {
    keywords: [
      'ambulance', 'ambulance charge', 'ambulance cost', 'ambulance fee', 'pick up', 'pickup', 'drop',
      'transport', 'vehicle', 'rudrapur', 'kashipur', 'moradabad', 'bareilly', 'gadarpur', 'pant nagar',
      'एम्बुलेंस', 'गाड़ी', 'रुद्रपुर'
    ],
    en: "Yes, we have an ambulance service for patients travelling to us. Current charges:\n\n🚑 Haldwani local (up to 10 km one way) — ₹300\n🚑 Kichha / Gadarpur / Pant Nagar — ₹900\n🚑 Rudrapur — ₹900\n🚑 Kashipur — ₹1,400\n🚑 Moradabad — ₹1,800\n🚑 Bareilly — ₹2,000\n\nTo arrange a pick-up, please call 05946-223616 and our helpdesk will organise it for you.",
    hi: "जी हाँ, मरीज़ों के लिए हमारी एम्बुलेंस सेवा उपलब्ध है। मौजूदा शुल्क:\n\n🚑 हल्द्वानी लोकल (10 किमी तक, एक तरफ) — ₹300\n🚑 किच्छा / गदरपुर / पंतनगर — ₹900\n🚑 रुद्रपुर — ₹900\n🚑 काशीपुर — ₹1,400\n🚑 मुरादाबाद — ₹1,800\n🚑 बरेली — ₹2,000\n\nएम्बुलेंस बुक करने के लिए 05946-223616 पर कॉल करें, हमारी हेल्पडेस्क व्यवस्था कर देगी।",
    actions: [CALL_ACTION, { label: 'Hospital Facilities', labelHi: 'अस्पताल सुविधाएँ', to: '/facilities' }]
  },
  {
    keywords: [
      'optical', 'spectacle', 'frame', 'eyewear', 'lens', 'contact lens', 'blue cut', 'blue-cut',
      'blue light', 'computer glasses', 'progressive', 'bifocal', 'high index', 'showroom',
      'optical store', 'power check', 'refraction', 'goggles',
      'ऑप्टिकल', 'फ्रेम', 'कॉन्टैक्ट लेंस', 'दुकान'
    ],
    en: "Vedanta Optical is our in-house showroom — so you can get your eyes checked and your glasses made in one visit. 😊\n\n👓 Premium progressive & bifocal lenses (no visible lines)\n💻 Therapeutic blue-cut computer lenses for screen strain\n👁️ Contact lens clinic — soft, disposable, toric, RGP and cosmetic colour lenses\n🪶 High-index ultra-thin lenses for high powers\n🔬 Computerized auto-refraction stations\n🕶️ Open-display selection of Indian and imported frames for every budget\n\nEvery lens is verified for power and alignment before it's handed to you.",
    hi: "वेदांत ऑप्टिकल हमारा अपना शोरूम है — एक ही विज़िट में जाँच भी और चश्मा भी। 😊\n\n👓 प्रीमियम प्रोग्रेसिव और बाइफोकल लेंस (बिना लाइन के)\n💻 स्क्रीन की थकान के लिए ब्लू-कट कंप्यूटर लेंस\n👁️ कॉन्टैक्ट लेंस क्लिनिक — सॉफ्ट, डिस्पोजेबल, टोरिक, RGP और कलर लेंस\n🪶 ज़्यादा नंबर के लिए हाई-इंडेक्स पतले लेंस\n🔬 कंप्यूटराइज़्ड ऑटो-रिफ्रैक्शन जाँच\n🕶️ हर बजट के लिए भारतीय और इम्पोर्टेड फ्रेम्स का खुला डिस्प्ले\n\nहर लेंस का नंबर और अलाइनमेंट देने से पहले जाँचा जाता है।",
    actions: [{ label: 'Optical Services', labelHi: 'ऑप्टिकल सेवाएँ', to: '/optical-services' }, BOOK_ACTION]
  },
  {
    keywords: [
      'oct', 'perimetry', 'tonometry', 'gonioscopy', 'pachymetry', 'topography', 'biometry', 'aladin',
      'b scan', 'b-scan', 'ultrasonography', 'ffa', 'fundus', 'angiography', 'machine', 'equipment',
      'technology', 'diagnostic', 'zeiss', 'alcon', 'yag', 'मशीन', 'तकनीक', 'जाँच'
    ],
    en: "We've invested heavily in diagnostics, because the right treatment starts with the right diagnosis.\n\n🔬 OCT (retina & optic nerve head)\n🔬 Perimetry / visual field analysis\n🔬 Tonometry (NCT & applanation) and gonioscopy\n🔬 Pachymetry & corneal topography\n🔬 Optical biometry (ALADIN) for lens power calculation\n🔬 B-scan ultrasonography\n🔬 Fundus photography & FFA\n💡 YAG laser (capsulotomy, iridotomy), SLT and green laser photocoagulation\n\nOur equipment is from Alcon, Zeiss and Johnson & Johnson — all in-house, so you're rarely sent elsewhere for a test.",
    hi: "हमने जाँच उपकरणों पर बहुत निवेश किया है, क्योंकि सही इलाज सही जाँच से ही शुरू होता है।\n\n🔬 OCT (रेटिना और ऑप्टिक नर्व)\n🔬 पेरीमेट्री / विज़ुअल फील्ड जाँच\n🔬 टोनोमेट्री (NCT और अप्लनेशन), गोनियोस्कोपी\n🔬 पैकीमेट्री और कॉर्नियल टोपोग्राफी\n🔬 ऑप्टिकल बायोमेट्री (ALADIN) — लेंस पावर की गणना\n🔬 B-स्कैन अल्ट्रासोनोग्राफी\n🔬 फंडस फोटोग्राफी और FFA\n💡 YAG लेज़र, SLT और ग्रीन लेज़र फोटोकोएगुलेशन\n\nहमारे उपकरण Alcon, Zeiss और Johnson & Johnson के हैं — सब अस्पताल में ही, इसलिए जाँच के लिए बाहर भेजने की ज़रूरत नहीं पड़ती।",
    actions: [{ label: 'Hospital Facilities', labelHi: 'अस्पताल सुविधाएँ', to: '/facilities' }, BOOK_ACTION]
  },
  {
    keywords: [
      'about', 'history', 'founded', 'established', 'story', 'why choose', 'choose', 'why vedanta', 'legacy',
      'hospital', 'years', 'patients treated', 'how many surgeries', 'how many patients',
      'statistic', 'track record', 'success rate', 'award', 'reputation',
      'इतिहास', 'स्थापना', 'के बारे में', 'अस्पताल'
    ],
    en: "Vedanta Netralya was founded in 2017 by Dr. Sameer Varma, and has grown from a local eye clinic into a super-specialty eye institute for the Kumaon region. 💙\n\n📈 18+ years of surgical experience\n📈 50,000+ successful surgeries\n📈 1,50,000+ patients treated\n\nOur journey: 2017 foundation in Haldwani → 2020 retina & VR wing → 2025 new state-of-the-art centre with two modular OTs → 2026, celebrating 50,000 smiles restored.\n\nWhat we hold ourselves to: ethical treatment decisions, transparent billing, board-certified surgeons, and technology from Alcon, Zeiss and Johnson & Johnson.",
    hi: "वेदांत नेत्रालय की स्थापना 2017 में डॉ. समीर वर्मा ने की थी। एक स्थानीय क्लिनिक से यह कुमाऊँ क्षेत्र का सुपर-स्पेशलिटी नेत्र संस्थान बन चुका है। 💙\n\n📈 18+ वर्षों का सर्जिकल अनुभव\n📈 50,000+ सफल सर्जरी\n📈 1,50,000+ मरीज़ों का इलाज\n\nहमारा सफ़र: 2017 हल्द्वानी में स्थापना → 2020 रेटिना और VR विंग → 2025 दो मॉड्यूलर OT के साथ नया आधुनिक केंद्र → 2026, 50,000 मुस्कानें।\n\nहमारे सिद्धांत: ईमानदार इलाज, पारदर्शी बिलिंग, अनुभवी सर्जन, और Alcon, Zeiss व Johnson & Johnson की तकनीक।",
    actions: [{ label: 'About Vedanta Netralya', labelHi: 'हमारे बारे में', to: '/about' }, { label: 'Vision & Mission', labelHi: 'विज़न और मिशन', to: '/vision-mission' }]
  },
  {
    keywords: ['mission', 'motto', 'core value', 'philosophy', 'purpose', 'ethic', 'मिशन', 'उद्देश्य', 'मूल्य'],
    en: "Our motto says it best: \"Premium, Personal, Comprehensive and Ethical eye care through the best experts with the highest level of quality and technology.\"\n\nOur mission is to provide premium and comprehensive eye care from the most experienced experts in the field — and the four values we're judged by are patient integrity, clinical rigour, advanced technology, and uncompromising safety.",
    hi: "हमारा ध्येय वाक्य: \"सर्वोत्तम विशेषज्ञों द्वारा उच्चतम गुणवत्ता और तकनीक के साथ प्रीमियम, व्यक्तिगत, व्यापक और नैतिक नेत्र चिकित्सा।\"\n\nहमारा मिशन है — क्षेत्र के सबसे अनुभवी विशेषज्ञों से प्रीमियम और संपूर्ण नेत्र देखभाल देना। हमारे चार मूल्य हैं: मरीज़ के प्रति ईमानदारी, क्लिनिकल कठोरता, आधुनिक तकनीक, और बिना समझौते की सुरक्षा।",
    actions: [{ label: 'Vision & Mission', labelHi: 'विज़न और मिशन', to: '/vision-mission' }]
  },
  {
    keywords: ['review', 'testimonial', 'rating', 'feedback', 'patient story', 'google review', 'समीक्षा', 'रिव्यू', 'अनुभव'],
    en: "We'd rather let our patients speak for us. 😊 We have a whole page of patient reviews and video testimonials — real people from Haldwani, Kichha and across Kumaon sharing how their surgery went.\n\nIt's honestly the best way to judge us before you visit.",
    hi: "हमारी बात से बेहतर है हमारे मरीज़ों की बात। 😊 हमारे पास मरीज़ों की समीक्षाओं और वीडियो टेस्टिमोनियल का पूरा पेज है — हल्द्वानी, किच्छा और पूरे कुमाऊँ के असली लोग अपना अनुभव बता रहे हैं।\n\nआने से पहले हमें परखने का यही सबसे अच्छा तरीका है।",
    actions: [{ label: 'Patient Reviews', labelHi: 'मरीज़ों की समीक्षा', to: '/reviews' }, { label: 'Testimonials', labelHi: 'प्रशंसापत्र', to: '/testimonials' }]
  },
  {
    keywords: ['gallery', 'video', 'photo', 'picture', 'image', 'tour', 'youtube', 'reel', 'गैलरी', 'वीडियो', 'फोटो', 'तस्वीर'],
    en: "You can take a proper look around before you come. 😊 Our gallery has videos of the hospital, the operation theatre, our team and our infrastructure, plus photos of the centre.",
    hi: "आने से पहले आप अस्पताल को अच्छे से देख सकते हैं। 😊 हमारी गैलरी में अस्पताल, ऑपरेशन थिएटर, हमारी टीम और इंफ्रास्ट्रक्चर के वीडियो और फोटो हैं।",
    actions: [{ label: 'View Gallery', labelHi: 'गैलरी देखें', to: '/gallery' }]
  },
  {
    keywords: [
      'contact', 'phone number', 'contact number', 'mobile number', 'email', 'email address', 'mail', 'whatsapp',
      'helpline', 'helpdesk', 'enquiry', 'inquiry', 'reception', 'संपर्क', 'फोन नंबर', 'ईमेल'
    ],
    en: "Here's how to reach us:\n\n☎️ Haldwani: 05946-223616 / +91 90685 61971\n☎️ Kichha: +91 79007 77709\n🚨 Emergency: +91 90685 61971\n✉️ admin@vedantanetralya.com\n\nOur helpdesk is happiest to help between 9 AM and 7 PM (Mon–Sat).",
    hi: "हमसे संपर्क करने के तरीके:\n\n☎️ हल्द्वानी: 05946-223616 / +91 90685 61971\n☎️ किच्छा: +91 79007 77709\n🚨 इमरजेंसी: +91 90685 61971\n✉️ admin@vedantanetralya.com\n\nहमारी हेल्पडेस्क सोम–शनि सुबह 9 से शाम 7 बजे तक उपलब्ध है।",
    actions: [CALL_ACTION, { label: 'Contact Page', labelHi: 'संपर्क पेज', to: '/contact' }]
  },
  {
    keywords: ['conjunctivitis', 'eye flu', 'pink eye', 'infection', 'first aid', 'flush', 'dust', 'आँख आना', 'संक्रमण'],
    en: "If something has gone into your eye, here's the safe way to flush it:\n\n1️⃣ Wash your hands thoroughly first\n2️⃣ Use sterile saline or clean lukewarm drinking water\n3️⃣ Tilt your head to the side and pour gently from the inner corner (near the nose) outward — this stops debris washing into the other eye\n4️⃣ Blink softly while flushing\n\nPlease don't rub the eye. For eye flu / conjunctivitis, avoid sharing towels and see us if there's pain, light sensitivity or blurring — those need examination, not just drops.",
    hi: "अगर आँख में कुछ चला गया है, तो धोने का सही तरीका:\n\n1️⃣ पहले हाथ अच्छी तरह धोएँ\n2️⃣ स्टेराइल सलाइन या साफ गुनगुना पीने का पानी लें\n3️⃣ सिर एक तरफ झुकाएँ और नाक की तरफ वाले कोने से बाहर की ओर धीरे-धीरे डालें — इससे गंदगी दूसरी आँख में नहीं जाती\n4️⃣ धोते समय हल्के से पलकें झपकाएँ\n\nआँख को रगड़ें नहीं। आँख आना (कंजंक्टिवाइटिस) में तौलिया साझा न करें, और अगर दर्द, रोशनी से चुभन या धुंधलापन हो तो ज़रूर दिखाएँ — सिर्फ ड्रॉप्स काफी नहीं।",
    actions: [{ label: 'Prevention Guide', labelHi: 'बचाव गाइड', to: '/prevention' }, CALL_ACTION]
  },
  {
    keywords: ['what can you do', 'help me', 'options', 'menu', 'topics', 'guide me', 'क्या कर सकती', 'मदद'],
    en: "Happy to help! Here's what I can tell you about:\n\n👁️ Treatments — cataract, glaucoma, retina, VR surgery, specs removal, children's eyes, oculoplasty, dry eye\n👨‍⚕️ Our doctors — ask by name for a full profile\n🔬 Diagnostics, lens (IOL) options and optical/eyewear\n🏥 Facilities, ambulance charges, both our centres\n📅 Appointments, timings, weekly offers, insurance & fees\n🚨 Eye emergencies and first aid\n\nJust ask in English or हिन्दी — whatever is comfortable. 😊",
    hi: "ज़रूर! मैं इन सब के बारे में बता सकती हूँ:\n\n👁️ इलाज — मोतियाबिंद, ग्लूकोमा, रेटिना, VR सर्जरी, चश्मा हटाना, बच्चों की आँखें, ऑक्यूलोप्लास्टी, ड्राई आई\n👨‍⚕️ हमारे डॉक्टर — नाम लेकर पूछें, पूरी जानकारी दूँगी\n🔬 जाँच मशीनें, लेंस (IOL) विकल्प और ऑप्टिकल/चश्मा\n🏥 सुविधाएँ, एम्बुलेंस शुल्क, दोनों केंद्र\n📅 अपॉइंटमेंट, समय, साप्ताहिक ऑफर, बीमा और फीस\n🚨 आँख की इमरजेंसी और प्राथमिक उपचार\n\nअंग्रेज़ी या हिन्दी — जिसमें सहज हों, पूछिए। 😊",
    actions: [BOOK_ACTION, CALL_ACTION]
  }
];

// Replies are written to be READ — bullet lists, addresses, phone numbers, opening hours.
// Spoken aloud that sounds mechanical no matter how good the voice is, so each answer gets a
// short conversational version. The full detail stays on screen; Naina just talks you through it.
// Keyed by the entry's first keyword, which is unique across FAQ_DATABASE.
const SPOKEN_SUMMARIES: Record<string, { en: string; hi: string }> = {
  cataract: {
    en: "Cataract care is what we're best known for. Our surgeons use micro-incision phaco surgery with premium foldable lenses — no injections, no stitches — and most patients are back to daily life within a day.",
    hi: "मोतियाबिंद का इलाज हमारी सबसे बड़ी पहचान है। हमारे सर्जन बिना टाँके, बिना इंजेक्शन के माइक्रो-इंसीज़न फेको सर्जरी करते हैं, और ज़्यादातर मरीज़ एक दिन में सामान्य जीवन में लौट आते हैं।",
  },
  glaucoma: {
    en: "Glaucoma, or kala motia, takes sight away slowly without any warning signs, so early detection really matters. Our glaucoma clinic is headed by Doctor Sameer Varma, with advanced testing available in house.",
    hi: "ग्लूकोमा यानी काला मोतिया बिना किसी लक्षण के धीरे-धीरे नज़र छीन लेता है, इसलिए समय पर जाँच बहुत ज़रूरी है। हमारा ग्लूकोमा क्लिनिक डॉक्टर समीर वर्मा के नेतृत्व में चलता है।",
  },
  'specs removal': {
    en: "Yes, we offer permanent freedom from glasses through options like I C L and refractive lens exchange. Which one suits you depends on your eye power and corneal health, and our surgeons will guide you honestly after a detailed check.",
    hi: "जी हाँ, चश्मे से स्थायी छुटकारे के लिए हमारे पास आई सी एल और आर एल ई जैसे विकल्प हैं। आपके लिए कौन सा सही है, यह विस्तृत जाँच के बाद हमारे डॉक्टर ईमानदारी से बताएँगे।",
  },
  lasik: {
    en: "LASIK is a laser procedure that reshapes the cornea to correct your power. Honestly, it isn't medically necessary — glasses work just as well — but if you'd love the freedom, we can check whether it suits your eyes.",
    hi: "लेसिक एक लेज़र प्रक्रिया है जो कॉर्निया को रीशेप करके आपका नंबर ठीक करती है। यह ज़रूरी नहीं है, पर अगर आप चश्मे से आज़ादी चाहते हैं तो हम पूरी जाँच करके सही सलाह देंगे।",
  },
  retina: {
    en: "If you have diabetes or high blood pressure, please get your retina checked at least once a year. Our retina clinic is led by Doctor Major Aditya Bhardwaj, and every Tuesday is our retina screening day with half off consultation.",
    hi: "अगर आपको शुगर या हाई ब्लड प्रेशर है तो साल में एक बार रेटिना की जाँच ज़रूर करवाएँ। हमारा रेटिना क्लिनिक डॉक्टर मेजर आदित्य भारद्वाज के नेतृत्व में चलता है, और हर मंगलवार जाँच शुल्क में पचास प्रतिशत छूट मिलती है।",
  },
  child: {
    en: "Children's eyes deserve gentle, early care. We treat squint, lazy eye and childhood power problems — and every Wednesday, eye screening for children under five is completely free.",
    hi: "बच्चों की आँखों को समय पर और कोमल देखभाल चाहिए। हम भेंगापन, लेज़ी आई और बच्चों के नंबर का इलाज करते हैं, और हर बुधवार पाँच साल से छोटे बच्चों की जाँच बिल्कुल मुफ़्त है।",
  },
  dry: {
    en: "Tired, dry or burning eyes after long screen time is one of the commonest things we see. Try the twenty twenty twenty rule — every twenty minutes, look at something far away for twenty seconds. If it persists, do come in.",
    hi: "स्क्रीन के बाद आँखों में थकान, सूखापन या जलन बहुत आम है। बीस-बीस-बीस नियम आज़माएँ — हर बीस मिनट में बीस सेकंड के लिए दूर देखें। अगर परेशानी बनी रहे तो एक बार दिखा लें।",
  },
  prevention: {
    en: "Prevention really is the best medicine for your eyes. Everyone over forty, anyone with diabetes or blood pressure, and every child before starting school should have their eyes examined once a year.",
    hi: "आँखों के लिए बचाव ही सबसे अच्छा इलाज है। चालीस से ऊपर हर व्यक्ति, शुगर या बीपी वाले मरीज़, और स्कूल जाने से पहले हर बच्चे की जाँच साल में एक बार ज़रूर होनी चाहिए।",
  },
  appointment: {
    en: "Booking is quick and easy. You can book online in under a minute, or simply call our helpdesk. I've put the slot timings and the doctor choices on screen for you.",
    hi: "अपॉइंटमेंट बुक करना बहुत आसान है। आप एक मिनट में ऑनलाइन बुक कर सकते हैं, या हेल्पडेस्क पर कॉल करें। समय और डॉक्टर के विकल्प मैंने स्क्रीन पर दिखा दिए हैं।",
  },
  sameer: {
    en: "Doctor Sameer Varma is our founder and senior eye specialist, trained at Sadguru Netra Chikitsalaya in Chitrakoot. He has performed over fifty thousand cataract surgeries. His full profile is on screen.",
    hi: "डॉक्टर समीर वर्मा हमारे संस्थापक और वरिष्ठ नेत्र विशेषज्ञ हैं, जिन्होंने चित्रकूट के सद्गुरु नेत्र चिकित्सालय से प्रशिक्षण लिया। उन्होंने पचास हज़ार से ज़्यादा मोतियाबिंद सर्जरी की हैं। पूरी जानकारी स्क्रीन पर है।",
  },
  rjk: {
    en: "Doctor R J K Singh is our senior consultant ophthalmologist, with more than thirty five years at Sitapur Eye Hospital. His full profile is on screen.",
    hi: "डॉक्टर आर जे के सिंह हमारे वरिष्ठ सलाहकार नेत्र रोग विशेषज्ञ हैं, जिन्हें सीतापुर आँख अस्पताल में पैंतीस वर्ष से अधिक का अनुभव है। पूरी जानकारी स्क्रीन पर है।",
  },
  aditya: {
    en: "Doctor Major Aditya Bhardwaj is our vitreo-retinal surgeon, trained at the Army Hospital in New Delhi, with a fellowship in retina surgery. His full profile is on screen.",
    hi: "डॉक्टर मेजर आदित्य भारद्वाज हमारे विट्रियो-रेटिनल सर्जन हैं, जिन्होंने नई दिल्ली के आर्मी हॉस्पिटल से प्रशिक्षण और रेटिना सर्जरी में फेलोशिप की है। पूरी जानकारी स्क्रीन पर है।",
  },
  team: {
    en: "Behind every surgery there's a whole team, and we're proud of ours. Our team page has both our medical specialists and our support and administrative staff — counsellors, optical, pharmacy, accounts and administration. You can search by name or designation, or filter by department.",
    hi: "हर सर्जरी के पीछे एक पूरी टीम होती है, और हमें अपनी टीम पर गर्व है। हमारे टीम पेज पर मेडिकल विशेषज्ञ और सहायक व प्रशासनिक स्टाफ दोनों हैं — काउंसलर, ऑप्टिकल, फार्मेसी, अकाउंट्स और प्रशासन। आप नाम या पद से खोज सकते हैं, या विभाग से छाँट सकते हैं।",
  },
  doctor: {
    en: "We have three senior eye surgeons — Doctor Sameer Varma, Doctor R J K Singh, and Doctor Major Aditya Bhardwaj. Their profiles are on screen, and you can ask me about any of them by name.",
    hi: "हमारे तीन वरिष्ठ नेत्र सर्जन हैं — डॉक्टर समीर वर्मा, डॉक्टर आर जे के सिंह, और डॉक्टर मेजर आदित्य भारद्वाज। उनकी जानकारी स्क्रीन पर है, और आप किसी का भी नाम लेकर पूछ सकते हैं।",
  },
  speciality: {
    en: "We're a full service eye hospital — cataract, glaucoma, retina, specs removal, children's eye care, oculoplasty and optical services. The full list is on screen. Which one would you like to know more about?",
    hi: "हम एक पूर्ण नेत्र चिकित्सालय हैं — मोतियाबिंद, ग्लूकोमा, रेटिना, चश्मा हटाना, बच्चों की देखभाल, ऑक्यूलोप्लास्टी और ऑप्टिकल सेवाएँ। पूरी सूची स्क्रीन पर है। आप किसके बारे में जानना चाहेंगे?",
  },
  location: {
    en: "We have two centres — our main super-specialty hospital in Haldwani, and an outreach clinic in Kichha. I've put both addresses, phone numbers and timings on screen, and you can tap get directions below.",
    hi: "हमारे दो केंद्र हैं — हल्द्वानी में मुख्य सुपर-स्पेशलिटी अस्पताल, और किच्छा में आउटरीच क्लिनिक। दोनों के पते, फोन नंबर और समय स्क्रीन पर हैं, और नीचे रास्ता देखें दबा सकते हैं।",
  },
  timing: {
    en: "We're open Monday to Saturday, nine in the morning to seven in the evening, and Sunday morning until two. Mornings are usually the quietest. Shall I help you book a slot?",
    hi: "हम सोमवार से शनिवार सुबह नौ से शाम सात बजे तक, और रविवार सुबह नौ से दोपहर दो बजे तक खुले रहते हैं। सुबह सबसे कम भीड़ होती है। क्या मैं अपॉइंटमेंट बुक करने में मदद करूँ?",
  },
  cost: {
    en: "Our pricing is fully transparent, with no surprise bills. We support all major cashless insurance networks, and we're C G H S and E C H S panel friendly. Our billing desk will give you a clear estimate before anything begins.",
    hi: "हमारी कीमतें पूरी तरह पारदर्शी हैं, कोई छुपा हुआ खर्च नहीं। सभी प्रमुख कैशलेस बीमा नेटवर्क उपलब्ध हैं, और हम सी जी एच एस और ई सी एच एस पैनल से भी जुड़े हैं। इलाज से पहले बिलिंग डेस्क पूरा अनुमान दे देगी।",
  },
  offer: {
    en: "Yes! Tuesday is retina screening day with half off, Wednesday is free eye screening for children under five, and Friday is senior citizen day with half off O P D. The details are on screen — pick your day and I'll help you book.",
    hi: "जी हाँ! मंगलवार रेटिना स्क्रीनिंग डे है जिसमें आधी छूट है, बुधवार को पाँच साल से छोटे बच्चों की जाँच मुफ़्त है, और शुक्रवार वरिष्ठ नागरिक दिवस है जिसमें ओ पी डी पर आधी छूट है। अपना दिन चुनें, मैं बुकिंग में मदद करूँगी।",
  },
  emergency: {
    en: "If this is an eye emergency, please don't wait — call us right away, or come straight to the hospital. For a chemical splash, rinse the eye gently with clean water for ten to fifteen minutes while you're on your way. Quick action can save vision.",
    hi: "अगर यह आँख की इमरजेंसी है तो इंतज़ार न करें — तुरंत कॉल करें या सीधे अस्पताल आ जाएँ। केमिकल गिरने पर रास्ते में आते समय आँख को साफ पानी से दस से पंद्रह मिनट धोएँ। जल्दी किया गया इलाज नज़र बचा सकता है।",
  },
  test: {
    en: "Here's something fun — you can test your vision right on our website. The digital eye test takes about two minutes, and there's a sight simulator on our home page. Nothing replaces a real check-up, but it's a great starting point.",
    hi: "एक मज़ेदार बात — आप हमारी वेबसाइट पर ही अपनी नज़र जाँच सकते हैं। डिजिटल आई टेस्ट सिर्फ दो मिनट का है, और होम पेज पर साइट सिम्युलेटर भी है। असली जाँच की जगह कुछ नहीं, पर शुरुआत के लिए बढ़िया है।",
  },
  'night blindness': {
    en: "Night blindness makes it hard to see in dim light, and driving at night is often the first struggle. It usually has a treatable cause — uncorrected power, an early cataract, or sometimes a vitamin deficiency.",
    hi: "रतौंधी में कम रोशनी में देखना मुश्किल हो जाता है, और अक्सर रात में गाड़ी चलाने में सबसे पहले परेशानी होती है। इसका कारण आमतौर पर ठीक हो सकता है — चश्मे का नंबर, शुरुआती मोतियाबिंद, या विटामिन की कमी।",
  },
  oculoplasty: {
    en: "Our oculoplasty department cares for everything around the eye — droopy eyelids, constantly watering eyes, styes and eyelid concerns. These are often brushed off as minor, but most have simple, effective treatments.",
    hi: "हमारा ऑक्यूलोप्लास्टी विभाग आँख के आसपास की हर समस्या देखता है — झुकी पलकें, लगातार पानी आना, गुहेरी और पलकों की समस्याएँ। इन्हें छोटी बात समझ लिया जाता है, पर ज़्यादातर का इलाज आसान है।",
  },
  vitrectomy: {
    en: "Vitreo-retinal surgery is led by Doctor Major Aditya Bhardwaj, covering retinal detachment, macular hole and diabetic vitrectomy. The full list is on screen. A detachment is urgent — if you're seeing sudden floaters, flashes, or a curtain across your vision, please come in the same day.",
    hi: "विट्रियो-रेटिनल सर्जरी डॉक्टर मेजर आदित्य भारद्वाज करते हैं — रेटिनल डिटैचमेंट, मैक्युलर होल और डायबिटिक विट्रेक्टमी। पूरी सूची स्क्रीन पर है। डिटैचमेंट में देर न करें — अगर अचानक काले धब्बे, चमक या पर्दा दिखे तो उसी दिन आएँ।",
  },
  iol: {
    en: "The lens choice really shapes your result after cataract surgery. We offer monofocal, multifocal, extended depth of focus and toric lenses, from Alcon, Zeiss and Johnson and Johnson. The options are on screen, and our counsellors will honestly explain what suits your eye and your budget.",
    hi: "मोतियाबिंद सर्जरी का नतीजा काफी हद तक लेंस पर निर्भर करता है। हमारे पास मोनोफोकल, मल्टीफोकल, ई डी ओ एफ और टोरिक लेंस हैं। विकल्प स्क्रीन पर हैं, और हमारे काउंसलर ईमानदारी से बताएँगे कि आपकी आँख और बजट के लिए क्या सही है।",
  },
  facility: {
    en: "We're a newly built, fully air-conditioned super-specialty centre — two modular operation theatres, an indoor ward, general anaesthesia facility, an in-house pharmacy and optical store, and round the clock power backup. The full list is on screen.",
    hi: "हम एक नया बना, पूरी तरह वातानुकूलित सुपर-स्पेशलिटी केंद्र हैं — दो मॉड्यूलर ऑपरेशन थिएटर, इनडोर वार्ड, जनरल एनेस्थीसिया, अपनी फार्मेसी और ऑप्टिकल स्टोर, और चौबीस घंटे पावर बैकअप। पूरी सूची स्क्रीन पर है।",
  },
  ambulance: {
    en: "Yes, we have an ambulance service for patients travelling to us. The charge depends on the distance — I've put the full list on screen. To arrange a pick-up, just call our helpdesk and they'll organise it.",
    hi: "जी हाँ, हमारी एम्बुलेंस सेवा उपलब्ध है। शुल्क दूरी पर निर्भर करता है — पूरी सूची स्क्रीन पर है। एम्बुलेंस बुक करने के लिए हेल्पडेस्क पर कॉल करें, वे व्यवस्था कर देंगे।",
  },
  optical: {
    en: "Vedanta Optical is our in-house showroom, so you can get your eyes checked and your glasses made in one visit. We do progressive and bifocal lenses, blue-cut computer lenses, contact lenses, and a wide range of frames for every budget.",
    hi: "वेदांत ऑप्टिकल हमारा अपना शोरूम है, इसलिए एक ही विज़िट में जाँच भी और चश्मा भी। प्रोग्रेसिव और बाइफोकल लेंस, ब्लू-कट कंप्यूटर लेंस, कॉन्टैक्ट लेंस, और हर बजट के फ्रेम उपलब्ध हैं।",
  },
  oct: {
    en: "We've invested heavily in diagnostics, because the right treatment starts with the right diagnosis. O C T, perimetry, corneal topography, optical biometry, ultrasound and laser systems — all in house, so you're rarely sent elsewhere for a test.",
    hi: "हमने जाँच उपकरणों पर बहुत निवेश किया है, क्योंकि सही इलाज सही जाँच से शुरू होता है। ओ सी टी, पेरीमेट्री, टोपोग्राफी, बायोमेट्री, अल्ट्रासाउंड और लेज़र — सब अस्पताल में ही, इसलिए बाहर जाने की ज़रूरत नहीं पड़ती।",
  },
  about: {
    en: "Vedanta Netralya was founded in twenty seventeen by Doctor Sameer Varma, and has grown from a local clinic into a super-specialty eye institute for the Kumaon region, with over fifty thousand successful surgeries. Our full story is on screen.",
    hi: "वेदांत नेत्रालय की स्थापना दो हज़ार सत्रह में डॉक्टर समीर वर्मा ने की थी। एक छोटे क्लिनिक से यह कुमाऊँ का सुपर-स्पेशलिटी नेत्र संस्थान बन चुका है, जहाँ पचास हज़ार से ज़्यादा सफल सर्जरी हो चुकी हैं। पूरी कहानी स्क्रीन पर है।",
  },
  mission: {
    en: "Our motto says it best — premium, personal, comprehensive and ethical eye care, through the best experts, with the highest level of quality and technology.",
    hi: "हमारा ध्येय वाक्य ही सब कह देता है — सर्वोत्तम विशेषज्ञों द्वारा, उच्चतम गुणवत्ता और तकनीक के साथ, प्रीमियम, व्यक्तिगत, व्यापक और नैतिक नेत्र चिकित्सा।",
  },
  review: {
    en: "We'd rather let our patients speak for us. There's a whole page of patient reviews and video testimonials from across Kumaon — honestly, it's the best way to judge us before you visit.",
    hi: "हमारी बात से बेहतर है हमारे मरीज़ों की बात। पूरे कुमाऊँ के मरीज़ों की समीक्षाओं और वीडियो का एक पूरा पेज है — आने से पहले हमें परखने का यही सबसे अच्छा तरीका है।",
  },
  gallery: {
    en: "You can take a proper look around before you come. Our gallery has videos of the hospital, the operation theatre, our team and our infrastructure, plus photos of the centre.",
    hi: "आने से पहले आप अस्पताल को अच्छे से देख सकते हैं। हमारी गैलरी में अस्पताल, ऑपरेशन थिएटर, टीम और इंफ्रास्ट्रक्चर के वीडियो और फोटो हैं।",
  },
  contact: {
    en: "You can reach our Haldwani hospital, our Kichha clinic, or our emergency line — I've put all the numbers and our email address on screen. Our helpdesk is available nine to seven, Monday to Saturday.",
    hi: "आप हमारे हल्द्वानी अस्पताल, किच्छा क्लिनिक, या इमरजेंसी लाइन पर संपर्क कर सकते हैं — सभी नंबर और ईमेल स्क्रीन पर हैं। हमारी हेल्पडेस्क सोमवार से शनिवार, सुबह नौ से शाम सात बजे तक उपलब्ध है।",
  },
  conjunctivitis: {
    en: "If something has gone into your eye, wash your hands first, then flush gently with clean water from the inner corner outward, blinking softly. Please don't rub the eye. The full steps are on screen — and if there's pain, light sensitivity or blurring, do come in.",
    hi: "अगर आँख में कुछ चला गया है तो पहले हाथ धोएँ, फिर साफ पानी से नाक की तरफ वाले कोने से बाहर की ओर धीरे-धीरे धोएँ, और हल्के से पलकें झपकाएँ। आँख रगड़ें नहीं। पूरे चरण स्क्रीन पर हैं — दर्द, चुभन या धुंधलापन हो तो ज़रूर दिखाएँ।",
  },
  'what can you do': {
    en: "Happy to help! I can tell you about our treatments, our doctors, lens options, diagnostics, facilities, both our centres, appointments, timings, fees and weekly offers — and what to do in an eye emergency. Just ask in English or Hindi, whichever is comfortable.",
    hi: "ज़रूर! मैं इलाज, डॉक्टर, लेंस विकल्प, जाँच, सुविधाएँ, दोनों केंद्र, अपॉइंटमेंट, समय, फीस और साप्ताहिक ऑफर के बारे में बता सकती हूँ — और इमरजेंसी में क्या करें, वो भी। अंग्रेज़ी या हिन्दी, जिसमें सहज हों, पूछिए।",
  },
};

const GREETING_KEYWORDS = ['hi', 'hello', 'hey', 'namaste', 'namaskar', 'good morning', 'good afternoon', 'good evening', 'नमस्ते', 'नमस्कार', 'हैलो', 'हेलो'];
const THANKS_KEYWORDS = ['thank', 'thanks', 'thankyou', 'dhanyavad', 'shukriya', 'धन्यवाद', 'शुक्रिया'];
const BYE_KEYWORDS = ['bye', 'goodbye', 'good bye', 'alvida', 'अलविदा'];
const IDENTITY_KEYWORDS = ['who are you', 'your name', 'what are you', 'तुम कौन', 'आप कौन', 'तुम्हारा नाम'];
// Follow-ups that mean "expand on what you just told me"
const MORE_KEYWORDS = [
  'more', 'tell me more', 'more detail', 'more details', 'more info', 'detail', 'details',
  'explain', 'elaborate', 'go deeper', 'full detail', 'in detail', 'know more', 'yes please',
  'और बताएं', 'और बताइए', 'विस्तार', 'विस्तार से', 'ज्यादा जानकारी', 'पूरी जानकारी', 'और जानकारी',
];

/** Invitation appended to a basic answer when deeper detail is available. */
const MORE_HINT_EN = "\n\nThere's quite a bit more I can tell you about this — just say \"tell me more\" and I'll go into detail. 😊";
const MORE_HINT_HI = "\n\nइस बारे में मैं और भी बहुत कुछ बता सकती हूँ — बस \"और बताइए\" कहें, मैं विस्तार से समझाऊँगी। 😊";

const GREETINGS_EN = [
  "Namaste! 🙏 So glad you stopped by. I'm Naina, Vedanta Netralya's virtual assistant. Whether it's about a treatment, our doctors, timings, or booking a visit — just ask away!",
  "Hello there! 😊 I'm Naina, and I'm here to make your visit to Vedanta Netralya easier. What can I help you with today?",
  "Namaste! 🙏 Welcome to Vedanta Netralya. How are your eyes treating you today? Ask me anything — treatments, doctors, timings, or offers."
];
const GREETINGS_HI = [
  "नमस्ते! 🙏 वेदांत नेत्रालय में आपका हार्दिक स्वागत है। मैं नैना हूँ, आपकी सहायक। इलाज, डॉक्टर, समय या अपॉइंटमेंट — कुछ भी पूछिए!",
  "नमस्ते! 😊 मैं नैना हूँ। आज मैं आपकी आँखों की देखभाल में कैसे मदद कर सकती हूँ?",
  "नमस्कार! 🙏 वेदांत नेत्रालय में आपका स्वागत है। आपकी आँखों का हाल कैसा है? कुछ भी पूछें — इलाज, डॉक्टर, समय या ऑफर।"
];

const FALLBACKS_EN = [
  "Hmm, that's a bit outside what I know — but I don't want to leave you without an answer! Our helpdesk team would love to help you personally at 05946-223616.\n\nMeanwhile, I can tell you about treatments (cataract, glaucoma, retina, VR surgery, specs removal, children's eyes, oculoplasty), our doctors, lens options, diagnostics, facilities, ambulance charges, both our centres, timings, fees and weekly offers. 😊",
  "That's a good question — and honestly, our team at the hospital can answer it much better than I can! Give them a ring at 05946-223616.\n\nTry me on any of these: doctor profiles, appointment booking, our specialities, hospital facilities, optical & eyewear, insurance, or our weekly special OPD days."
];
const FALLBACKS_HI = [
  "माफ़ कीजिए, यह मेरी जानकारी से थोड़ा बाहर है — लेकिन आपको बिना जवाब के नहीं छोड़ूँगी! हमारी हेल्पडेस्क टीम आपकी मदद करेगी: 05946-223616।\n\nमैं आपको इलाज (मोतियाबिंद, ग्लूकोमा, रेटिना, VR सर्जरी, चश्मा हटाना, बच्चों की आँखें, ऑक्यूलोप्लास्टी), डॉक्टर, लेंस विकल्प, जाँच मशीनें, सुविधाएँ, एम्बुलेंस शुल्क, दोनों केंद्र, समय, फीस और ऑफर के बारे में बता सकती हूँ। 😊",
  "अच्छा सवाल है — इसका जवाब हमारे अस्पताल की टीम बेहतर दे पाएगी! कृपया कॉल करें: 05946-223616।\n\nमुझसे ये पूछ सकते हैं: डॉक्टर की जानकारी, अपॉइंटमेंट, हमारी विशेषताएँ, अस्पताल की सुविधाएँ, ऑप्टिकल और चश्मा, बीमा, या साप्ताहिक स्पेशल OPD दिन।"
];

const QUICK_REPLIES = [
  { en: '📅 Book appointment', hi: '📅 अपॉइंटमेंट बुक करें', query: { en: 'How do I book an appointment?', hi: 'अपॉइंटमेंट कैसे बुक करें?' } },
  { en: '👨‍⚕️ Our doctors', hi: '👨‍⚕️ हमारे डॉक्टर', query: { en: 'Tell me about your doctors', hi: 'डॉक्टर के बारे में बताएं' } },
  { en: '🎁 Weekly offers', hi: '🎁 साप्ताहिक ऑफर', query: { en: 'What offers do you have?', hi: 'क्या ऑफर हैं?' } },
  { en: '🕘 Timings', hi: '🕘 समय', query: { en: 'What are your timings?', hi: 'आपका समय क्या है?' } },
  { en: '💳 Insurance & fees', hi: '💳 बीमा और फीस', query: { en: 'Do you accept insurance?', hi: 'क्या बीमा चलता है?' } },
  { en: '👁️ Our specialities', hi: '👁️ हमारी विशेषताएँ', query: { en: 'What specialities do you have?', hi: 'आपकी विशेषताएँ क्या हैं?' } },
  { en: '🏥 Facilities', hi: '🏥 सुविधाएँ', query: { en: 'What facilities does the hospital have?', hi: 'अस्पताल में क्या सुविधाएँ हैं?' } },
  { en: '📍 Our centres', hi: '📍 हमारे केंद्र', query: { en: 'Where are you located?', hi: 'आपका पता कहाँ है?' } },
];

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const containsKeyword = (query: string, keyword: string): boolean => {
  if (/[ऀ-ॿ]/.test(keyword)) return query.includes(keyword);
  // Allow plurals: "doctors"/"branches" match "doctor"/"branch", and "facilities" matches "facility"
  const stem = /y$/i.test(keyword)
    ? `${escapeRegExp(keyword.slice(0, -1))}(?:y|ies)`
    : `${escapeRegExp(keyword)}(?:e?s)?`;
  return new RegExp(`\\b${stem}\\b`, 'i').test(query);
};

// Naina is a feminine persona, so she should speak with a female voice wherever the browser offers one.
// NOTE: check the female list first — "female" itself contains "male".
const FEMALE_VOICE_HINTS = [
  'female', 'neerja', 'heera', 'kalpana', 'swara', 'lekha', 'veena', 'aditi', 'raveena', 'kajal',
  'zira', 'aria', 'jenny', 'michelle', 'samantha', 'susan', 'catherine', 'sonia', 'joanna', 'salli',
];
const MALE_VOICE_HINTS = [
  'male', 'rishi', 'ravi', 'madhur', 'hemant', 'prabhat', 'kabir', 'arjun',
  'david', 'mark', 'george', 'guy', 'daniel', 'alex', 'fred', 'rishabh',
];
// Modern neural engines. These sound dramatically smoother than the legacy
// system voices below, so quality outranks having a local accent.
const SMOOTH_VOICE_HINTS = ['google', 'natural', 'neural', 'enhanced', 'premium', 'siri', 'online'];
// Legacy SAPI/eSpeak voices — intelligible, but flat and robotic.
const ROBOTIC_VOICE_HINTS = ['heera', 'kalpana', 'zira', 'hazel', 'susan', 'espeak', 'microsoft'];

const pickFemaleVoice = (
  voices: SpeechSynthesisVoice[],
  lang: 'hi' | 'en'
): SpeechSynthesisVoice | null => {
  if (!voices.length) return null;
  const prefix = lang === 'hi' ? 'hi' : 'en';
  const pool = voices.filter(v => v.lang.toLowerCase().startsWith(prefix));
  if (!pool.length) return null;

  const scoreOf = (v: SpeechSynthesisVoice) => {
    const name = v.name.toLowerCase();
    const isFemale = FEMALE_VOICE_HINTS.some(h => name.includes(h));
    const isMale = !isFemale && MALE_VOICE_HINTS.some(h => name.includes(h));
    let score = 0;
    if (isFemale) score += 10;
    if (isMale) score -= 20;
    // Smoothness first: a neural voice in a non-local accent beats a robotic local one
    if (SMOOTH_VOICE_HINTS.some(h => name.includes(h))) score += 8;
    if (ROBOTIC_VOICE_HINTS.some(h => name.includes(h))) score -= 4;
    if (/-in$/i.test(v.lang)) score += 2;   // a local accent is a tie-breaker, not a priority
    return score;
  };

  const best = pool.reduce((a, b) => (scoreOf(b) > scoreOf(a) ? b : a));
  return scoreOf(best) > 0 ? best : null;
};

// Browsers truncate or stall on long utterances, so replies are read out in short pieces.
// Keep this well under ~15s of speech per chunk.
const MAX_SPEECH_CHUNK = 200;

// Chat replies are written to be *read*, not spoken — strip the visual furniture first.
const toSpeechText = (text: string): string =>
  text
    .replace(/\*\*/g, '')                                  // markdown bold marks
    .replace(/₹\s?([\d,]+)/g, '$1 rupees')                 // ₹300 → "300 rupees"
    .replace(/\s+\/\s+/g, ', ')                            // "05946-223616 / +91..." reads as "slash"
    .replace(/\s*–\s*/g, ' to ')                           // en dash: "Mon–Sat", "9 AM–7 PM"
    .replace(/\s*—\s*/g, ', ')                             // em dash: a spoken pause, not a word
    // emoji, keycaps, bullets, arrows and other decorative glyphs
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{20E3}\u{2022}\u{00B7}]/gu, ' ')
    .replace(/[^\S\n]+/g, ' ')                             // collapse spaces, keep line breaks
    .trim();

const toSpeechChunks = (text: string): string[] => {
  const chunks: string[] = [];

  const pushWrapped = (piece: string) => {
    let rest = piece.trim();
    while (rest.length > MAX_SPEECH_CHUNK) {            // last resort: a sentence with no punctuation
      let cut = rest.lastIndexOf(' ', MAX_SPEECH_CHUNK);
      if (cut <= 0) cut = MAX_SPEECH_CHUNK;
      chunks.push(rest.slice(0, cut).trim());
      rest = rest.slice(cut).trim();
    }
    if (rest) chunks.push(rest);
  };

  for (const line of toSpeechText(text).split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;                              // blank lines become natural gaps
    if (trimmed.length <= MAX_SPEECH_CHUNK) { chunks.push(trimmed); continue; }

    // Group whole sentences together until they'd overflow a chunk
    const sentences = trimmed.match(/[^.!?।]+[.!?।]*/g) || [trimmed];
    let buffer = '';
    for (const sentence of sentences) {
      const merged = `${buffer} ${sentence}`.trim();
      if (merged.length > MAX_SPEECH_CHUNK && buffer) { pushWrapped(buffer); buffer = sentence.trim(); }
      else buffer = merged;
    }
    if (buffer) pushWrapped(buffer);
  }

  return chunks;
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Namaste! 🙏 I'm Naina, your personal guide at Vedanta Netralya.\n\nAsk me anything — cataract surgery, specs removal, our doctors, timings, or this week's special OPD offers. I'm happy to help in English or हिन्दी.",
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const languageRef = useRef<'en' | 'hi'>('en');
  const variantCounter = useRef(0);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const speechRunRef = useRef(0);
  const lastTopicRef = useRef<FaqEntry | null>(null);

  // Voices load asynchronously in most browsers, so keep a fresh copy around
  useEffect(() => {
    const loadVoices = () => { voicesRef.current = window.speechSynthesis.getVoices(); };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  useEffect(() => {
    const handleOpenBot = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpenBot);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('open-chatbot', handleOpenBot);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    languageRef.current = newLang;
    stopSpeaking();

    const switchMsg: Message = newLang === 'hi'
      ? { sender: 'bot', text: "बहुत बढ़िया, अब हम हिन्दी में बात करेंगे! 😊 बताइए, मैं आपकी क्या मदद कर सकती हूँ?" }
      : { sender: 'bot', text: "Great, we'll chat in English now! 😊 So, how can I help you today?" };
    setMessages(prev => [...prev, switchMsg]);

    if (recognitionRef.current) {
      recognitionRef.current.lang = newLang === 'hi' ? 'hi-IN' : 'en-IN';
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-IN';

      rec.onstart = () => setIsListening(true);
      rec.onend = () => setIsListening(false);
      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        if (text.trim()) handleSendMessage(text);
      };

      recognitionRef.current = rec;
    }
  }, []);

  const stopSpeaking = () => {
    speechRunRef.current++;   // invalidates any chunks still queued from the previous reply
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const speakText = (text: string) => {
    if (isMuted) return;

    const run = ++speechRunRef.current;
    window.speechSynthesis.cancel();

    const chunks = toSpeechChunks(text);
    if (!chunks.length) return;

    const hasHindi = /[ऀ-ॿ]/.test(text);
    const voices = voicesRef.current.length ? voicesRef.current : window.speechSynthesis.getVoices();
    const femaleVoice = pickFemaleVoice(voices, hasHindi ? 'hi' : 'en');
    const voice = femaleVoice
      || voices.find(v => v.lang.toLowerCase().startsWith(hasHindi ? 'hi' : 'en'))
      || null;

    // Queue every chunk up front and let the engine play them back to back. Chaining each
    // chunk off the previous one's `onend` would be tidier, but browsers drop that event
    // often enough that the rest of the reply would go silent.
    const speakAll = () => {
      if (run !== speechRunRef.current) return;   // a newer reply took over while we waited

      chunks.forEach((chunk, index) => {
        const utterance = new SpeechSynthesisUtterance(chunk);
        if (voice) {
          utterance.voice = voice;
          utterance.lang = voice.lang;   // a lang/voice mismatch drops engines to a robotic default
        } else {
          utterance.lang = hasHindi ? 'hi-IN' : 'en-IN';
        }
        utterance.rate = 1.0;
        // Only nudge the pitch when we had to settle for a non-female voice
        utterance.pitch = femaleVoice ? 1.0 : 1.1;

        if (index === 0) {
          utterance.onstart = () => { if (run === speechRunRef.current) setIsSpeaking(true); };
        }
        if (index === chunks.length - 1) {
          const finish = () => { if (run === speechRunRef.current) setIsSpeaking(false); };
          utterance.onend = finish;
          utterance.onerror = finish;
        }

        window.speechSynthesis.speak(utterance);
      });
    };

    // Chrome drops an utterance queued in the same tick as cancel()
    setTimeout(speakAll, 60);
  };

  const getBotResponse = (query: string): Message => {
    const cleanQuery = query.toLowerCase().trim();
    const inHindi = languageRef.current === 'hi' || /[ऀ-ॿ]/.test(query);
    const variant = variantCounter.current++;

    // "tell me more" expands whatever we just answered, rather than starting a fresh search
    if (MORE_KEYWORDS.some(k => containsKeyword(cleanQuery, k))) {
      const previous = lastTopicRef.current;
      if (previous?.more) {
        return {
          sender: 'bot',
          text: inHindi ? previous.more.hi : previous.more.en,
          speech: inHindi
            ? 'ज़रूर, विस्तार से बताती हूँ। पूरी जानकारी मैंने स्क्रीन पर लिख दी है।'
            : "Of course — here's the detail. I've written it all out on screen for you.",
          actions: previous.actions,
        };
      }
      if (previous) {
        return {
          sender: 'bot',
          text: inHindi
            ? "इस बारे में मेरे पास बस इतनी ही जानकारी है। 😊 इससे आगे की बात हमारी टीम बेहतर बता पाएगी — 05946-223616 पर कॉल करें, या मुझसे कोई और सवाल पूछें।"
            : "That's about as far as my notes go on this one. 😊 For anything deeper our team will answer it better — call 05946-223616, or ask me about something else.",
          actions: [CALL_ACTION, BOOK_ACTION],
        };
      }
    }

    // Small-talk first, so "hi" doesn't get swallowed by keyword search
    if (IDENTITY_KEYWORDS.some(k => cleanQuery.includes(k))) {
      return {
        sender: 'bot',
        text: inHindi
          ? "मैं नैना हूँ 😊 — वेदांत नेत्रालय की वर्चुअल सहायक। मेरा काम है आपके सवालों के जवाब देना और अस्पताल आने से पहले आपकी हर छोटी-बड़ी मदद करना। बताइए, क्या जानना चाहेंगे?"
          : "I'm Naina 😊 — Vedanta Netralya's virtual assistant. My job is to answer your questions and make things easier before you even step into the hospital. What would you like to know?",
      };
    }

    if (GREETING_KEYWORDS.some(k => containsKeyword(cleanQuery, k))) {
      const pool = inHindi ? GREETINGS_HI : GREETINGS_EN;
      return { sender: 'bot', text: pool[variant % pool.length] };
    }

    if (THANKS_KEYWORDS.some(k => containsKeyword(cleanQuery, k))) {
      return {
        sender: 'bot',
        text: inHindi
          ? "आपका बहुत-बहुत धन्यवाद! 🙏 आपकी आँखों की सेहत हमारे लिए सबसे ज़रूरी है। कभी भी कोई सवाल हो, मैं यहीं हूँ। अपना और अपनी आँखों का ख्याल रखिएगा! 💙"
          : "You're most welcome! 🙏 Your eye health means a lot to us. I'm right here whenever you have another question. Take care of yourself — and your eyes! 💙",
      };
    }

    if (BYE_KEYWORDS.some(k => containsKeyword(cleanQuery, k))) {
      return {
        sender: 'bot',
        text: inHindi
          ? "अलविदा! 🙏 वेदांत नेत्रालय से जुड़ने के लिए धन्यवाद। आशा है जल्द मुलाकात होगी — तब तक स्वस्थ रहें, खुश रहें! 💙"
          : "Goodbye for now! 🙏 Thank you for chatting with Vedanta Netralya. Hope to see you soon — until then, stay healthy and take care! 💙",
      };
    }

    // Score every FAQ entry and pick the best match
    let best: FaqEntry | null = null;
    let bestScore = 0;
    for (const entry of FAQ_DATABASE) {
      let score = 0;
      for (const keyword of entry.keywords) {
        if (containsKeyword(cleanQuery, keyword)) {
          score += keyword.length > 5 ? 2 : 1;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    }

    if (best) {
      const spoken = SPOKEN_SUMMARIES[best.keywords[0]];
      lastTopicRef.current = best;   // so a following "tell me more" knows what to expand
      const basic = inHindi ? best.hi : best.en;
      // Give the basics first, then say there's more rather than dumping everything at once
      const hint = best.more ? (inHindi ? MORE_HINT_HI : MORE_HINT_EN) : '';
      return {
        sender: 'bot',
        text: basic + hint,
        speech: spoken && (inHindi ? spoken.hi : spoken.en) +
          (best.more ? (inHindi ? ' और जानना चाहें तो कहिए और बताइए।' : " If you'd like more detail, just say tell me more.") : ''),
        actions: best.actions,
      };
    }

    const pool = inHindi ? FALLBACKS_HI : FALLBACKS_EN;
    return {
      sender: 'bot',
      text: pool[variant % pool.length],
      actions: [CALL_ACTION, BOOK_ACTION],
    };
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // A natural, human-feeling pause before the reply
    const delay = 700 + Math.min(text.length * 15, 700);
    setTimeout(() => {
      const botMsg = getBotResponse(text);
      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
      speakText(botMsg.speech || botMsg.text);
    }, delay);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice recognition is not supported in this browser. Please try Google Chrome or Microsoft Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      stopSpeaking();
      recognitionRef.current.start();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) stopSpeaking();
  };

  const ActionIcon = ({ icon }: { icon?: QuickAction['icon'] }) => {
    if (icon === 'phone') return <Phone className="w-3 h-3" />;
    if (icon === 'calendar') return <Calendar className="w-3 h-3" />;
    if (icon === 'map') return <MapPin className="w-3 h-3" />;
    return null;
  };

  return (
    <>
      {/* Floating AI Bot Card Widget Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          layout
          className={`fixed bottom-28 md:bottom-8 right-4 md:right-8 z-[999] p-2.5 md:p-3 rounded-2xl shadow-2xl flex items-center gap-2 md:gap-3 border border-brand-teal/30 bg-brand-navy/95 text-cream hover:bg-brand-teal hover:text-brand-navy hover:border-brand-teal transition-all duration-300 select-none text-left glow-navy ${
            (isMobile || isScrolled) ? 'w-10 h-10 md:w-12 md:h-12 justify-center p-0 rounded-full' : 'w-[170px] md:w-[200px] pr-4 md:pr-5'
          }`}
          aria-label="Chat with Naina, our virtual assistant"
        >
          <div className={`rounded-xl flex items-center justify-center flex-shrink-0 bg-brand-teal/10 text-brand-teal relative ${
            (isMobile || isScrolled) ? 'w-8 h-8 md:w-10 md:h-10 rounded-full' : 'w-8 h-8 md:w-10 md:h-10'
          }`}>
            <MessageSquare className="w-4.5 h-4.5 md:w-5 md:h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500" />
          </div>
          {!(isMobile || isScrolled) && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="min-w-0 flex flex-col leading-tight"
            >
              <span className="text-[7px] md:text-[8px] tracking-widest font-black uppercase text-brand-teal">
                Vedanta Netralya
              </span>
              <span className="text-[10px] md:text-xs font-black uppercase font-body mt-0.5 truncate">
                Ask Naina
              </span>
              <span className="text-[7px] md:text-[8px] font-bold text-green-400 block mt-0.5">
                Online · Replies Instantly
              </span>
            </motion.div>
          )}
        </motion.button>
      )}

      {/* Chat Window Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 md:bottom-28 right-4 md:right-8 left-4 md:left-auto z-[999] w-[calc(100%-32px)] md:w-[400px] h-[550px] max-h-[calc(100dvh-140px)] bg-brand-navy-deep border border-brand-teal/20 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col glass-dark glow-navy"
          >
            {/* Header */}
            <div className="bg-brand-navy p-4 md:p-6 border-b border-cream/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-brand-teal rounded-full animate-pulse" />
                <div>
                  <h3 className="font-merriweather text-sm font-bold text-cream tracking-wider">Naina · Eye Care Assistant</h3>
                  <p className="text-[9px] tracking-widest text-brand-teal uppercase font-black">Vedanta Netralya · Here to Help</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Language Toggle */}
                <button
                  onClick={toggleLanguage}
                  className="px-2 py-1 bg-brand-teal/15 border border-brand-teal/30 hover:border-brand-teal text-brand-teal hover:text-cream rounded-lg text-[9px] font-black tracking-wider transition-all"
                  title="Toggle between English and Hindi / भाषा बदलें"
                >
                  {language === 'en' ? 'EN' : 'हिन्दी'}
                </button>
                {/* Stop Speaking (only while bot is talking) */}
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-full transition-colors animate-pulse"
                    title={language === 'hi' ? 'आवाज़ रोकें' : 'Stop voice reply'}
                    aria-label="Stop voice reply"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                  </button>
                )}
                {/* Mute Toggle */}
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-cream/15 text-cream/70 hover:text-cream rounded-full transition-colors"
                  title={isMuted ? 'Unmute voice replies' : 'Mute voice replies'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                {/* Close Button */}
                <button
                  onClick={() => { setIsOpen(false); stopSpeaking(); }}
                  className="p-2 hover:bg-cream/15 text-cream/70 hover:text-cream rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-3xl p-4 text-sm font-lora leading-relaxed shadow-sm whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-brand-teal text-brand-navy rounded-br-none'
                        : 'bg-brand-navy text-cream/90 border border-cream/10 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 max-w-[85%]">
                      {msg.actions.map((action, j) => {
                        const label = language === 'hi' ? action.labelHi : action.label;
                        const cls = "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-brand-teal/15 border border-brand-teal/40 text-brand-teal hover:bg-brand-teal hover:text-brand-navy text-[11px] font-bold tracking-wide transition-all";
                        return action.to ? (
                          <Link key={j} to={action.to} className={cls} onClick={() => setIsOpen(false)}>
                            <ActionIcon icon={action.icon} /> {label}
                          </Link>
                        ) : (
                          <a key={j} href={action.href} target={action.href?.startsWith('tel:') ? undefined : '_blank'} rel="noopener noreferrer" className={cls}>
                            <ActionIcon icon={action.icon} /> {label}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-brand-navy border border-cream/10 rounded-3xl rounded-bl-none px-5 py-4 flex items-center gap-1">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Chips */}
            <div className="px-4 pt-2 pb-1 flex gap-2 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {QUICK_REPLIES.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(language === 'hi' ? chip.query.hi : chip.query.en)}
                  className="flex-shrink-0 px-3.5 py-1.5 rounded-full bg-cream/5 border border-cream/15 text-cream/80 hover:border-brand-teal hover:text-brand-teal text-[11px] font-bold whitespace-nowrap transition-all"
                >
                  {language === 'hi' ? chip.hi : chip.en}
                </button>
              ))}
            </div>

            {/* Sound Wave Dictation Visualizer */}
            {isListening && (
              <div className="px-6 py-2 bg-brand-teal/10 flex items-center justify-between border-t border-cream/5">
                <span className="text-[10px] tracking-wider text-brand-teal font-black uppercase">Listening to voice...</span>
                <div className="flex items-center gap-1">
                  <div className="typing-dot bg-brand-teal w-1.5 h-1.5" />
                  <div className="typing-dot bg-brand-teal w-1.5 h-1.5" style={{ animationDelay: '0.15s' }} />
                  <div className="typing-dot bg-brand-teal w-1.5 h-1.5" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 md:p-4 bg-brand-navy border-t border-cream/10 flex items-center gap-2"
            >
              <button
                type="button"
                onClick={toggleListening}
                className={`p-3 rounded-full flex items-center justify-center transition-all ${
                  isListening
                    ? 'bg-red-500 text-cream animate-pulse'
                    : 'bg-cream/10 hover:bg-cream/20 text-brand-teal hover:text-brand-teal-bright'
                }`}
                title="Voice Query"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={language === 'hi' ? 'अपना सवाल लिखें…' : 'Type your question…'}
                className="flex-1 min-w-0 bg-cream/5 border border-cream/10 rounded-full px-5 py-3 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-brand-teal/50"
              />

              <button
                type="submit"
                className="bg-brand-teal hover:bg-brand-teal-bright text-brand-navy p-3 rounded-full flex items-center justify-center transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
