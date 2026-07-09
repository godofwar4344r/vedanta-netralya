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
  actions?: QuickAction[];
}

interface FaqEntry {
  keywords: string[];
  en: string;
  hi: string;
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
    actions: [BOOK_ACTION, { label: 'Learn About Cataract', labelHi: 'मोतियाबिंद के बारे में जानें', to: '/cataract' }]
  },
  {
    keywords: ['glaucoma', 'kala motia', 'eye pressure', 'optic nerve', 'perimetry', 'काला मोतिया', 'ग्लूकोमा'],
    en: "Glaucoma (Kala Motia) is often called the 'silent thief of sight' because it damages vision gradually, without any warning signs. That's why early detection matters so much.\n\nAt Vedanta Netralya, our glaucoma clinic is headed by Dr. Sameer Varma, with advanced diagnostics like OCT and Perimetry available in-house. If glaucoma runs in your family or you're over 40, an annual pressure check is a very wise habit.",
    hi: "ग्लूकोमा (काला मोतिया) को 'नज़र का खामोश चोर' कहा जाता है — यह बिना किसी लक्षण के धीरे-धीरे दृष्टि छीन लेता है। इसलिए समय पर जाँच बहुत ज़रूरी है।\n\nवेदांत नेत्रालय में डॉ. समीर वर्मा के नेतृत्व में OCT और पेरीमेट्री जैसी आधुनिक जाँचें उपलब्ध हैं। अगर परिवार में किसी को ग्लूकोमा रहा है या आपकी उम्र 40 से ऊपर है, तो साल में एक बार जाँच ज़रूर करवाएँ।",
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
    keywords: ['retina', 'diabetic', 'retinopathy', 'armd', 'macular', 'parda', 'injection', 'vitreo', 'पर्दा', 'रेटिना', 'डायबिटीज', 'शुगर'],
    en: "Retina care is very close to our heart. If you have diabetes or high blood pressure, your retina needs a check-up at least once a year — diabetic retinopathy can quietly damage vision long before you notice anything.\n\nOur retina clinic is led by Dr. Maj Aditya Bhardwaj, a fellowship-trained vitreo-retinal surgeon (Army Hospital R&R, Delhi). And here's a helpful tip: every Tuesday is our Retina Screening Day with 50% off on consultation and fundus evaluation. 🙌",
    hi: "अगर आपको डायबिटीज़ (शुगर) या हाई ब्लड प्रेशर है, तो साल में कम से कम एक बार रेटिना (पर्दे) की जाँच ज़रूर करवाएँ — डायबिटिक रेटिनोपैथी बिना लक्षण के नज़र को नुकसान पहुँचा सकती है।\n\nहमारा रेटिना क्लिनिक डॉ. मेजर आदित्य भारद्वाज (आर्मी हॉस्पिटल R&R, दिल्ली से प्रशिक्षित विट्रियो-रेटिनल सर्जन) के नेतृत्व में चलता है। और हाँ — हर मंगलवार को रेटिना स्क्रीनिंग डे पर जाँच शुल्क में 50% छूट मिलती है। 🙌",
    actions: [BOOK_ACTION, { label: 'Retina Services', labelHi: 'रेटिना सेवाएँ', to: '/retina-services' }]
  },
  {
    keywords: ['child', 'kid', 'baby', 'squint', 'lazy eye', 'amblyopia', 'paediatric', 'pediatric', 'school', 'बच्चे', 'बच्चा', 'भेंगापन'],
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
    en: "Booking a visit is quick and easy — I can point you right to it. 😊\n\nYou can book online in under a minute, or simply call our helpdesk at 05946-223616 / +91 90685 61971. We're open Monday to Saturday, 9 AM – 7 PM, and Sunday, 9 AM – 2 PM.",
    hi: "अपॉइंटमेंट बुक करना बहुत आसान है। 😊\n\nआप एक मिनट में ऑनलाइन बुक कर सकते हैं, या हमारे हेल्पडेस्क पर कॉल करें: 05946-223616 / +91 90685 61971। समय: सोमवार से शनिवार सुबह 9 से शाम 7 बजे, रविवार सुबह 9 से दोपहर 2 बजे।",
    actions: [BOOK_ACTION, CALL_ACTION]
  },
  {
    keywords: ['doctor', 'surgeon', 'sameer', 'varma', 'rjk', 'singh', 'aditya', 'bhardwaj', 'specialist', 'team', 'डॉक्टर'],
    en: "We're proud of our team — let me introduce them:\n\n👨‍⚕️ Dr. Sameer Varma — Founder, and our Cataract & Glaucoma specialist\n👨‍⚕️ Dr. R.J.K. Singh — Senior Consultant, Fellow of Sitapur Eye Hospital\n👨‍⚕️ Dr. Maj Aditya Bhardwaj — Vitreo-Retinal & Cataract surgeon, trained at Army Hospital R&R, Delhi\n\nEach of them believes in taking time with every patient — you'll never feel rushed here.",
    hi: "हमें अपनी टीम पर गर्व है — मिलिए हमारे डॉक्टरों से:\n\n👨‍⚕️ डॉ. समीर वर्मा — संस्थापक, मोतियाबिंद और ग्लूकोमा विशेषज्ञ\n👨‍⚕️ डॉ. आर.जे.के. सिंह — वरिष्ठ सलाहकार, सीतापुर आँख अस्पताल फेलो\n👨‍⚕️ डॉ. मेजर आदित्य भारद्वाज — विट्रियो-रेटिनल और मोतियाबिंद सर्जन, आर्मी हॉस्पिटल R&R दिल्ली से प्रशिक्षित\n\nहर डॉक्टर हर मरीज़ को पूरा समय देने में विश्वास रखता है।",
    actions: [{ label: 'Meet Our Doctors', labelHi: 'हमारे डॉक्टरों से मिलें', to: '/about' }, BOOK_ACTION]
  },
  {
    keywords: ['location', 'address', 'branch', 'centre', 'center', 'haldwani', 'kichha', 'where', 'reach', 'directions', 'पता', 'कहाँ', 'हल्द्वानी'],
    en: "You'll find us at:\n\n📍 Nawabi Road, near DPS Junior School, Subhash Nagar, Haldwani, Uttarakhand 263139\n\nWe're easy to reach from anywhere in Haldwani — and if you're coming from out of town, just tap 'Get Directions' below and Google Maps will bring you straight to our door.",
    hi: "हमारा पता है:\n\n📍 नवाबी रोड, DPS जूनियर स्कूल के पास, सुभाष नगर, हल्द्वानी, उत्तराखंड 263139\n\nहल्द्वानी में कहीं से भी पहुँचना आसान है — नीचे 'रास्ता देखें' दबाएँ और Google Maps आपको सीधे हम तक पहुँचा देगा।",
    actions: [DIRECTIONS_ACTION, { label: 'View All Centres', labelHi: 'सभी केंद्र देखें', to: '/centres' }]
  },
  {
    keywords: ['timing', 'timings', 'hours', 'open', 'close', 'sunday', 'time', 'kab', 'समय', 'खुला', 'टाइम'],
    en: "Here are our OPD timings:\n\n🕘 Monday – Saturday: 9:00 AM – 7:00 PM\n🕘 Sunday: 9:00 AM – 2:00 PM\n\nMornings are usually the quietest if you prefer a shorter wait. Shall I help you book a slot?",
    hi: "हमारा OPD समय:\n\n🕘 सोमवार – शनिवार: सुबह 9:00 – शाम 7:00\n🕘 रविवार: सुबह 9:00 – दोपहर 2:00\n\nअगर कम भीड़ चाहिए तो सुबह का समय सबसे अच्छा रहता है। क्या मैं अपॉइंटमेंट बुक करने में मदद करूँ?",
    actions: [BOOK_ACTION, CALL_ACTION]
  },
  {
    keywords: ['cost', 'price', 'fee', 'fees', 'charge', 'insurance', 'tpa', 'cashless', 'cghs', 'echs', 'ayushman', 'panel', 'खर्च', 'बीमा', 'फीस'],
    en: "We believe good eye care shouldn't come with surprise bills — our pricing is fully transparent.\n\nWe support all major TPA insurance networks for cashless treatment, and we're CGHS/ECHS panel friendly too. For exact costs for your specific treatment, our billing desk will give you a clear estimate before anything begins — just call or visit.",
    hi: "हम मानते हैं कि अच्छे इलाज में छुपे हुए खर्च नहीं होने चाहिए — हमारी कीमतें पूरी तरह पारदर्शी हैं।\n\nसभी प्रमुख TPA बीमा नेटवर्क से कैशलेस इलाज उपलब्ध है, और हम CGHS/ECHS पैनल से भी जुड़े हैं। आपके इलाज का सटीक खर्च जानने के लिए हमारे बिलिंग डेस्क पर कॉल करें या आएँ — इलाज से पहले पूरा अनुमान दिया जाता है।",
    actions: [CALL_ACTION, BOOK_ACTION]
  },
  {
    keywords: ['offer', 'offers', 'discount', 'free', 'special', 'camp', 'senior', 'tuesday', 'wednesday', 'friday', 'छूट', 'मुफ्त', 'ऑफर'],
    en: "Yes! We run special OPD days every week — here's what's on:\n\n🗓️ Tuesday — Retina Screening Day: 50% off consultation & fundus evaluation (great for diabetics & BP patients)\n🗓️ Wednesday — FREE eye screening for children below 5 years\n🗓️ Friday — Senior Citizen Day: 50% off OPD for everyone above 60\n\nPick your day and I'll help you book!",
    hi: "जी हाँ! हर हफ्ते हमारे स्पेशल OPD दिन होते हैं:\n\n🗓️ मंगलवार — रेटिना स्क्रीनिंग डे: जाँच शुल्क में 50% छूट (डायबिटीज़/बीपी के मरीज़ों के लिए)\n🗓️ बुधवार — 5 साल से छोटे बच्चों की मुफ़्त आँखों की जाँच\n🗓️ शुक्रवार — वरिष्ठ नागरिक दिवस: 60+ उम्र के लिए OPD में 50% छूट\n\nअपना दिन चुनें, मैं बुकिंग में मदद करता हूँ!",
    actions: [BOOK_ACTION]
  },
  {
    keywords: ['emergency', 'urgent', 'injury', 'accident', 'chemical', 'sudden', 'vision loss', 'severe pain', 'red eye', 'चोट', 'दर्द', 'इमरजेंसी'],
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
    keywords: ['night blindness', 'nyctalopia', 'night vision', 'ratondhi', 'रतौंधी'],
    en: "Night blindness (nyctalopia) makes it hard to see in dim light — driving at night often becomes the first struggle. It usually has an underlying cause: uncorrected eye power, early cataract, or sometimes a vitamin A deficiency.\n\nThe good news? Most causes are very treatable once identified. A simple examination will tell us exactly what's going on.",
    hi: "रतौंधी में कम रोशनी में देखना मुश्किल हो जाता है — अक्सर रात में गाड़ी चलाने में सबसे पहले परेशानी होती है। इसके पीछे कोई कारण होता है: चश्मे का नंबर, शुरुआती मोतियाबिंद, या कभी-कभी विटामिन A की कमी।\n\nअच्छी खबर? कारण पता चलने पर ज़्यादातर मामलों का इलाज आसानी से हो जाता है। एक सामान्य जाँच से सब साफ हो जाएगा।",
    actions: [BOOK_ACTION]
  },
  {
    keywords: ['oculoplasty', 'ptosis', 'droopy', 'eyelid', 'watering eye', 'stye', 'chalazion', 'पलक'],
    en: "Our oculoplasty department cares for everything around the eye — droopy eyelids (ptosis), constantly watering eyes, styes, chalazion, and cosmetic eyelid concerns.\n\nThese issues are often brushed off as 'minor', but they affect comfort and confidence every single day — and most have simple, effective treatments.",
    hi: "हमारा ऑक्यूलोप्लास्टी विभाग आँख के आसपास की हर समस्या का इलाज करता है — झुकी हुई पलकें (ptosis), लगातार पानी आना, गुहेरी (stye), और पलकों से जुड़ी कॉस्मेटिक समस्याएँ।\n\nइन्हें अक्सर 'छोटी बात' समझ लिया जाता है, पर ये रोज़ की तकलीफ देती हैं — और ज़्यादातर का इलाज आसान और असरदार है।",
    actions: [{ label: 'Oculoplasty Services', labelHi: 'ऑक्यूलोप्लास्टी सेवाएँ', to: '/oculoplasty-services' }, BOOK_ACTION]
  }
];

