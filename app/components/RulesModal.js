"use client";

import { useState } from "react";
import Modal from "@/app/components/Modal";

export default function RulesModal(props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="text-zinc-950 text-lg font-bold outline outline-offset-0 outline-1 hover:bg-blue-500 py-2 px-4 hover:text-white"
      >
        Rules
      </button>
      <div>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-black mb-5">
              प्रश्नमंजुषाचे नियम{" "}
            </h3>
            <p className="mb-1 font-bold text-black">
              1. प्रश्नमंजुषा तीन फेऱ्यांमध्ये घेतली जाईल.
            </p>
            <p className="mb-1 font-bold text-black">
              2. प्रश्नमंजुषा दरम्यान मोबाईल फोन आणी बायबल वापरण्यास सक्त्त मनाई
              आहे.
            </p>
            <p className="mb-1 font-bold text-black">
              3. पहिली आणि दुसरी फेरी ४५ सेकंदाची असेल.
            </p>
            <p className="mb-1 font-bold text-black">
              4. प्रत्येक प्रश्नाला १० गुण असतील.
            </p>
            <p className="mb-1 font-bold text-black">
              5. गट चर्चेला परवानगी आहे.
            </p>
            <p className="mb-1 font-bold text-black">
              6. प्रश्नमंजुषाच्या प्रश्नांची उत्तरे फक्त गट नेत्याकडून दिली
              जातील.
            </p>
            <p className="mb-1 font-bold text-black">
              7. प्रश्नमंजुषा दरम्यान इतर टीम सदस्यांना प्रॉम्ट करण्यास सक्त्त
              मनाई आहे.
            </p>
            <p className="mb-1 font-bold text-black">
              8. कोणत्याही प्रश्नाचे उत्तर चुकीचे असल्यास ते पुढील गटात पाठवले
              जाणार नाही.
            </p>
            <p className="mb-1 font-bold text-black">
              9. प्रश्नमंजुषा दरम्यान प्रत्येक गटासाठी दोन लाइफलाइन ५०-५० आणि
              डबल उपलब्ध आहेत , ज्या फक्ट एकदाच वापरल्या जातील.
            </p>
            <p className="mb-1 font-bold text-black">
              10. कोणत्याही कारणास्तव सहभागींना त्यांची जागा सोडण्याची परवानगी
              दिली जाणार नाही.
            </p>
            <p className="mb-1 font-bold text-black">
              11. जास्तीत जास्त गुण मिळवणारे पहिले ३ गट अंतिम फेरीसाठी निवडले
              जातील.
            </p>
            <p className="mb-1 font-bold text-black">
              12. तिसरी फेरी ३० सेकंदाची असेल आणि नेगेटिव्ह मार्किंग असेल.
            </p>
            <p className="mb-1 font-bold text-black">
              13. प्रश्नमंजुषा दरम्यान श्रोते आणि सहभागींनी गांभीर्य आणि
              पावित्र्य राखले पाहिजे.
            </p>
            <p className="mb-1 font-bold text-black">
              14. शेवटचा निर्णय आयोजकांचा असेल.
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
}
