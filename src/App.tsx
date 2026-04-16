import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Leaf, 
  Palmtree, 
  Mountain, 
  Sprout, 
  Droplets, 
  Fence,
  Phone,
  Instagram,
  MapPin,
  Clock,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Constants & Data ---

const WHATSAPP_NUMBER = "+628989301112";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`;

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/668307526_1446837333128424_8637243453494905251_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_ohc=5Eas2afQnSwQ7kNvwFTm_zN&_nc_oc=AdpdGbYS7WF2S46sk3wTUzOOLJ7K2wRZJLYxxtPm21zyt0HrFPHLNd1hONN6AwcIo2u9PuTjyRAhhCNuzTTT2lp2&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AETnbEWz7eXftKNuufdE8H0eYpzamIFUrNrmIBqXhYxWQ&oe=6A082C2A",
    subtitle: "Estetika Alam",
    title: "Taman Impian di Rumah Anda",
    description: "Wujudkan hunian yang asri dan menenangkan dengan sentuhan landscape profesional."
  },
  {
    id: 2,
    image: "https://instagram.fcgk33-1.fna.fbcdn.net/v/t1.15752-9/667394386_992860819973859_8349307937634684328_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=111&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=uNVAlld3et8Q7kNvwEQXvRI&_nc_oc=AdpgjpI3TryzLJFraciImjC8JT9axjjBqDMMFspmbYN7pR03YgwCv7IdujmH7CrYSgbB9tVD8pZGOfk0vezyDpw3&_nc_zt=23&_nc_ht=instagram.fcgk33-1.fna&_nc_ss=7a2a8&oh=03_Q7cD5AHPt1727GyOJzMvez7ma8GZXDn6kqz9_p0hwx2QL_Vuwg&oe=6A0819BB",
    subtitle: "Ketenangan Air",
    title: "Taman Kolam Renang",
    description: "Hadirkan taman cantik di sekeliling kolam renang untuk suasana relaksasi yang maksimal."
  }
];

const SERVICES = [
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Taman Minimalis",
    description: "Desain efisien untuk lahan terbatas namun tetap memberikan kesan luas dan modern.",
    image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/658372854_1669863117531731_3178817597552396113_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_ohc=QnPadBH4fsMQ7kNvwFGklQf&_nc_oc=AdpsexyLgpye-M8H7Y3dLhLAvZ0Td_ma09ZyFDGGVk2B7En_eg2xr92JnUTizyq1-Y9OL_PDSp17VTSNvu3h2Ukp&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AHJqVj7fNrpj-Neq68ZhUfGZWd0nR0n8oSwJw7VEqyB0Q&oe=69F72CB0"
  },
  {
    icon: <Palmtree className="w-8 h-8" />,
    title: "Taman Tropis",
    description: "Kombinasi tanaman eksotis yang rimbun untuk suasana liburan setiap hari di rumah.",
    image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/658917299_1254254786860905_4129162894248003456_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_ohc=K7J2P7Xd0TcQ7kNvwEmK3e3&_nc_oc=AdqizmnX7TZtC0wysxB92RVzme--Q81VphT0C5dw7LUREaGdzfJDX0XQj_aIRyw6g-OpIM8iE2UTIZ9nwq-u0UKe&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AFIJq2BOcWsY3XqVLDr1fdW1C5MTDabEFM4OVBhREN_FA&oe=69F75328"
  },
  {
    icon: <Mountain className="w-8 h-8" />,
    title: "Taman Kering",
    description: "Solusi taman rendah perawatan dengan estetika batu alam dan tanaman sukulen.",
    image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/661444452_823178730279611_7379588697716753328_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_ohc=IYxytN_cILoQ7kNvwFQ1kSC&_nc_oc=Adp0UMUqyX2-4zJldkvNyXdW5pytlW0QZy5Ioy5CozWzhL3BzThUlNwIjeBYHUfVBiof_5GNt41w076pwzRKVc3w&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AEroGxtv1QMAH_mDychaCJ2YztBIwnkelbPC0KIcw0wBg&oe=69F73EE8"
  },
  {
    icon: <Sprout className="w-8 h-8" />,
    title: "Vertical Garden",
    description: "Maksimalkan dinding kosong Anda menjadi paru-paru hijau yang indah.",
    image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/661542538_2814491302258261_7081437908575069863_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_ohc=dOhvMHK4hU4Q7kNvwGWYoLu&_nc_oc=AdrfHAAPb1H_gbfUSxpzDx67EmUekwvcv-1DzbJZ2TfyqupLINdaop2q31E1IvsnnwGh_OFwA7Ju4VCY-8IV8Ja0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AE9JjZlZ97gz4kjze1xQJ5DZeuqubMl9jCR4lJqD9fMYA&oe=69F72DA9"
  },
  {
    icon: <Droplets className="w-8 h-8" />,
    title: "Kolam Hias",
    description: "Pembuatan kolam koi, air terjun buatan, dan sistem filtrasi air yang jernih.",
    image: "https://scontent.cdninstagram.com/v/t1.15752-9/658327752_957342713534054_186065741987715165_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=102&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdkOnRlc3QiXX0%3D&_nc_ohc=u2ydSdcZqKQQ7kNvwGP1Ad7&_nc_oc=AdpLtSCRhA78yq3xlzDpdgCSpjJW30qOAByOvB8lZNLO3yc_xhtc3raDhYfwQO2KBxqECpm0WGihzE4zJONvHjWW&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AGrypDRwI_9dwd_5z5SlY9ZtvtdE7-dIjd3M3xlDhDpyA&oe=6A03F937"
  },
  {
    icon: <Fence className="w-8 h-8" />,
    title: "Gazebo & Hardscape",
    description: "Pemasangan batu alam, lantai kayu, dan gazebo untuk area bersantai outdoor.",
    image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/664731380_1857324728309573_836257247417149924_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_ohc=EC50d4os7eYQ7kNvwGGxkBv&_nc_oc=Adqz2lZI60sgg0OkkO8t9YsuA9NYJfgFywTNcbCWAdvwKyJbqeR8RF7GyhR2ytkpTNs8262oo-ct87D-m6k0dl-m&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AHQPb9k9trKg5ahicICWFjgEyjYpOwhvFVSVftFzlkpNA&oe=69F747BF"
  }
];

const PORTFOLIO = [
  { id: 1, category: "Minimalis", image: "https://instagram.fcgk33-1.fna.fbcdn.net/v/t1.15752-9/657762933_1420976045996876_5059208154390473513_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=101&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdkOnRlc3QiXX0%3D&_nc_ohc=O6tSPjPnyDoQ7kNvwH16T7I&_nc_oc=AdpGZutdkhBO1X8ULfDbeJqJHoMBkqUV3Q854IqfEIOOycw3co2f74W7zvGPPNtzh580WI95fvj1KTApetXfLzqh&_nc_zt=23&_nc_ht=instagram.fcgk33-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AGfORrlpbuslnilOZTEdSqMO_V0zw72eOlQTQJjXpK0pQ&oe=69FB3AEC", title: "Taman Depan Rumah Modern" },
  { id: 2, category: "Tropis", image: "https://instagram.fcgk33-1.fna.fbcdn.net/v/t1.15752-9/664112044_1107238804917949_4962049671179376389_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=109&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdkOnRlc3QiXX0%3D&_nc_ohc=q09EhcFDU0gQ7kNvwEkUf_M&_nc_oc=AdrD7Wz0RonDOUdzNLsssPcnRZt-d9h60EWfaOsQNocKPSqXCeObzPbG0eEONtQ2Y1Cn56cBwwESgHScNX1wgD9E&_nc_zt=23&_nc_ht=instagram.fcgk33-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AFYE84WEvD9ZMS6MIWAagPzd7NpkKB5UCJqsrozG2gWOw&oe=69FB1446", title: "Oasis Tropis Belakang Rumah" },
  { id: 4, category: "Minimalis", image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/658372854_1669863117531731_3178817597552396113_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_ohc=QnPadBH4fsMQ7kNvwFGklQf&_nc_oc=AdpsexyLgpye-M8H7Y3dLhLAvZ0Td_ma09ZyFDGGVk2B7En_eg2xr92JnUTizyq1-Y9OL_PDSp17VTSNvu3h2Ukp&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AHJqVj7fNrpj-Neq68ZhUfGZWd0nR0n8oSwJw7VEqyB0Q&oe=69F72CB0", title: "Project Taman Minimalis A" },
  { id: 5, category: "Taman Kering", image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/661444452_823178730279611_7379588697716753328_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_ohc=IYxytN_cILoQ7kNvwFQ1kSC&_nc_oc=Adp0UMUqyX2-4zJldkvNyXdW5pytlW0QZy5Ioy5CozWzhL3BzThUlNwIjeBYHUfVBiof_5GNt41w076pwzRKVc3w&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AEroGxtv1QMAH_mDychaCJ2YztBIwnkelbPC0KIcw0wBg&oe=69F73EE8", title: "Zen Garden Kering" },
  { id: 6, category: "Vertical Garden", image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/661542538_2814491302258261_7081437908575069863_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_ohc=dOhvMHK4hU4Q7kNvwGWYoLu&_nc_oc=AdrfHAAPb1H_gbfUSxpzDx67EmUekwvcv-1DzbJZ2TfyqupLINdaop2q31E1IvsnnwGh_OFwA7Ju4VCY-8IV8Ja0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AE9JjZlZ97gz4kjze1xQJ5DZeuqubMl9jCR4lJqD9fMYA&oe=69F72DA9", title: "Green Wall Office" },
  { id: 7, category: "Kolam Hias", image: "https://scontent.cdninstagram.com/v/t1.15752-9/658327752_957342713534054_186065741987715165_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=102&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdkOnRlc3QiXX0%3D&_nc_ohc=u2ydSdcZqKQQ7kNvwGP1Ad7&_nc_oc=AdpLtSCRhA78yq3xlzDpdgCSpjJW30qOAByOvB8lZNLO3yc_xhtc3raDhYfwQO2KBxqECpm0WGihzE4zJONvHjWW&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AGrypDRwI_9dwd_5z5SlY9ZtvtdE7-dIjd3M3xlDhDpyA&oe=6A03F937", title: "Kolam Koi Mewah" },
  { id: 8, category: "Hardscape", image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/664731380_1857324728309573_836257247417149924_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_ohc=EC50d4os7eYQ7kNvwGGxkBv&_nc_oc=Adqz2lZI60sgg0OkkO8t9YsuA9NYJfgFywTNcbCWAdvwKyJbqeR8RF7GyhR2ytkpTNs8262oo-ct87D-m6k0dl-m&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AHQPb9k9trKg5ahicICWFjgEyjYpOwhvFVSVftFzlkpNA&oe=69F747BF", title: "Paving & Gazebo Area" },
  { id: 9, category: "Taman Kering", image: "https://instagram.fcgk33-1.fna.fbcdn.net/v/t1.15752-9/669434705_1625653661918499_139359049765929475_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=101&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdkOnRlc3QiXX0%3D&_nc_ohc=idR_kVxpZigQ7kNvwEe60sV&_nc_oc=AdrUuKrEEclc_SS49YvPVIikXoXfLBlG38-n0EtbsWJSwj9kRIeLVzuygNRNLMyZwneVjMoOuXNMTy2i-jonXJU0&_nc_zt=23&_nc_ht=instagram.fcgk33-1.fna&_nc_ss=7a2a8&oh=03_Q7cD5AF5LBAMmh8ZSAD4lEcwjiSNt_lX46WKRg6l6yPOvWAQAA&oe=6A082385", title: "Dry Garden Aesthetic", aspect: "9/16" },
  { id: 10, category: "Taman Kering", image: "https://instagram.fcgk33-1.fna.fbcdn.net/v/t1.15752-9/672420719_1587597565648301_5165633523424202660_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=100&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdkOnRlc3QiXX0%3D&_nc_ohc=QwkspJxOelUQ7kNvwFXzpAv&_nc_oc=Adp5vWK2l24UIIwL5W0Gj04jjJRQLjG64arirbVLj-NwscKhGRUQ5pIGoASyqpHCrUt1UvaaU56a05DXftPUliUH&_nc_zt=23&_nc_ht=instagram.fcgk33-1.fna&_nc_ss=7a2a8&oh=03_Q7cD5AHnyPrwXK-ikNilH1ysohcgcdHYkJ-ATqGta_LM_TETGQ&oe=6A080D43", title: "Modern Dry Garden", aspect: "9/16" },
  { id: 11, category: "Minimalis", image: "https://instagram.fcgk33-1.fna.fbcdn.net/v/t1.15752-9/672480975_765527229830123_5240618649897644210_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=107&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdkOnRlc3QiXX0%3D&_nc_ohc=kBs9q4T4B3QQ7kNvwGFK1GG&_nc_oc=AdqDxyfxU34weh2ozFg7i6_aZkMebymW6csYbORBfq2CLuohtC1oXnOID7VE86m6VushDEVgy8ssJopCgjhatWyS&_nc_zt=23&_nc_ht=instagram.fcgk33-1.fna&_nc_ss=7a2a8&oh=03_Q7cD5AH7-OtBVOZZ8ufzXAoVfnbZIkgjKIz2tChCx1DtMWghXg&oe=6A082335", title: "Minimalist Garden Design", aspect: "9/16" },
  { id: 12, category: "Tropis", image: "https://instagram.fcgk33-1.fna.fbcdn.net/v/t1.15752-9/666487666_2357429691421244_5339791323128119145_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=111&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdkOnRlc3QiXX0%3D&_nc_ohc=1TBYzcCFL10Q7kNvwGgbFP1&_nc_oc=AdplB3Hx9WJFd1Oo_Sw6nkpy2Jzh73F2zLcJy8gL-xaSoPAaZBSzju5mwteN3rH7kXplboCNqml-zcL6BN18R_rb&_nc_zt=23&_nc_ht=instagram.fcgk33-1.fna&_nc_ss=7a2a8&oh=03_Q7cD5AGjbM5ZYeEhBF2P6zLikZvrJaQwPaYE0qyP8livGOryKA&oe=6A0813B1", title: "Tropical Paradise", aspect: "9/16" }
];

const TESTIMONIALS = [
  { name: "Bpk. Andi", location: "Dago, Bandung", text: "Pengerjaan rapi dan tepat waktu. Taman minimalis saya jadi terlihat sangat mewah." },
  { name: "Ibu Siska", location: "Cibubur, Jakarta", text: "Tim sangat profesional. Kolam koi yang dibuat sistem filtrasinya sangat bagus, air tetap jernih." },
  { name: "Bpk. Rahmat", location: "Setiabudi, Bandung", text: "Desainnya sangat kreatif dan bisa menyesuaikan dengan budget saya. Sangat direkomendasikan!" }
];

const PROCESS_STEPS = [
  { title: "Konsultasi", desc: "Diskusi awal via WhatsApp untuk memahami kebutuhan Anda." },
  { title: "Survey Lokasi", desc: "Tim kami akan datang untuk mengukur dan melihat kondisi lahan." },
  { title: "Desain & Penawaran", desc: "Kami buatkan konsep visual dan rincian biaya yang transparan." },
  { title: "Pengerjaan", desc: "Proses eksekusi oleh tim ahli dengan material berkualitas." },
  { title: "Finishing", desc: "Pengecekan akhir dan edukasi perawatan taman Anda." }
];

// --- Components ---

const Counter = ({ value, label }: { value: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-4xl md:text-5xl font-display font-bold text-brand-600 mb-2">
        {count}+
      </div>
      <div className="text-slate-600 font-medium uppercase tracking-wider text-sm">
        {label}
      </div>
    </div>
  );
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const filteredPortfolio = activeFilter === "Semua" 
    ? PORTFOLIO 
    : PORTFOLIO.filter(item => item.category === activeFilter);

  return (
    <div className="relative min-h-screen bg-white selection:bg-brand-100 selection:text-brand-900">
      
      {/* --- Navbar --- */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://scontent.cdninstagram.com/v/t1.15752-9/666500002_2030974037801916_2839753851677101783_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=110&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdkOnRlc3QiXX0%3D&_nc_ohc=ifnbkT8vHn4Q7kNvwE9tscb&_nc_oc=Adr5Jzke_mCsU6UP4Yp1mts6c0d6ErsqoHJZmoxXjlztt3S8hhaPHqS8K4K2bSR4XVAgVlmLyKbyTo5KlUzS_I13&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AGzAO5v4dJLCWS_jhlyY95tia6X1BvFmxOt7NQqyCHrxg&oe=6A03EFB9" 
              alt="Logo" 
              className="w-10 h-10 rounded-full object-cover border-2 border-brand-500"
              referrerPolicy="no-referrer"
            />
            <span className={cn(
              "font-display font-bold text-xl tracking-tight",
              scrolled ? "text-brand-900" : "text-white drop-shadow-md"
            )}>
              tanaman.hias.bandung
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["Layanan", "Portfolio", "Tentang", "Kontak"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className={cn(
                  "text-sm font-medium uppercase tracking-widest hover:text-brand-500 transition-colors",
                  scrolled ? "text-slate-600" : "text-white drop-shadow-md"
                )}
              >
                {item}
              </a>
            ))}
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-brand-200 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Konsultasi Gratis
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={cn("md:hidden p-2", scrolled ? "text-brand-900" : "text-white")}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {["Layanan", "Portfolio", "Tentang", "Kontak"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-display font-bold text-slate-800"
                >
                  {item}
                </a>
              ))}
              <a 
                href={WHATSAPP_LINK}
                className="bg-brand-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Chat WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section className="relative h-screen w-full overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src={HERO_SLIDES[currentSlide].image} 
              alt="Hero" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2">
                {/* Left side empty as requested */}
                <div className="hidden md:block" />
                
                {/* Right side content */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-center md:text-left flex flex-col justify-center items-center md:items-start"
                >
                  <span className="inline-block px-4 py-1 bg-brand-500/20 backdrop-blur-sm text-brand-200 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-brand-500/30">
                    {HERO_SLIDES[currentSlide].subtitle}
                  </span>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6 drop-shadow-lg">
                    {HERO_SLIDES[currentSlide].title}
                  </h1>
                  <p className="text-lg md:text-xl text-brand-50/90 mb-8 max-w-md leading-relaxed drop-shadow-md">
                    {HERO_SLIDES[currentSlide].description}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <a 
                      href="#layanan" 
                      className="bg-white text-brand-900 hover:bg-brand-50 px-8 py-4 rounded-full font-bold transition-all shadow-xl flex items-center gap-2 group"
                    >
                      Lihat Layanan
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Navigation */}
        <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-3">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={cn(
                "h-1.5 transition-all duration-300 rounded-full",
                currentSlide === idx ? "w-12 bg-white" : "w-3 bg-white/40"
              )}
            />
          ))}
        </div>

        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all hidden md:block"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all hidden md:block"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* --- Tentang Kami --- */}
      <section id="tentang" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-50 rounded-full -z-10" />
              <img 
                src="https://instagram.fcgk33-1.fna.fbcdn.net/v/t1.15752-9/657762933_1420976045996876_5059208154390473513_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=101&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdkOnRlc3QiXX0%3D&_nc_ohc=O6tSPjPnyDoQ7kNvwH16T7I&_nc_oc=AdpGZutdkhBO1X8ULfDbeJqJHoMBkqUV3Q854IqfEIOOycw3co2f74W7zvGPPNtzh580WI95fvj1KTApetXfLzqh&_nc_zt=23&_nc_ht=instagram.fcgk33-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AGfORrlpbuslnilOZTEdSqMO_V0zw72eOlQTQJjXpK0pQ&oe=69FB3AEC" 
                alt="Tentang Kami" 
                className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-600 text-white p-8 rounded-2xl shadow-xl hidden md:block">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm opacity-80 uppercase tracking-wider">Tahun Pengalaman</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4 block">Tentang Kami</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-8 leading-tight">
                Ahli Landscape & Taman <br /> <span className="text-brand-600 italic">Terpercaya di Bandung</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Tanaman Hias Bandung adalah penyedia jasa landscape profesional yang berfokus pada keindahan, kualitas, dan kepuasan klien. Kami percaya bahwa setiap rumah berhak memiliki sudut hijau yang menenangkan.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  "Jasa Desain Taman Custom",
                  "Pembuatan Taman Berkualitas",
                  "Perawatan Taman Rutin",
                  "Pengerjaan Profesional & Rapi"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="bg-brand-100 p-1 rounded-full">
                      <CheckCircle2 className="w-5 h-5 text-brand-600" />
                    </div>
                    <span className="font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-slate-100 pt-10">
                <Counter value={250} label="Proyek Selesai" />
                <Counter value={200} label="Klien Puas" />
                <Counter value={10} label="Tahun Berdiri" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Layanan Kami --- */}
      <section id="layanan" className="py-24 bg-brand-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4 block">Layanan Kami</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Solusi Lengkap Untuk Taman Anda</h2>
            <p className="text-slate-600 text-lg">Dari desain hingga perawatan, kami menyediakan layanan landscape menyeluruh untuk segala jenis kebutuhan properti Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl text-brand-600 shadow-lg">
                    {service.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-4 group-hover:text-brand-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Portfolio --- */}
      <section id="portfolio" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4 block">Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Karya Terbaik Kami</h2>
              <p className="text-slate-600 text-lg">Lihat bagaimana kami mengubah lahan kosong menjadi mahakarya landscape yang memukau.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {["Semua", "Minimalis", "Tropis", "Taman Kering", "Vertical Garden", "Kolam Hias", "Hardscape"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
                    activeFilter === filter 
                      ? "bg-brand-600 text-white shadow-lg shadow-brand-200" 
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredPortfolio.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={cn(
                    "group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all break-inside-avoid",
                    item.aspect === "9/16" ? "aspect-[9/16]" : "aspect-video"
                  )}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <span className="text-brand-300 text-xs font-bold uppercase tracking-widest mb-2">{item.category}</span>
                    <h4 className="text-white text-2xl font-display font-bold">{item.title}</h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* --- Keunggulan (USP) --- */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-brand-400 font-bold uppercase tracking-widest text-sm mb-4 block">Kenapa Memilih Kami?</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-10 leading-tight">Keunggulan Jasa <br /> Landscape Kami</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Survey Gratis", desc: "Konsultasi dan survey lokasi tanpa biaya tambahan.", icon: <MapPin className="w-6 h-6" /> },
                  { title: "Sesuai Budget", desc: "Desain dan material yang bisa disesuaikan dengan anggaran.", icon: <CheckCircle2 className="w-6 h-6" /> },
                  { title: "Tim Ahli", desc: "Dikerjakan oleh tenaga profesional berpengalaman.", icon: <CheckCircle2 className="w-6 h-6" /> },
                  { title: "Tepat Waktu", desc: "Pengerjaan rapi dan selesai sesuai jadwal yang disepakati.", icon: <Clock className="w-6 h-6" /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="bg-brand-500/20 p-3 rounded-2xl text-brand-400 h-fit">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-display font-bold mb-2">{item.title}</h4>
                      <p className="text-brand-100/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://scontent.xx.fbcdn.net/v/t1.15752-9/658372854_1669863117531731_3178817597552396113_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_ohc=QnPadBH4fsMQ7kNvwFGklQf&_nc_oc=AdpsexyLgpye-M8H7Y3dLhLAvZ0Td_ma09ZyFDGGVk2B7En_eg2xr92JnUTizyq1-Y9OL_PDSp17VTSNvu3h2Ukp&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AHJqVj7fNrpj-Neq68ZhUfGZWd0nR0n8oSwJw7VEqyB0Q&oe=69F72CB0" 
                alt="Keunggulan" 
                className="rounded-3xl shadow-2xl w-full object-cover aspect-video"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-brand-900 p-8 rounded-2xl shadow-xl">
                <p className="font-display font-bold text-lg italic">"Kualitas adalah prioritas utama kami."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Testimoni --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4 block">Testimoni</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">Apa Kata Klien Kami?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 p-10 rounded-3xl relative"
              >
                <div className="text-brand-200 absolute top-6 right-8 text-6xl font-serif">“</div>
                <p className="text-slate-600 italic mb-8 relative z-10 leading-relaxed">
                  "{t.text}"
                </p>
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-brand-600 text-sm font-medium">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Cara Kerja --- */}
      <section className="py-24 bg-brand-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4 block">Proses Kami</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">Cara Kerja Kami</h2>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-brand-200 -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {PROCESS_STEPS.map((step, idx) => (
                <div key={idx} className="text-center group">
                  <div className="w-16 h-16 bg-white border-4 border-brand-100 rounded-full flex items-center justify-center text-2xl font-bold text-brand-600 mx-auto mb-6 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-md">
                    {idx + 1}
                  </div>
                  <h4 className="text-xl font-display font-bold text-slate-900 mb-3">{step.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section id="kontak" className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-brand-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/seed/garden/1920/1080')] opacity-10 mix-blend-overlay object-cover" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Wujudkan Taman Impian <br /> Anda Sekarang</h2>
            <p className="text-xl text-brand-100 mb-12 max-w-2xl mx-auto">
              Konsultasikan kebutuhan landscape Anda dengan tim ahli kami secara gratis. Kami siap memberikan solusi terbaik untuk hunian Anda.
            </p>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-brand-600 hover:bg-brand-50 px-10 py-5 rounded-full text-xl font-bold transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-6 h-6" />
              Chat WhatsApp Sekarang
            </a>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="https://scontent.cdninstagram.com/v/t1.15752-9/666500002_2030974037801916_2839753851677101783_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=110&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdkOnRlc3QiXX0%3D&_nc_ohc=ifnbkT8vHn4Q7kNvwE9tscb&_nc_oc=Adr5Jzke_mCsU6UP4Yp1mts6c0d6ErsqoHJZmoxXjlztt3S8hhaPHqS8K4K2bSR4XVAgVlmLyKbyTo5KlUzS_I13&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AGzAO5v4dJLCWS_jhlyY95tia6X1BvFmxOt7NQqyCHrxg&oe=6A03EFB9" 
                  alt="Logo" 
                  className="w-12 h-12 rounded-full border-2 border-brand-500"
                  referrerPolicy="no-referrer"
                />
                <span className="font-display font-bold text-2xl tracking-tight">tanaman.hias.bandung</span>
              </div>
              <p className="text-slate-400 max-w-md leading-relaxed mb-8">
                Penyedia jasa landscape dan taman profesional di Bandung. Kami melayani desain, pembuatan, dan perawatan taman untuk rumah, kantor, and area komersial.
              </p>
              <div className="flex gap-4">
                <a href="#" className="bg-slate-800 p-3 rounded-full hover:bg-brand-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={WHATSAPP_LINK} className="bg-slate-800 p-3 rounded-full hover:bg-brand-600 transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-xl mb-6">Navigasi</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#layanan" className="hover:text-brand-400 transition-colors">Layanan</a></li>
                <li><a href="#portfolio" className="hover:text-brand-400 transition-colors">Portfolio</a></li>
                <li><a href="#tentang" className="hover:text-brand-400 transition-colors">Tentang Kami</a></li>
                <li><a href="#kontak" className="hover:text-brand-400 transition-colors">Kontak</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-xl mb-6">Kontak Kami</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-500 shrink-0" />
                  <span>Bandung, Jawa Barat (Melayani Jabodetabek)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                  <span>{WHATSAPP_NUMBER}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-brand-500 shrink-0" />
                  <span>Senin - Minggu: 08.00 - 17.00</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-10 text-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} tanaman.hias.bandung. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Ada pertanyaan? Chat kami!
        </span>
      </a>

    </div>
  );
}