const GREETING_KEYWORDS = ['hi', 'hello', 'hey', 'namaste', 'namaskar', 'good morning', 'good afternoon', 'good evening', 'नमस्ते', 'नमस्कार', 'हैलो', 'हेलो'];
const THANKS_KEYWORDS = ['thank', 'thanks', 'thankyou', 'dhanyavad', 'shukriya', 'धन्यवाद', 'शुक्रिया'];
const BYE_KEYWORDS = ['bye', 'goodbye', 'good bye', 'alvida', 'अलविदा'];
const IDENTITY_KEYWORDS = ['who are you', 'your name', 'what are you', 'तुम कौन', 'आप कौन', 'तुम्हारा नाम'];

const GREETINGS_EN = [
  "Namaste! 🙏 So glad you stopped by. I'm Drishti, Vedanta Netralya's virtual assistant. Whether it's about a treatment, our doctors, timings, or booking a visit — just ask away!",
  "Hello there! 😊 I'm Drishti, and I'm here to make your visit to Vedanta Netralya easier. What can I help you with today?",
  "Namaste! 🙏 Welcome to Vedanta Netralya. How are your eyes treating you today? Ask me anything — treatments, doctors, timings, or offers."
];
const GREETINGS_HI = [
  "नमस्ते! 🙏 वेदांत नेत्रालय में आपका हार्दिक स्वागत है। मैं दृष्टि हूँ, आपकी सहायक। इलाज, डॉक्टर, समय या अपॉइंटमेंट — कुछ भी पूछिए!",
  "नमस्ते! 😊 मैं दृष्टि हूँ। आज मैं आपकी आँखों की देखभाल में कैसे मदद कर सकती हूँ?",
  "नमस्कार! 🙏 वेदांत नेत्रालय में आपका स्वागत है। आपकी आँखों का हाल कैसा है? कुछ भी पूछें — इलाज, डॉक्टर, समय या ऑफर।"
];

