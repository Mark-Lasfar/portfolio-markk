const synth = window.speechSynthesis;
let isSpeaking = false;
let utterance;

function speak(text, lang) {
    if (isSpeaking) {
        synth.cancel();
    }
    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onend = () => {
        isSpeaking = false;
        if (lang === 'en') {
            askLanguagePreference();
        }
    };
    isSpeaking = true;
    synth.speak(utterance);
}

function startVoice(lang) {
    if (lang === 'en') {
        speak("Hello, I'm Ibrahim Al-Asfar, a Full Stack Web Developer and founder of MGZon AI. Would you like me to speak in English or Arabic? Or you can read the CV silently. Please say 'English', 'Arabic', or 'No'.", 'en');
    } else if (lang === 'ar') {
        speak("مرحبًا، أنا إبراهيم الأسفر، مطور ويب Full Stack ومؤسس MGZon AI. هل تريد مني التحدث بالعربية أو الإنجليزية؟ أو يمكنك قراءة السيرة الذاتية في صمت. من فضلك، قل 'عربي' أو 'إنجليزي' أو 'لا'.", 'ar');
    }
}

function stopVoice() {
    if (isSpeaking) {
        synth.cancel();
        isSpeaking = false;
        speak("Okay, I'll stop speaking. You can read the CV silently or click the buttons to hear me again.", 'en');
    }
}

function askLanguagePreference() {
    if (!isSpeaking) return;
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        if (transcript.includes('arabic') || transcript.includes('عربي')) {
            speak("حسنًا، سأتحدث بالعربية. أنا إبراهيم الأسفر، مطور ويب Full Stack ومؤسس MGZon AI، منصة تجارة إلكترونية مدعومة بالذكاء الاصطناعي. إذا كنت تريد معرفة المزيد عن خبراتي أو مهاراتي، أخبرني!", 'ar');
        } else if (transcript.includes('english') || transcript.includes('إنجليزي')) {
            speak("Alright, I'll continue in English. I'm Ibrahim Al-Asfar, a Full Stack Web Developer and founder of MGZon AI, an AI-driven e-commerce platform. Let me know if you want details about my experience or skills!", 'en');
        } else if (transcript.includes('no') || transcript.includes('لا')) {
            stopVoice();
        }
    };

    recognition.onerror = () => {
        speak("Sorry, I didn't catch that. Please say 'English', 'Arabic', or 'No'.", 'en');
        recognition.start();
    };

    recognition.start();
}

// Start speaking automatically when the page loads
window.onload = () => {
    startVoice('en');
};