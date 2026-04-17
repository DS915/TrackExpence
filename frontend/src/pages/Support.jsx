import React, { useState, useContext, createContext } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Search,
  Copy
} from "lucide-react";

// ================= GLOBAL TOAST CONTEXT =================
const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      <div className="fixed top-5 right-5 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-slide-fade"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// ================= FAQ DATA =================
const faqsData = [
  { category: "General", q: "How do I add a transaction?", a: "Go to Income or Expense page and click Add." },
  { category: "General", q: "Can I edit or delete transactions?", a: "Yes, you can edit or delete anytime." },
  { category: "General", q: "Can I track multiple accounts?", a: "Yes, you can manage multiple accounts easily." },
  { category: "General", q: "Can I export my data?", a: "Yes, export feature is available in settings." },
  { category: "Technical", q: "Why is my data not updating?", a: "Try refresh or check your internet." },
  { category: "Technical", q: "App is slow, what should I do?", a: "Clear cache or restart the app." },
  { category: "Technical", q: "Does it work offline?", a: "Limited offline support is available." },
  { category: "Security", q: "Is my data secure?", a: "Yes, your data is secure and private." },
  { category: "Security", q: "Do you store my financial data?", a: "Data is securely stored with encryption." },
  { category: "Security", q: "Do you use authentication?", a: "Yes, secure login and authentication are implemented." }
];

const categories = ["All", "General", "Technical", "Security"];

// ================= MAIN SUPPORT =================
const SupportContent = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToast } = useToast();

  const filteredFAQs = faqsData.filter(
    (item) =>
      (activeCategory === "All" || item.category === activeCategory) &&
      item.q.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);

    const msg =
      type === "email"
        ? "Email copied! 📧"
        : "Phone number copied! 📱";

    addToast(msg);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Support Center</h1>
        <p className="text-sm opacity-70">How can we help you today?</p>
      </div>

      {/* CONTACT */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">

        {/* EMAIL FIXED */}
        <div className="bg-white border rounded-xl p-4 shadow-sm hover:scale-105 transition">
          <Mail className="mb-2" />
          <h3 className="font-medium mb-2">Email</h3>

          <div className="flex items-center justify-between gap-2">
            <span className="text-sm break-all">support@expensetracker.com</span>

            <Copy
              className="w-4 h-4 cursor-pointer hover:scale-110 transition"
              onClick={() =>
                copyToClipboard("support@expensetracker.com", "email")
              }
            />
          </div>
        </div>

        {/* PHONE FIXED */}
        <div className="bg-white border rounded-xl p-4 shadow-sm hover:scale-105 transition">
          <Phone className="mb-2" />
          <h3 className="font-medium mb-2">Phone</h3>

          <div className="flex items-center justify-between gap-2">
            <span className="text-sm">+91 99999 99999</span>

            <Copy
              className="w-4 h-4 cursor-pointer hover:scale-110 transition"
              onClick={() => copyToClipboard("+91 99999 99999", "phone")}
            />
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 shadow-sm hover:scale-105 transition">
          <MapPin className="mb-2" />
          <h3 className="font-medium mb-2">Address</h3>
          <p className="text-sm">Ahmedabad, Gujarat</p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-6 flex items-center bg-white border rounded-xl px-3 py-2 shadow-sm">
        <Search />
        <input
          type="text"
          placeholder="Search your issue..."
          className="ml-2 w-full outline-none text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CATEGORY */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm border transition-all duration-300 ${
              activeCategory === cat
                ? "bg-teal-500 text-white scale-105"
                : "hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ */}
      <div className="bg-white border rounded-xl p-4 mb-8">
        <h2 className="font-semibold mb-4">FAQs</h2>

        {filteredFAQs.length === 0 ? (
          <p className="text-sm text-gray-500">No results found.</p>
        ) : (
          filteredFAQs.map((item, index) => (
            <div key={index} className="border-b last:border-none">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between py-3 text-left"
              >
                {item.q}
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40" : "max-h-0"
                }`}
              >
                <p className="pb-2 text-sm text-gray-600">{item.a}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* TIPS */}
      <div className="bg-linear-to-r from-teal-500 to-blue-500 text-white p-5 rounded-xl">
        <h3 className="mb-2 font-semibold">Quick Tips</h3>
        <ul className="text-sm space-y-1">
          <li>✔ Track expenses daily</li>
          <li>✔ Use categories</li>
          <li>✔ Review dashboard weekly</li>
        </ul>
      </div>

      {/* ANIMATION */}
      <style>{`
        .animate-slide-fade {
          animation: slideFade 0.4s ease;
        }
        @keyframes slideFade {
          from { opacity: 0; transform: translateY(-20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
};

const Support = () => (
  <ToastProvider>
    <SupportContent />
  </ToastProvider>
);

export default Support;