const FALLBACKS_EN = [
  "Hmm, that's a bit outside what I know — but I don't want to leave you without an answer! Our helpdesk team would love to help you personally at 05946-223616.\n\nMeanwhile, you can ask me about cataract, glaucoma, specs removal, our doctors, timings, or this week's offers. 😊",
  "That's a good question — and honestly, our team at the hospital can answer it much better than I can! Give them a ring at 05946-223616.\n\nI'm great with things like treatments, doctor profiles, appointment booking, insurance, and our weekly special OPD days — try me!"
];
const FALLBACKS_HI = [
  "माफ़ कीजिए, यह मेरी जानकारी से थोड़ा बाहर है — लेकिन आपको बिना जवाब के नहीं छोड़ूँगी! हमारी हेल्पडेस्क टीम आपकी मदद करेगी: 05946-223616।\n\nआप मुझसे मोतियाबिंद, ग्लूकोमा, चश्मा हटाना, डॉक्टर, समय या इस हफ्ते के ऑफर के बारे में पूछ सकते हैं। 😊",
  "अच्छा सवाल है — इसका जवाब हमारे अस्पताल की टीम बेहतर दे पाएगी! कृपया कॉल करें: 05946-223616।\n\nमैं इलाज, डॉक्टर, अपॉइंटमेंट, बीमा और साप्ताहिक ऑफर के बारे में अच्छी जानकारी दे सकती हूँ — पूछ कर देखिए!"
];

const QUICK_REPLIES = [
  { en: '📅 Book appointment', hi: '📅 अपॉइंटमेंट बुक करें', query: { en: 'How do I book an appointment?', hi: 'अपॉइंटमेंट कैसे बुक करें?' } },
  { en: '👨‍⚕️ Our doctors', hi: '👨‍⚕️ हमारे डॉक्टर', query: { en: 'Tell me about your doctors', hi: 'डॉक्टर के बारे में बताएं' } },
  { en: '🎁 Weekly offers', hi: '🎁 साप्ताहिक ऑफर', query: { en: 'What offers do you have?', hi: 'क्या ऑफर हैं?' } },
  { en: '🕘 Timings', hi: '🕘 समय', query: { en: 'What are your timings?', hi: 'आपका समय क्या है?' } },
  { en: '💳 Insurance & fees', hi: '💳 बीमा और फीस', query: { en: 'Do you accept insurance?', hi: 'क्या बीमा चलता है?' } },
];

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const containsKeyword = (query: string, keyword: string): boolean => {
  if (/[ऀ-ॿ]/.test(keyword)) return query.includes(keyword);
  return new RegExp(`\\b${escapeRegExp(keyword)}\\b`, 'i').test(query);
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Namaste! 🙏 I'm Drishti, your personal guide at Vedanta Netralya.\n\nAsk me anything — cataract surgery, specs removal, our doctors, timings, or this week's special OPD offers. I'm happy to help in English or हिन्दी.",
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
    window.speechSynthesis.cancel();

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
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const speakText = (text: string) => {
    if (isMuted) return;
    window.speechSynthesis.cancel();
    // Strip emojis and decorative symbols so speech sounds natural
    const speakable = text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '').replace(/\s+/g, ' ').trim();
    const utterance = new SpeechSynthesisUtterance(speakable);

    const hasHindi = /[ऀ-ॿ]/.test(speakable);
    utterance.rate = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (hasHindi) {
      utterance.lang = 'hi-IN';
      const desiredVoice = voices.find(v => v.lang.includes('hi') || v.name.toLowerCase().includes('hindi') || v.name.toLowerCase().includes('lekha'));
      if (desiredVoice) utterance.voice = desiredVoice;
    } else {
      utterance.lang = 'en-IN';
      const desiredVoice = voices.find(v => v.lang.includes('en') && (v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('india')));
      if (desiredVoice) utterance.voice = desiredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const getBotResponse = (query: string): Message => {
    const cleanQuery = query.toLowerCase().trim();
    const inHindi = languageRef.current === 'hi' || /[ऀ-ॿ]/.test(query);
    const variant = variantCounter.current++;

    // Small-talk first, so "hi" doesn't get swallowed by keyword search
    if (IDENTITY_KEYWORDS.some(k => cleanQuery.includes(k))) {
      return {
        sender: 'bot',
        text: inHindi
          ? "मैं दृष्टि हूँ 😊 — वेदांत नेत्रालय की वर्चुअल सहायक। मेरा काम है आपके सवालों के जवाब देना और अस्पताल आने से पहले आपकी हर छोटी-बड़ी मदद करना। बताइए, क्या जानना चाहेंगे?"
          : "I'm Drishti 😊 — Vedanta Netralya's virtual assistant. My job is to answer your questions and make things easier before you even step into the hospital. What would you like to know?",
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
      return { sender: 'bot', text: inHindi ? best.hi : best.en, actions: best.actions };
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
      speakText(botMsg.text);
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
    if (!isMuted) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
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
          aria-label="Chat with Drishti, our virtual assistant"
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
                Ask Drishti
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
                  <h3 className="font-merriweather text-sm font-bold text-cream tracking-wider">Drishti · Eye Care Assistant</h3>
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
